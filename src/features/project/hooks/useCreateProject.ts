import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProject } from "../actions/createProject";
import { createProjectInputSchema } from "../schemas/createProjectSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCreateProject = () => {
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createProjectInputSchema),
    mode: "onTouched",
  });

  const watchDescription = watch("description") ?? "";

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    clearErrors();

    const res = await createProject(data);

    if (!res.success) {
      setError("root", { message: res.message });
      return;
    }

    toast.success(res.message);

    router.push("/project");
  });

  return { register, errors, isSubmitting, onSubmit, watchDescription };
};

export { useCreateProject };
