"use client";

import ProjectCard from "@/features/project/components/ProjectCard";
import CreateProjectCard from "@/features/project/components/CreateProjectCard";
import InfiniteProjectList from "@/features/project/components/InfiniteProjectList";
import { Project } from "@/types";

export default function ProjectList({
  projects,
  currentPage,
  totalPages,
}: {
  projects: Project[];
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="py-6 sm:pt-10 sm:pb-17.5">
      <ul className="hidden grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:grid sm:gap-6">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard {...project} />
          </li>
        ))}
        <li>
          <CreateProjectCard />
        </li>
      </ul>
      <InfiniteProjectList
        initialProjects={projects}
        startPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
