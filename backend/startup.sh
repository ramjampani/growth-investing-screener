#!/bin/bash

cd /home/site/wwwroot/backend
echo "📢 Working directory: $(pwd)"
echo "✅ Starting FastAPI: main:app"

# Ensure proper permissions (in case of redeploy)
chmod +x /home/site/wwwroot/backend/startup.sh

# Run FastAPI with correct working directory
exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}

