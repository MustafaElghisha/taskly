"use client";

import Link from "next/link";
import { Epic } from "../schemas/getEpicsSchema";
import EpicCard from "./EpicCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import InfiniteEpicList from "./InfiniteEpicList";

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

  return (
    <div className="py-6 md:py-10">
      {isMobile ? (
        <InfiniteEpicList
          initialEpics={epics}
          projectId={projectId}
          startPage={currentPage}
          totalPages={totalPages}
        />
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
          {epics.map((epic) => (
            <li key={epic.id}>
              <Link href={`/project/${projectId}/epics/view/${epic.id}`}>
                <EpicCard {...epic} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
