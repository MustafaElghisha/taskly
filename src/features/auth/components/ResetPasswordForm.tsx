"use client";

import Button from "@/components/ui/Button";
import { Field, FieldLabel, FieldError } from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon.svg";
import Link from "next/link";
import { useResetPassword } from "../hooks/useResetPassword";
import SecurityRequirements from "./SecurityRequirements";

export default function ResetPasswordForm() {
  const { register, errors, isSubmitting, onSubmit, watchPassword } =
    useResetPassword();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="shadow-form-container mx-auto flex max-w-lg flex-col gap-6 rounded-lg bg-white p-8.25 sm:px-12.5 sm:pt-9 sm:pb-7.5">
      <div className="text-center sm:text-start">
        <h1 className="text-2xl leading-7.5 font-semibold tracking-tight text-slate-800">
          Create a New Password
        </h1>
        <p className="pt-2 text-sm leading-5 text-slate-600 sm:pt-5 sm:pb-2">
          Create a new, strong password to secure your workstation access.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:gap-6">
          <Field>
            <FieldLabel htmlFor="password">New Password</FieldLabel>
            <PasswordInput
              {...register("password")}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              aria-invalid={errors.password ? "true" : "false"}
              className="bg-surface-low rounded-xs"
            />
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Repeat your password"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              className="bg-surface-low rounded-xs"
            />
            {errors.confirmPassword && (
              <FieldError>{errors.confirmPassword.message}</FieldError>
            )}
          </Field>
        </div>

        <SecurityRequirements watchPassword={watchPassword} />

        <Button type="submit" disabled={isSubmitting} className="rounded-xs">
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
        {errors.root && <FieldError>{errors.root.message}</FieldError>}
      </form>

      <Link
        href={"/login"}
        className="text-primary flex items-center justify-center gap-2 text-sm leading-5 font-medium sm:font-medium"
      >
        <ArrowLeftIcon />
        Back to log in
      </Link>
    </div>
  );
}
