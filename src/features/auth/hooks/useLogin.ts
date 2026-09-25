import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { login } from "../actions/login";
import { LoginInput, loginInputSchema } from "../schemas/loginSchema";

const useLogin = () => {
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

  const onSubmit = handleSubmit(async (data) => {
    clearErrors("root");

    try {
      await login(data);
      router.replace("/project");
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error ? error.message : "Invalid email or password.",
      });
    }
  });

  return { register, errors, isSubmitting, onSubmit };
};

export { useLogin };
