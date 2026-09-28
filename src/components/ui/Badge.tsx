import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "text-3xs rounded-full px-3 py-1 font-bold tracking-wider uppercase",
  {
    variants: {
      variant: {
        owner: "bg-primary-container text-white",
        admin: "bg-blue-250 text-slate-500",
        member: "bg-surface-medium text-slate-600",
        viewer: "bg--blue-150 text-slate-600",
      },
    },
    defaultVariants: {
      variant: "member",
    },
  },
);

function Badge({
  variant,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
