import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProjectInputSchema } from "../schemas/createProjectSchema";
import { editProject } from "../actions/editProject";
import { useRouter } from "next/navigation";
import { Project } from "@/types";

const useEditProject = (project: Project) => {
  const {
    reset,
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    resetDefaultValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(createProjectInputSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  });

  const router = useRouter();

  const watchDescription = watch("description") as string;
  const onSubmit = handleSubmit(async (data) => {
    clearErrors();
    try {
      await editProject(data, project.id);
      resetDefaultValues({ description: "", name: "" });
      reset();
      router.replace("/project");
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Failed To Edit Project, Try Again Later.",
      });
    }
  });

  return { register, errors, onSubmit, isSubmitting, watchDescription };
};

export { useEditProject };
