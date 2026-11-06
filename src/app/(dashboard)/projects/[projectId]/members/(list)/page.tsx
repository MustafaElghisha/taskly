import { getProjectMembers } from "@/features/members/actions/getProjectMembers";
import InviteIcon from "@/assets/icons/InviteIcon.svg";
import { buttonVariants } from "@/components/ui/Button";
import UserPlusIcon from "@/assets/icons/UserPlusIcon.svg";
import MembersTable from "@/features/members/components/MembersTable";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const members = await getProjectMembers(projectId);

  return (
    <div className="flex min-h-full flex-col gap-2 p-4 md:gap-10 md:p-8">
      <div className="flex flex-wrap items-end justify-center gap-x-20 gap-y-4 md:justify-between">
        <h1 className="text-heading-lg leading-10 font-semibold tracking-tight text-slate-800 md:text-4xl">
          Project Members
        </h1>
        <Link
          href={`/projects/${projectId}/members/invite`}

          className={cn(
            buttonVariants({ variant: "primary" }),
            "primary-button-shadow hidden gap-2 rounded-xs px-6 md:flex",
          )}
        >
          <InviteIcon />
          <span className="text-sm leading-5 font-bold">Invite Member</span>
        </Link>
      </div>

      <div className="mx-auto w-fit md:my-10">
        <MembersTable members={members} />
      </div>

      <Link
        href={`/projects/${projectId}/members/invite`}
        className="bg-primary-gradient fixed right-4 bottom-20.5 flex size-12 items-center justify-center rounded-lg text-white md:hidden"
      >
        <UserPlusIcon className="scale-110" />
      </Link>
    </div>
  );
}
