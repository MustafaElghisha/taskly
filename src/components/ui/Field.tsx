import { cn } from "@/lib/utils";

type FieldProps = React.ComponentPropsWithoutRef<"div">;

export default function Field({ className, ...props }: FieldProps) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}
