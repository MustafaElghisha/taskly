import Link from "next/link";

import LightningIcon from "@/assets/icons/LightningIcon.svg";
import NoEpicsIcon from "@/assets/icons/NoEpicsIcon.svg";

import { buttonVariants } from "@/components/ui/Button";

export default function EmptyEpics({ projectId }: { projectId: string }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-6 p-4 text-center md:gap-8 md:p-8">
      <div className="rounded-4xl bg-white">
        <NoEpicsIcon />
      </div>
      <h1 className="text-2xl leading-6 font-semibold tracking-tight text-slate-800 md:text-3xl md:leading-8">
        No epics in this project yet.
      </h1>
      <p className="max-w-[40ch] text-slate-600 md:text-lg">
        Break down your large project into manageable epics to track progress
        better and maintain architectural clarity.
      </p>
      <Link
        href={`/projects/${projectId}/epics/new`}
        className={buttonVariants({
          className: "primary-button-shadow rounded-sm",
          variant: "primary",
        })}
      >
        <LightningIcon />
        Create First Epic
      </Link>
    </div>
  );
}
