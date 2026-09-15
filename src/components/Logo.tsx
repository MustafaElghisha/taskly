import LogoIcon from "@/assets/icons/LogoIcon.svg";
import { cn } from "@/lib/utils";

type LogoProps = { isCollapsed?: boolean; className?: string };

export default function Logo({ isCollapsed, className }: LogoProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        isCollapsed && "p-2.25",
        className,
      )}
    >
      <LogoIcon />
      {!isCollapsed && (
        <span className="text-xl leading-7 font-bold tracking-tight text-slate-800">
          TASKLY
        </span>
      )}
    </div>
  );
}
