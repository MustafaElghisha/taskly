"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProject } from "../actions/createProject";
import { createProjectInputSchema } from "../schemas/createProjectSchema";

const useCreateProject = () => {
  const {
    reset,
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createProjectInputSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const watchDescription = watch("description") as string;

  const onSubmit = handleSubmit(async (data) => {
    clearErrors();
    try {
      await createProject(data);
      reset();
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Failed To Add New Project, Try Again Later.",
      });
    }
  });

  return { register, errors, isSubmitting, onSubmit, watchDescription };
};

export { useCreateProject };
