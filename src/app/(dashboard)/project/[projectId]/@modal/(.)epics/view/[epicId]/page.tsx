import { Modal } from "@/components/ui/Modal";
import { getEpic } from "@/features/epics/actions/getEpic";
import { getEpicTasks } from "@/features/epics/actions/getEpicTasks";
import EpicForm from "@/features/epics/components/EpicForm";
import { getProjectMembers } from "@/features/members/actions/getProjectMembers";

export default async function page({
  params,
}: {
  params: Promise<{ projectId: string; epicId: string }>;
}) {
  const { epicId, projectId } = await params;
  const epic = await getEpic(projectId, epicId);
  const { tasks } = await getEpicTasks(epicId);
  const members = await getProjectMembers(projectId);

  return (
    <Modal className="max-w-2xl">
      <EpicForm epic={epic} members={members} tasks={tasks} />
    </Modal>
  );
}
