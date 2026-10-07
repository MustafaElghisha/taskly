import { Modal } from "@/components/ui/Modal";
import { getEpic } from "@/features/epics/actions/getEpic";
import EpicForm from "@/features/epics/components/EpicForm";

export default async function page({
  params,
}: {
  params: Promise<{ projectId: string; epicId: string }>;
}) {
  const { epicId, projectId } = await params;
  const epic = await getEpic(projectId, epicId);

  return (
    <Modal>
      <EpicForm epic={epic} />
    </Modal>
  );
}
