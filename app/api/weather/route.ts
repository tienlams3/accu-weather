import openWeatherApi from "@/services/api/openweather";

async function getCurrentWeatherByCity(city: string) {
  const params = new URLSearchParams();
  if (city) params.append("q", city);

  try {
    return await openWeatherApi.get("/weather", { params });
  } catch (error: any) {
    throw error;
  }
}
export async function GET(req: Request) {
  if (req.method !== "GET") {
    return Response.json({ error: "Method is not allowed" }, { status: 405 });
  }
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return Response.json({ error: "city is required" }, { status: 400 });
  }

  try {
    const result = await getCurrentWeatherByCity(city);
    return Response.json(result);
  } catch (error: any) {
    return Response.json(error, { status: error.status || 500 });
  }
}
