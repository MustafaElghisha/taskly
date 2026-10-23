"use client";

import { useState } from "react";
import MainSidebar from "./MainSidebar";
import MainHeader from "./MainHeader";
import { User } from "@/schemas/userSchema";
import MobileNavigation from "./MobileNavigation";

type MainLayoutProps = { children: React.ReactNode; user: User };

export default function MainLayoutClient({ children, user }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-dvh">
      <MainSidebar
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex min-w-0 grow flex-col overflow-clip">
        <MainHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          user={user}
        />
        <main className="h-full min-h-0 overflow-auto">{children}</main>
        <MobileNavigation />
      </div>
    </div>
  );
}
