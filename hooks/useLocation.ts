import { LocationContext } from "@/components/WeatherProvider";
import { useContext } from "react";

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
