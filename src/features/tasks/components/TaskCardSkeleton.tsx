import { Skeleton } from "@/components/ui/Skeleton";

export default function TaskCardSkeleton() {
  return (
    <div
      className={
        "shadow-task-card flex flex-col gap-3 rounded-lg border border-white bg-white p-4"
      }
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-5 w-16 md:hidden" />
      </div>
      <Skeleton className="h-5 w-full" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.75 w-20" />
        <Skeleton className="size-6 rounded-full" />
      </div>
    </div>
  );
}
