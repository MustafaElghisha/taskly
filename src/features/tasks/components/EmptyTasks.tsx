import NoTasksIcon from "@/assets/icons/NoTasksIcon.svg";

export default function EmptyTasks() {
  return (
    <div className="bg-surface-low/30 flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-200/30">
      <NoTasksIcon />
      <span className="text-2xs leading-4 font-bold tracking-widest text-slate-300 uppercase">
        No Tasks
      </span>
    </div>
  );
}
