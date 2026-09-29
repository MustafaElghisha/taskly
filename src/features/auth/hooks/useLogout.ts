import { useState } from "react";
import logout from "../actions/logout";
import { useRouter } from "next/navigation";

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    router.replace("/login");
  };

  return {
    handleLogout,
    isLoggingOut,
  };
}
