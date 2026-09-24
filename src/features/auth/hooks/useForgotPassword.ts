"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordInput,
  forgotPasswordInputSchema,
} from "../schemas/forgotPasswordSchema";
import { forgotPassword } from "../actions/forgotPassword";

const useForgotPassword = () => {
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    mode: "onTouched",
    resolver: zodResolver(forgotPasswordInputSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      clearErrors("root");
      await forgotPassword(data);
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  });

  return { register, errors, isSubmitting, onSubmit };
};

export { useForgotPassword };
