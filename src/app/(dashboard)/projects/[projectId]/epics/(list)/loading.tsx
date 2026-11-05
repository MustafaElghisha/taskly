import { Skeleton } from "@/components/ui/Skeleton";
import EpicCardSkeleton from "@/features/epics/components/EpicCardSkeleton";

export default function EpicsLoading() {
  return (
    <div className="flex min-h-full flex-col gap-6 p-4 md:gap-10 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4 pt-4 md:pt-8">
        <h1 className="hidden text-3xl leading-9 font-bold tracking-tight text-slate-800 md:block">
          Project Epics
        </h1>
        <div className="flex w-full flex-wrap gap-x-8 gap-y-4 md:w-fit">
          <Skeleton className="h-14 w-full md:h-12 md:w-75" />
          <Skeleton className="hidden h-12 w-35 md:block" />
        </div>
      </div>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <EpicCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
