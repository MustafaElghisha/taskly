import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      className={cn(
        "bg-surface-medium resize-none rounded-lg px-4 pt-4.5 pb-4.75 text-slate-800 md:rounded-sm md:pt-3.5 md:pb-3.75",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
