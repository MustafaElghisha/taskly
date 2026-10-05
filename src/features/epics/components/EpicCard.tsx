import { Avatar } from "@/components/ui/Avatar";
import { Separator } from "@/components/ui/Separator";
import { formatDate } from "@/lib/utils";
import AuthorIcon from "@/assets/icons/AuthorIcon.svg";
import CalendarIcon from "@/assets/icons/CalendarIcon.svg";
import { Epic } from "../schemas/getEpicsSchema";

export default function EpicCard({
  title,
  epic_id,
  deadline,
  assignee,
  created_by,
}: Epic) {
  return (
    <div className="shadow-card relative flex h-full flex-col justify-between overflow-clip rounded-lg bg-white p-4">
      <div className="bg-primary absolute top-0 bottom-0 left-0 w-1" />

      <div className="bg-blue-150 text-primary text-3xs mb-4 w-fit rounded-xs px-2.5 py-1 font-bold tracking-wider">
        {epic_id}
      </div>

      <h2 className="flex-1 leading-7 font-semibold text-slate-800 md:text-xl">
        {title}
      </h2>

      <div className="mt-4 mb-6 flex items-center gap-3">
        <Avatar
          name={assignee.name ? assignee.name : "Unassigned"}
          variant={"tertiary"}
          size={"sm"}
        />
        <div className="flex flex-col">
          <span className="text-3xs leading-4 font-medium text-slate-600 md:text-xs">
            Assignee
          </span>
          <span className="text-xs leading-5 font-semibold text-slate-800 md:text-sm">
            {assignee.name ? assignee.name : "Unassigned"}
          </span>
        </div>
      </div>

      <Separator className="mb-4" />
      <div className="text-2xs flex flex-wrap items-center justify-between gap-4 text-slate-600/80">
        <div className="flex items-center gap-2">
          <AuthorIcon />
          Created by:
          <span className="-ml-1 text-slate-800">{created_by.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarIcon />
          <span>{deadline ? formatDate(deadline) : "No deadline"}</span>
        </div>
      </div>
    </div>
  );
}
