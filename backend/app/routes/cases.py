from __future__ import annotations

from typing import List

from fastapi import APIRouter, Query

from app.schemas.case import CaseResultItem
from app.services.case_service import search_cases

router = APIRouter(tags=["cases"])


@router.get("/cases", response_model=List[CaseResultItem])
def get_cases(query: str = Query(..., min_length=1)) -> List[CaseResultItem]:
    return search_cases(query)

