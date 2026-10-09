import { Modal } from "@/components/ui/Modal";
import SkeletonEpicForm from "@/features/epics/components/SkeletonEpicForm";

export default function ModalEpicLoading() {
  return (
    <Modal className="max-w-2xl">
      <SkeletonEpicForm />
    </Modal>
  );
}
