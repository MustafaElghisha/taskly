export default function UserInfo() {
  return (
    <div className="flex gap-3.75">
      <div className="hidden flex-col items-end sm:flex">
        <span className="text-sm leading-5 font-semibold text-slate-800">
          Mahmoud Taha
        </span>
        <span className="text-label-xs text-primary font-bold tracking-widest uppercase">
          Project Manager
        </span>
      </div>
      <div className="bg-primary-container flex items-center justify-center rounded-xl p-2 sm:rounded-lg">
        <span className="leading-6 font-bold text-white uppercase">mt</span>
      </div>
    </div>
  );
}
