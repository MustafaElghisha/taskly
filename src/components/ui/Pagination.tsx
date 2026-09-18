import { cn } from "@/lib/utils";

import ChevronRightIcon from "@/assets/icons/ChevronRightIcon.svg";

function Pagination({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ol">) {
  return <ol className={cn("flex items-center gap-2", className)} {...props} />;
}

function PaginationItem({ ...props }: React.ComponentPropsWithoutRef<"li">) {
  return <li {...props} />;
}

function PaginationLink({
  isActive = false,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & { isActive?: boolean }) {
  return (
    <button
      className={cn(
        "flex size-8 items-center justify-center rounded-xs border border-slate-200 text-xs leading-4 font-bold",
        isActive ? "bg-primary text-white" : "text-slate-200",
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn("", className)}
      {...props}
    >
      <ChevronRightIcon className="rotate-180" />
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn("", className)}
      {...props}
    >
      <ChevronRightIcon />
    </PaginationLink>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
