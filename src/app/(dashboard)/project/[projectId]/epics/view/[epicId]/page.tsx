import { getEpic } from "@/features/epics/actions/getEpic";
import { getEpicTasks } from "@/features/epics/actions/getEpicTasks";
import EditEpicForm from "@/features/epics/components/EditEpicForm";
import { getProjectMembers } from "@/features/members/actions/getProjectMembers";

export default async function EpicPage({
  params,
}: {
  params: Promise<{ projectId: string; epicId: string }>;
}) {
  const { epicId, projectId } = await params;
  const epic = await getEpic(projectId, epicId);
  const members = await getProjectMembers(projectId);
  const { tasks } = await getEpicTasks(epicId);

  return (
    <div className="md:p-8">
      <EditEpicForm epic={epic} members={members} tasks={tasks} />
    </div>
  );
}
