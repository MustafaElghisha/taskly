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
  const { epics, totalPages } = await getEpics(
    projectId,
    Number(page),
    searchTerm,
  );

  if (!epics.length && searchTerm === "") {
    return <EmptyEpics projectId={projectId} />;
  }

  return (
    <div className="flex h-full flex-col px-6 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4 pt-4 md:pt-8">
        <h1 className="hidden text-3xl leading-9 font-bold tracking-tight text-slate-800 md:block">
          Project Epics
        </h1>
        <div className="flex w-full flex-wrap gap-x-8 gap-y-4 md:w-fit">
          <SearchInput placeholder="Search epics..." />
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

      {epics.length ? (
        <>
          <EpicsList
            epics={epics}
            projectId={projectId}
            totalPages={totalPages}
          />

          <div className="mt-auto hidden justify-end py-8 md:flex">
            <TruncatedPagination
              totalPages={totalPages}
              currentPage={Number(page)}
              getHref={(page) =>
                `/project/${projectId}/epics?page=${page}${searchTerm.length ? `&searchTerm=${searchTerm}` : ``}`
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
        href={`/project/${projectId}/epics/new`}
        className={buttonVariants({
          variant: "primary",
          className:
            "fixed right-6 bottom-22 size-14 rounded-lg p-1! md:hidden",
        })}
      >
        <PlusIcon />
      </Link>
    </div>
  );
}
