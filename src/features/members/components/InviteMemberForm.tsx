"use client";

import { useRouter } from "next/navigation";
import { useInviteMember } from "../hooks/useInviteMember";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InviteMemberIcon from "@/assets/icons/InviteMemberIcon.svg";
import CloseIcon from "@/assets/icons/CloseIcon.svg";
import MailIcon from "@/assets/icons/MailIcon.svg";

export default function InviteMemberForm() {
  const { register, onSubmit, errors, isSubmitting } = useInviteMember();
  const router = useRouter();

  return (
    <div className="flex max-w-md flex-col gap-6 rounded-lg bg-white p-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="bg-surface-low flex size-12 items-center justify-center rounded-lg">
            <InviteMemberIcon />
          </div>
          <Button type="button" onClick={() => router.back()} variant={"ghost"}>
            <CloseIcon />
          </Button>
        </div>

        <h1 className="text-2xl leading-8 font-bold tracking-tight text-slate-800">
          Invite Team Member
        </h1>
        <p className="text-sm leading-5 text-slate-500">
          Send an invitation to join the Architectural Studio workspace.
        </p>
      </div>

      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <Field>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <div className="relative flex items-center">
            <Input
              {...register("email")}
              id="email"
              placeholder="Enter email address"
              aria-invalid={errors.email ? "true" : "false"}
              className="w-full pe-12"
            />
            <MailIcon className="absolute right-4" />
          </div>
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>

        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            onClick={() => router.back()}
            variant={"ghost"}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-xs px-0 py-3.5 text-sm"
          >
            {isSubmitting ? "Sending..." : "Send Invitation"}
          </Button>
        </div>

        {errors.root && (
          <FieldError className="self-center">{errors.root.message}</FieldError>
        )}
      </form>
    </div>
  );
}
