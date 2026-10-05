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
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const { projectId } = await params;
  const { page = "1" } = await searchParams;
  const { epics, totalPages } = await getEpics(projectId, Number(page));

  if (!epics.length) return <EmptyEpics projectId={projectId} />;

  return (
    <div className="flex h-full flex-col px-6 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4 pt-4 md:pt-8">
        <h1 className="hidden text-3xl leading-9 font-bold tracking-tight text-slate-800 md:block">
          Project Epics
        </h1>
        <div className="flex w-full flex-wrap gap-x-8 gap-y-4 md:w-fit">
          <div className="relative flex w-full items-center md:w-fit">
            <SearchIcon className="absolute left-3" />
            <Input
              placeholder="Search epics..."
              className="w-full px-8 md:rounded-xs"
            />
          </div>
          <Link
            href={`/project/${projectId}/epics/new`}
            className={buttonVariants({
              variant: "primary",
              className: "hidden rounded-sm md:flex md:gap-2 md:px-6",
            })}
          >
            <PlusIcon />
            New Epic
          </Link>
        </div>
      </div>

      <div className="py-6 md:py-10">
        <ul className="grid gap-3 md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] md:gap-6">
          {epics.map((epic) => (
            <li key={epic.epic_id}>
              <EpicCard {...epic} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto hidden justify-end py-8 md:flex">
        <TruncatedPagination
          totalPages={totalPages}
          currentPage={Number(page)}
          getHref={(page) => `/project/${projectId}/epics?page=${page}`}
        />
      </div>

      <Link
        href={`/project/${projectId}/epics/new`}
        className={buttonVariants({
          variant: "primary",
          className:
            "fixed right-6 bottom-22 size-14 rounded-lg p-1! md:hidden",
        })}
      >
        <PlusIcon className="size-3.75" />
      </Link>
    </div>
  );
}
