"use client";

import { useEditProject } from "../hooks/useEditProject";
import { Project } from "@/types";
import ProjectForm from "./ProjectForm";

export default function EditProjectForm({ project }: { project: Project }) {
  return (
    <ProjectForm
      formTitle="Edit Project"
      submitLabel="Save Changes"
      submittingLabel="Saving..."
      {...useEditProject(project)}
    />
  );
}
