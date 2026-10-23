import EpicsIcon from "@/assets/icons/EpicsIcon.svg";
import TasksIcon from "@/assets/icons/TasksIcon.svg";
import ProjectsIcon from "@/assets/icons/ProjectsIcon.svg";
import MembersIcon from "@/assets/icons/MembersIcon.svg";
import DetailsIcon from "@/assets/icons/DetailsIcon.svg";
import StatisticsIcon from "@/assets/icons/StatisticsIcon.svg";

export const ACTIVE_PROJECT_ROUTES = [
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
    title: "projects",
    segment: "project",
    Icon: ProjectsIcon,
  },
  {
    title: "members",
    segment: "members",
    Icon: MembersIcon,
  },
  {
    title: "details",
    segment: "edit",
    Icon: DetailsIcon,
  },
] as const;

export const NAV_ITEMS = [
  {
    title: "projects",
    segment: "project",
    Icon: ProjectsIcon,
  },
  {
    title: "my statistics",
    segment: "statistics",
    Icon: StatisticsIcon,
  },
];
