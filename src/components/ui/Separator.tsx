import { cn } from "@/lib/utils";

function Separator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("h-px w-full bg-black/10", className)} {...props} />
  );
}

export { Separator };
