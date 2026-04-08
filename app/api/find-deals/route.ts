import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const keyword = searchParams.get("keyword") || "";
  const state = searchParams.get("state") || "All";
  const forSaleOnly = searchParams.get("forSaleOnly") === "true";

  let results = [
    {
      name: "Midwest Water Systems",
      state: "IL",
      website: "https://example.com/midwest-water-systems",
      source: "Seed List",
      employees: "25-50",
      revenue: "$8M-$12M",
      ownership: "Founder-owned",
      fitScore: 91,
      status: "Proprietary",
    },
    {
      name: "Southeastern Water Tech Services",
      state: "GA",
      website: "https://example.com/southeastern-water-tech",
      source: "Seed List",
      employees: "20-40",
      revenue: "$8M-$15M",
      ownership: "Family-owned",
      fitScore: 84,
      status: "Proprietary",
    },
    {
      name: "River City Water Management",
      state: "MO",
      website: "https://example.com/river-city-water",
      source: "Broker Watch",
      employees: "25-60",
      revenue: "$10M-$18M",
      ownership: "Founder-owned",
      fitScore: 89,
      status: "Brokered",
    },
    {
      name: "Great Lakes Chemical Treatment",
      state: "WI",
      website: "https://example.com/great-lakes-chemical",
      source: "Web Discovery",
      employees: "15-25",
      revenue: "$7.5M-$9M",
      ownership: "Privately held",
      fitScore: 78,
      status: "Succession signal",
    },
  ];

  if (keyword) {
    const q = keyword.toLowerCase();
    results = results.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.ownership.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
  }

  if (state !== "All") {
    results = results.filter((r) => r.state === state);
  }

  if (forSaleOnly) {
    results = results.filter(
      (r) => r.status === "Brokered" || r.status === "Succession signal"
    );
  }

  return Response.json(results);
}
