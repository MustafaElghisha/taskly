"use client";

import { useState } from "react";
import logout from "../actions/logout";

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setError(null);

      await logout();
    } catch (error) {
      const logoutError =
        error instanceof Error ? error : new Error("Logout failed");

      setError(logoutError);
      throw logoutError;
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    handleLogout,
    isLoggingOut,
    error,
  };
}
