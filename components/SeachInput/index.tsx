"use client";
import { useLocation } from "@/hooks/useLocation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import localStorageHelpers from "@/services/storage/localstorage";
import * as constantHelpers from "@/services/constant";
import * as restApi from "@/services/api/rest";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchInput() {
  const { setCity } = useLocation();
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    // Automatically focuses the input when the component mounts
    inputRef.current?.focus();
  }, []);

  const fetchForecast = async (city: string) => {
    if (!city.trim()) {
      setError("Please enter a valid city or country.");
      return;
    }

    setError("");

    try {
      const forecast = await restApi.getForecast(city);
      const locationName = `${forecast?.city.name}, ${forecast?.city.country}`;
      storeSearchHistory(locationName);
      setCity(locationName);
      router.push("/");
    } catch (error) {
      setError("Please enter a valid city or country.");
      console.error("Error fetching forecast:", error);
    }
  };

  const storeSearchHistory = (locationName: string) => {
    const searchHistoryStorage = localStorageHelpers.get(
      constantHelpers.SEARCH_HISTORIES
    );
    const searchHistories: Set<string> = new Set(
      searchHistoryStorage ? JSON.parse(searchHistoryStorage) : []
    ); // avoid duplicated items

    searchHistories.add(locationName);

    localStorageHelpers.set(
      constantHelpers.SEARCH_HISTORIES,
      JSON.stringify(Array.from(searchHistories).slice(-10))
    );
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchForecast(inputValue);
    }
  };

  return (
    <div className="relative mb-3">
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="Search country or city..."
          className="w-full h-[50px] pl-10 pr-4 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <MagnifyingGlassIcon className="size-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
