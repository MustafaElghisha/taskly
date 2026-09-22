import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ACTIVE_PROJECT_ROUTES } from "../_constants/routes";

export default function ProjectMenu({ className }: { className?: string }) {
  const pathName = usePathname();
  const { projectId } = useParams();

  return (
    <ul className={cn("flex flex-col gap-1 p-2", className)}>
      {ACTIVE_PROJECT_ROUTES.map(({ title, segment, Icon }) => {
        if (segment === "project") return null;
        return (
          <li key={title}>
            <Link
              href={`/project/${projectId}/${segment}`}
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
