"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import LogoutIcon from "@/assets/icons/LogoutIcon.svg";
import CollapseIcon from "@/assets/icons/CollapseIcon.svg";
import CloseIcon from "@/assets/icons/CloseIcon.svg";
import ProjectsIcon from "@/assets/icons/ProjectsIcon.svg";
import ProjectIcon from "@/assets/icons/ProjectIcon.svg";
import StatisticsIcon from "@/assets/icons/StatisticsIcon.svg";
import ArrowIcon from "@/assets/icons/ArrowIcon.svg";
import { useLogout } from "@/features/auth/hooks/useLogout";
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
import ProjectMenu from "./ProjectMenu";

const NAV_ITEMS = [
  {
    title: "Projects",
    url: "/project",
    Icon: ProjectsIcon,
  },
  {
    title: "My Statistics",
    url: "/",
    Icon: StatisticsIcon,
  },
];

type SidebarProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

export default function MainSidebar({
  toggleSidebar,
  isSidebarOpen,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopoverOpen, setisPopoverOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const { handleLogout, isLoggingOut, error } = useLogout();

  const toggleCollapsed = () => {
    if (isCollapsed) {
      setisPopoverOpen(false);
    } else {
      setIsAccordionOpen(false);
    }
    setIsCollapsed(!isCollapsed);
  };

  const toggleActiveProject = () => {
    if (isCollapsed) {
      setisPopoverOpen(!isPopoverOpen);
    } else {
      setIsAccordionOpen(!isAccordionOpen);
    }
  };

  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setIsCollapsed(false);
      }
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <aside
      id="main-navigation"
      className={cn(
        "bg-surface-low fixed flex h-dvh w-full min-w-3xs shrink-0 flex-col gap-10 p-4 sm:static sm:w-fit sm:translate-x-0!",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        isCollapsed && "min-w-0 items-center px-5",
      )}
    >
      <SidebarHeader>
        <Logo isCollapsed={isCollapsed} className="p-1" />
        <button className="cursor-pointer sm:hidden" onClick={toggleSidebar}>
          <CloseIcon />
        </button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map(({ title, url, Icon }) => (
              <SidebarMenuItem key={url}>
                <SidebarMenuLink
                  href={url}
                  isCollapsed={isCollapsed}
                  isActive={pathname === url}
                >
                  <Icon />
                  {!isCollapsed && title}
                </SidebarMenuLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem
              className={cn(
                "bg-surface-medium relative flex flex-col items-start rounded-t-md",
                isCollapsed && "rounded-sm bg-white",
              )}
            >
              <SidebarMenuButton
                isCollapsed={isCollapsed}
                onClick={toggleActiveProject}
              >
                <ProjectIcon />
                {!isCollapsed && (
                  <>
                    <span className="truncate">Active Project Na...</span>
                    <ArrowIcon
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
                <ProjectMenu className="overflow-hidden" />
              </div>
              {isCollapsed && isPopoverOpen && (
                <div className="bg-surface-medium absolute top-0 -right-5 min-w-3xs translate-x-full rounded-e-sm">
                  <ProjectMenu />
                </div>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
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
