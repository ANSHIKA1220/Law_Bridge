from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class DocumentUploadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    summary: str
    risks: list[str] = Field(default_factory=list)
    suggestions: list[str] = Field(default_factory=list)

