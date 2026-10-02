import Link from "next/link";

import PlusIcon from "@/assets/icons/PlusIcon.svg";
import { buttonVariants } from "@/components/ui/Button";
import TruncatedPagination from "@/components/ui/TruncatedPagination";
import { getProjects } from "@/features/project/actions/getProjects";
import EmptyProjects from "@/features/project/components/EmptyProjects";
import ProjectCard from "@/features/project/components/ProjectCard";
import CreateProjectCard from "@/features/project/components/CreateProjectCard";

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const { totalPages, projects } = await getProjects(Number(page));

  if (!totalPages) return <EmptyProjects />;

  return (
    <div className="flex h-full flex-col px-5 py-4 sm:p-8">
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
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 sm:gap-6">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard {...project} />
            </li>
          ))}
          <li>
            <CreateProjectCard />
          </li>
        </ul>
      </div>

      <div className="mt-auto hidden justify-end py-10 sm:flex">
        <TruncatedPagination
          currentPage={Number(page)}
          totalPages={totalPages}
          getHref={(page: number) => `/project?page=${page}`}
        />
      </div>

      <Link
        href="/project/add"
        className={buttonVariants({
          variant: "primary",
          className:
            "fixed right-5 bottom-22 size-14 rounded-xl p-1! sm:hidden",
        })}
      >
        <PlusIcon className="size-3.5" />
      </Link>
    </div>
  );
}
