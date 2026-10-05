import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="px-6 py-8 md:px-8 md:pt-4 md:pb-6">
      <h1 className="hidden text-4xl leading-10 font-semibold tracking-tight text-slate-800 md:block">
        Edit Project
      </h1>
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-8 rounded-t-lg md:mt-11 md:gap-0 md:bg-white">
          <div className="flex flex-col gap-8 md:gap-0">
            <div className="md:p-8">
              <Skeleton className="h-18 w-full" />
            </div>

            <Separator className="hidden bg-black/5 md:block" />

            <div className="flex flex-col gap-8 md:p-8 md:pb-12">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-26" />
                <Skeleton className="h-13 w-full" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="hidden h-4 w-11 md:block" />
                </div>
                <Skeleton className="aspect-9/4 w-full" />
                <Skeleton className="h-4 w-10 self-end md:w-25" />
              </div>
              <div className="flex flex-col-reverse items-center justify-between gap-y-7 pt-4 md:flex-row">
                <Skeleton className="h-11 w-20" />
                <Skeleton className="h-11 w-full md:w-40 md:rounded-sm" />
              </div>
            </div>
          </div>
        </div>

        <Skeleton className="mt-8 h-25 rounded-lg p-6 md:-mt-1 md:mb-11 md:h-fit md:rounded-t-none" />
      </div>
    </div>
  );
}
