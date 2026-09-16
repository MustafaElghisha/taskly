import CreateProjectForm from "@/features/project/components/CreateProjectForm";

export default function AddProjectPage() {
  return (
    <div className="px-6 py-8 sm:px-8 sm:py-6">
      <h1 className="hidden text-4xl leading-10 font-semibold tracking-tight text-slate-800 sm:block">
        Add New Project
      </h1>
      <CreateProjectForm />
    </div>
  );
}
