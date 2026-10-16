import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

const useSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") ?? "",
  );
  const debounced = useDebounce(searchTerm);

  useEffect(() => {
    if (debounced === (searchParams.get("searchTerm") ?? "")) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debounced) {
      params.set("searchTerm", debounced);
      params.delete("page");
    } else {
      params.delete("searchTerm");
      params.delete("page");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return { searchTerm, setSearchTerm };
};

export { useSearch };
