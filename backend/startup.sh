#!/bin/bash

cd /home/site/wwwroot/backend
echo "Starting FastAPI app from $(pwd)..."

# Ensure proper permissions
chmod +x /home/site/wwwroot/backend/startup.sh

# Run FastAPI app with Uvicorn
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}

