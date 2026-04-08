"use client";

import { useState } from "react";

type Target = {
  name: string;
  state: string;
  website: string;
  source: string;
  employees: string;
  revenue: string;
  ownership: string;
  fitScore: number;
  status: string;
};

export default function Home() {
  const [results, setResults] = useState<Target[]>([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("industrial water treatment");
  const [state, setState] = useState("All");
  const [minEmployees, setMinEmployees] = useState("15+");
  const [minRevenue, setMinRevenue] = useState("$7.5M+");
  const [forSaleOnly, setForSaleOnly] = useState(false);

  const findDeals = async () => {
    setLoading(true);

    const params = new URLSearchParams({
      keyword,
      state,
      minEmployees,
      minRevenue,
      forSaleOnly: String(forSaleOnly),
    });

    const res = await fetch(`/api/find-deals?${params.toString()}`);
    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: 24 }}>Water Treatment Target Pipeline</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
          gap: 12,
          alignItems: "end",
          marginBottom: 12,
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Keyword</label>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: "100%", padding: 10 }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            style={{ width: "100%", padding: 10 }}
          >
            <option>All</option>
            <option>IL</option>
            <option>IN</option>
            <option>WI</option>
            <option>GA</option>
            <option>CA</option>
            <option>MO</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Min Employees</label>
          <select
            value={minEmployees}
            onChange={(e) => setMinEmployees(e.target.value)}
            style={{ width: "100%", padding: 10 }}
          >
            <option>15+</option>
            <option>25+</option>
            <option>50+</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Min Revenue</label>
          <select
            value={minRevenue}
            onChange={(e) => setMinRevenue(e.target.value)}
            style={{ width: "100%", padding: 10 }}
          >
            <option>$7.5M+</option>
            <option>$10M+</option>
            <option>$15M+</option>
          </select>
        </div>

        <button onClick={findDeals} style={{ padding: "10px 16px", height: 40 }}>
          {loading ? "Searching..." : "Find Targets"}
        </button>
      </div>

      <label style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
        <input
          type="checkbox"
          checked={forSaleOnly}
          onChange={(e) => setForSaleOnly(e.target.checked)}
        />
        For sale / succession signals only
      </label>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
              <th style={th}>Company</th>
              <th style={th}>State</th>
              <th style={th}>Website</th>
              <th style={th}>Source</th>
              <th style={th}>Employees</th>
              <th style={th}>Revenue</th>
              <th style={th}>Ownership</th>
              <th style={th}>Fit Score</th>
              <th style={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((company, i) => (
              <tr key={i}>
                <td style={td}>{company.name}</td>
                <td style={td}>{company.state}</td>
                <td style={td}>
                  <a href={company.website} target="_blank" rel="noreferrer">
                    {company.website}
                  </a>
                </td>
                <td style={td}>{company.source}</td>
                <td style={td}>{company.employees}</td>
                <td style={td}>{company.revenue}</td>
                <td style={td}>{company.ownership}</td>
                <td style={td}>{company.fitScore}</td>
                <td style={td}>{company.status}</td>
              </tr>
            ))}

            {!loading && results.length === 0 && (
              <tr>
                <td style={td} colSpan={9}>
                  No targets loaded yet. Click “Find Targets”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const th: React.CSSProperties = {
  padding: 12,
  borderBottom: "1px solid #ddd",
};

const td: React.CSSProperties = {
  padding: 12,
  borderBottom: "1px solid #eee",
  verticalAlign: "top",
};
