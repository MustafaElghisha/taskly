"use client";

import { useCallback } from "react";
import Link from "next/link";
import { Epic } from "@/schemas/epicSchema";
import { getEpics } from "../actions/getEpics";
import EpicCard from "./EpicCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import EpicCardSkeleton from "./EpicCardSkeleton";

export default function InfiniteEpicList({
  projectId,
  searchTerm,
}: {
  projectId: string;
  searchTerm: string;
}) {
  const fetchEpics = useCallback(
    (page: number) => getEpics(projectId, page, searchTerm),
    [searchTerm, projectId],
  );

  const {
    data: epics,
    loading,
    lastElementRef,
  } = useInfiniteScroll<Epic>([], fetchEpics, 0, 1);

  return (
    <>
      {epics.length > 0 ? (
        <>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {epics.map((epic, index) => (
              <li
                key={epic.epic_id}
                ref={epics.length === index + 1 ? lastElementRef : null}
              >
                <Link href={`/project/${projectId}/epics/view/${epic.id}`}>
                  <EpicCard {...epic} />
                </Link>
              </li>
            ))}
          </ul>
          {loading && (
            <span className="flex justify-center text-center text-slate-600">
              Loading...
            </span>
          )}
        </>
      ) : loading ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index}>
              <EpicCardSkeleton />
            </li>
          ))}
        </ul>
      ) : (
        <div ref={lastElementRef} />
      )}
    </>
  );
}
