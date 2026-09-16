import { cn } from "@/lib/utils";
import Link from "next/link";

import EpicsIcon from "@/assets/icons/EpicsIcon.svg";
import TasksIcon from "@/assets/icons/TasksIcon.svg";
import MembersIcon from "@/assets/icons/MembersIcon.svg";
import DetailsIcon from "@/assets/icons/DetailsIcon.svg";
import ProjectsIcon from "@/assets/icons/ProjectsIcon.svg";
import { usePathname } from "next/navigation";

const PROJECT_ITEMS = [
  {
    title: "Epics",
    url: "/",
    Icon: EpicsIcon,
  },
  {
    title: "Tasks",
    url: "/",
    Icon: TasksIcon,
  },
  {
    title: "Projects",
    url: "/project",
    Icon: ProjectsIcon,
  },
  {
    title: "Members",
    url: "/",
    Icon: MembersIcon,
  },
  {
    title: "Details",
    url: "/",
    Icon: DetailsIcon,
  },
];

export default function MobileNavigation() {
  const pathName = usePathname();
  return (
    <div className="bg-surface-low block sm:hidden">
      <nav className="px-7 py-3.75">
        <ul className="flex items-center justify-between">
          {PROJECT_ITEMS.map(({ title, url, Icon }) => (
            <li key={title}>
              <Link
                href={url}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5",
                  pathName === url
                    ? "text-primary font-semibold"
                    : "text-slate-800",
                )}
              >
                <Icon />
                <span className="text-label-xs leading-4">{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
