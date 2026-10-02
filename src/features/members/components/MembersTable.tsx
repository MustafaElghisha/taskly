import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Member } from "../schemas/getProjectMembersSchema";

export default function MembersTable({ members }: { members: Member[] }) {
  return (
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
  );
}
