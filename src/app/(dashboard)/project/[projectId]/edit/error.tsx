"use client";

import Button from "@/components/ui/Button";
import NoConnectionIcon from "@/assets/icons/NoConnectionIcon.svg";

export default function Error({ retry }: { retry: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-center rounded-xl bg-red-100 p-5">
        <NoConnectionIcon />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-xl leading-7 font-semibold text-slate-800">
          Something went wrong
        </h2>
        <p className="max-w-[27ch] leading-6 text-slate-600">
          We&apos;re having trouble retrieving your project right now. Please
          try again in a moment.
        </p>
      </div>
      <Button onClick={() => retry()} className="rounded-xs">
        Retry Connection
      </Button>
    </div>
  );
}
