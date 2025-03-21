"use client";
import SearchInput from "@/components/SeachInput";
import SearchHistoryList from "@/components/SearchHistoryList";

export default function Search() {
  return (
    <div>
      <SearchInput />
      <SearchHistoryList />
    </div>
  );
}
