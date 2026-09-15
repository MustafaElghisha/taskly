"use client";

import MainHeader from "@/components/MainHeader";
import MainSidebar from "@/components/MainSidebar";
import MobileNavigation from "@/components/MobileNavigation";
import { UserData } from "@/lib/getUserData";
import { useState } from "react";

type MainLayoutProps = { children: React.ReactNode; user: UserData };

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

      <div className="flex grow flex-col">
        <MainHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          user={user}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>

        <MobileNavigation />
      </div>
    </div>
  );
}
