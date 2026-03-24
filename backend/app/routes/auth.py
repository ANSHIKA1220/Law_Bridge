from __future__ import annotations

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import LoginRequest, SignupRequest, TokenResponse, UserResponse
from app.utils.helpers import create_access_token, hash_password, verify_password

router = APIRouter(tags=["auth"])
logger = logging.getLogger(__name__)


@router.post("/auth/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, db: Session = Depends(get_db)) -> UserResponse:
    try:
        existing = db.execute(select(User).where(User.email == payload.email.lower())).scalar_one_or_none()
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

        user = User(
            name=payload.name.strip(),
            email=payload.email.lower(),
            password_hash=hash_password(payload.password),
            role=payload.role,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        logger.info("New user signup: email=%s role=%s", user.email, user.role)
        return user  # FastAPI will convert via response_model
    except HTTPException:
        raise
    except OperationalError as exc:
        db.rollback()
        logger.exception("Signup failed due to database connection issue: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database unavailable. Please start PostgreSQL and retry.",
        ) from exc
    except Exception as exc:
        db.rollback()
        logger.exception("Signup failed: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to create account right now",
        ) from exc


@router.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.execute(select(User).where(User.email == payload.email.lower())).scalar_one_or_none()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(subject=user.id, role=user.role.value)
    logger.info("User login success: user_id=%s", user.id)
    return TokenResponse(access_token=access_token)

