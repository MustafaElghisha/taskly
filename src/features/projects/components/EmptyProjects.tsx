import Link from "next/link";

import NoProjectsIcon from "@/assets/icons/NoProjectsIcon.svg";
import { buttonVariants } from "@/components/ui/Button";

export default function EmptyProjects() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 p-4 text-center md:gap-8 md:p-8">
      <NoProjectsIcon />
      <h1 className="text-3xl leading-6 font-semibold tracking-tight text-slate-800 md:text-4xl md:leading-8">
        No Projects
      </h1>
      <p className="max-w-[40ch] text-slate-600 md:text-lg">
        You don’t have any projects yet. Start by defining your first
        architectural workspace to begin tracking tasks and epics.
      </p>
      <Link
        href="/projects/new"
        className={buttonVariants({
          className: "primary-button-shadow rounded-sm",
          variant: "primary",
        })}
      >
        Create New Project
      </Link>
    </div>
  );
}
