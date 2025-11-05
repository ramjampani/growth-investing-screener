#!/bin/bash
cd /home/site/wwwroot/backend
echo "📢 Working directory: $(pwd)"
python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
