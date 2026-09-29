import { getProjectMembers } from "@/app/(dashboard)/_actions/getProjectMembers";
import CreateEpicForm from "@/features/epics/components/CreateEpicForm";

export default async function AddEpicPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const members = await getProjectMembers(projectId);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-8 sm:gap-8">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <h1 className="text-2xl leading-8 font-semibold tracking-tight text-slate-800 sm:text-4xl sm:leading-10 sm:font-bold">
          Create New Epic
        </h1>
        <p className="max-w-lg leading-6 text-slate-600">
          Define a major project phase or high-level milestone to group related
          tasks and track architectural progress.
        </p>
      </div>
      <CreateEpicForm projectId={projectId} members={members} />
    </div>
  );
}
