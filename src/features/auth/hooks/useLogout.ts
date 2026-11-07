import { useState } from "react";
import logout from "../actions/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);

    const res = await logout();

    if (!res.success) {
      setIsLoggingOut(false);
      toast.error(res.message);
      return;
    }

    router.replace("/login");
  };

  return {
    handleLogout,
    isLoggingOut,
  };
}
