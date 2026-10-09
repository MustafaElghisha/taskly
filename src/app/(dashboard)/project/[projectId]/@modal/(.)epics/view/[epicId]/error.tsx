"use client";

import ErrorFallback from "@/app/(dashboard)/_components/ErrorFallback";
import { Modal } from "@/components/ui/Modal";

export default function Error({ retry }: { retry: () => void }) {
  return (
    <Modal className="max-w-2xl">
      <ErrorFallback
        retry={retry}
        message="We're having trouble retrieving your epic right now. Please try again in a moment."
      />
    </Modal>
  );
}
