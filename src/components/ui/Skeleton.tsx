import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("bg-blue-150 animate-pulse rounded-xs", className)}
      {...props}
    />
  );
}

export { Skeleton };
