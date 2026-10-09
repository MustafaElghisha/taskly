import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createTask } from "../actions/createTask";
import { TaskStatus } from "../constants/tasks";
import { createTaskInputSchema } from "../schemas/createTaskSchema";

const useCreateTask = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const searchParams = useSearchParams();
  const status = (searchParams.get("status") ?? "TO_DO") as TaskStatus;
  const epic_id = searchParams.get("epic_id") ?? "";

  const router = useRouter();

  const {
    register,
    reset,
    setError,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(createTaskInputSchema),
    defaultValues: {
      status,
      epic_id,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    clearErrors();

    const res = await createTask(projectId, {
      ...data,
      ...(data.due_date && {
        due_date: `${new Date(data.due_date).toISOString().split(".")[0]}Z`,
      }),
    });

    if (!res.success) {
      setError("root", { message: res.message });
      return;
    }

    reset();
    toast.success(res.message);
    router.back();
  });

  return { register, errors, onSubmit, isSubmitting, router };
};

export { useCreateTask };
