import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import TruncatedPagination from "@/components/ui/TruncatedPagination";
import { getEpics } from "@/features/epics/actions/getEpics";
import EpicCard from "@/features/epics/components/EpicCard";
import EmptyEpics from "@/features/epics/components/EmptyEpics";
import PlusIcon from "@/assets/icons/PlusIcon.svg";
import SearchIcon from "@/assets/icons/SearchIcon.svg";
import Input from "@/components/ui/Input";

export default async function EpicsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const epics = await getEpics(projectId);

  if (!epics.length) return <EmptyEpics projectId={projectId} />;

  return (
    <div className="flex h-full flex-col px-6 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4 pt-4 sm:pt-8">
        <h1 className="hidden text-3xl leading-9 font-bold tracking-tight text-slate-800 sm:block">
          Project Epics
        </h1>
        <div className="flex w-full flex-wrap gap-x-8 gap-y-4 sm:w-fit">
          <div className="relative flex w-full items-center sm:w-fit">
            <SearchIcon className="absolute left-3" />
            <Input
              placeholder="Search epics..."
              className="w-full px-8 sm:rounded-xs"
            />
          </div>
          <Link
            href={`/project/${projectId}/epics/new`}
            className={buttonVariants({
              variant: "primary",
              className: "hidden rounded-sm sm:flex sm:gap-2 sm:px-6",
            })}
          >
            <PlusIcon />
            New Epic
          </Link>
        </div>
      </div>

      <div className="py-6 sm:py-10">
        <ul className="grid gap-3 sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] sm:gap-6">
          {epics.map((epic) => (
            <li key={epic.epic_id}>
              <EpicCard {...epic} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto hidden justify-end py-8 sm:flex">
        <TruncatedPagination
          totalPages={15}
          currentPage={1}
          getHref={(page) => `/project/${projectId}/epics?page=${page}`}
        />
      </div>

      <Link
        href={`/project/${projectId}/epics/new`}
        className={buttonVariants({
          variant: "primary",
          className:
            "fixed right-6 bottom-22 size-14 rounded-lg p-1! sm:hidden",
        })}
      >
        <PlusIcon className="size-3.75" />
      </Link>
    </div>
  );
}
