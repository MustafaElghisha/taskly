"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Button from "./Button";
import LinkIcon from "@/assets/icons/LinkIcon.svg";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    toast.success("Link copied!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant={"ghost"}
      className={cn(
        "flex items-center gap-2 text-slate-600",
        copied && "text-primary",
      )}
    >
      <LinkIcon />
      <span className="text-xs leading-5 font-medium md:text-sm">
        {copied ? "Link copied!" : "Copy link"}
      </span>
    </Button>
  );
}
