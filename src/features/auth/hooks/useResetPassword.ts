import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ResetPasswordInput,
  resetPasswordInputSchema,
} from "../schemas/resetPasswordSchema";
import { resetPassword } from "../actions/resetPassword";

const useResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getFieldState,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    mode: "onTouched",
    resolver: zodResolver(resetPasswordInputSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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

    const result = await resetPassword(data);

    if (!result.success) {
      setError("root", {
        message: result.message,
      });
      return;
    }

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  });

  return { register, errors, isSubmitting, onSubmit, watchPassword };
};

export { useResetPassword };
