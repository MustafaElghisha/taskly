"use client";

import ProjectCard from "@/features/projects/components/ProjectCard";
import CreateProjectCard from "@/features/projects/components/CreateProjectCard";
import InfiniteProjectList from "@/features/projects/components/InfiniteProjectList";
import { Project } from "../../../schemas/projectSchema";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ProjectList({
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
    <div className="py-6 md:pt-10 md:pb-17.5">
      {isMobile ? (
        <InfiniteProjectList
          initialProjects={projects}
          startPage={currentPage}
          totalPages={totalPages}
        />
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard {...project} />
            </li>
          ))}
          <li>
            <CreateProjectCard />
          </li>
        </ul>
      )}
    </div>
  );
}
