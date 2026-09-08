import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex cursor-pointer items-center justify-center gap-3 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-gradient rounded-lg px-8 py-4 text-base leading-6 font-semibold text-white xl:py-3",
        secondary: "text-primary text-sm leading-5 font-semibold",
        ghost: "text-sm leading-5 font-medium text-slate-500",
      },
    },
  },
);

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>;

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props} />
  );
}
