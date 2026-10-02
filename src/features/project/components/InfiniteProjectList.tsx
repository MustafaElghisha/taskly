"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Project } from "@/types";
import { getProjects } from "../actions/getProjects";
import ProjectCard from "./ProjectCard";

export default function InfiniteProjectList({
  initialProjects,
  startPage,
  totalPages,
}: {
  initialProjects: Project[];
  startPage: number;
  totalPages: number;
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [page, setPage] = useState(startPage + 1);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(false);

  const loadMoreProjects = useCallback(async () => {
    if (loadingRef.current || page > totalPages) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const { projects: newProjects } = await getProjects(page);

      setProjects((prevProjects) => [...prevProjects, ...newProjects]);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [page, totalPages]);

  useEffect(() => {
    loadMoreProjects();
  }, [loadMoreProjects]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastProjectElementRef = useCallback(
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
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:hidden sm:gap-6">
      {projects.map((project, index) => (
        <li
          key={project.id}
          ref={projects.length === index + 1 ? lastProjectElementRef : null}
        >
          <ProjectCard {...project} />
        </li>
      ))}
      {loading && <li className="text-center text-slate-600">Loading...</li>}
    </ul>
  );
}
