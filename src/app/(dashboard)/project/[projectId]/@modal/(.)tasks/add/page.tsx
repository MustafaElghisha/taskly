import { Modal } from "@/components/ui/Modal";
import { getAllEpics } from "@/features/epics/actions/getAllEpics";
import { getProjectMembers } from "@/features/members/actions/getProjectMembers";
import CreateTaskForm from "@/features/tasks/components/CreateTaskForm";

export default async function AddTaskModalPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const members = await getProjectMembers(projectId);
  const epics = await getAllEpics(projectId);

  return (
    <Modal className="max-w-4xl">
      <CreateTaskForm members={members} epics={epics} />
    </Modal>
  );
}
