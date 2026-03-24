from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class TicketCreateRequest(BaseModel):
    issue: str = Field(min_length=3, max_length=1000)


class TicketResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    issue: str
    status: str

