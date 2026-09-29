import MainLayoutClient from "@/app/(dashboard)/_components/MainLayoutClient";
import { getUser } from "./_actions/getUser";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: MainLayoutProps) {
  const user = await getUser();

  return <MainLayoutClient user={user}>{children}</MainLayoutClient>;
}
