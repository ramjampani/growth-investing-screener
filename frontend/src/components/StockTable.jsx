import React from 'react';

export default function StockTable({ stocks }){
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 rounded-xl shadow">
        <thead>
          <tr className="bg-gray-700 text-gray-200 text-sm">
            <th className="p-2 text-left">Rank</th>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-left">Sector</th>
            <th className="p-2 text-right">GIS</th>
            <th className="p-2 text-right">ROCE</th>
            <th className="p-2 text-right">EPS Growth</th>
            <th className="p-2 text-right">PEG</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s, i)=>(
            <tr key={i} className="border-t text-sm">
              <td className="p-2">{i+1}</td>
              <td className="p-2">{s.Company}</td>
              <td className="p-2">{s.Sector}</td>
              <td className="p-2 text-right font-semibold">{Number(s.GIS).toFixed(2)}</td>
              <td className="p-2 text-right">{s.ROCE}%</td>
              <td className="p-2 text-right">{s.EPSGrowth}%</td>
              <td className="p-2 text-right">{s.PEG}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
