import { redirect } from "next/navigation";
import MainLayoutClient from "@/app/(dashboard)/_components/MainLayoutClient";
import { getUser } from "./_actions/getUser";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default async function MainLayout({ children }: MainLayoutProps) {
  let user;

  try {
    user = await getUser();
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHENTICATED") {
      redirect("/login");
    }

    throw error;
  }

  return <MainLayoutClient user={user}>{children}</MainLayoutClient>;
}
