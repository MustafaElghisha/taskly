import { cn } from "@/lib/utils";

import ErrorIcon from "@/assets/icons/ErrorIcon.svg";

type FieldProps = React.ComponentPropsWithoutRef<"div">;

function Field({ className, ...props }: FieldProps) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

type FieldLabelProps = React.ComponentPropsWithoutRef<"label">;

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <label
      className={cn(
        "text-2xs truncate ps-1 leading-4.25 font-bold tracking-wider text-slate-500 uppercase",
        className,
      )}
      {...props}
    />
  );
}

type FieldDescriptionProps = React.ComponentPropsWithoutRef<"p">;

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm leading-5.75 text-slate-500 md:leading-5",
        className,
      )}
      {...props}
    />
  );
}

type FieldErrorProps = React.ComponentPropsWithoutRef<"p">;

function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div>
        <ErrorIcon className="-mb-0.5" />
      </div>
      <p
        role="alert"
        className="text-error text-xs leading-4 font-medium"
        {...props}
      />
    </div>
  );
}

export { Field, FieldLabel, FieldDescription, FieldError };
