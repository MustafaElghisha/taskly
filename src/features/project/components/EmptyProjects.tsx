import Link from "next/link";

import NoProjectsIcon from "@/assets/icons/NoProjectsIcon.svg";
import { buttonVariants } from "@/components/ui/Button";

export default function EmptyProjects() {
  return (
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
  );
}
