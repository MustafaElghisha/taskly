import { getEpic } from "@/features/epics/actions/getEpic";
import EpicForm from "@/features/epics/components/EpicForm";

export default async function EpicPage({
  params,
}: {
  params: Promise<{ projectId: string; epicId: string }>;
}) {
  const { epicId, projectId } = await params;
  const epic = await getEpic(projectId, epicId);

  return (
    <div className="md:p-8">
      <EpicForm epic={epic} />
    </div>
  );
}
