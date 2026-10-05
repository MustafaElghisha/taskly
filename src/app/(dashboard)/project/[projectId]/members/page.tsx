import { getProjectMembers } from "@/features/members/actions/getProjectMembers";
import InviteIcon from "@/assets/icons/InviteIcon.svg";
import Button from "@/components/ui/Button";
import UserPlusIcon from "@/assets/icons/UserPlusIcon.svg";
import MembersTable from "@/features/members/components/MembersTable";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const members = await getProjectMembers(projectId);

  return (
    <div className="px-4 py-4 md:px-8">
      <div className="flex flex-wrap items-end justify-center gap-x-20 gap-y-4 md:mb-20 md:justify-between">
        <h1 className="text-heading-lg leading-10 font-semibold tracking-tight text-slate-800 md:text-4xl">
          Project Members
        </h1>
        <Button className="primary-button-shadow hidden gap-2 rounded-xs px-6 text-sm leading-5 font-bold md:flex">
          <InviteIcon />
          Invite Member
        </Button>
      </div>

      <div className="mx-auto w-fit">
        <MembersTable members={members} />
      </div>

      <Button
        variant={"primary"}
        className="fixed right-4 bottom-22 size-10 rounded-xl p-1! md:hidden"
      >
        <UserPlusIcon />
      </Button>
    </div>
  );
}
