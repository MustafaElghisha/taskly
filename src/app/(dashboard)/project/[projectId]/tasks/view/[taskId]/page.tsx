import { getTask } from "@/features/tasks/actions/getTask";
import TaskDetails from "@/features/tasks/components/TaskDetails";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) {
  const { projectId, taskId } = await params;
  const task = await getTask(projectId, taskId);

  return (
    <div className="md:p-8">
      <TaskDetails task={task} />
    </div>
  );
}
