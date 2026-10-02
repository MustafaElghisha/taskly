import Link from "next/link";

import LightningIcon from "@/assets/icons/LightningIcon.svg";
import AbstractEpicRepresentationIcon from "@/assets/icons/AbstractEpicRepresentationIcon.svg";

import { buttonVariants } from "@/components/ui/Button";

export default function EmptyEpics({ projectId }: { projectId: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8.5 p-8 text-center">
      <div className="rounded-4xl bg-white">
        <AbstractEpicRepresentationIcon className="size-47" />
      </div>
      <h1 className="text-3xl leading-9 font-semibold tracking-tight text-slate-800">
        No epics in this project yet.
      </h1>
      <p className="max-w-[39ch] text-lg leading-7.5 text-slate-600">
        Break down your large project into manageable epics to track progress
        better and maintain architectural clarity.
      </p>
      <Link
        href={`/project/${projectId}/epics/new`}
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
