from __future__ import annotations

import logging
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.middleware.auth_middleware import get_current_user
from app.models.document import Document
from app.models.user import User
from app.schemas.document import DocumentUploadResponse
from app.services.ai_service import summarize_document
from app.services.ocr_service import extract_text_from_upload

router = APIRouter(tags=["document"])
logger = logging.getLogger(__name__)


@router.post(
    "/document/upload",
    response_model=DocumentUploadResponse,
    status_code=status.HTTP_201_CREATED,
)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> DocumentUploadResponse:
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing filename")

    file_bytes = await file.read()
    extracted_text = extract_text_from_upload(
        file_bytes=file_bytes,
        filename=file.filename,
        content_type=file.content_type or "",
    )
    result = summarize_document(extracted_text)

    # Store upload locally and serve via StaticFiles mounted at `/uploads`
    backend_dir = Path(__file__).resolve().parents[2]  # backend/
    upload_dir = (backend_dir / settings.upload_dir).resolve()
    upload_dir.mkdir(parents=True, exist_ok=True)

    suffix = Path(file.filename).suffix or ""
    stored_filename = f"user{current_user.id}_{uuid.uuid4().hex}{suffix}"
    dest_path = upload_dir / stored_filename
    dest_path.write_bytes(file_bytes)

    file_url = f"/uploads/{stored_filename}"

    doc_row = Document(
        user_id=current_user.id,
        file_url=file_url,
        summary=result.summary,
    )
    db.add(doc_row)
    db.commit()
    logger.info("Document uploaded user_id=%s file=%s", current_user.id, stored_filename)

    return result

