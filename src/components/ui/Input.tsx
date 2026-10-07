import { cn } from "@/lib/utils";

type InputProps = React.ComponentPropsWithRef<"input">;

export default function Input({ className, disabled, ...props }: InputProps) {
  return (
    <input
      disabled={disabled}
      className={cn(
        "bg-surface-medium rounded-lg px-4 pt-4.5 pb-4.75 text-slate-800 md:rounded-sm md:pt-3.5 md:pb-3.75",
        disabled && "border-surface-medium border bg-transparent",
        className,
      )}
      {...props}
    />
  );
}
