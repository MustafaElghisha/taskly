import { getEpics } from "@/features/epics/actions/getEpics";
import { getProjectMembers } from "@/features/members/actions/getProjectMembers";
import CreateTaskForm from "@/features/tasks/components/CreateTaskForm";

export default async function AddTaskPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const members = await getProjectMembers(projectId);
  const { epics } = await getEpics(projectId, 1);

  return (
    <div className="md:m-8">
      <CreateTaskForm members={members} epics={epics} />
    </div>
  );
}
