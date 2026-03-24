from __future__ import annotations

from typing import List

from app.schemas.case import CaseResultItem


def search_cases(query: str, limit: int = 5) -> List[CaseResultItem]:
    # Mock retrieval layer with legal-style results for realistic UI integration.
    q = (query or "").strip()
    base = [
        (
            "Supreme Court: Contractual Breach and Damages Principles",
            "Discusses proof of breach, causation, and quantification of compensatory damages.",
            0.94,
        ),
        (
            "High Court: Interim Relief in Property Possession Disputes",
            "Explains urgency, balance of convenience, and irreparable harm for interim injunctions.",
            0.89,
        ),
        (
            "Consumer Commission: Deficiency of Service Standards",
            "Clarifies burden of proof and evidentiary expectations in consumer complaints.",
            0.84,
        ),
        (
            "Appellate Bench: Evidentiary Weight of Digital Records",
            "Addresses admissibility and reliability of electronic communications and records.",
            0.8,
        ),
        (
            "Statutory Interpretation: Limitation and Procedural Compliance",
            "Reviews limitation periods and consequences of delayed filings.",
            0.76,
        ),
    ]

    # Lightly adapt results so different queries look different
    adapted = []
    for i, (title, summary, score) in enumerate(base):
        adapted.append(
            CaseResultItem(
                title=f"{title} (for: {q[:30] or 'query'})",
                summary=summary,
                relevance_score=max(0.0, min(1.0, score - (i * 0.02))),
            )
        )

    return adapted[:limit]

