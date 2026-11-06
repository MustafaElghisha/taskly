import Link from "next/link";

import { buttonVariants } from "@/components/ui/Button";
import TruncatedPagination from "@/components/ui/TruncatedPagination";
import { getEpics } from "@/features/epics/actions/getEpics";
import EmptyEpics from "@/features/epics/components/EmptyEpics";
import PlusIcon from "@/assets/icons/PlusIcon.svg";
import EpicsList from "@/features/epics/components/EpicsList";
import SearchInput from "@/components/ui/SearchInput";

export default async function EpicsPage({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ page: string; searchTerm: string }>;
}) {
  const { projectId } = await params;
  const { page = "1", searchTerm = "" } = await searchParams;
  const { data: epics, totalPages } = await getEpics(
    projectId,
    Number(page),
    searchTerm,
  );

  if (!totalPages && searchTerm === "") {
    return <EmptyEpics projectId={projectId} />;
  }

  return (
    <div className="flex min-h-full flex-col gap-6 p-4 md:gap-10 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4 pt-4 md:pt-8">
        <h1 className="hidden text-3xl leading-9 font-bold tracking-tight text-slate-800 md:block">
          Project Epics
        </h1>
        <div className="flex w-full flex-wrap gap-x-8 gap-y-4 md:w-fit">
          <SearchInput placeholder="Search epics..." />
          <Link
            href={`/projects/${projectId}/epics/new`}
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

      {epics.length ? (
        <>
          <EpicsList
            epics={epics}
            currentPage={Number(page)}
            totalPages={totalPages}
            projectId={projectId}
          />
          <div className="mt-auto hidden justify-end py-8 md:flex">
            <TruncatedPagination
              totalPages={totalPages}
              currentPage={Number(page)}
              getHref={(page) =>
                `/projects/${projectId}/epics?page=${page}${searchTerm.length ? `&searchTerm=${searchTerm}` : ``}`
              }
            />
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-lg leading-7.5 font-medium text-slate-600">
            No epics found matching your search
          </p>
        </div>
      )}

      <Link
        href={`/projects/${projectId}/epics/new`}
        className="bg-primary-gradient fixed right-4 bottom-20.5 flex size-12 items-center justify-center rounded-lg text-white md:hidden"
      >
        <PlusIcon className="scale-140" />
      </Link>
    </div>
  );
}
