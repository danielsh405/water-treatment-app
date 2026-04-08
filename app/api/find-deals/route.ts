export async function GET() {
  const query = "industrial water treatment companies USA";

  const res = await fetch(
    `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`
  );

  const data = await res.json();

  const results = (data.RelatedTopics || [])
    .slice(0, 5)
    .map((item: any, i: number) => ({
      name: item.Text || `Water Company ${i + 1}`,
      location: "USA",
      website: item.FirstURL || "N/A",
    }));

  return Response.json(results);
}
