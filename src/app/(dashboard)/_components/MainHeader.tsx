import BurgerMenuIcon from "@/assets/icons/BurgerMenuIcon.svg";
import { Separator } from "@/components/ui/Separator";
import UserInfo from "./UserInfo";
import { User } from "@/types";
import MainBreadCrumb from "./MainBreadCrumb";

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
      <header className="flex w-full justify-between px-6 py-5 sm:flex-col sm:px-8 sm:py-3">
        <div className="flex items-center justify-start gap-4 sm:hidden">
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

        <div className="self-end">
          <UserInfo name={user.name} jobTitle={user.jobTitle} />
        </div>

        <Separator className="mt-3 mb-6 hidden sm:block" />

        <div className="hidden self-start sm:block">
          <MainBreadCrumb />
        </div>
      </header>

      <Separator className="block sm:hidden" />
    </>
  );
}
