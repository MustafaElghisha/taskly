import CheckedIcon from "@/assets/icons/CheckedIcon.svg";
import UnCheckedIcon from "@/assets/icons/UnCheckedIcon.svg";

type PasswordRequirementsProps = {
  watchPassword: string;
};

export default function PasswordRequirements({
  watchPassword,
}: PasswordRequirementsProps) {
  const passwordRequirements = [
    {
      satisfied: watchPassword?.trim().length >= 8,
      label: "At least 8 characters",
    },
    {
      satisfied: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(watchPassword),
      label: "One uppercase, lowercase, and digit",
    },
    {
      satisfied: /[!@#%^&*]/.test(watchPassword),
      label: "One special character",
    },
  ];

  return (
    <div className="bg-blue-150 hidden rounded-lg p-4 sm:block">
      <ul className="flex flex-col gap-2">
        {passwordRequirements.map(({ satisfied, label }) => (
          <li key={label} className="flex items-center gap-2">
            {satisfied ? <CheckedIcon /> : <UnCheckedIcon />}
            <span className="text-label-sm leading-4.25 text-slate-600">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
