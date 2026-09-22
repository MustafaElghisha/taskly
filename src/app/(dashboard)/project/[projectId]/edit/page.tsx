import { getProject } from "@/features/project/actions/getProject";
import EditProjectForm from "@/features/project/components/EditProjectForm";

export default async function EditPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  return (
    <div className="px-6 py-8 sm:px-8 sm:pt-4 sm:pb-6">
      <h1 className="hidden text-4xl leading-10 font-semibold tracking-tight text-slate-800 sm:block">
        Edit Project
      </h1>
      <EditProjectForm project={project} />
    </div>
  );
}
