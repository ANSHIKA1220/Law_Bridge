from __future__ import annotations

import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.middleware.auth_middleware import get_current_user
from app.models.ticket import Ticket
from app.models.user import User
from app.schemas.ticket import TicketCreateRequest, TicketResponse

router = APIRouter(tags=["ticket"])
logger = logging.getLogger(__name__)


@router.post("/ticket/create", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
def create_ticket(
    payload: TicketCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TicketResponse:
    issue = payload.issue.strip()
    if not issue:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Issue cannot be empty")

    row = Ticket(user_id=current_user.id, issue=issue, status="open")
    db.add(row)
    db.commit()
    db.refresh(row)
    logger.info("Ticket created user_id=%s ticket_id=%s", current_user.id, row.id)
    return row


@router.get("/ticket/{ticket_id}", response_model=TicketResponse)
def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> TicketResponse:
    row = db.get(Ticket, ticket_id)
    if not row or row.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found")
    return row

