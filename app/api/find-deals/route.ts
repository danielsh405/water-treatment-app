export async function GET() {
  return Response.json([
    {
      name: "ABC Water Treatment Co",
      location: "Chicago, IL",
      website: "https://example.com",
    },
    {
      name: "Midwest Cooling Tower Services",
      location: "Indiana",
      website: "https://example2.com",
    },
  ]);
}
