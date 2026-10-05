import { Skeleton } from "@/components/ui/Skeleton";
import ProjectCardSkeleton from "@/features/project/components/ProjectCardSkeleton";

export default function ProjectsLoading() {
  return (
    <div className="p-8">
      <div className="flex flex-wrap items-end justify-between gap-x-20 gap-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl leading-8 font-semibold tracking-tight text-slate-800 md:text-3xl md:leading-9">
            Projects
          </h2>
          <p className="leading-6 text-slate-600">
            Manage and curate your projects
          </p>
        </div>
        <Skeleton className="hidden h-10 w-53 rounded-xs md:block" />
      </div>
      <div className="py-10">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
