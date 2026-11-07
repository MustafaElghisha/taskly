import TruncatedPagination from "@/components/ui/TruncatedPagination";
import CreateProjectCard from "./CreateProjectCard";
import ProjectCard from "./ProjectCard";
import { Project } from "@/schemas/projectSchema";

export default function PaginatedProjects({
  projects,
  currentPage,
  totalPages,
}: {
  projects: Project[];
  currentPage: number;
  totalPages: number;
}) {
  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard {...project} />
          </li>
        ))}
        <li>
          <CreateProjectCard />
        </li>
      </ul>
      <div className="mt-auto hidden justify-end py-8 md:flex">
        <TruncatedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          getHref={(page: number) => `/projects?page=${page}`}
        />
      </div>
    </>
  );
}
