from __future__ import annotations

from typing import Any

from app.schemas.case import CaseResultItem
from app.schemas.document import DocumentUploadResponse
from app.services.case_service import search_cases


def generate_chat_response(user_query: str, *, user_role: str | None = None) -> dict[str, Any]:
    related_cases: list[CaseResultItem] = search_cases(user_query, limit=3)

    role_hint = f" (role: {user_role})" if user_role else ""
    answer = (
        "Preliminary legal guidance"
        f"{role_hint}: Based on the facts shared, the issue appears to involve rights/obligations that depend "
        "on the contract terms, chronology of events, and jurisdiction-specific procedural law.\n\n"
        "Immediate steps:\n"
        "1) Preserve all evidence (messages, notices, receipts, agreements).\n"
        "2) Build a dated timeline of events.\n"
        "3) Identify available remedies (injunction, damages, specific performance, consumer relief).\n\n"
        "Note: This is informational guidance and not a substitute for representation by a licensed advocate.\n\n"
        f"User question: {user_query}"
    )

    suggestions = [
        "Provide jurisdiction and relevant dates.",
        "Share the document sections or key facts for closer review.",
        "Specify what outcome you seek (injunction, damages, dismissal, etc.).",
    ]

    return {
        "answer": answer,
        "suggestions": suggestions,
        "related_cases": related_cases,
    }


def summarize_document(extracted_text: str) -> DocumentUploadResponse:
    # Heuristic summary placeholder until full LLM integration is added.
    snippet = " ".join(extracted_text.split())[:260]
    summary = (
        "Document appears to contain legal content requiring clause-level review. "
        f"Detected extract preview: {snippet or 'No textual preview available.'}"
    )
    risks = [
        "Potential missing context or incomplete facts.",
        "Risk of misinterpretation without jurisdiction-specific details.",
    ]
    suggestions = [
        "Upload the full document including annexures (if any).",
        "Confirm jurisdiction and applicable law references.",
        "Highlight disputed clauses for targeted analysis.",
    ]

    # Keep unused extracted_text referenced for easier later replacement with real logic.
    _ = extracted_text

    return DocumentUploadResponse(summary=summary, risks=risks, suggestions=suggestions)

