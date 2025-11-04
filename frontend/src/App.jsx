import React, { useEffect, useState } from 'react';
import StockTable from './components/StockTable';

export default function App(){ 
  const [stocks, setStocks] = useState([]);

  const API_URL = import.meta.env.DEV
    ? 'http://127.0.0.1:8000/api/top-stocks'
    : 'https://growth-invest-api-ggftenfffjgxdbce.centralindia-01.azurewebsites.net';

  useEffect(()=>{
    fetch(API_URL)
      .then(r=>r.json())
      .then(setStocks)
      .catch(console.error);
  },[]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🚀 Top Growth Stocks by GIS</h1>
      <StockTable stocks={stocks} />
    </div>
  )
}
