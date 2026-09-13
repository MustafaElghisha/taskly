import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpSchema } from "../lib/schemas/SignUpSchema";
import { useRouter } from "next/navigation";
import { signUp } from "../lib/auth/signUp";
import { useEffect } from "react";

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
    resolver: zodResolver(SignUpSchema),
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
