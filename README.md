# Growth Investing Screener - Azure-ready MVP

This repository contains an Azure-ready MVP for a Growth Investing Screener:

- **Backend**: FastAPI (backend/) serving a demo CSV and computing GIS (Growth Investment Score)
- **Frontend**: React + Vite (frontend/) dark theme dashboard
- **CI/CD**: GitHub Actions workflows to deploy backend to Azure Web App and frontend to Azure Static Web Apps

## What I generated for you
- Fully functional project skeleton with sample data (`backend/data/bse500_data.csv`)
- Dockerfiles for backend & frontend (optional)
- GitHub Actions workflows that use repo secrets to deploy to Azure

## Before deploying (Get these secrets)
1. **Azure Web App publish profile** (for backend)
   - In Azure Portal -> App Service (create one named **growth-invest-api**) -> Get publish profile (Download)
   - In GitHub repo -> Settings -> Secrets -> Actions -> Add secret named `AZURE_WEBAPP_PUBLISH_PROFILE`. Paste the XML publish profile content.

2. **Azure Static Web Apps deployment token** (for frontend)
   - Create a Static Web App in Azure Portal (name: **growthinvest-web**) and during creation you'll get a deployment token OR
   - After creation, go to Static Web App -> Manage deployment token -> copy
   - In GitHub repo -> Settings -> Secrets -> Actions -> Add secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` and paste the token.

## How to run locally
### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # on Windows use `.venv\Scripts\activate`
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Visit http://localhost:8000/api/top-stocks

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Visit http://localhost:5173

## Deploy using GitHub Actions (Auto deploy)
1. Push this repo to GitHub (main branch)
2. Add the two secrets described above
3. The GitHub Actions workflows will trigger on push -> deploy backend and frontend

## Manual alternative
You can also deploy the backend using Docker to Azure App Service or the frontend using Azure Static Web Apps from the Azure Portal.

## Next steps (optional)
- Replace sample CSV with live data pipeline (Azure Functions + API fetchers)
- Add database (Azure SQL) and authentication
- Integrate LLM explanations (managed OpenAI on Azure)

---
Generated automatically for your Azure account preferences (backend app name: growth-invest-api, frontend app name: growthinvest-web)


---
### Update v2
- Added @vitejs/plugin-react dependency
- Frontend automatically switches between local and Azure API endpoints.
