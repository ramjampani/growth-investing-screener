#!/bin/bash
# Startup script for Azure Web App (Linux)
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
