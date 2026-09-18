import { useLogout } from "@/features/auth/hooks/useLogout";
import { useState, useEffect } from "react";

const useSidebar = () => {
  const { handleLogout, isLoggingOut, error } = useLogout();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const toggleCollapsed = () => {
    if (isCollapsed) {
      setIsPopoverOpen(false);
    } else {
      setIsAccordionOpen(false);
    }
    setIsCollapsed(!isCollapsed);
  };

  const toggleActiveProject = () => {
    if (isCollapsed) {
      setIsPopoverOpen(!isPopoverOpen);
    } else {
      setIsAccordionOpen(!isAccordionOpen);
    }
  };

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

  return {
    isCollapsed,
    error,
    handleLogout,
    isLoggingOut,
    isAccordionOpen,
    setIsPopoverOpen,
    isPopoverOpen,
    toggleActiveProject,
    toggleCollapsed,
  };
};

export { useSidebar };
