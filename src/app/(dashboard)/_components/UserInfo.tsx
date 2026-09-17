import { User } from "@/types";

const getAvatarName = (name: string) => {
  const names = name.split(" ");
  return names.length > 1
    ? names[0][0] + names[names.length - 1][0]
    : names[0].slice(0, 2);
};

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
      <div className="bg-primary-container flex items-center justify-center rounded-xl p-2 sm:rounded-lg">
        <span className="leading-6 font-bold text-white uppercase">
          {getAvatarName(name)}
        </span>
      </div>
    </div>
  );
}
