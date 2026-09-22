import EpicsIcon from "@/assets/icons/EpicsIcon.svg";
import TasksIcon from "@/assets/icons/TasksIcon.svg";
import MembersIcon from "@/assets/icons/MembersIcon.svg";
import EditIcon from "@/assets/icons/EditIcon.svg";
import { Project } from "@/types";
import Link from "next/link";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const PROJECT_NAV_ITEMS = [
  {
    title: "epics",
    segment: "epics",
    Icon: EpicsIcon,
  },
  {
    title: "tasks",
    segment: "tasks",
    Icon: TasksIcon,
  },
  {
    title: "members",
    segment: "members",
    Icon: MembersIcon,
  },
  {
    title: "edit",
    segment: "edit",
    Icon: EditIcon,
  },
];

export default function ProjectCard({
  id,
  name,
  description,
  created_at,
}: Project) {
  return (
    <li className="flex h-full flex-col justify-between gap-8.5 rounded-lg bg-white p-6">
      <div className="flex flex-1 flex-col justify-between gap-6">
        <div className="flex flex-1 flex-col justify-between gap-2">
          <h2 className="line-clamp-2 text-lg leading-7 font-medium text-slate-800">
            {name}
          </h2>
          <p className="line-clamp-3 text-sm leading-5.5 hyphens-auto text-slate-600">
            {description}
          </p>
        </div>
        <ul className="flex flex-wrap items-center justify-between gap-1">
          {PROJECT_NAV_ITEMS.map(({ title, Icon }) => (
            <li key={title}>
              <Link
                href={`/project/${id}/${title}`}
                className="text-primary flex items-center gap-0.5 capitalize"
              >
                <Icon />
                <span className="text-3xs leading-4 font-semibold">
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xs leading-4 font-bold tracking-tighter text-slate-400">
          CREATED AT
        </span>
        <time className="text-sm leading-5 font-medium text-slate-600">
          {formatDate(created_at)}
        </time>
      </div>
    </li>
  );
}
