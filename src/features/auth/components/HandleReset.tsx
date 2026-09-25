"use client";

import { useEffect } from "react";
import { setTempAccessTokenAction } from "../actions/setTempAccessTokenAction";
import { useRouter } from "next/navigation";

export default function HandleReset() {
  const router = useRouter();

  useEffect(() => {
    async function saveTempAccessToken() {
      const hash = window.location.hash;

      if (!hash) {
        router.replace("/login");
        return;
      }

      const params = new URLSearchParams(hash.substring(1));

      const type = params.get("type");

      if (type !== "recovery") {
        router.replace("/login");
        return;
      }

      const tempAccessToken = params.get("access_token");

      if (!tempAccessToken) {
        router.replace("/login");
        return;
      }

      await setTempAccessTokenAction(tempAccessToken);

      router.replace("/reset-password");
    }

    saveTempAccessToken();
  }, [router]);

  return null;
}
