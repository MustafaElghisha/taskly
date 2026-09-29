import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CreateEpicInput,
  createEpicInputSchema,
} from "../schemas/createEpicSchema";
import { createEpic } from "../actions/createEpic";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCreateEpic = (projectId: string) => {
  const {
    register,
    setError,
    clearErrors,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateEpicInput>({
    mode: "onTouched",
    resolver: zodResolver(createEpicInputSchema),
  });

  const watchDescription = watch("description") ?? "";

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    clearErrors();

    const res = await createEpic({ ...data, project_id: projectId });

    if (!res.success) {
      setError("root", { message: res.message });
      return;
    }

    toast.success(res.message);

    router.push(`/project/${projectId}/epics`);
  });

  return { register, isSubmitting, errors, watchDescription, onSubmit };
};

export { useCreateEpic };
