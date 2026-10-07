import { cn } from "@/lib/utils";

function Textarea({
  className,
  disabled,
  ...props
}: React.ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      disabled={disabled}
      className={cn(
        "bg-surface-medium resize-none rounded-lg px-4 pt-4.5 pb-4.75 text-slate-800 md:rounded-sm md:pt-3.5 md:pb-3.75",
        disabled &&
          "border-surface-medium w-full rounded-xl border bg-transparent p-3",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
