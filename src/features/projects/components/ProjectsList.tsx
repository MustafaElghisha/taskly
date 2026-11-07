"use client";

import { Project } from "@/schemas/projectSchema";
import { useIsMobile } from "@/hooks/useIsMobile";
import InfiniteProjects from "./InfiniteProjects";
import PaginatedProjects from "./PaginatedProjects";

export default function ProjectsList({
  projects,
  currentPage,
  totalPages,
}: {
  projects: Project[];
  currentPage: number;
  totalPages: number;
}) {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <InfiniteProjects
          initialProjects={projects}
          startPage={currentPage}
          totalPages={totalPages}
        />
      ) : (
        <PaginatedProjects
          projects={projects}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
}
