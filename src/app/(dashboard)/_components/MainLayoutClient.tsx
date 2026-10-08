"use client";

import MobileNavigation from "@/app/(dashboard)/_components/MobileNavigation";
import { useState } from "react";
import MainSidebar from "./MainSidebar";
import MainHeader from "./MainHeader";
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

      <div className="flex min-w-0 grow flex-col">
        <MainHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          user={user}
        />
        <main className="min-w-0 flex-1 scrollbar-none overflow-y-auto">
          {children}
        </main>
        <MobileNavigation />
      </div>
    </div>
  );
}
