import { cn } from "@/lib/utils";

type InputProps = React.ComponentPropsWithRef<"input">;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "bg-surface-medium rounded-lg px-4 py-4.5 leading-0 text-slate-800 sm:rounded-sm sm:pt-3.5 sm:pb-3.75",
        className,
      )}
      {...props}
    />
  );
}
