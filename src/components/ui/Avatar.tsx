import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const getAvatarName = (name: string) => {
  const names = name.split(" ");
  return names.length > 1
    ? names[0][0] + names[names.length - 1][0]
    : names[0].slice(0, 2);
};

const avatarVariants = cva(
  "flex shrink-0 items-center justify-center rounded-xl text-base leading-6 font-bold uppercase md:text-sm md:leading-5",
  {
    variants: {
      variant: {
        default: "bg-primary-container text-white",
        secondary: "text-primary bg-surface-medium",
        tertiary: "bg-primary text-white",
      },
      size: {
        default: "size-10",
        sm: "size-7 text-3xs md:size-10",
        lg: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Avatar({
  className,
  variant = "default",
  size = "default",
  name,
  ...props
}: React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof avatarVariants> & { name: string }) {
  return (
    <div
      className={cn(avatarVariants({ variant, size }), className)}
      {...props}
    >
      {getAvatarName(name)}
    </div>
  );
}

export { Avatar };
