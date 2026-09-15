import { cn } from "@/lib/utils";
import Link from "next/link";

import EpicsIcon from "@/assets/icons/EpicsIcon.svg";
import TasksIcon from "@/assets/icons/TasksIcon.svg";
import MembersIcon from "@/assets/icons/MembersIcon.svg";
import DetailsIcon from "@/assets/icons/DetailsIcon.svg";

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

export default function ProjectMenu({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-1 p-2", className)}>
      {PROJECT_ITEMS.map(({ title, url, Icon }) => (
        <li key={title}>
          <Link href={url} className="flex items-center gap-3 p-3">
            <Icon />
            <span className="text-sm leading-5 font-medium text-slate-800">
              {title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
