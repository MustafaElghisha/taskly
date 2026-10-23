import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { inviteMemberSchema } from "../schemas/inviteMemberSchema";
import { inviteMember } from "../actions/inviteMember";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const useInviteMember = () => {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(inviteMemberSchema),
  });

  const { projectId } = useParams();

  const onSubmit = handleSubmit(async (data) => {
    clearErrors();

    const res = await inviteMember({
      p_email: data.email,
      p_project_id: projectId as string,
    });

    if (!res.success) {
      setError("root", { message: res.message });
      toast.error(res.message);
      return;
    }

    reset();
    toast.success(res.message);
  });

  return { register, errors, isSubmitting, onSubmit };
};

export { useInviteMember };
