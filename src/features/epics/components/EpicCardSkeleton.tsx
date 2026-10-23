import { Skeleton } from "@/components/ui/Skeleton";

export default function EpicCardSkeleton() {
  return (
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
  );
}
