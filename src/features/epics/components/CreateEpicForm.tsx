"use client";

import Button, { buttonVariants } from "@/components/ui/Button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCreateEpic } from "../hooks/useCreateEpic";
import { Member } from "@/features/members/schemas/getProjectMembersSchema";

export default function CreateEpicForm({
  projectId,
  members,
}: {
  projectId: string;
  members: Member[];
}) {
  const { register, errors, isSubmitting, watchDescription, onSubmit } =
    useCreateEpic(projectId);

  return (
    <div className="sm:shadow-form-container sm:py rounded-lg sm:bg-white sm:p-8">
      <form className="flex flex-col gap-6 sm:gap-8" onSubmit={onSubmit}>
        <Field className="grid sm:grid-cols-4">
          <FieldLabel htmlFor="epic-title" className="p-0">
            TITLE <span className="text-error">*</span>
          </FieldLabel>
          <div className="col-span-3 flex flex-col gap-2">
            <Input
              type="text"
              id="epic-title"
              placeholder="e.g. Structural Foundation Phase"
              aria-invalid={errors.title ? "true" : "false"}
              {...register("title")}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </div>
        </Field>

        <Field className="grid sm:grid-cols-4">
          <div className="flex sm:flex-col">
            <FieldLabel htmlFor="epic-description" className="p-0">
              Description
            </FieldLabel>
            <span className="text-2xs hidden leading-4 text-slate-500/60 sm:inline">
              Optional
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-3">
            <Textarea
              rows={6}
              id="epic-description"
              placeholder="Describe the scope and objectives of this epic..."
              aria-invalid={errors.description ? "true" : "false"}
              {...register("description")}
            />
            <FieldDescription
              className={cn(
                "text-3xs -mt-2 hidden self-end leading-4 font-medium text-slate-600/60 sm:inline",
                watchDescription?.length > 500 && "text-error",
              )}
            >
              {watchDescription?.length} / 500
              <span className="hidden ps-0.5 sm:inline">characters</span>
            </FieldDescription>
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </div>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
          <Field>
            <FieldLabel htmlFor="epic-assignee" className="p-0">
              Assignee
            </FieldLabel>
            <select
              id="epic-assignee"
              aria-invalid={errors.assignee_id ? "true" : "false"}
              className="bg-surface-medium rounded-lg px-4 pt-4.5 pb-4.75 leading-0 text-slate-800 sm:rounded-sm sm:pt-3.5 sm:pb-3.75"
              {...register("assignee_id")}
            >
              <option value="">Select a member...</option>
              {members.map(({ user_id, metadata: { name } }) => (
                <option key={user_id} value={user_id}>
                  {name}
                </option>
              ))}
            </select>
            {errors.assignee_id && (
              <FieldError>{errors.assignee_id.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="epic-deadline" className="p-0">
              Deadline
            </FieldLabel>
            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              id="epic-deadline"
              aria-invalid={errors.deadline ? "true" : "false"}
              {...register("deadline")}
            />
            {errors.deadline && (
              <FieldError>{errors.deadline.message}</FieldError>
            )}
          </Field>
        </div>

        <div className="mt-6 flex flex-col-reverse items-center gap-x-12 gap-y-7 sm:mt-8 sm:flex-row sm:justify-end">
          <Link
            href={`/project/${projectId}/epics`}
            className={buttonVariants({ variant: "ghost" })}
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant={"primary"}
            className="primary-button-shadow w-full font-bold sm:w-fit sm:rounded-sm sm:text-sm sm:leading-5"
          >
            {isSubmitting ? "Creating..." : "Create Epic"}
          </Button>
        </div>
        {errors.root && (
          <FieldError className="self-center">{errors.root.message}</FieldError>
        )}
      </form>
    </div>
  );
}
