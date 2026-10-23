import Logo from "@/components/Logo";
import AcceptInvitationForm from "@/features/members/components/AcceptInvitationForm";

export default function AcceptInvitationPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-12">
      <Logo className="text-2xl" />
      <AcceptInvitationForm />
    </div>
  );
}
