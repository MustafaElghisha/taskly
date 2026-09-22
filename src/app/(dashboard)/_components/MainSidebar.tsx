"use client";

import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import LogoutIcon from "@/assets/icons/LogoutIcon.svg";
import CollapseIcon from "@/assets/icons/CollapseIcon.svg";
import CloseIcon from "@/assets/icons/CloseIcon.svg";
import ProjectIcon from "@/assets/icons/ProjectIcon.svg";
import ArrowIcon from "@/assets/icons/ArrowIcon.svg";
import Logo from "@/components/Logo";
import { FieldError } from "@/components/ui/Field";
import { Separator } from "@/components/ui/Separator";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/Sidebar";
import ProjectMenuPopover from "./ProjectMenuPopover";
import { useSidebar } from "../_hooks/useSidebar";
import { useClickOutside } from "../_hooks/useClickOutside";
import ProjectMenuAccordion from "./ProjectMenuAccordion";
import { NAV_ITEMS } from "../_constants/routes";
import { useProject } from "@/features/project/hooks/useProject";

type SidebarProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

export default function MainSidebar({
  toggleSidebar,
  isSidebarOpen,
}: SidebarProps) {
  const {
    isCollapsed,
    toggleCollapsed,
    isPopoverOpen,
    setIsPopoverOpen,
    isAccordionOpen,
    toggleActiveProject,
    error,
    isLoggingOut,
    handleLogout,
  } = useSidebar();

  const { ref } = useClickOutside<HTMLLIElement>(() => setIsPopoverOpen(false));

  const pathname = usePathname();
  const { projectId } = useParams();
  const { project } = useProject();
  const isCurrentProject = project?.id === projectId;

  return (
    <aside
      id="main-navigation"
      className={cn(
        "bg-surface-low fixed z-10 flex h-dvh w-full shrink-0 flex-col gap-8 p-4 sm:static sm:max-w-3xs sm:translate-x-0!",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed && "w-fit min-w-0 items-center px-5",
      )}
    >
      <SidebarHeader className="sm:ps-1">
        <Logo isCollapsed={isCollapsed} className="p-1" />
        <button className="cursor-pointer sm:hidden" onClick={toggleSidebar}>
          <CloseIcon />
        </button>
      </SidebarHeader>

      <SidebarContent className={cn(!isCollapsed && "overflow-y-auto")}>
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map(({ title, segment, Icon }) => (
              <SidebarMenuItem key={segment}>
                <SidebarMenuLink
                  href={`/${segment}`}
                  isCollapsed={isCollapsed}
                  isActive={pathname === `/${segment}`}
                  className="capitalize"
                >
                  <Icon />
                  {!isCollapsed && title}
                </SidebarMenuLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {projectId && <Separator />}

        {projectId && (
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem
                className={cn(
                  "bg-surface-medium relative flex flex-col items-start rounded-t-md",
                  isCollapsed && "rounded-sm bg-white",
                )}
                ref={ref}
              >
                <SidebarMenuButton
                  isCollapsed={isCollapsed}
                  onClick={toggleActiveProject}
                >
                  <ProjectIcon />
                  {!isCollapsed && (
                    <>
                      <span className="line-clamp-1 flex-1 text-start">
                        {isCurrentProject && project?.name}
                      </span>
                      <ArrowIcon
                        className={cn(
                          "ml-auto",
                          !isAccordionOpen && "rotate-180",
                        )}
                      />
                    </>
                  )}
                </SidebarMenuButton>
                <ProjectMenuAccordion isAccordionOpen={isAccordionOpen} />
                {isCollapsed && isPopoverOpen && <ProjectMenuPopover />}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <Separator className="mb-6 hidden sm:block" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isCollapsed={isCollapsed}
              onClick={toggleCollapsed}
              className="hidden sm:flex"
            >
              <CollapseIcon className={cn(isCollapsed && "rotate-180")} />
              {!isCollapsed && "Collapse"}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              isCollapsed={isCollapsed}
              onClick={handleLogout}
              className="text-error"
              disabled={isLoggingOut}
            >
              <LogoutIcon />
              {!isCollapsed && (isLoggingOut ? "Logging Out" : "Logout")}
            </SidebarMenuButton>
            {error && <FieldError>{error.message}</FieldError>}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </aside>
  );
}
