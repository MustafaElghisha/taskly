"use client";

import MobileNavigation from "@/app/(dashboard)/_components/MobileNavigation";
import { UserData } from "@/lib/getUserData";
import { useState } from "react";
import MainSidebar from "./MainSidebar";
import MainHeader from "./MainHeader";

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
