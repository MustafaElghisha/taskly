import { Modal } from "@/components/ui/Modal";
import EditEpicFormSkeleton from "@/features/epics/components/EditEpicFormSkeleton";

export default function ModalEpicLoading() {
  return (
    <Modal className="max-w-2xl">
      <EditEpicFormSkeleton />
    </Modal>
  );
}
