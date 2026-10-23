import { getUser } from "@/actions/getUser";
import MainLayoutClient from "@/components/layouts/dashboard/MainLayoutClient";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: MainLayoutProps) {
  const user = await getUser();

  return <MainLayoutClient user={user}>{children}</MainLayoutClient>;
}
