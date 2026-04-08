"use client";

import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const findDeals = async () => {
    setLoading(true);

    const res = await fetch("/api/find-deals");
    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Water Treatment Deal Finder</h1>

      <button onClick={findDeals} style={{ marginTop: 20 }}>
        {loading ? "Searching..." : "Find Deals"}
      </button>

      <div style={{ marginTop: 30 }}>
        {results.map((company, i) => (
          <div key={i} style={{ marginBottom: 15 }}>
            <strong>{company.name}</strong>
            <div>{company.location}</div>
            <a href={company.website} target="_blank">
              {company.website}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
