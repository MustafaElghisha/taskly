import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../lib/schemas/LoginSchema";
import { useRouter } from "next/navigation";
import { login } from "../actions/login";

const useLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(LoginSchema), mode: "onTouched" });

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
