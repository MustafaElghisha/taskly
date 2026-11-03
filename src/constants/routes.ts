import EpicsIcon from "@/assets/icons/EpicsIcon.svg";
import TasksIcon from "@/assets/icons/TasksIcon.svg";
import ProjectsIcon from "@/assets/icons/ProjectsIcon.svg";
import MembersIcon from "@/assets/icons/MembersIcon.svg";
import StatisticsIcon from "@/assets/icons/StatisticsIcon.svg";
import EditIcon from "@/assets/icons/EditIcon.svg";

export const MOBILE_NAV_ITEMS = [
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
    segment: "projects",
    Icon: ProjectsIcon,
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
] as const;

export const PROJECT_NAV_ITEMS = [
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
] as const;

export const NAV_ITEMS = [
  {
    title: "projects",
    segment: "projects",
    Icon: ProjectsIcon,
  },
  {
    title: "statistics",
    segment: "statistics",
    Icon: StatisticsIcon,
  },
] as const;
