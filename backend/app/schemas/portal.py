from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class AdminUserItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    role: str
    verified: bool = False
    banned: bool = False
    barId: str = ""


class AdminUserListResponse(BaseModel):
    data: list[AdminUserItem]
    total: int
    page: int
    limit: int


class BoolUpdateRequest(BaseModel):
    value: bool


class AdminLogItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    type: str
    message: str
    ts: datetime


class AdminLogListResponse(BaseModel):
    data: list[AdminLogItem]
    total: int
    page: int
    limit: int


class AdminLogCreateRequest(BaseModel):
    type: str = Field(min_length=2, max_length=32)
    message: str = Field(min_length=2, max_length=1000)


class ModelItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    enabled: bool


class ModelUpdateRequest(BaseModel):
    enabled: bool


class ContentItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str


class ContentListResponse(BaseModel):
    data: list[ContentItem]
    total: int
    page: int
    limit: int


class ContentCreateRequest(BaseModel):
    title: str = Field(min_length=2, max_length=255)


class AdvocateProfileResponse(BaseModel):
    userId: int
    name: str
    expertise: str
    barId: str = ""
    verified: bool = False


class AdvocateProfileUpdateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    expertise: str = Field(min_length=1, max_length=120)
    barId: str = Field(min_length=1, max_length=64)
    verified: bool


class AdvocateTemplateItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    body: str


class AdvocateTemplateCreateRequest(BaseModel):
    title: str = Field(min_length=2, max_length=255)
    body: str = Field(min_length=5, max_length=5000)


class AdvocateRequestItem(BaseModel):
    id: int
    client: str
    subject: str
    status: str
    createdAt: datetime | None = None


class AdvocateRequestUpdateRequest(BaseModel):
    status: str = Field(pattern="^(open|in_review|accepted|rejected)$")


class StudentTopicItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str


class StudentCaseStudyItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    area: str
    summary: str


class StudentQuizItem(BaseModel):
    id: int
    prompt: str
    options: list[str]
    answer: int
    explanation: str
