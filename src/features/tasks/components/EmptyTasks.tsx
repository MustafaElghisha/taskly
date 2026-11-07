import NoTasksIcon from "@/assets/icons/NoTasksIcon.svg";

export default function EmptyTasks() {
  return (
    <div className="bg-surface-low/30 flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-200/30 text-slate-300">
      <NoTasksIcon />
      <span className="text-2xs leading-4 font-bold tracking-widest uppercase">
        No Tasks
      </span>
    </div>
  );
}
