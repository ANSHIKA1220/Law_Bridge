from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class CaseResultItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str
    summary: str
    relevance_score: float = Field(ge=0, le=1)

