import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/Separator";
import CheckedIcon from "@/assets/icons/CheckedIcon.svg";
import UnCheckedIcon from "@/assets/icons/UnCheckedIcon.svg";

type SecurityRequirementsProps = { watchPassword: string };

export default function SecurityRequirements({
  watchPassword,
}: SecurityRequirementsProps) {
  const securityRequirements = [
    {
      satisfied:
        watchPassword.trim().length >= 8 && watchPassword.trim().length <= 64,
      label: "8 - 64 characters",
    },
    {
      satisfied: /[a-z]/.test(watchPassword),
      label: "Lowercase letter",
    },
    {
      satisfied: /[A-Z]/.test(watchPassword),
      label: "Uppercase letter",
    },
    { satisfied: /[0-9]/.test(watchPassword), label: "At least one digit" },
    {
      satisfied: /[!@#$%^&*]/.test(watchPassword),
      label: "Special character (e.g. !@#$)",
    },
  ];
  return (
    <div className="bg-surface-low flex flex-col gap-4 rounded-sm p-5">
      <h2 className="text-2xs leading-4 font-bold text-slate-500 uppercase">
        Security Requirements
      </h2>
      <Separator className="hidden sm:-mt-2 sm:block" />
      <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
        {securityRequirements.map(({ label, satisfied }, index) => (
          <li
            key={label}
            className={cn(
              "flex items-center gap-2",
              satisfied ? "" : "opacity-50",
              index === securityRequirements.length - 1 && "sm:col-span-2",
            )}
          >
            {satisfied ? <CheckedIcon /> : <UnCheckedIcon />}
            <span className="text-sm leading-5 text-slate-800">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
