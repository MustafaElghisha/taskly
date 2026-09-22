import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import ProjectsIcon from "@/assets/icons/ProjectsIcon.svg";
import { ACTIVE_PROJECT_ROUTES } from "../_constants/routes";

export default function MobileNavigation() {
  const pathname = usePathname();
  const { projectId } = useParams();

  const activeProjectRoute = pathname.split("/")[3];

  return (
    <div className="bg-surface-low block sm:hidden">
      <nav className="px-7 py-3.75">
        {!activeProjectRoute ? (
          <ul className="flex items-center justify-center">
            <li>
              <Link
                href={"/project"}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 capitalize",
                  pathname.endsWith("/project")
                    ? "text-primary font-semibold"
                    : "text-slate-800",
                )}
              >
                <ProjectsIcon />
                <span className="text-3xs leading-4">projects</span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center justify-between gap-6">
            {ACTIVE_PROJECT_ROUTES.map(({ title, segment, Icon }) => (
              <li key={title} className="flex-1">
                <Link
                  href={
                    title === "projects"
                      ? `/${segment}`
                      : `/project/${projectId}/${segment}`
                  }
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 capitalize",
                    activeProjectRoute === segment
                      ? "text-primary font-semibold"
                      : "text-slate-800",
                  )}
                >
                  <Icon />
                  <span className="text-3xs leading-4">{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  );
}
