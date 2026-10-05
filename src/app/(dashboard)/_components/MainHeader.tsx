import { Avatar } from "@/components/ui/Avatar";
import { Separator } from "@/components/ui/Separator";
import MainBreadCrumb from "./MainBreadCrumb";
import BurgerMenuIcon from "@/assets/icons/BurgerMenuIcon.svg";
import { User } from "@/types";

type MainHeaderProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  user: User;
};

export default function MainHeader({
  toggleSidebar,
  isSidebarOpen,
  user,
}: MainHeaderProps) {
  return (
    <>
      <header className="flex w-full justify-between px-6 py-5 md:flex-col md:px-8 md:py-3">
        <div className="flex items-center justify-start gap-4 md:hidden">
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

        <div className="flex gap-3.75 self-end">
          <div className="hidden flex-col items-end justify-center md:flex">
            <span className="text-sm leading-5 font-semibold text-slate-800 capitalize">
              {user.name}
            </span>
            {user.jobTitle && (
              <span className="text-3xs text-primary font-bold tracking-widest uppercase">
                {user.jobTitle}
              </span>
            )}
          </div>
          <Avatar name={user.name} />
        </div>

        <Separator className="mt-3 mb-6 hidden md:block" />

        <div className="hidden self-start md:block">
          <MainBreadCrumb />
        </div>
      </header>

      <Separator className="block md:hidden" />
    </>
  );
}
