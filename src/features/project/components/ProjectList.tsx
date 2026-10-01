import { Project } from "@/types";
import ProjectCard from "./ProjectCard";
import CreateProjectCard from "./CreateProjectCard";

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ol className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-6">
      {projects?.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
      <CreateProjectCard />
    </ol>
  );
}
