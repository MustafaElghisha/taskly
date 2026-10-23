import LoginForm from "@/features/auth/components/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="px-6 py-4 md:py-36.75">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
