"use client";
import Input from "@/components/ui/Input";
import SearchIcon from "@/assets/icons/SearchIcon.svg";
import { useSearch } from "@/hooks/useSearch";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="relative flex w-full items-center md:w-fit">
      <SearchIcon className="absolute left-3" />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-8 leading-0 md:rounded-xs"
      />
    </div>
  );
}
