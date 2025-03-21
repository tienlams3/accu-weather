const cache = new Map();

export async function getForecast(city?: string, lat?: string, lon?: string) {
  const params = new URLSearchParams();
  if (city) params.append("city", city?.trim());
  if (lat && lon) {
    params.append("lat", lat);
    params.append("lon", lon);
  }
  const url = `/api/forecast?${params}`;
  if (!cache.has(url)) {
    const result = await fetchData(url);
    cache.set(url, result);
  }
  return cache.get(url);
}

export async function getWeather(city?: string) {
  const params = new URLSearchParams();
  if (city) params.set("city", city);
  const url = `/api/weather?${params}`;
  if (!cache.has(url)) {
    const result = await fetchData(url);
    cache.set(url, result);
  }
  return cache.get(url);
}

async function fetchData(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch data");
    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
