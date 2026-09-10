import { cn } from "@/lib/utils";
import ErrorIcon from "@/assets/icons/ErrorIcon.svg";

type FieldErrorProps = React.ComponentPropsWithoutRef<"p">;

export default function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div>
        <ErrorIcon className="-mb-0.5" />
      </div>
      <p
        role="alert"
        className={cn("text-error text-xs leading-4 font-medium", className)}
        {...props}
      />
    </div>
  );
}
