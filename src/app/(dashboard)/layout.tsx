import MainLayoutClient from "@/components/MainLayoutClient";
import { getUserData } from "@/lib/getUserData";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: MainLayoutProps) {
  const user = await getUserData();

  return <MainLayoutClient user={user}>{children}</MainLayoutClient>;
}
