import React, { useEffect, useState } from "react";
import FundTable from "../components/FundTable";
import AiRecommendations from "../components/AiRecommendations";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://growth-invest-api-ggftenfffjgxdbce.centralindia-01.azurewebsites.net";

export default function FundsDashboard() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/funds`)
      .then(res => res.json())
      .then(data => {
        setFunds(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white p-6">Loading funds...</div>;

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">📊 Investment Funds</h1>
      <FundTable funds={funds} />
      <AiRecommendations />
    </div>
  );
}
