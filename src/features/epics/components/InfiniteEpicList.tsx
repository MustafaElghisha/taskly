"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Epic } from "../schemas/getEpicsSchema";
import { getEpics } from "../actions/getEpics";
import EpicCard from "./EpicCard";
import Link from "next/link";

export default function InfiniteEpicList({
  projectId,
  initialEpics,
  startPage,
  totalPages,
}: {
  projectId: string;
  initialEpics: Epic[];
  startPage: number;
  totalPages: number;
}) {
  const [epics, setEpics] = useState<Epic[]>(initialEpics);
  const [page, setPage] = useState(startPage + 1);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(false);

  const loadMoreProjects = useCallback(async () => {
    if (loadingRef.current || page > totalPages) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const { epics: newEpics } = await getEpics(projectId, page);

      setEpics((prevEpics) => [...prevEpics, ...newEpics]);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [page, totalPages, projectId]);

  useEffect(() => {
    loadMoreProjects();
  }, [loadMoreProjects]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastEpicElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (!node || loading || page > totalPages) return;

      observer.current?.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      observer.current.observe(node);
    },
    [loading, page, totalPages],
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
