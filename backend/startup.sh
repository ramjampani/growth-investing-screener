#!/bin/bash
cd /home/site/wwwroot/backend
echo "📢 Working directory: $(pwd)"
echo "✅ Starting FastAPI app (main:app)"

# Activate Azure Oryx virtual environment if it exists
if [ -d "/home/site/wwwroot/antenv" ]; then
    echo "🟢 Activating Azure virtual environment..."
    source /home/site/wwwroot/antenv/bin/activate
else
    echo "⚠️ No virtual environment found. Installing dependencies manually..."
    python -m pip install --upgrade pip
    pip install -r requirements.txt
fi

# Verify that uvicorn and fastapi are installed
pip show uvicorn fastapi || echo "❌ Dependencies not installed correctly!"

# Run FastAPI safely
python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
