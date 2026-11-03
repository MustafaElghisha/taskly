import { Modal } from "@/components/ui/Modal";
import { getTask } from "@/features/tasks/actions/getTask";
import TaskDetails from "@/features/tasks/components/TaskDetails";

export default async function TaskModalPage({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) {
  const { projectId, taskId } = await params;
  const task = await getTask(projectId, taskId);

  return (
    <Modal className="max-w-4xl">
      <TaskDetails task={task} />
    </Modal>
  );
}
