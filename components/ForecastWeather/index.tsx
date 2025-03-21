import { memo, useEffect, useState } from "react";
import { IForecast } from "@/types/forecast";
import ForecastContent from "./ForecastContent";
import * as restApi from "@/services/api/rest";
import LoadingPlaceholder from "../LoadingPlaceholder";
import BoxContent from "../BoxContent";
interface IForecastWeatherProps {
  city?: string;
}
function ForecastWeather({ city }: IForecastWeatherProps) {
  const [forecast, setForecast] = useState<IForecast | null>(null);
  useEffect(() => {
    if (!city) return;
    async function fetchForecast() {
      try {
        const res = await restApi.getForecast(city);
        setForecast(res);
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    }
    fetchForecast();
  }, [city]);

  if (!city)
    return (
      <div className="mt-5">
        <div className="mb-3">5-days Forcecast (3 hours)</div>
        <BoxContent>
          <div className="flex items-center justify-center h-[200px] text-gray-300">
            No data
          </div>
        </BoxContent>
      </div>
    );

  if (!forecast)
    return <LoadingPlaceholder height="500px" className="rounded-[20px]" />;

  return (
    <div className="mt-5">
      <div className="mb-3">5-days Forcecast (3 hours)</div>
      <ForecastContent forecast={forecast} />
    </div>
  );
}

export default memo(ForecastWeather);
