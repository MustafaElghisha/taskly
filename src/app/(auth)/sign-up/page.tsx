import SignUpForm from "@/features/auth/components/SignUpForm";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <div className="px-6 py-8 md:pt-4 md:pb-12">
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
