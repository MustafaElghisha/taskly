import AuthHeader from "@/app/(auth)/_components/AuthHeader";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
    </>
  );
}
