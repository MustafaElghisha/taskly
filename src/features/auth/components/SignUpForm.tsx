"use client";

import Button, { buttonVariants } from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import FieldDescription from "@/components/ui/FieldDescription";
import FieldError from "@/components/ui/FieldError";
import FieldLabel from "@/components/ui/FieldLabel";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EyeClosedIcon from "@/assets/icons/EyeClosedIcon.svg";
import EyeOpenIcon from "@/assets/icons/EyeOpenIcon.svg";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "../schemas/SignUpSchema";
import PasswordRequirements from "./PasswordRequirements";
import signUp from "../api/signUp";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: "onTouched",
  });

  const watchPassword = watch("password");

  useEffect(() => {
    if (getFieldState("confirmPassword").isDirty) {
      trigger("confirmPassword");
    }
  }, [watchPassword, getFieldState, trigger]);

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  return (
    <div className="sm:shadow-form-container mx-auto flex max-w-xl flex-col rounded-lg sm:items-center sm:bg-white sm:p-12">
      <div className="sm:text-center">
        <h1 className="text-heading-md mb-2 leading-10 font-semibold tracking-tight text-slate-800 sm:text-3xl sm:leading-9">
          Create your workspace
        </h1>
        <FieldDescription>
          <span className="sm:hidden">
            Join the curated environment for institutional trust and task
            precision.
          </span>
          <span className="hidden sm:inline">
            Join the editorial approach to task management.
          </span>
        </FieldDescription>
      </div>

      <form
        onSubmit={handleSubmit(async (data) => {
          clearErrors("root");

          try {
            await signUp(data);
            router.push("/login");
          } catch (error) {
            setError("root", {
              message:
                error instanceof Error ? error.message : "Something went wrong",
            });
          }
        })}
        className="mt-10 mb-16 flex w-full flex-col gap-6 sm:mb-12"
      >
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Enter your full name"
            aria-invalid={errors.name ? "true" : "false"}
          />
          <span className="text-label-sm ps-1 leading-4 text-slate-200">
            3-50 characters, letters only.
          </span>
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>
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
        <Field>
          <FieldLabel htmlFor="jobTitle">
            Job Title{" "}
            <span className="hidden leading-0 tracking-normal text-slate-400 sm:inline">
              (Optional)
            </span>
          </FieldLabel>
          <Input
            {...register("jobTitle")}
            id="jobTitle"
            type="text"
            placeholder="e.g. Project Manager"
          />
        </Field>
        <div className="flex flex-col gap-x-4 gap-y-6 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9.75 right-3 cursor-pointer"
            >
              {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </button>
          </div>
          <Field className="min-w-0 flex-1">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              {...register("confirmPassword")}
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Repeat your password"
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            {errors.confirmPassword && (
              <FieldError>{errors.confirmPassword.message}</FieldError>
            )}
          </Field>
        </div>

        <PasswordRequirements watchPassword={watchPassword} />

        <Button type="submit">Create Account</Button>
        {errors.root && <FieldError>{errors.root.message}</FieldError>}
      </form>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm leading-5 text-slate-500">
          Already have an account?
        </span>
        <Link
          href="/login"
          className={buttonVariants({ variant: "secondary" })}
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
