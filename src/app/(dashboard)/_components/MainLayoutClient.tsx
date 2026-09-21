"use client";

import MobileNavigation from "@/app/(dashboard)/_components/MobileNavigation";
import { useState } from "react";
import MainSidebar from "./MainSidebar";
import MainHeader from "./MainHeader";
import MainBreadCrumb from "./MainBreadCrumb";
import { User } from "@/types";

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

      <div className="flex grow flex-col">
        <MainHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          user={user}
        />

        <main className="flex-1 scrollbar-none overflow-y-auto">
          <MainBreadCrumb />
          {children}
        </main>

        <MobileNavigation />
      </div>
    </div>
  );
}
