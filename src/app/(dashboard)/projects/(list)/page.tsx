import Link from "next/link";

import PlusIcon from "@/assets/icons/PlusIcon.svg";
import { buttonVariants } from "@/components/ui/Button";
import { getProjects } from "@/features/projects/actions/getProjects";
import EmptyProjects from "@/features/projects/components/EmptyProjects";
import ProjectsList from "@/features/projects/components/ProjectsList";

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const { totalPages, data: projects } = await getProjects(Number(page));

  if (!totalPages) return <EmptyProjects />;

  return (
    <div className="flex min-h-full flex-col gap-6 p-4 md:gap-10 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl leading-8 font-semibold tracking-tight text-slate-800 md:text-3xl md:leading-9">
            Projects
          </h1>
          <p className="leading-6 text-slate-600">
            Manage and curate your projects
          </p>
        </div>
        <Link
          href="/projects/new"
          className={buttonVariants({
            className: "hidden rounded-xs px-6 font-medium md:block",
            variant: "primary",
          })}
        >
          Create New Project
        </Link>
      </div>

      <ProjectsList
        projects={projects}
        currentPage={Number(page)}
        totalPages={totalPages}
      />

      <Link
        href="/projects/new"
        className="bg-primary-gradient fixed right-4 bottom-20.5 flex size-12 items-center justify-center rounded-lg text-white md:hidden"
      >
        <PlusIcon className="scale-140" />
      </Link>
    </div>
  );
}
