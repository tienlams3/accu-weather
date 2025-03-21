import { IWeather } from "@/types/weather";
import { BoxContent } from "../BoxContent";
import { WEATHER_IMAGES_2X } from "@/services/constant";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as restApi from "@/services/api/rest";
import LoadingPlaceholder from "../LoadingPlaceholder";
import { formatTemperature } from "@/services/utils/temperature";

interface ITodayWeatherProps {
  lat?: string;
  lon?: string;
  city?: string;
}
interface ITodayWeatherItemProps {
  label: string;
  value: number;
  unit: string;
}
export default function TodayWeather({ city }: ITodayWeatherProps) {
  const [weather, setWeather] = useState<IWeather>();

  useEffect(() => {
    if (!city) return

    async function fetchWeather() {
      try {
        const res = await restApi.getWeather(city);
        setWeather(res);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }
    fetchWeather();
  }, [city]);


  if (!city) return <BoxContent><h2>Today's Weather</h2><div className='flex items-center justify-center h-[80px] text-gray-300'>No data</div></BoxContent>

  if (!weather)
    return (
      <LoadingPlaceholder height="120px" className="mb-3 rounded-[20px]" />
    );

  const current = weather.weather[0];
  const icon = WEATHER_IMAGES_2X[current.icon];
  return (
    <BoxContent>
      <h2>Today's Weather</h2>
      <div className="flex items-center justify-center">
        <Image src={icon} width={100} height={100} alt={current.description} />
        <div>
          <h2 className="text-3xl font-extrabold">
            {formatTemperature(weather.main.temp, 0)}
          </h2>
          <p className="capitalize">{current.description}</p>
        </div>
      </div>
      <div className="mt-2 flex justify-around">
        <WeatherItem
          label="Humitity"
          value={weather.main.humidity}
          unit={"%"}
        />
        <WeatherItem label="Wind" value={weather.wind.speed} unit={"m/s"} />
        <WeatherItem
          label="Visibility"
          value={weather.visibility / 1000}
          unit={"km"}
        />
      </div>
    </BoxContent>
  );
}

function WeatherItem({ label, value, unit }: ITodayWeatherItemProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-500 text-sm">{label}</p>
      <div className="flex items-center">
        <p className="font-medium text-xl">{value}</p>
        <sup className="top-0">{unit}</sup>
      </div>
    </div>
  );
}
