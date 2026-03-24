from __future__ import annotations

import json
import logging

from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.middleware.auth_middleware import get_current_user
from app.models.chat import Chat
from app.schemas.chat import ChatRequest, ChatResponse
from app.models.user import User
from app.services.ai_service import generate_chat_response

router = APIRouter(tags=["chat"])
logger = logging.getLogger(__name__)


@router.post("/chat", response_model=ChatResponse)
def chat(
    payload: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> ChatResponse:
    result = generate_chat_response(payload.message, user_role=str(current_user.role))

    chat_row = Chat(
        user_id=current_user.id,
        message=payload.message,
        response=json.dumps(jsonable_encoder(result)),
    )
    db.add(chat_row)
    db.commit()
    logger.info("Chat stored for user_id=%s", current_user.id)

    return ChatResponse(**result)

