"use client";

import { useLocation } from "@/hooks/useLocation";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

interface ISearchHistoryListItemProps {
  locationName: string;
  onRemove: (name: string) => void;
}

function SearchHistoryListItem({
  locationName,
  onRemove,
}: ISearchHistoryListItemProps) {
  const { setCity } = useLocation();
  const router = useRouter();

  const handleRemove = useCallback(() => {
    onRemove(locationName);
  }, [locationName, onRemove]);

  const handleLocationSelect = useCallback(() => {
    setCity(locationName);
    router.push("/");
  }, [locationName, setCity, router]);

  return (
    <li className="flex justify-between items-center gap-x-4 py-2">
      <button
        onClick={handleLocationSelect}
        className="hover:underline cursor-pointer"
      >
        {locationName}
      </button>
      <button
        onClick={handleRemove}
        aria-label="Remove from search history"
        className="p-1 rounded-md hover:bg-gray-100 transition cursor-pointer "
      >
        <TrashIcon className="size-5 " />
      </button>
    </li>
  );
}

export default memo(SearchHistoryListItem);
