"use client";

import ErrorFallback from "@/app/(dashboard)/_components/ErrorFallback";

export default function Error({ retry }: { retry: () => void }) {
  return (
    <ErrorFallback
      retry={retry}
      message="We're having trouble retrieving your project epics right now. Please try again in a moment."
    />
  );
}
