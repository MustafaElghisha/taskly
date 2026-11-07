"use client";

import { Epic } from "@/schemas/epicSchema";
import { useIsMobile } from "@/hooks/useIsMobile";
import InfiniteEpics from "./InfiniteEpics";
import { useSearchParams } from "next/navigation";
import PaginatedEpics from "./PaginatedEpics";

export default function EpicsList({
  epics,
  projectId,
  currentPage,
  totalPages,
}: {
  epics: Epic[];
  projectId: string;
  currentPage: number;
  totalPages: number;
}) {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") ?? "";

  return (
    <>
      {isMobile ? (
        <InfiniteEpics
          key={`${projectId}-${searchTerm}`}
          projectId={projectId}
          initialEpics={epics}
          startPage={currentPage}
          totalPages={totalPages}
          searchTerm={searchTerm}
        />
      ) : (
        <PaginatedEpics
          projectId={projectId}
          initialEpics={epics}
          currentPage={currentPage}
          totalPages={totalPages}
          searchTerm={searchTerm}
        />
      )}
    </>
  );
}
