import Logo from "@/components/Logo";
import AcceptInvitationForm from "@/features/members/components/AcceptInvitationForm";
import { Suspense } from "react";

export default function AcceptInvitationPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-12">
      <Suspense fallback={null}>
        <Logo className="text-2xl" />
        <AcceptInvitationForm />
      </Suspense>
    </div>
  );
}
