export async function GET() {
  try {
    const query = "industrial water treatment companies USA";

    const res = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`
    );

    const data = await res.json();

    let results = (data.RelatedTopics || [])
      .slice(0, 5)
      .map((item: any, i: number) => ({
        name: item.Text || `Water Company ${i + 1}`,
        location: "USA",
        website: item.FirstURL || "N/A",
      }));

    // 🔥 fallback if nothing comes back
    if (results.length === 0) {
      results = [
        {
          name: "Nalco Water (Ecolab)",
          location: "USA",
          website: "https://www.ecolab.com/nalco-water",
        },
        {
          name: "ChemTreat",
          location: "USA",
          website: "https://www.chemtreat.com",
        },
        {
          name: "Kurita America",
          location: "USA",
          website: "https://www.kuritaamerica.com",
        },
      ];
    }

    return Response.json(results);
  } catch (error) {
    return Response.json([
      {
        name: "Fallback Water Treatment Co",
        location: "USA",
        website: "https://example.com",
      },
    ]);
  }
}
