"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Epic } from "../../../schemas/epicSchema";
import { getEpics } from "../actions/getEpics";
import EpicCard from "./EpicCard";

export default function InfiniteEpicList({
  projectId,
  totalPages: initialTotalPages,
}: {
  projectId: string;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") ?? "";

  const [epics, setEpics] = useState<Epic[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(false);

  useEffect(() => {
    const fetchFirstPage = async () => {
      loadingRef.current = true;
      setLoading(true);
      try {
        const { epics: newEpics, totalPages: newTotalPages } = await getEpics(
          projectId,
          1,
          searchTerm,
        );
        setEpics(newEpics);
        setTotalPages(newTotalPages);
        setPage(1);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    };

    fetchFirstPage();
  }, [searchTerm, projectId]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || page >= totalPages) return;

    loadingRef.current = true;
    setLoading(true);
    const nextPage = page + 1;

    try {
      const { epics: newEpics, totalPages: newTotalPages } = await getEpics(
        projectId,
        nextPage,
        searchTerm,
      );
      setEpics((prev) => [...prev, ...newEpics]);
      setTotalPages(newTotalPages);
      setPage(nextPage);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [page, totalPages, projectId, searchTerm]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastEpicElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      observer.current?.disconnect();
      if (!node || loadingRef.current || page >= totalPages) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadMore();
        }
      });
      observer.current.observe(node);
    },
    [page, totalPages, loadMore],
  );

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
      {epics.map((epic, index) => (
        <li
          key={epic.epic_id}
          ref={epics.length === index + 1 ? lastEpicElementRef : null}
        >
          <Link href={`/project/${projectId}/epics/view/${epic.id}`}>
            <EpicCard {...epic} />
          </Link>
        </li>
      ))}
      {loading && <li className="text-center text-slate-600">Loading...</li>}
    </ul>
  );
}
