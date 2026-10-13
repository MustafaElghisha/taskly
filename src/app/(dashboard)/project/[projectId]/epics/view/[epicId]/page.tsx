import { getEpic } from "@/features/epics/actions/getEpic";
import EpicForm from "@/features/epics/components/EpicForm";
import { getProjectMembers } from "@/features/members/actions/getProjectMembers";

export default async function EpicPage({
  params,
}: {
  params: Promise<{ projectId: string; epicId: string }>;
}) {
  const { epicId, projectId } = await params;
  const epic = await getEpic(projectId, epicId);
  const members = await getProjectMembers(projectId);

  return (
    <div className="md:p-8">
      <EpicForm epic={epic} members={members} />
    </div>
  );
}
