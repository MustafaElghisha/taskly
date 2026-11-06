import AuthHeader from "@/components/layouts/auth/AuthHeader";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <AuthHeader />
      <main className="min-h-full px-4 py-8 md:px-8 md:py-16">{children}</main>
    </>
  );
}
