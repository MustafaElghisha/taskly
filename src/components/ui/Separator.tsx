import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      className={cn(
        "bg-black/10",
        orientation === "horizontal"
          ? "h-px w-full"
          : "w-px shrink-0 self-stretch",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
