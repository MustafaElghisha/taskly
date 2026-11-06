import { getProjectMembers } from "@/features/members/actions/getProjectMembers";
import CreateEpicForm from "@/features/epics/components/CreateEpicForm";

export default async function AddEpicPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const members = await getProjectMembers(projectId);

  return (
    <div className="flex min-h-full flex-col gap-6 p-4 md:gap-10 md:p-8">
      <div className="flex flex-col gap-1.5 md:gap-2">
        <h1 className="text-2xl leading-8 font-semibold tracking-tight text-slate-800 md:text-4xl md:leading-10 md:font-bold">
          Create New Epic
        </h1>
        <p className="leading-6 text-slate-600">
          Define a major project phase to group related tasks and track
          progress.
        </p>
      </div>
      <CreateEpicForm projectId={projectId} members={members} />
    </div>
  );
}
