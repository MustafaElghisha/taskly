import { cn } from "@/lib/utils";
import Link from "next/link";

import ChevronRightIcon from "@/assets/icons/ChevronRightIcon.svg";

function BreadCrumb({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label="BreadCrumb" className={cn(className)} {...props} />;
}

function BreadCrumbList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-2 text-xs leading-4 font-bold tracking-widest uppercase",
        className,
      )}
      {...props}
    />
  );
}

function BreadCrumbItem({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return <li className={cn(className)} {...props} />;
}

function BreadCrumbLink({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Link>) {
  return <Link className={cn("text-slate-600/60", className)} {...props} />;
}

function BreadCrumbPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return <span className={cn("text-primary", className)} {...props} />;
}

function BreadcrumbSeparator({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("", className)}
      {...props}
    >
      <ChevronRightIcon />
    </li>
  );
}

export {
  BreadCrumb,
  BreadCrumbList,
  BreadCrumbItem,
  BreadCrumbLink,
  BreadCrumbPage,
  BreadcrumbSeparator,
};
