import BurgerMenuIcon from "@/assets/icons/BurgerMenuIcon.svg";
import { Separator } from "@/components/ui/Separator";

import { UserData } from "@/lib/getUserData";
import UserInfo from "./UserInfo";

type MainHeaderProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  user: UserData;
};

export default function MainHeader({
  toggleSidebar,
  isSidebarOpen,
  user,
}: MainHeaderProps) {
  return (
    <div>
      <header className="ml-auto flex w-full items-center justify-between px-6 py-5 sm:justify-end sm:px-8 sm:py-3">
        <div className="flex items-center gap-4 sm:hidden">
          <button
            type="button"
            aria-label="Main Navigation Menu"
            aria-expanded={isSidebarOpen}
            aria-controls="main-navigation"
            className="cursor-pointer"
            onClick={toggleSidebar}
          >
            <BurgerMenuIcon aria-hidden="true" />
          </button>
          <span className="text-xl leading-7 font-bold tracking-tight text-slate-800">
            TASKLY
          </span>
        </div>
        <UserInfo name={user.name} jobTitle={user.jobTitle} />
      </header>
      <Separator />
    </div>
  );
}
