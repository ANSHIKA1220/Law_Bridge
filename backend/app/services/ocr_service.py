from __future__ import annotations


def extract_text_from_upload(*, file_bytes: bytes, filename: str, content_type: str) -> str:
    # Mock OCR/Document parsing. In production replace with OCR/PDF parser pipeline.
    size_kb = len(file_bytes) / 1024.0
    extension = filename.rsplit(".", 1)[-1].lower() if "." in filename else "unknown"
    return (
        "OCR EXTRACTION REPORT\n"
        f"Filename: {filename}\n"
        f"File extension: {extension}\n"
        f"Content-Type: {content_type or 'unknown'}\n"
        f"Size: {size_kb:.2f} KB\n\n"
        "Detected entities (simulated): party names, dates, amounts, and clause headings.\n"
        "Potentially relevant sections (simulated): indemnity, limitation of liability, dispute resolution, termination.\n"
        "Confidence note: this is a mock extraction layer for API integration testing."
    )

