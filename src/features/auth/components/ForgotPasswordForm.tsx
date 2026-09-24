"use client";

import Button from "@/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon.svg";
import SuccessIcon from "@/assets/icons/SuccessIcon.svg";
import { Separator } from "@/components/ui/Separator";
import { useForgotPassword } from "../hooks/useForgotPassword";

export default function ForgotPasswordForm() {
  const { errors, isSubmitting, register, onSubmit } = useForgotPassword();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6">
      <div className="shadow-form-container flex w-full flex-col gap-8 rounded-lg bg-white p-8 sm:p-10">
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-start">
          <h1 className="sm:text-heading-lg text-2xl leading-8 font-semibold text-slate-800 sm:leading-10 sm:tracking-tighter">
            Forgot password?
          </h1>
          <p className="px-8 text-sm leading-5 text-slate-600 sm:p-0 sm:leading-5.75">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>
        <form className="flex flex-col gap-4 sm:gap-6">
          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Enter your email"
              aria-invalid={errors.email ? "true" : "false"}
              className="rounded-xs"
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="rounded-xs sm:rounded-sm"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <Button
          type="button"
          variant={"ghost"}
          className="text-primary gap-2 text-sm leading-5 font-medium sm:-mt-2 sm:font-medium"
          disabled={isSubmitting}
        >
          <ArrowLeftIcon />
          Back to log in
        </Button>
      </div>

      <div className="bg-success/30 flex w-full flex-col gap-3 rounded-sm p-4">
        <div className="flex gap-3">
          <div>
            <SuccessIcon />
          </div>
          <p className="max-w-xs text-xs leading-5 font-medium text-green-900">
            If an account exists with this email, we&apos;ve sent a password
            reset link.
          </p>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-2xs leading-4 font-bold tracking-widest text-green-900/60 uppercase">
            Didn&apos;t receive email?
          </span>
          <Button
            variant={"ghost"}
            className="text-primary text-2xs sm:text-2xs leading-4 font-bold tracking-widest uppercase"
          >
            Resend in 05:00
          </Button>
        </div>
      </div>
    </div>
  );
}
