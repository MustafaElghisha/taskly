"use client";

import { useCreateProject } from "../hooks/useCreateProject";
import ProjectForm from "./ProjectForm";

export default function CreateProjectForm() {
  return (
    <ProjectForm
      formTitle="Initialize New Project"
      submitLabel="Create Project"
      submittingLabel="Creating..."
      {...useCreateProject()}
    />
  );
}
