import { PROJECT_NAV_ITEMS } from "@/constants/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function ProjectMenu({ className }: { className?: string }) {
  const pathName = usePathname();
  const { projectId } = useParams();

  return (
    <ul className={cn("flex flex-col gap-1 p-2", className)}>
      {PROJECT_NAV_ITEMS.map(({ title, segment, Icon }) => {
        return (
          <li key={title}>
            <Link
              href={`/projects/${projectId}/${segment}`}
              className={cn(
                "flex items-center gap-3 rounded-full p-3 capitalize",
                pathName.includes(segment) && "bg-surface-low",
              )}
            >
              <Icon />
              <span className="text-sm leading-5 font-medium text-slate-800">
                {title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
