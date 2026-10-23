import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { acceptInvitation } from "../actions/acceptInvitation";
import { toast } from "sonner";

const useAcceptInvitation = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() ?? "";

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      token,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (token === "") {
      toast.error(
        `
        This invitation link is invalid.
        Please contact the project admin to request a new invitation.`,
      );
      return;
    }

    clearErrors();

    const res = await acceptInvitation({ p_token: data.token });

    if (!res.success) {
      toast.error(res.message);
      setError("root", { message: res.message });
      return;
    }

    toast.success(res.message);
    router.replace("/project");
  });

  return { onSubmit, isSubmitting, errors };
};

export { useAcceptInvitation };
