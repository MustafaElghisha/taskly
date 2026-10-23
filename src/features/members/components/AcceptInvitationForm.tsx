"use client";

import { useAcceptInvitation } from "../hooks/useAcceptInvitation";
import Button from "@/components/ui/Button";
import { Field, FieldError } from "@/components/ui/Field";
import MemberCardIcon from "@/assets/icons/MemberCardIcon.svg";

export default function AcceptInvitationForm() {
  const { onSubmit, isSubmitting, errors } = useAcceptInvitation();

  return (
    <div className="shadow-form-container relative flex w-xl flex-col gap-4 overflow-clip rounded-lg bg-white p-12">
      <div className="bg-primary absolute top-0 right-0 left-0 h-1 w-full" />

      <div className="flex flex-col items-center gap-6">
        <div className="bg-blue-150 flex items-center gap-1.5 rounded-full px-3 py-1">
          <MemberCardIcon />
          <span className="text-2xs leading-4 font-bold tracking-wider text-slate-600 uppercase">
            New Project Invitation
          </span>
        </div>

        <h1 className="px-8 text-center text-3xl leading-9 font-semibold tracking-tight text-slate-800">
          You&apos;ve been invited to join new project
        </h1>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="primary-button-shadow w-full rounded-xs py-4! text-sm"
        >
          {isSubmitting ? "Accepting..." : "Accept Invitation"}
        </Button>

        <Field>
          {errors.root && (
            <FieldError className="self-center">
              {errors.root.message}
            </FieldError>
          )}
        </Field>
      </form>
    </div>
  );
}
