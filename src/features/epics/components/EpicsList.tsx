"use client";

import Link from "next/link";
import { Epic } from "../../../schemas/epicSchema";
import EpicCard from "./EpicCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import InfiniteEpicList from "./InfiniteEpicList";
import { useSearchParams } from "next/navigation";

export default function EpicsList({
  epics,
  projectId,
}: {
  epics: Epic[];
  projectId: string;
}) {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") ?? "";

  return (
    <div className="py-6 md:py-10">
      {isMobile ? (
        <InfiniteEpicList
          key={`${projectId}-${searchTerm}`}
          projectId={projectId}
          searchTerm={searchTerm}
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
