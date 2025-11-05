import React, { useEffect, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://growth-invest-api-ggftenfffjgxdbce.centralindia-01.azurewebsites.net";

export default function AiRecommendations() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/recommendations?risk=moderate`)
      .then(res => res.json())
      .then(setRecs);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-3">🤖 AI Recommended Funds</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recs.map(r => (
          <div key={r["Fund Name"]} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{r["Fund Name"]}</h3>
            <p className="text-sm text-gray-300 mb-1">NAV ₹{r["NAV"] ?? "-"}</p>
            <p className="text-sm text-gray-300 mb-1">1Y Return: {r["1Y Return (%)"] ?? "-"}%</p>
            <p className="text-sm text-gray-300 mb-1">AI Score: {r["AI Score"]}</p>
            <p className="text-xs text-gray-400 italic mt-2">{r["AI Insight"]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
