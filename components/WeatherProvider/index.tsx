"use client";

import { createContext, useEffect, useState } from "react";
import { WeatherHeader } from "@/components/WeatherHeader";
import localStorageHelpers from "@/services/storage/localstorage";
import * as constantHelpers from "@/services/constant";
import * as restApi from "@/services/api/rest";
import { IForecast } from "@/types/forecast";

interface ILocationContext {
  city?: string;
  setCity: (value: string | undefined) => void;
}

export const LocationContext = createContext<ILocationContext | undefined>(
  undefined
);

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [geoLocation, setGeoLocation] = useState<{
    lat: string;
    lon: string;
  } | null>(null);

  const [city, setCity] = useState<string | undefined>("");
  useEffect(() => {
    const lat = localStorageHelpers.get(constantHelpers.LAT);
    const lon = localStorageHelpers.get(constantHelpers.LON);

    if (!lat || !lon) {
      getGeoLocation();
    } else {
      setGeoLocation({
        lat,
        lon,
      });
    }
  }, []);

  useEffect(() => {
    async function fetchLocationInfo(lat: string, lon: string) {
      try {
        const forecast: IForecast = await restApi.getForecast(
          undefined,
          lat,
          lon
        );
        const locationName = `${forecast.city.name},${forecast.city.country}`;
        localStorageHelpers.set(constantHelpers.CITY, locationName);
        setCity(locationName);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
    if (geoLocation) {
      fetchLocationInfo(geoLocation.lat, geoLocation.lon);
    }
  }, [geoLocation]);

  const getGeoLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const lat = latitude.toString();
      const lon = longitude.toString();
      localStorageHelpers.set(constantHelpers.LAT, lat);
      localStorageHelpers.set(constantHelpers.LON, lon);
      setGeoLocation({ lat, lon });
    });
  };

  return (
    <LocationContext.Provider value={{ city, setCity }}>
      <main className="w-full md:min-w-[480px] md:max-w-[620px] md:w-1/2 mx-auto py-7 px-5">
        <WeatherHeader city={city} />
        {children}
      </main>
    </LocationContext.Provider>
  );
}
