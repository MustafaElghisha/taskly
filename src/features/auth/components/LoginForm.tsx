"use client";

import Button, { buttonVariants } from "@/components/ui/Button";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const { register, errors, isSubmitting, onSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="sm:shadow-form-container mx-auto flex max-w-120 flex-col items-center rounded-lg sm:bg-white sm:p-12">
      <div className="text-center">
        <h1 className="mb-2 text-2xl leading-8 font-semibold tracking-tight text-slate-800 sm:text-3xl sm:leading-9">
          Welcome Back
        </h1>
        <FieldDescription className="max-w-[29ch] sm:max-w-full">
          Please enter your details to access your workspace
        </FieldDescription>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-10 mb-16 flex w-full flex-col gap-6 sm:mb-16"
      >
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="yourname@company.com"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <FieldError>{errors.email.message}</FieldError>}
        </Field>
        <div className="relative min-w-0">
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="/forgot-password"
                className={buttonVariants({
                  variant: "secondary",
                  className: "text-label-sm leading-4.25 font-bold sm:hidden",
                })}
              >
                Forgot?
              </Link>
            </div>
            <PasswordInput
              {...register("password")}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <FieldError>{errors.password.message}</FieldError>
            )}
          </Field>
        </div>
        <div className="flex items-center justify-between">
          <Field className="flex flex-row items-center gap-2 ps-1">
            <Input
              {...register("rememberMe")}
              type="checkbox"
              id="rememberMe"
            />
            <FieldLabel
              htmlFor="rememberMe"
              className="text-sm leading-5 font-medium text-slate-600"
            >
              Remember Me
            </FieldLabel>
          </Field>
          <Link
            href="/forgot-password"
            className={buttonVariants({
              variant: "secondary",
              className: "hidden sm:block",
            })}
          >
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging In..." : "Log In"}
        </Button>
        {errors.root && <FieldError>{errors.root.message}</FieldError>}
      </form>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm leading-5 text-slate-500">
          Don&apos;t have an account?
        </span>
        <Link
          href="/sign-up"
          className={buttonVariants({ variant: "secondary" })}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
