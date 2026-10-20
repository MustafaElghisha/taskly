import { useCallback, useRef, useState } from "react";

const useInfiniteScroll = <T>(
  initialData: T[],
  getData: (page: number) => Promise<{ data: T[]; totalPages: number }>,
  page: number,
  totalPages: number,
) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(totalPages);
  const [currentPage, setCurrentPage] = useState(page);

  const loadingRef = useRef(false);

  const loadMoreData = useCallback(async () => {
    if (loadingRef.current || currentPage >= pages) return;

    const nextPage = currentPage + 1;

    try {
      setLoading(true);
      loadingRef.current = true;
      const { data: newData, totalPages: newTotalPages } =
        await getData(nextPage);
      setData((prevData) => [...prevData, ...newData]);
      setPages(newTotalPages);
      setCurrentPage(nextPage);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [currentPage, pages, getData]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (!node || loading || currentPage >= pages) return;

      observer.current?.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadMoreData();
        }
      });

      observer.current.observe(node);
    },
    [loading, currentPage, pages, loadMoreData],
  );

  return { data, loading, lastElementRef };
};

export { useInfiniteScroll };
