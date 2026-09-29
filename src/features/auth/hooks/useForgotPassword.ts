import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordInput,
  forgotPasswordInputSchema,
} from "../schemas/forgotPasswordSchema";
import { forgotPassword } from "../actions/forgotPassword";
import { toast } from "sonner";

const useForgotPassword = () => {
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, submitCount },
  } = useForm<ForgotPasswordInput>({
    mode: "onTouched",
    resolver: zodResolver(forgotPasswordInputSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    clearErrors("root");

    const res = await forgotPassword(data);

    if (!res.success) {
      setError("root", { message: res.message });
      return;
    }

    toast.success(res.message);
  });

  return { register, errors, onSubmit, isSubmitting, isSubmitted, submitCount };
};

export { useForgotPassword };
