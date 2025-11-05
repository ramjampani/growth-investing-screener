import React from "react";

export default function FundTable({ funds }) {
  return (
    <table className="w-full bg-gray-800 text-left rounded-lg">
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
        {funds.map(f => (
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
  );
}
