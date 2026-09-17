"use client";

import InitializeIcon from "@/assets/icons/InitializeIcon.svg";
import TipIcon from "@/assets/icons/TipIcon.svg";
import { useCreateProject } from "../hooks/useCreateProject";
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

export default function CreateProjectForm() {
  const { register, errors, onSubmit, isSubmitting, watchDescription } =
    useCreateProject();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="sm:shadow-form-container flex flex-col gap-8 rounded-t-lg sm:mt-11 sm:gap-0 sm:bg-white">
        <div className="flex items-center gap-4 sm:p-8">
          <div className="bg-primary-container/10 hidden items-center justify-center rounded-sm p-4 sm:flex">
            <InitializeIcon />
          </div>
          <div>
            <h2 className="pb-1 text-2xl leading-8 font-semibold text-slate-800 sm:pb-0">
              Initialize New Project
            </h2>
            <p className="text-sm leading-5 text-slate-500">
              Define the scope and foundational details of your project.
            </p>
          </div>
        </div>

        <Separator className="hidden bg-black/5 sm:block" />

        <form
          className="flex flex-col gap-8 sm:p-8 sm:pb-12"
          onSubmit={onSubmit}
        >
          <Field>
            <FieldLabel htmlFor="project-title">
              Project TITLE <span className="text-error">*</span>
            </FieldLabel>
            <Input
              id="project-title"
              type="text"
              placeholder="e.g. Tasks Management project"
              aria-invalid={errors.title ? "true" : "false"}
              {...register("title")}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="project-description">Description</FieldLabel>
              <span className="text-2xs hidden leading-4 text-slate-500/60 sm:inline">
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
                watchDescription.length > 500 && "text-error",
              )}
            >
              {watchDescription.length} / 500
              <span className="hidden ps-0.5 sm:inline">characters</span>
            </FieldDescription>
          </Field>
          <div className="flex flex-col-reverse items-center justify-between gap-y-7 pt-4 sm:flex-row">
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
              className="primary-button-shadow w-full font-bold sm:w-fit sm:rounded-sm sm:text-sm sm:leading-5"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
          <Field className="flex items-center">
            {errors.root && (
              <FieldError className="text-center">
                {errors.root.message}
              </FieldError>
            )}
          </Field>
        </form>
      </div>

      <div className="bg-surface-low -mt-1 flex flex-col gap-2 rounded-lg p-6 sm:mb-11 sm:flex-row sm:items-baseline sm:rounded-t-none">
        <div className="hidden sm:block">
          <TipIcon />
        </div>
        <span className="text-xs leading-5 font-bold text-slate-500 sm:hidden">
          Pro Tip
        </span>
        <p className="text-xs text-slate-500">
          <span className="hidden pe-0.5 text-xs leading-5 font-bold text-slate-500 sm:inline">
            Pro Tip:
          </span>
          You can invite project members and assign epics immediately after the
          initial creation process.
        </p>
      </div>
    </div>
  );
}
