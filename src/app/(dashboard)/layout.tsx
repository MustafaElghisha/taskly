import { redirect } from "next/navigation";
import MainLayoutClient from "@/app/(dashboard)/_components/MainLayoutClient";
import { getUserData } from "@/lib/getUserData";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: MainLayoutProps) {
  let user;

  try {
    user = await getUserData();
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHENTICATED") {
      redirect("/login");
    }

    throw error;
  }

  return <MainLayoutClient user={user}>{children}</MainLayoutClient>;
}
