import { Modal } from "@/components/ui/Modal";
import EpicFormSkeleton from "@/features/epics/components/EpicFormSkeleton";

export default function ModalEpicLoading() {
  return (
    <Modal className="max-w-2xl">
      <EpicFormSkeleton />
    </Modal>
  );
}
