"use client";
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface IWeatherHeaderProps {
  city?: string;
}
export function WeatherHeader({ city }: IWeatherHeaderProps) {
  const pathname = usePathname();
  return (
    <div className="flex justify-between mb-2 items-center">
      <Link href="/" className="flex items-center flex-1/2">
        <MapPinIcon className="size-5" />
        {city && <h2 className="font-medium">{city}</h2>}
      </Link>
      {pathname == "/" && (
        <Link href="/search">
          <MagnifyingGlassIcon className="size-5" />
        </Link>
      )}
    </div>
  );
}
