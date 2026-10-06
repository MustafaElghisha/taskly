"use client";

import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import LogoutIcon from "@/assets/icons/LogoutIcon.svg";
import CollapseIcon from "@/assets/icons/CollapseIcon.svg";
import CloseIcon from "@/assets/icons/CloseIcon.svg";
import ProjectIcon from "@/assets/icons/ProjectIcon.svg";
import ChevronUpIcon from "@/assets/icons/ChevronUpIcon.svg";
import Logo from "@/components/Logo";
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
import { useSidebar } from "../_hooks/useSidebar";

import { NAV_ITEMS } from "../_constants/routes";
import { useProject } from "@/features/project/hooks/useProject";
import { useClickOutside } from "@/hooks/useClickOutside";
import ProjectMenu from "./ProjectMenu";

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
        "bg-surface-low fixed z-10 flex h-dvh w-full shrink-0 flex-col gap-8 p-4 md:static md:max-w-3xs md:translate-x-0!",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed && "w-fit min-w-0 items-center px-5",
      )}
    >
      <SidebarHeader className="md:ps-1">
        <Logo isCollapsed={isCollapsed} className="p-1" />
        <button className="cursor-pointer md:hidden" onClick={toggleSidebar}>
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
                      <ChevronUpIcon
                        className={cn(
                          "ml-auto",
                          !isAccordionOpen && "rotate-180",
                        )}
                      />
                    </>
                  )}
                </SidebarMenuButton>
                <div
                  className={cn(
                    "absolute bottom-0 grid w-full translate-y-full rounded-b-sm bg-white",
                    isAccordionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <ProjectMenu
                    className={cn("overflow-hidden", !isAccordionOpen && "p-0")}
                  />
                </div>
                {isCollapsed && isPopoverOpen && (
                  <div className="bg-surface-medium absolute top-0 -right-5 min-w-3xs translate-x-full rounded-e-sm">
                    <ProjectMenu />
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <Separator className="mb-6 hidden md:block" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isCollapsed={isCollapsed}
              onClick={toggleCollapsed}
              className="hidden md:flex"
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </aside>
  );
}
