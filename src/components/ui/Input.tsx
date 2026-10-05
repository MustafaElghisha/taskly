import { cn } from "@/lib/utils";

type InputProps = React.ComponentPropsWithRef<"input">;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "bg-surface-medium rounded-lg px-4 pt-4.5 pb-4.75 leading-0 text-slate-800 md:rounded-sm md:pt-3.5 md:pb-3.75",
        className,
      )}
      {...props}
    />
  );
}
