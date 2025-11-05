from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import json
import numpy as np
import os

app = FastAPI(title="Growth Investing Screener API - v3")

origins = [
    "https://purple-forest-0a8652500.3.azurestaticapps.net",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "funds_refined.json")
with open(DATA_PATH, "r") as f:
    FUNDS = json.load(f)

def normalize(col):
    vals = np.array([f.get(col) or 0 for f in FUNDS])
    return (vals - vals.min()) / (vals.ptp() + 1e-9)

@app.get("/")
def root():
    return {"message": "Growth Investing Screener API v3 running"}

@app.get("/api/funds")
def list_funds():
    return FUNDS

@app.get("/api/funds/{fund_name}")
def get_fund(fund_name: str):
    for f in FUNDS:
        if f["Fund Name"].lower() == fund_name.lower():
            return f
    return {"error": "Fund not found"}

@app.get("/api/recommendations")
def recommendations(risk: str = Query("moderate", enum=["low", "moderate", "high"])):
    norm_1y, norm_3y, norm_5y = map(normalize, ["1Y Return (%)", "3Y Return (%)", "5Y Return (%)"])
    enriched_funds = []

    for i, f in enumerate(FUNDS):
        ai_score = (
            0.4 * norm_1y[i] +
            0.3 * norm_3y[i] +
            0.2 * norm_5y[i] +
            0.1 * (1 if f.get("NAV") else 0)
        )
        f["AI Score"] = round(float(ai_score), 3)

        one, three, five = f.get("1Y Return (%)"), f.get("3Y Return (%)"), f.get("5Y Return (%)")
        trends = []
        if one and one > 12: trends.append("strong short-term momentum")
        elif one and one < 6: trends.append("short-term underperformance")
        if three and three > 10: trends.append("consistent 3-year returns")
        if five and five > 8: trends.append("long-term growth stability")
        summary = (
            f"{f['Fund Name']} shows {', '.join(trends)} "
            f"with an NAV of ₹{f.get('NAV', '-')}. Overall outlook: "
            f"{'Bullish' if ai_score > 0.6 else 'Moderate' if ai_score > 0.4 else 'Cautious'}."
        )
        f["AI Insight"] = summary
        enriched_funds.append(f)

    ranked = sorted(enriched_funds, key=lambda x: x["AI Score"], reverse=True)
    if risk == "low": return ranked[:5]
    if risk == "moderate": return ranked[5:10]
    return ranked[10:15]
