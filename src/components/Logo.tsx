import LogoIcon from "../../public/icons/LogoIcon.svg";
export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon />
      <span className="text-xl leading-7 font-bold tracking-tight text-slate-800">
        TASKLY
      </span>
    </div>
  );
}
