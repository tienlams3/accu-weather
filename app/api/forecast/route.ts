import openWeatherApi from "@/services/api/openweather";

async function getForecast(city?: string, lat?: string, lon?: string) {
  const params = new URLSearchParams();

  if (city) params.append("q", city);
  if (lat && lon) {
    params.append("lat", lat);
    params.append("lon", lon);
  }

  try {
    return await openWeatherApi.get("/forecast", { params });
  } catch (error: any) {
    throw error;
  }
}

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return Response.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const lat = searchParams.get("lat") || undefined;
  const lon = searchParams.get("lon") || undefined;

  if (!city && (!lat || !lon)) {
    return Response.json(
      { error: "Either 'city' or 'lat' and 'lon' are required" },
      { status: 400 }
    );
  }

  try {
    const forecast = await getForecast(city, lat, lon);
    return Response.json(forecast);
  } catch (error: any) {
    return Response.json(error, { status: error.status || 500 });
  }
}
