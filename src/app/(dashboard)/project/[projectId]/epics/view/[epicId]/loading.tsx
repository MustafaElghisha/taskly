import SkeletonEpicForm from "@/features/epics/components/SkeletonEpicForm";

export default function EpicLoading() {
  return (
    <div className="md:p-8">
      <SkeletonEpicForm />
    </div>
  );
}
