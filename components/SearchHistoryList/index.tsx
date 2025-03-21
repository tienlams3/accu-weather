import BoxContent from "../BoxContent";
import SearchHistoryListItem from "./SearchHistoryListItem";
import EmptyImg from "@/assets/images/empty.png";
import NextImage from "next/image";
import { useEffect, useState, useCallback, memo } from "react";
import localStorageHelpers from "@/services/storage/localstorage";
import * as constantHelpers from "@/services/constant";

function SearchHistoryList() {
  const [searchHistories, setSearchHistories] = useState<string[]>([]);

  useEffect(() => {
    const searchHistoryStorage = localStorageHelpers.get(
      constantHelpers.SEARCH_HISTORIES
    );
    setSearchHistories(
      searchHistoryStorage ? JSON.parse(searchHistoryStorage) : []
    );
  }, []);

  const onRemove = useCallback(
    (locationName: string) => {
      const updatedHistories = searchHistories.filter(
        (item) => item !== locationName
      );
      setSearchHistories(updatedHistories);
      localStorageHelpers.set(
        constantHelpers.SEARCH_HISTORIES,
        JSON.stringify(updatedHistories)
      );
    },
    [searchHistories]
  );
  return (
    <div>
      <p className="mb-3">Search History</p>
      <BoxContent>
        {searchHistories.length === 0 && (
          <div>
            <NextImage
              src={EmptyImg}
              width={600}
              height={200}
              alt="Search History Empty"
            />
            <p className="text-gray-400">No data</p>
          </div>
        )}
        {searchHistories.map((locationName) => (
          <SearchHistoryListItem
            key={locationName}
            locationName={locationName}
            onRemove={onRemove}
          />
        ))}
      </BoxContent>
    </div>
  );
}

export default memo(SearchHistoryList);
