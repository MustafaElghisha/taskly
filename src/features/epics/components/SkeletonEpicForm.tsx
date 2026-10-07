import { Field } from "@/components/ui/Field";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SkeletonEpicForm() {
  return (
    <div className="md:shadow-edit-container mx-auto grid max-w-2xl rounded-lg p-6 md:bg-white md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-15" />
        </div>

        <Skeleton className="h-5 w-30" />
      </div>

      <Skeleton className="mt-4.5 mb-8 h-14 w-full rounded-lg md:mt-6 md:mb-11 md:rounded-xl" />

      <Skeleton className="h-39 w-full rounded-lg p-2 md:rounded-xl md:p-3" />

      <div className="grid gap-3 py-5 md:grid-cols-2 md:gap-4 md:py-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <Field key={index}>
            <Skeleton className="h-3.75 w-12.5" />
            <Skeleton className="h-10.25 rounded-lg" />
          </Field>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between pb-6">
          <Skeleton className="h-7 w-25" />
          <Skeleton className="h-7 w-25" />
        </div>

        <Skeleton className="h-62 w-full rounded-lg" />
      </div>
    </div>
  );
}
