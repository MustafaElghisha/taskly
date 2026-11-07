import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { login } from "../actions/login";
import { LoginInput, loginInputSchema } from "../schemas/loginSchema";

const useLogin = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    mode: "onTouched",
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = handleSubmit(async (data) => {
    clearErrors("root");

    const result = await login(data);

    if (!result.success) {
      setError("root", { message: result.message });
      return;
    }

    setIsRedirecting(true);

    const redirect = searchParams.get("redirect");
    router.replace(redirect || "/projects");
  });

  const isLoading = isSubmitting || isRedirecting;

  return { register, errors, isLoading, onSubmit };
};

export { useLogin };
