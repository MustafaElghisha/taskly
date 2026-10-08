import CirclePlusIcon from "@/assets/icons/CirclePlusIcon.svg";
import Link from "next/link";

export default function CreateProjectCard() {
  return (
    <Link
      href="/project/add"
      className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-17"
    >
      <div className="bg-surface-low flex items-center justify-center rounded-xl p-3.5">
        <CirclePlusIcon className="text-slate-800" />
      </div>
      <span className="text-sm leading-5 font-bold tracking-widest text-slate-600">
        ADD PROJECT
      </span>
    </Link>
  );
}
