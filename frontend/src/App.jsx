import React, { useEffect, useState } from "react";

export default function App() {
  const [funds, setFunds] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auto-detect local vs deployed backend
  const API_BASE = import.meta.env.DEV
    ? "http://127.0.0.1:8000"
    : "https://growth-invest-api-ggftenfffjgxdbce.centralindia-01.azurewebsites.net";

  useEffect(() => {
    async function fetchData() {
      try {
        const [fundRes, recRes] = await Promise.all([
          fetch(`${API_BASE}/api/funds`),
          fetch(`${API_BASE}/api/recommendations?risk=moderate`)
        ]);
        const [fundData, recData] = await Promise.all([fundRes.json(), recRes.json()]);
        setFunds(fundData);
        setRecommendations(recData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-white p-6">Loading data...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-12">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">📊 Growth Investing Screener</h1>
        <p className="text-gray-400">AI-powered insights on top-performing investment funds</p>
      </header>

      {/* Investment Funds Table */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🏦 All Investment Funds</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-lg text-left">
            <thead>
              <tr>
                <th className="p-3">Fund Name</th>
                <th className="p-3">NAV</th>
                <th className="p-3">1Y Return (%)</th>
                <th className="p-3">3Y Return (%)</th>
                <th className="p-3">5Y Return (%)</th>
              </tr>
            </thead>
            <tbody>
              {funds.map((f) => (
                <tr key={f["Fund Name"]} className="hover:bg-gray-700">
                  <td className="p-3">{f["Fund Name"]}</td>
                  <td className="p-3">{f["NAV"] ?? "-"}</td>
                  <td className="p-3">{f["1Y Return (%)"] ?? "-"}</td>
                  <td className="p-3">{f["3Y Return (%)"] ?? "-"}</td>
                  <td className="p-3">{f["5Y Return (%)"] ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">🤖 AI Recommended Funds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((r) => (
            <div
              key={r["Fund Name"]}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-lg font-semibold">{r["Fund Name"]}</h3>
              <p className="text-sm text-gray-300 mb-1">NAV ₹{r["NAV"] ?? "-"}</p>
              <p className="text-sm text-gray-300 mb-1">
                1Y Return: {r["1Y Return (%)"] ?? "-"}%
              </p>
              <p className="text-sm text-gray-300 mb-1">AI Score: {r["AI Score"]}</p>
              <p className="text-xs text-gray-400 italic mt-2">{r["AI Insight"]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Growth Investing Screener — Powered by AI
      </footer>
    </div>
  );
}

