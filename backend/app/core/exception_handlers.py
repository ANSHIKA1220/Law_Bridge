from __future__ import annotations

import logging

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger(__name__)


def _error_response(code: int, message: str) -> JSONResponse:
    return JSONResponse(
        status_code=code,
        content={
            "success": False,
            "error": message,
            "code": code,
        },
    )


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
        logger.warning("400 validation error on %s: %s", request.url.path, exc.errors())
        return _error_response(status.HTTP_400_BAD_REQUEST, "Invalid request payload")

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
        code = exc.status_code
        message = str(exc.detail) if exc.detail else "Request failed"
        if code in {
            status.HTTP_400_BAD_REQUEST,
            status.HTTP_401_UNAUTHORIZED,
            status.HTTP_403_FORBIDDEN,
            status.HTTP_404_NOT_FOUND,
            status.HTTP_500_INTERNAL_SERVER_ERROR,
        }:
            logger.warning("HTTP %s on %s: %s", code, request.url.path, message)
            return _error_response(code, message)
        logger.warning("HTTP %s on %s: %s", code, request.url.path, message)
        return _error_response(code, message)

    @app.exception_handler(StarletteHTTPException)
    async def starlette_http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
        code = exc.status_code
        message = str(exc.detail) if exc.detail else "Request failed"
        logger.warning("Starlette HTTP %s on %s: %s", code, request.url.path, message)
        if code in {
            status.HTTP_400_BAD_REQUEST,
            status.HTTP_401_UNAUTHORIZED,
            status.HTTP_403_FORBIDDEN,
            status.HTTP_404_NOT_FOUND,
            status.HTTP_500_INTERNAL_SERVER_ERROR,
        }:
            return _error_response(code, message)
        return _error_response(code, message)

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        logger.exception("Unhandled 500 on %s: %s", request.url.path, exc)
        return _error_response(status.HTTP_500_INTERNAL_SERVER_ERROR, "Internal Server Error")
