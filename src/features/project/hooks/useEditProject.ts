import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProjectInputSchema } from "../schemas/createProjectSchema";
import { editProject } from "../actions/editProject";
import { Project } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useEditProject = (project: Project) => {
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
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

  const watchDescription = watch("description") ?? "";

  const onSubmit = handleSubmit(async (data) => {
    clearErrors();

    const res = await editProject(data, project.id);

    if (!res.success) {
      setError("root", { message: res.message });
      return;
    }

    toast.success(res.message);

    router.push("/project");
  });

  return { register, errors, onSubmit, isSubmitting, watchDescription };
};

export { useEditProject };
