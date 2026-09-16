import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signUp } from "../actions/signUp";
import { signUpInputSchema } from "../schemas/signUpSchema";

const useSignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getFieldState,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpInputSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
    },
  });

  const watchPassword = watch("password");

  useEffect(() => {
    if (getFieldState("confirmPassword").isDirty) {
      trigger("confirmPassword");
    }
  }, [watchPassword, getFieldState, trigger]);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    clearErrors("root");

    try {
      await signUp(data);
      router.push("/login");
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  });

  return { register, errors, isSubmitting, onSubmit, watchPassword };
};

export { useSignUp };
