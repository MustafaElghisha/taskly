"use client";

import { Project } from "@/schemas/projectSchema";
import { getProjects } from "../actions/getProjects";
import ProjectCard from "./ProjectCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function InfiniteProjectList({
  initialProjects,
  startPage,
  totalPages,
}: {
  initialProjects: Project[];
  startPage: number;
  totalPages: number;
}) {
  const { data, lastElementRef, loading } = useInfiniteScroll(
    initialProjects,
    getProjects,
    startPage,
    totalPages,
  );

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {data.map((project, index) => (
          <li
            key={project.id}
            ref={data.length === index + 1 ? lastElementRef : null}
          >
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
      {loading && (
        <span className="flex justify-center pt-4 text-slate-600">
          Loading...
        </span>
      )}
    </>
  );
}
