import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-6">
      <Skeleton className="h-32 w-full rounded-sm" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
