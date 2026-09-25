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

    const result = await login(data);

    if (!result.success) {
      setError("root", { message: result.error });
      return;
    }

    router.replace("/project");
  });

  return { register, errors, isSubmitting, onSubmit };
};

export { useLogin };
