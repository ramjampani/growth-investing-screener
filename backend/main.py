from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from utils import compute_gis
import os

app = FastAPI(title="Growth Investing Screener API - Demo")


origins = [
    "https://purple-forest-0a8652500.3.azurestaticapps.net",  # Azure Static Web App
    "http://localhost:3000",  # For local dev testing
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "bse500_data.csv")

@app.get("/")
def root():
    return {"message": "Growth Investing Screener API running."}

@app.get("/api/top-stocks")
def get_top_stocks(limit: int = 10):
    if not os.path.exists(DATA_PATH):
        raise HTTPException(status_code=500, detail="Data file not found on server.")
    df = pd.read_csv(DATA_PATH)
    ranked = compute_gis(df)
    return ranked.head(limit).to_dict(orient="records")
