"use client";

import ErrorFallback from "@/components/ui/ErrorFallback";

export default function Error({ retry }: { retry: () => void }) {
  return (
    <ErrorFallback
      retry={retry}
      message="We're having trouble retrieving your project members right now. Please try again in a moment."
    />
  );
}
