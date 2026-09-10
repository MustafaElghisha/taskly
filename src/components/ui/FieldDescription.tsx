import { cn } from "@/lib/utils";

type FieldDescriptionProps = React.ComponentPropsWithoutRef<"p">;

export default function FieldDescription({
  className,
  ...props
}: FieldDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm leading-5.75 text-slate-500 sm:leading-5",
        className,
      )}
      {...props}
    />
  );
}
