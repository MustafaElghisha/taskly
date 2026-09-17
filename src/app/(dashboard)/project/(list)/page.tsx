import { buttonVariants } from "@/components/ui/Button";
import { getProjects } from "@/features/project/actions/getProjects";
import ProjectList from "@/features/project/components/ProjectList";
import NoProjectsIcon from "@/assets/icons/NoProjectsIcon.svg";
import AddIcon from "@/assets/icons/AddIcon.svg";
import Link from "next/link";

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <>
      {projects.length ? (
        <div className="p-8">
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
          <div className="py-10">
            <ProjectList projects={projects} />
          </div>
          <Link
            href="/project/add"
            className={buttonVariants({
              variant: "primary",
              className:
                "fixed right-6 bottom-20 rounded-xl p-5.25! leading-0 sm:hidden",
            })}
          >
            <AddIcon />
          </Link>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-11 px-8">
          <NoProjectsIcon />
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-4xl leading-10 font-semibold tracking-tighter text-slate-800">
              No Projects
            </h1>
            <p className="max-w-[40ch] text-lg leading-7.5 text-slate-600">
              You don’t have any projects yet. Start by defining your first
              architectural workspace to begin tracking tasks and epics.
            </p>
          </div>
          <Link
            href="/project/add"
            className={buttonVariants({
              className: "rounded-sm",
              variant: "primary",
            })}
          >
            Create New Project
          </Link>
        </div>
      )}
    </>
  );
}
