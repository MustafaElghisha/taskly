import { Modal } from "@/components/ui/Modal";
import InviteMemberForm from "@/features/members/components/InviteMemberForm";

export default function InviteMemberModalPage() {
  return (
    <Modal className="max-w-md">
      <InviteMemberForm />
    </Modal>
  );
}
