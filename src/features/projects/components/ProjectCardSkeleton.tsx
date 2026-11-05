import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectCardSkeleton() {
  return (
    <div className="flex h-full flex-col justify-between gap-8.5 rounded-lg bg-white p-6">
      <div className="flex flex-1 flex-col justify-between gap-6">
        <Skeleton className="h-7 w-full rounded-sm" />
        <ul className="flex items-center justify-between">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-14" />
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}
