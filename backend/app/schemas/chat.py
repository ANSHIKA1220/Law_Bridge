from __future__ import annotations

from pydantic import BaseModel, Field

from app.schemas.case import CaseResultItem


class ChatRequest(BaseModel):
    message: str = Field(min_length=3, max_length=4000)


class ChatResponse(BaseModel):
    answer: str
    suggestions: list[str] = Field(default_factory=list)
    related_cases: list[CaseResultItem] = Field(default_factory=list)

