"use client";

import Button from "@/components/ui/Button";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/Textarea";
import { Epic } from "@/features/epics/schemas/getEpicsSchema";
import { Member } from "@/features/members/schemas/getProjectMembersSchema";
import { TASK_STATUSES } from "@/features/tasks/constants/tasks";
import { useCreateTask } from "../hooks/useCreateTask";
import CloseIcon from "@/assets/icons/CloseIcon.svg";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function CreateTaskForm({
  members,
  epics,
}: {
  members: Member[];
  epics: Epic[];
}) {
  const { register, onSubmit, errors, isSubmitting, router } = useCreateTask();
  const isMobile = useIsMobile();

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto grid w-full max-w-4xl md:grid-cols-[5fr_3fr]"
    >
      <div className="border-blue-150 md:border-r">
        <div className="bg-surface-low flex flex-col gap-4 rounded-tl-lg px-6 pt-12 pb-4 md:gap-6 md:bg-white md:px-8 md:py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl leading-7.5 font-semibold text-slate-800">
              Add New Task
            </h1>
            <Button
              onClick={() => router.back()}
              type="button"
              variant={"ghost"}
              className="md:hidden"
            >
              <CloseIcon className="text-slate-600" />
            </Button>
          </div>

          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input
              type="text"
              placeholder="e.g., Finalize structural schematics"
              className="border-surface-medium w-full rounded-xl! border bg-white px-3 py-4.5! text-xs leading-4.5 font-medium"
              aria-invalid={errors.title ? "true" : "false"}
              {...register("title")}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>
          <Separator className="hidden md:block" />
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              rows={isMobile ? 9 : 24}
              placeholder="Provide detailed context for this task..."
              className="border-surface-medium w-full rounded-xl! border bg-white p-3 text-xs leading-4.5 font-medium"
              {...register("description")}
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>
        </div>

        <div className="bg-surface-low hidden flex-wrap items-center justify-between gap-4 rounded-bl-lg px-8 py-4.5 md:flex">
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={() => router.back()}
            className="bg-surface-medium rounded-sm px-4 py-2 text-slate-800"
          >
            <span className="text-sm leading-5 font-semibold">Close</span>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-sm px-8 py-2"
          >
            <span className="text-sm leading-5 font-semibold">
              {isSubmitting ? "Adding..." : "Add Task"}
            </span>
          </Button>
          {errors.root && <FieldError>{errors.root.message}</FieldError>}
        </div>
      </div>

      <div className="bg-surface-low flex flex-col gap-4 rounded-r-lg px-6 md:gap-6 md:p-8">
        <Field className="gap-3">
          <FieldLabel>Status</FieldLabel>
          <select
            className="border-surface-medium w-full rounded-lg border bg-white px-2 py-3 text-xs leading-4.5 font-medium text-slate-400"
            {...register("status")}
          >
            {TASK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </Field>
        <Field className="gap-3">
          <FieldLabel>Assignee</FieldLabel>
          <select
            className="border-surface-medium w-full rounded-lg border bg-white px-2 py-3 text-xs leading-4.5 font-medium text-slate-400"
            {...register("assignee_id")}
          >
            <option value="">Select Team Member</option>
            {members.map(({ user_id, metadata: { name } }) => (
              <option key={user_id} value={user_id}>
                {name}
              </option>
            ))}
          </select>
        </Field>
        <Field className="gap-3">
          <FieldLabel>EPIC</FieldLabel>
          <select
            className="border-surface-medium w-full rounded-lg border bg-white px-2 py-3 text-xs leading-4.5 font-medium text-slate-400"
            {...register("epic_id")}
          >
            <option value="">Select Epic</option>
            {epics.map((epic) => (
              <option key={epic.id} value={epic.id}>
                {epic.title}
              </option>
            ))}
          </select>
        </Field>
        <Field className="gap-3">
          <FieldLabel>DUE DATE</FieldLabel>
          <Input
            type="datetime-local"
            className="border-surface-medium w-full border bg-white px-2 py-3 text-xs leading-4.5 font-medium text-slate-400 md:rounded-lg md:px-2 md:py-3"
            {...register("due_date")}
          />
          {errors.due_date && (
            <FieldError>{errors.due_date.message}</FieldError>
          )}
        </Field>

        <div className="flex flex-col gap-3 py-6 md:hidden">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="rounded-sm px-8 py-2"
          >
            <span className="text-sm leading-5 font-semibold">
              {isSubmitting ? "Adding..." : "Add Task"}
            </span>
          </Button>
          {errors.root && <FieldError>{errors.root.message}</FieldError>}
        </div>
      </div>
    </form>
  );
}
