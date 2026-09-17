import PlusIcon from "@/assets/icons/PlusIcon.svg";
import Link from "next/link";

export default function AddProjectCard() {
  return (
    <li>
      <Link
        href="/project/add"
        className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-17"
      >
        <div className="bg-surface-low flex items-center justify-center rounded-xl p-3.5">
          <PlusIcon />
        </div>
        <span className="text-sm leading-5 font-bold tracking-widest text-slate-600">
          ADD PROJECT
        </span>
      </Link>
    </li>
  );
}
