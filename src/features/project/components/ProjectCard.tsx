import EpicsIcon from "@/assets/icons/EpicsIcon.svg";
import TasksIcon from "@/assets/icons/TasksIcon.svg";
import MembersIcon from "@/assets/icons/MembersIcon.svg";
import { Project } from "@/types";
import Link from "next/link";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const PROJECT_NAV_ITEMS = [
  { label: "Epics", Icon: EpicsIcon },
  { label: "Tasks", Icon: TasksIcon },
  { label: "Members", Icon: MembersIcon },
];

export default function ProjectCard({
  id,
  name,
  description,
  created_at,
}: Project) {
  return (
    <li>
      <Link
        href={`/project/${id}/epics`}
        className="flex h-full flex-col gap-8.5 rounded-lg bg-white p-6"
      >
        <div className="flex flex-1 flex-col justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg leading-7 font-medium text-slate-800">
              {name}
            </h2>
            <p className="line-clamp-3 text-sm leading-5.5 hyphens-auto text-slate-600">
              {description}
            </p>
          </div>
          <ul className="flex items-center justify-between">
            {PROJECT_NAV_ITEMS.map(({ label, Icon }) => (
              <li key={label} className="text-primary flex gap-0.5">
                <Icon />
                <span className="text-3xs leading-4 font-semibold">
                  {label}
                </span>
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
      </Link>
    </li>
  );
}
