import { getProject } from "@/features/projects/actions/getProject";
import EditProjectForm from "@/features/projects/components/EditProjectForm";

export default async function EditPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  return (
    <div className="flex min-h-full flex-col gap-6 p-4 md:gap-10 md:p-8">
      <h1 className="hidden text-4xl leading-10 font-semibold tracking-tight text-slate-800 md:block">
        Edit Project
      </h1>
      <EditProjectForm project={project} />
    </div>
  );
}
