import Link from "next/link";

import AddIcon from "@/assets/icons/AddIcon.svg";
import { buttonVariants } from "@/components/ui/Button";
import { getProjects } from "@/features/project/actions/getProjects";
import ProjectList from "@/features/project/components/ProjectList";
import EmptyProjects from "@/features/project/components/EmptyProjects";
import ProjectPagination from "@/features/project/components/ProjectPagination";

export default async function ProjectPage() {
  const projects = await getProjects();

  if (!projects.length) return <EmptyProjects />;

  return (
    <div className="px-5 py-4 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl leading-8 font-semibold tracking-tight text-slate-800 sm:text-3xl sm:leading-9">
            Projects
          </h1>
          <p className="leading-6 text-slate-600">
            Manage and curate your projects
          </p>
        </div>
        <Link
          href="/project/add"
          className={buttonVariants({
            className: "hidden rounded-xs px-6 font-medium sm:block",
            variant: "primary",
          })}
        >
          Create New Project
        </Link>
      </div>

      <div className="py-6 sm:pt-10 sm:pb-17.5">
        <ProjectList projects={projects} />
      </div>

      <div className="hidden py-10 sm:block">
        <ProjectPagination />
      </div>

      <Link
        href="/project/add"
        className={buttonVariants({
          variant: "primary",
          className:
            "fixed right-5 bottom-21 rounded-xl p-5.25! leading-0 sm:hidden",
        })}
      >
        <AddIcon />
      </Link>
    </div>
  );
}
