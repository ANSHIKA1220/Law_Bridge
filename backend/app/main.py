from __future__ import annotations

import logging
from pathlib import Path
from time import perf_counter

from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.core.database import Base, engine
from app.core.exception_handlers import register_exception_handlers
from app.core.logging_config import setup_logging


setup_logging()
logger = logging.getLogger(__name__)


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name)
    register_exception_handlers(app)

    @app.middleware("http")
    async def request_logging_middleware(request: Request, call_next):
        start = perf_counter()
        logger.info("Incoming request: %s %s", request.method, request.url.path)
        response = await call_next(request)
        elapsed_ms = (perf_counter() - start) * 1000.0
        status_code = response.status_code
        if status_code >= 500:
            logger.error(
                "Request failed: %s %s -> %s (%.2fms)",
                request.method,
                request.url.path,
                status_code,
                elapsed_ms,
            )
        elif status_code >= 400:
            logger.warning(
                "Request warning: %s %s -> %s (%.2fms)",
                request.method,
                request.url.path,
                status_code,
                elapsed_ms,
            )
        else:
            logger.info(
                "Request completed: %s %s -> %s (%.2fms)",
                request.method,
                request.url.path,
                status_code,
                elapsed_ms,
            )
        return response

    # CORS for frontend calls (must be set before routes are included)
    allow_origins = settings.cors_origins if settings.cors_origins else ["http://localhost:5173"]
    logger.info("Enabling CORS for origins: %s", allow_origins)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allow_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Uploads directory served as static assets
    backend_dir = Path(__file__).resolve().parents[1]  # backend/
    upload_dir = (backend_dir / settings.upload_dir).resolve()
    upload_dir.mkdir(parents=True, exist_ok=True)
    app.mount("/uploads", StaticFiles(directory=str(upload_dir)), name="uploads")

    @app.get("/health")
    async def health():
        return {"status": "ok", "service": "LegalMind Backend"}

    # Include routers immediately so OpenAPI/Swagger works even if the DB is unavailable.
    from app.routes.auth import router as auth_router
    from app.routes.chat import router as chat_router
    from app.routes.document import router as document_router
    from app.routes.cases import router as cases_router
    from app.routes.ticket import router as ticket_router
    from app.routes.portal import router as portal_router

    app.include_router(auth_router, prefix=settings.api_prefix)
    app.include_router(chat_router, prefix=settings.api_prefix)
    app.include_router(document_router, prefix=settings.api_prefix)
    app.include_router(cases_router, prefix=settings.api_prefix)
    app.include_router(ticket_router, prefix=settings.api_prefix)
    app.include_router(portal_router, prefix=settings.api_prefix)

    @app.on_event("startup")
    def _startup():
        # Import models so SQLAlchemy registers metadata before create_all()
        from app.models import user, document, chat, case, ticket, portal  # noqa: F401

        # Don't prevent the API from starting if Postgres is unreachable.
        try:
            Base.metadata.create_all(bind=engine)
            logger.info("Database tables ensured")
        except Exception as exc:  # pragma: no cover
            logger.exception("Could not create DB tables: %s", exc)

    return app


app = create_app()

