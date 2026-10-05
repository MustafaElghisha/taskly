import { Skeleton } from "@/components/ui/Skeleton";

export default function EpicsLoading() {
  return (
    <div className="px-6 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4 pt-4 md:pt-8">
        <h1 className="hidden text-3xl leading-9 font-bold tracking-tight text-slate-800 md:block">
          Project Epics
        </h1>
        <div className="flex w-full flex-wrap gap-x-8 gap-y-4 md:w-fit">
          <Skeleton className="h-14 w-full md:h-12 md:w-75" />
          <Skeleton className="hidden h-12 w-35 md:block" />
        </div>
      </div>

      <div className="py-6 md:py-10">
        <ul className="grid gap-3 md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] md:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index}>
              <div className="shadow-card flex h-full flex-col rounded-lg bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <Skeleton className="h-6 w-17.5 rounded-xs" />
                  <Skeleton className="size-8 rounded-xl" />
                </div>
                <Skeleton className="h-7 w-full" />
                <div className="mt-4 mb-6 flex items-center gap-3">
                  <Skeleton className="size-7 rounded-xl md:size-10" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="mb-4 h-1.5 w-full rounded-xs" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Skeleton className="h-3 w-39 rounded-xs" />
                  <Skeleton className="h-3 w-21 rounded-xs" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
