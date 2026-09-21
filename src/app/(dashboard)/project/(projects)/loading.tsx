import { Skeleton } from "@/components/ui/Skeleton";
import ProjectCardSkeleton from "@/features/project/components/ProjectCardSkeleton";

export default async function Loading() {
  return (
    <div className="p-8">
      <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl leading-8 font-semibold tracking-tight text-slate-800 sm:text-3xl sm:leading-9">
            Projects
          </h2>
          <p className="leading-6 text-slate-600">
            Manage and curate your projects
          </p>
        </div>
        <Skeleton className="hidden h-10 w-53 rounded-xs sm:block" />
      </div>
      <div className="py-10">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
