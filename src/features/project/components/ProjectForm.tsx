"use client";

import InitializeIcon from "@/assets/icons/InitializeIcon.svg";
import TipIcon from "@/assets/icons/TipIcon.svg";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Separator } from "@/components/ui/Separator";
import Button, { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type ProjectFormProps = {
  formTitle: string;
  submitLabel: string;
  submittingLabel: string;
  register: UseFormRegister<{
    name: string;
    description?: string | undefined;
  }>;
  onSubmit: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void | undefined>;
  isSubmitting: boolean;
  watchDescription: string;
  errors: FieldErrors<{
    name: string;
    description?: string | undefined;
  }>;
};

export default function ProjectForm({
  formTitle,
  submitLabel,
  submittingLabel,
  errors,
  isSubmitting,
  onSubmit,
  register,
  watchDescription,
}: ProjectFormProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="md:shadow-form-container flex flex-col gap-8 rounded-t-lg md:mt-11 md:gap-0 md:bg-white">
        <div className="flex items-center gap-4 md:p-8">
          <div className="bg-primary-container/10 hidden items-center justify-center rounded-sm p-4 md:flex">
            <InitializeIcon />
          </div>
          <div>
            <h2 className="pb-1 text-2xl leading-8 font-semibold text-slate-800 md:pb-0">
              {formTitle}
            </h2>
            <p className="text-sm leading-5 text-slate-500">
              Define the scope and foundational details of your project.
            </p>
          </div>
        </div>

        <Separator className="hidden bg-black/5 md:block" />

        <form
          className="flex flex-col gap-8 md:p-8 md:pb-12"
          onSubmit={onSubmit}
        >
          <Field>
            <FieldLabel htmlFor="project-name">
              Project TITLE <span className="text-error">*</span>
            </FieldLabel>
            <Input
              id="project-name"
              type="text"
              placeholder="e.g. Tasks Management project"
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name")}
            />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="project-description">Description</FieldLabel>
              <span className="text-2xs hidden leading-4 text-slate-500/60 md:inline">
                Optional
              </span>
            </div>

            <Textarea
              rows={6}
              id="project-description"
              placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
              aria-invalid={errors.description ? "true" : "false"}
              {...register("description")}
            />
            <FieldDescription
              className={cn(
                "text-3xs self-end leading-4 font-medium",
                watchDescription?.length > 500 && "text-error",
              )}
            >
              {watchDescription?.length} / 500
              <span className="hidden ps-0.5 md:inline">characters</span>
            </FieldDescription>
          </Field>
          <div className="flex flex-col-reverse items-center justify-between gap-y-7 pt-4 md:flex-row">
            <Link
              href={"/project"}
              className={buttonVariants({ variant: "ghost" })}
            >
              Back
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant={"primary"}
              className="primary-button-shadow w-full font-bold md:w-fit md:rounded-sm md:text-sm md:leading-5"
            >
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
          </div>
          <Field className="flex items-center">
            {errors.root && (
              <FieldError className="self-center">
                {errors.root.message}
              </FieldError>
            )}
          </Field>
        </form>
      </div>

      <div className="bg-surface-low -mt-1 flex flex-col gap-2 rounded-lg p-6 md:mb-11 md:flex-row md:items-baseline md:rounded-t-none">
        <div className="hidden md:block">
          <TipIcon />
        </div>
        <span className="text-xs leading-5 font-bold text-slate-500 md:hidden">
          Pro Tip
        </span>
        <p className="text-xs text-slate-500">
          <span className="hidden pe-0.5 text-xs leading-5 font-bold text-slate-500 md:inline">
            Pro Tip:
          </span>
          You can invite project members and assign epics immediately after the
          initial creation process.
        </p>
      </div>
    </div>
  );
}
