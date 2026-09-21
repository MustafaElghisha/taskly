import { cn } from "@/lib/utils";
import Link from "next/link";

function SidebarHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    />
  );
}

function SidebarContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-1 flex-col gap-4", className)} {...props} />
  );
}

function SidebarFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mt-auto", className)} {...props} />;
}

function SidebarGroup({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("", className)} {...props} />;
}

function SidebarMenu({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  return <ul className={cn("flex flex-col gap-1", className)} {...props} />;
}

function SidebarMenuItem({
  className,
  ...props
}: React.ComponentPropsWithRef<"li">) {
  return <li className={cn("", className)} {...props} />;
}

function SidebarMenuButton({
  isCollapsed,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button"> & {
  isCollapsed: boolean;
}) {
  return (
    <button
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-sm leading-5 font-medium text-slate-800",
        isCollapsed && "justify-center",
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuLink({
  isActive,
  isCollapsed,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  isActive: boolean;
  isCollapsed: boolean;
}) {
  return (
    <Link
      className={cn(
        "flex items-center gap-3 rounded-sm p-3 text-sm leading-5 font-medium",
        isActive ? "text-primary bg-white" : "bg-transparent text-slate-800",
        isCollapsed && "justify-center",
        className,
      )}
      {...props}
    />
  );
}

export {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
  SidebarMenuButton,
};
