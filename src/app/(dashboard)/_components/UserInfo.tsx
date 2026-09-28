import { Avatar } from "@/components/ui/Avatar";
import { User } from "@/types";

export default function UserInfo({ name, jobTitle }: User) {
  return (
    <div className="flex gap-3.75">
      <div className="hidden flex-col items-end justify-center sm:flex">
        <span className="text-sm leading-5 font-semibold text-slate-800 capitalize">
          {name}
        </span>
        {jobTitle && (
          <span className="text-label-xs text-primary font-bold tracking-widest uppercase">
            {jobTitle}
          </span>
        )}
      </div>
      <Avatar name={name} />
    </div>
  );
}
