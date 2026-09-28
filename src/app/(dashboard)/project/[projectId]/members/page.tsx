import { getProjectMembers } from "@/app/(dashboard)/_actions/getProjectMembers";
import InviteIcon from "@/assets/icons/InviteIcon.svg";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const members = await getProjectMembers(projectId);
  console.log(members);

  return (
    <div className="px-4 py-4 sm:px-8">
      <div className="flex flex-wrap items-end justify-center gap-x-20 gap-y-4 sm:mb-20 sm:justify-between">
        <h1 className="text-heading-lg leading-10 font-semibold tracking-tight text-slate-800 sm:text-4xl">
          Project Members
        </h1>
        <Button className="primary-button-shadow hidden gap-2 rounded-xs px-6 text-sm leading-5 font-bold sm:flex">
          <InviteIcon />
          Invite Member
        </Button>
      </div>
      <div className="mx-auto w-fit">
        <Table>
          <colgroup>
            <col className="w-2/3" />
            <col className="w-1/3" />
          </colgroup>
          <TableHeader>
            <TableRow>
              <TableHead>MEMBER</TableHead>
              <TableHead>ROLE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map(({ email, role, metadata }) => (
              <TableRow key={email}>
                <TableCell className="rounded-l-2xl">
                  <div className="flex gap-4">
                    <Avatar
                      name={metadata.name}
                      size={"lg"}
                      variant={"secondary"}
                      className="shrink-0"
                    />
                    <div className="flex flex-col justify-center truncate">
                      <span className="text-sm leading-5 font-semibold text-slate-800 capitalize">
                        {metadata.name}
                      </span>
                      <span className="text-xs leading-4 text-slate-600">
                        {email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="rounded-r-2xl">
                  <Badge variant={role}>{role}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
