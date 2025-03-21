"use client";
import ForecastWeather from "@/components/ForecastWeather";
import { useLocation } from "@/hooks/useLocation";
import TodayWeather from "@/components/TodayWeather";

export default function Page() {
  const { city } = useLocation();
  return (
    <div>
      <TodayWeather city={city} />
      <ForecastWeather city={city} />
    </div>
  );
}
