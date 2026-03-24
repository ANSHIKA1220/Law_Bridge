from __future__ import annotations

import logging

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.middleware.auth_middleware import require_roles
from app.models.portal import (
    AdminLog,
    AdvocateProfile,
    AdvocateTemplate,
    AiModel,
    CaseLibraryItem,
    CaseStudy,
    LawItem,
    LearningTopic,
    QuizQuestion,
    UserModeration,
)
from app.models.ticket import Ticket
from app.models.user import User, UserRole
from app.schemas.portal import (
    AdminLogCreateRequest,
    AdminLogListResponse,
    AdminLogItem,
    AdminUserListResponse,
    AdminUserItem,
    AdvocateProfileResponse,
    AdvocateProfileUpdateRequest,
    AdvocateRequestItem,
    AdvocateRequestUpdateRequest,
    AdvocateTemplateCreateRequest,
    AdvocateTemplateItem,
    BoolUpdateRequest,
    ContentCreateRequest,
    ContentListResponse,
    ContentItem,
    ModelItem,
    ModelUpdateRequest,
    StudentCaseStudyItem,
    StudentQuizItem,
    StudentTopicItem,
)

router = APIRouter(tags=["portal"])
logger = logging.getLogger(__name__)


def _seed_if_empty(db: Session) -> None:
    if db.execute(select(AiModel.id)).first() is None:
        db.add_all(
            [
                AiModel(id="llama3", name="Llama 3", enabled=True),
                AiModel(id="ocr", name="OCR Engine", enabled=True),
                AiModel(id="embed", name="Vector Embedding", enabled=True),
            ]
        )
    if db.execute(select(LawItem.id)).first() is None:
        db.add_all(
            [
                LawItem(title="Contract Act, 1872"),
                LawItem(title="Consumer Protection Act, 2019"),
            ]
        )
    if db.execute(select(CaseLibraryItem.id)).first() is None:
        db.add_all(
            [
                CaseLibraryItem(title="ABC v. XYZ, 2021"),
                CaseLibraryItem(title="Tenant v. Landlord, 2020"),
            ]
        )
    if db.execute(select(LearningTopic.id)).first() is None:
        db.add_all(
            [
                LearningTopic(title="Contract Law"),
                LearningTopic(title="Civil Procedure"),
                LearningTopic(title="Evidence"),
                LearningTopic(title="Ethics & Advocacy"),
            ]
        )
    if db.execute(select(CaseStudy.id)).first() is None:
        db.add_all(
            [
                CaseStudy(title="Roe v. Wade (1973)", area="Constitutional", summary="Privacy rights and abortion."),
                CaseStudy(
                    title="M.R. Engineers v. Som Datt (2009)",
                    area="Contract",
                    summary="Incorporation by reference in arbitration clauses.",
                ),
                CaseStudy(
                    title="Kishore v. Retailer (2023)",
                    area="Consumer",
                    summary="Refund dispute and service deficiency determination.",
                ),
            ]
        )
    if db.execute(select(QuizQuestion.id)).first() is None:
        db.add_all(
            [
                QuizQuestion(
                    prompt="Is a unilateral mistake sufficient to void a contract?",
                    option_a="Always",
                    option_b="Never",
                    option_c="Sometimes",
                    answer=2,
                    explanation="Sometimes, where statutory/precedent conditions for rescission are met.",
                ),
                QuizQuestion(
                    prompt="What is the best evidence rule aimed at?",
                    option_a="Hearsay",
                    option_b="Original documents",
                    option_c="Character evidence",
                    answer=1,
                    explanation="It prioritizes original documentary evidence over secondary copies.",
                ),
            ]
        )
    if db.execute(select(AdminLog.id)).first() is None:
        db.add_all(
            [
                AdminLog(type="api", message="Document analyzer endpoint initialized"),
                AdminLog(type="search", message="Case search index warmed"),
            ]
        )
    db.commit()


@router.get("/admin/users", response_model=AdminUserListResponse)
def list_admin_users(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: str | None = Query(None, min_length=1, max_length=100),
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> AdminUserListResponse:
    offset = (page - 1) * limit
    pattern = f"%{search.strip()}%" if search else None

    base_stmt = select(
        User.id,
        User.name,
        User.role,
        UserModeration.verified,
        UserModeration.banned,
        UserModeration.bar_id,
    ).outerjoin(UserModeration, UserModeration.user_id == User.id)

    count_stmt = select(func.count(User.id)).select_from(User).outerjoin(UserModeration, UserModeration.user_id == User.id)

    if pattern:
        filters = or_(
            User.name.ilike(pattern),
            User.email.ilike(pattern),
            UserModeration.bar_id.ilike(pattern),
        )
        base_stmt = base_stmt.where(filters)
        count_stmt = count_stmt.where(filters)

    total = db.execute(count_stmt).scalar_one()
    rows = db.execute(base_stmt.order_by(User.id.desc()).offset(offset).limit(limit)).all()

    data = [
        AdminUserItem(
            id=row.id,
            name=row.name,
            role=row.role.value,
            verified=bool(row.verified) if row.verified is not None else False,
            banned=bool(row.banned) if row.banned is not None else False,
            barId=row.bar_id or "",
        )
        for row in rows
    ]
    return AdminUserListResponse(data=data, total=total, page=page, limit=limit)


@router.patch("/admin/users/{user_id}/verify", response_model=AdminUserItem)
def admin_verify_user(
    user_id: int,
    payload: BoolUpdateRequest,
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> AdminUserItem:
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    mod = db.get(UserModeration, user.id) or UserModeration(user_id=user.id)
    mod.verified = payload.value
    db.add(mod)
    db.commit()
    db.refresh(mod)
    return AdminUserItem(
        id=user.id,
        name=user.name,
        role=user.role.value,
        verified=mod.verified,
        banned=mod.banned,
        barId=mod.bar_id,
    )


@router.patch("/admin/users/{user_id}/ban", response_model=AdminUserItem)
def admin_ban_user(
    user_id: int,
    payload: BoolUpdateRequest,
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> AdminUserItem:
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    mod = db.get(UserModeration, user.id) or UserModeration(user_id=user.id)
    mod.banned = payload.value
    db.add(mod)
    db.commit()
    db.refresh(mod)
    return AdminUserItem(
        id=user.id,
        name=user.name,
        role=user.role.value,
        verified=mod.verified,
        banned=mod.banned,
        barId=mod.bar_id,
    )


@router.get("/admin/logs", response_model=AdminLogListResponse)
def admin_logs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: str | None = Query(None, min_length=1, max_length=100),
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> AdminLogListResponse:
    _seed_if_empty(db)
    offset = (page - 1) * limit
    base_stmt = select(AdminLog)
    count_stmt = select(func.count(AdminLog.id))
    if search:
        pattern = f"%{search.strip()}%"
        filters = or_(AdminLog.type.ilike(pattern), AdminLog.message.ilike(pattern))
        base_stmt = base_stmt.where(filters)
        count_stmt = count_stmt.where(filters)
    total = db.execute(count_stmt).scalar_one()
    rows = db.execute(base_stmt.order_by(AdminLog.ts.desc()).offset(offset).limit(limit)).scalars().all()
    return AdminLogListResponse(data=rows, total=total, page=page, limit=limit)


@router.post("/admin/logs", response_model=AdminLogItem, status_code=status.HTTP_201_CREATED)
def admin_add_log(
    payload: AdminLogCreateRequest,
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> AdminLogItem:
    row = AdminLog(type=payload.type, message=payload.message)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@router.get("/admin/models", response_model=list[ModelItem])
def admin_models(
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> list[ModelItem]:
    _seed_if_empty(db)
    return db.execute(select(AiModel).order_by(AiModel.name.asc())).scalars().all()


@router.patch("/admin/models/{model_id}", response_model=ModelItem)
def admin_update_model(
    model_id: str,
    payload: ModelUpdateRequest,
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> ModelItem:
    row = db.get(AiModel, model_id)
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Model not found")
    row.enabled = payload.enabled
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@router.get("/admin/content/laws", response_model=list[ContentItem])
def admin_laws(
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> list[ContentItem]:
    _seed_if_empty(db)
    return db.execute(select(LawItem).order_by(LawItem.id.desc())).scalars().all()


@router.post("/admin/content/laws", response_model=ContentItem, status_code=status.HTTP_201_CREATED)
def admin_add_law(
    payload: ContentCreateRequest,
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> ContentItem:
    row = LawItem(title=payload.title.strip())
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@router.get("/admin/content/cases", response_model=ContentListResponse)
def admin_case_library(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: str | None = Query(None, min_length=1, max_length=100),
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> ContentListResponse:
    _seed_if_empty(db)
    offset = (page - 1) * limit
    base_stmt = select(CaseLibraryItem)
    count_stmt = select(func.count(CaseLibraryItem.id))
    if search:
        pattern = f"%{search.strip()}%"
        base_stmt = base_stmt.where(CaseLibraryItem.title.ilike(pattern))
        count_stmt = count_stmt.where(CaseLibraryItem.title.ilike(pattern))
    total = db.execute(count_stmt).scalar_one()
    rows = db.execute(base_stmt.order_by(CaseLibraryItem.id.desc()).offset(offset).limit(limit)).scalars().all()
    return ContentListResponse(data=rows, total=total, page=page, limit=limit)


@router.post("/admin/content/cases", response_model=ContentItem, status_code=status.HTTP_201_CREATED)
def admin_add_case_library(
    payload: ContentCreateRequest,
    db: Session = Depends(get_db),
    _admin: User = Depends(require_roles(UserRole.Admin)),
) -> ContentItem:
    row = CaseLibraryItem(title=payload.title.strip())
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@router.get("/advocate/profile", response_model=AdvocateProfileResponse)
def get_advocate_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(UserRole.Advocate, UserRole.Admin)),
) -> AdvocateProfileResponse:
    mod = db.get(UserModeration, current_user.id) or UserModeration(user_id=current_user.id)
    profile = db.get(AdvocateProfile, current_user.id)
    if not profile:
        profile = AdvocateProfile(user_id=current_user.id, name=current_user.name, expertise="General Practice")
        db.add(profile)
        db.add(mod)
        db.commit()
        db.refresh(profile)
        db.refresh(mod)
    return AdvocateProfileResponse(
        userId=current_user.id,
        name=profile.name,
        expertise=profile.expertise,
        barId=mod.bar_id,
        verified=mod.verified,
    )


@router.put("/advocate/profile", response_model=AdvocateProfileResponse)
def update_advocate_profile(
    payload: AdvocateProfileUpdateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(UserRole.Advocate, UserRole.Admin)),
) -> AdvocateProfileResponse:
    profile = db.get(AdvocateProfile, current_user.id) or AdvocateProfile(user_id=current_user.id)
    profile.name = payload.name.strip()
    profile.expertise = payload.expertise.strip()
    mod = db.get(UserModeration, current_user.id) or UserModeration(user_id=current_user.id)
    mod.bar_id = payload.barId.strip()
    mod.verified = payload.verified
    db.add(profile)
    db.add(mod)
    db.commit()
    db.refresh(profile)
    db.refresh(mod)
    return AdvocateProfileResponse(
        userId=current_user.id,
        name=profile.name,
        expertise=profile.expertise,
        barId=mod.bar_id,
        verified=mod.verified,
    )


@router.get("/advocate/templates", response_model=list[AdvocateTemplateItem])
def advocate_templates(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(UserRole.Advocate, UserRole.Admin)),
) -> list[AdvocateTemplateItem]:
    return (
        db.execute(
            select(AdvocateTemplate)
            .where(AdvocateTemplate.advocate_user_id == current_user.id)
            .order_by(AdvocateTemplate.id.desc())
        )
        .scalars()
        .all()
    )


@router.post("/advocate/templates", response_model=AdvocateTemplateItem, status_code=status.HTTP_201_CREATED)
def advocate_add_template(
    payload: AdvocateTemplateCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(UserRole.Advocate, UserRole.Admin)),
) -> AdvocateTemplateItem:
    row = AdvocateTemplate(
        advocate_user_id=current_user.id,
        title=payload.title.strip(),
        body=payload.body.strip(),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@router.get("/advocate/requests", response_model=list[AdvocateRequestItem])
def advocate_requests(
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_roles(UserRole.Advocate, UserRole.Admin)),
) -> list[AdvocateRequestItem]:
    rows = db.execute(select(Ticket).order_by(Ticket.id.desc())).scalars().all()
    users = {u.id: u for u in db.execute(select(User)).scalars().all()}
    return [
        AdvocateRequestItem(
            id=r.id,
            client=users[r.user_id].name if users.get(r.user_id) else "Unknown",
            subject=r.issue,
            status=r.status,
            createdAt=None,
        )
        for r in rows
    ]


@router.patch("/advocate/requests/{ticket_id}", response_model=AdvocateRequestItem)
def advocate_update_request(
    ticket_id: int,
    payload: AdvocateRequestUpdateRequest,
    db: Session = Depends(get_db),
    _current_user: User = Depends(require_roles(UserRole.Advocate, UserRole.Admin)),
) -> AdvocateRequestItem:
    row = db.get(Ticket, ticket_id)
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Request not found")
    row.status = payload.status
    db.add(row)
    db.commit()
    user = db.get(User, row.user_id)
    return AdvocateRequestItem(
        id=row.id,
        client=user.name if user else "Unknown",
        subject=row.issue,
        status=row.status,
        createdAt=None,
    )


@router.get("/student/topics", response_model=list[StudentTopicItem])
def student_topics(
    db: Session = Depends(get_db),
    _student: User = Depends(require_roles(UserRole.Student, UserRole.Admin)),
) -> list[StudentTopicItem]:
    _seed_if_empty(db)
    return db.execute(select(LearningTopic).order_by(LearningTopic.id.asc())).scalars().all()


@router.get("/student/case-studies", response_model=list[StudentCaseStudyItem])
def student_case_studies(
    db: Session = Depends(get_db),
    _student: User = Depends(require_roles(UserRole.Student, UserRole.Admin)),
) -> list[StudentCaseStudyItem]:
    _seed_if_empty(db)
    return db.execute(select(CaseStudy).order_by(CaseStudy.id.asc())).scalars().all()


@router.get("/student/quizzes", response_model=list[StudentQuizItem])
def student_quizzes(
    db: Session = Depends(get_db),
    _student: User = Depends(require_roles(UserRole.Student, UserRole.Admin)),
) -> list[StudentQuizItem]:
    _seed_if_empty(db)
    rows = db.execute(select(QuizQuestion).order_by(QuizQuestion.id.asc())).scalars().all()
    return [
        StudentQuizItem(
            id=row.id,
            prompt=row.prompt,
            options=[row.option_a, row.option_b, row.option_c],
            answer=row.answer,
            explanation=row.explanation,
        )
        for row in rows
    ]
