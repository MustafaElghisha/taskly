"use client";

import Link from "next/link";
import { Epic } from "@/schemas/epicSchema";
import EpicCard from "./EpicCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import InfiniteEpicList from "./InfiniteEpicList";
import { useSearchParams } from "next/navigation";

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
        <InfiniteEpicList
          key={`${projectId}-${searchTerm}`}
          projectId={projectId}
          initialEpics={epics}
          startPage={currentPage}
          totalPages={totalPages}
          searchTerm={searchTerm}
        />
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
          {epics.map((epic) => (
            <li key={epic.id}>
              <Link href={`/projects/${projectId}/epics/view/${epic.id}`}>
                <EpicCard {...epic} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
