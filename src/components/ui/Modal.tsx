"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({
  children,
  className,
}: React.ComponentPropsWithoutRef<"dialog"> & { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  const handleClose = () => {
    router.back();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          router.back();
        }
      }}
      className={cn(
        "shadow-edit-container fixed top-1/2 left-1/2 w-2xl -translate-1/2 rounded-lg backdrop:backdrop-blur-xs",
        className,
      )}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
