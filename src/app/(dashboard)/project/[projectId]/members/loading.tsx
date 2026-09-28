import { Skeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

export default function Loading() {
  return (
    <div className="px-4 py-4 sm:px-8">
      <div className="flex flex-wrap items-end justify-center gap-x-20 gap-y-4 sm:mb-20 sm:justify-between">
        <h1 className="text-heading-lg leading-10 font-semibold tracking-tight text-slate-800 sm:text-4xl">
          Project Members
        </h1>
        <Skeleton className="hidden h-11 w-45 rounded-xs sm:block" />
      </div>
      <Table>
        <colgroup>
          <col className="w-2/3" />
          <col className="w-1/3" />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="h-3.5 w-13.75" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-3.5 w-8.25" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="rounded-l-2xl">
                <div className="flex items-center gap-4">
                  <Skeleton className="size-12 shrink-0 rounded-xl" />
                  <div className="flex flex-col gap-2 truncate">
                    <Skeleton className="h-5 w-48 rounded-xs" />
                    <Skeleton className="h-5 w-48 rounded-xs" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="rounded-r-2xl">
                <Skeleton className="h-5 w-16 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
