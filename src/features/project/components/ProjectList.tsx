import { Project } from "@/types";
import AddProjectCard from "./AddProjectCard";
import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ol className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 sm:gap-6">
      {projects?.map((project) => (
        <ProjectCard key={project.created_at} {...project} />
      ))}
      <AddProjectCard />
    </ol>
  );
}
