import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="px-6 py-8 sm:px-8 sm:pt-4 sm:pb-6">
      <h1 className="hidden text-4xl leading-10 font-semibold tracking-tight text-slate-800 sm:block">
        Edit Project
      </h1>
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-8 rounded-t-lg sm:mt-11 sm:gap-0 sm:bg-white">
          <div className="flex flex-col gap-8 rounded-t-lg sm:mt-11 sm:gap-0 sm:bg-white">
            <div className="sm:p-8">
              <Skeleton className="h-18 w-full" />
            </div>

            <Separator className="hidden bg-black/5 sm:block" />

            <div className="flex flex-col gap-8 sm:p-8 sm:pb-12">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-26" />
                <Skeleton className="h-13 w-full" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="hidden h-4 w-11 sm:block" />
                </div>
                <Skeleton className="aspect-9/4 w-full" />
                <Skeleton className="h-4 w-10 self-end sm:w-25" />
              </div>
              <div className="flex flex-col-reverse items-center justify-between gap-y-7 pt-4 sm:flex-row">
                <Skeleton className="h-11 w-20" />
                <Skeleton className="h-11 w-full sm:w-40 sm:rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        <Skeleton className="mt-8 h-25 rounded-lg p-6 sm:-mt-1 sm:mb-11 sm:h-fit sm:rounded-t-none" />
      </div>
    </div>
  );
}
