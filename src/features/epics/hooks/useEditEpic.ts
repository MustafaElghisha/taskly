import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Epic } from "@/schemas/epicSchema";
import { editEpic } from "../actions/editEpic";
import { editEpicInput, editEpicInputSchema } from "../schemas/editEpicSchema";

const useEditEpic = (epic: Epic) => {
  const {
    reset,
    register,
    clearErrors,
    resetDefaultValues,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(editEpicInputSchema),
    defaultValues: {
      title: epic.title,
      description: epic.description || null,
      assignee_id: epic.assignee.sub || null,
      deadline: epic.deadline || null,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    clearErrors();

    const obj = Object.entries(dirtyFields).reduce((acc, [key]) => {
      const typedKey = key as keyof editEpicInput;
      if (typedKey === "title") acc[typedKey] = data[typedKey];
      else acc[typedKey] = data[typedKey] ?? null;
      return acc;
    }, {} as Partial<editEpicInput>);

    const res = await editEpic(obj, epic.id, epic.project_id);

    if (!res.success) {
      reset();
      toast.error(res.message);
      return;
    }

    resetDefaultValues({
      title: data.title,
      description: data.description,
    });
    reset();
    toast.success(res.message);
  });

  return { register, onSubmit, errors, reset, dirtyFields, clearErrors };
};

export { useEditEpic };
