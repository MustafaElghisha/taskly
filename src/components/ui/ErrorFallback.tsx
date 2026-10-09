"use client";

import Button from "@/components/ui/Button";
import NoConnectionIcon from "@/assets/icons/NoConnectionIcon.svg";

type ErrorProps = {
  title?: string;
  message: string;
  retryLabel?: string;
  retry: () => void;
};

export default function ErrorFallback({
  title = "Something went wrong",
  message,
  retryLabel = "Try Again",
  retry,
}: ErrorProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-center rounded-xl bg-red-100 p-5">
        <NoConnectionIcon />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-xl leading-7 font-semibold text-slate-800">
          {title}
        </h2>
        <p className="max-w-[27ch] leading-6 text-slate-600">{message}</p>
      </div>
      <Button onClick={() => retry()} className="rounded-xs">
        {retryLabel}
      </Button>
    </div>
  );
}
