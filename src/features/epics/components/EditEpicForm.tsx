"use client";

import EpicIcon from "@/assets/icons/EpicIcon.svg";
import CloseIcon from "@/assets/icons/CloseIcon.svg";
import CalendarIcon from "@/assets/icons/CalendarIcon.svg";
import ListIcon from "@/assets/icons/ListIcon.svg";
import PlusIcon from "@/assets/icons/PlusIcon.svg";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import Button, { buttonVariants } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { cn, formatDate } from "@/lib/utils";
import { Epic } from "../../../schemas/epicSchema";
import { useParams, useRouter } from "next/navigation";
import CopyLinkButton from "@/components/ui/CopyLinkButton";
import Link from "next/link";
import { useEditEpic } from "../hooks/useEditEpic";
import { Member } from "@/schemas/memberSchema";
import { Task } from "@/features/tasks/schemas/taskSchema";
import EpicTaskCard from "./EpicTaskCard";

export default function EditEpicForm({
  epic,
  members,
  tasks,
}: {
  epic: Epic;
  members: Member[];
  tasks: Task[];
}) {
  const router = useRouter();
  const { projectId, epicId } = useParams<{
    projectId: string;
    epicId: string;
  }>();

  const { onSubmit, register, errors, reset, dirtyFields, clearErrors } =
    useEditEpic(epic);

  return (
    <form
      className="md:shadow-edit-container mx-auto grid max-w-2xl rounded-lg p-6 md:bg-white md:p-8"
      onSubmit={onSubmit}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <EpicIcon />
          <span className="text-xs leading-4 font-bold tracking-wider text-slate-800/60 uppercase">
            {epic.epic_id}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <CopyLinkButton />
          <Button onClick={() => router.back()} variant={"ghost"}>
            <CloseIcon />
          </Button>
        </div>
      </div>

      <Field className="pt-4.5 pb-8 md:pt-6 md:pb-11">
        <Input
          className="border-surface-medium w-full border bg-transparent p-2 font-semibold text-slate-800 md:rounded-xl md:p-3 md:text-xl md:leading-8 md:font-bold"
          {...register("title")}
          onBlur={() => {
            if (dirtyFields.title) onSubmit();
            if (errors.title) {
              reset();
              clearErrors("title");
            }
          }}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && <FieldError>{errors.title.message}</FieldError>}
      </Field>

      <Field>
        <Textarea
          rows={5}
          placeholder="No description provided"
          className="border-surface-medium rounded-lg border bg-transparent p-2 text-sm leading-5 text-slate-800 md:rounded-xl md:p-3 md:text-base md:leading-6.5"
          {...register("description")}
          onBlur={() => {
            if (dirtyFields.description) onSubmit();
            if (errors.description) {
              reset();
              clearErrors("description");
            }
          }}
          aria-invalid={errors.description ? "true" : "false"}
        />
        {errors.description && (
          <FieldError>{errors.description.message}</FieldError>
        )}
      </Field>

      <div className="grid gap-3 py-5 md:grid-cols-2 md:gap-4 md:py-8">
        <Field>
          <FieldLabel htmlFor="epic-assignee">Assignee</FieldLabel>
          <select
            id="epic-assignee"
            aria-invalid={errors.assignee_id ? "true" : "false"}
            className="border-surface-medium w-full border bg-white p-2 text-sm leading-5 font-medium text-slate-800 md:rounded-lg md:py-2.5"
            {...register("assignee_id")}
            onBlur={() => {
              if (dirtyFields.assignee_id) onSubmit();
              if (errors.assignee_id) {
                reset();
                clearErrors("assignee_id");
              }
            }}
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
            className="border-surface-medium w-full border bg-white p-2 text-sm font-medium text-slate-800 md:rounded-lg md:py-2.5"
            {...register("deadline")}
            onBlur={() => {
              if (dirtyFields.deadline) onSubmit();
              if (errors.deadline) {
                reset();
                clearErrors("deadline");
              }
            }}
          />
          {errors.deadline && (
            <FieldError>{errors.deadline.message}</FieldError>
          )}
        </Field>
        <Field>
          <FieldLabel>Created By</FieldLabel>
          <div className="relative flex items-center">
            <Avatar
              name={epic.created_by.name}
              className="bg-blue-250 text-3xs! absolute left-2 size-6! rounded-full leading-4 font-bold! text-slate-500"
            />
            <Input
              disabled
              defaultValue={epic.created_by.name}
              className="w-full p-2 ps-10 text-sm leading-5 font-medium text-slate-800 md:rounded-lg md:py-2.5"
            />
          </div>
        </Field>
        <Field>
          <FieldLabel>Created At</FieldLabel>
          <div className="relative flex items-center">
            <CalendarIcon className="absolute left-2 text-slate-800/40" />
            <Input
              disabled
              defaultValue={formatDate(epic.created_at.split("T")[0])}
              className="w-full p-2 ps-6 text-sm leading-5 font-medium text-slate-800 md:rounded-lg md:py-2.5"
            />
          </div>
        </Field>
      </div>

      <div>
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-sm leading-7 font-semibold text-slate-800 md:text-lg">
            Tasks
          </h2>
          <Link
            href={`/project/${projectId}/tasks/add?epic_id=${epicId}`}
            className="text-primary flex items-center gap-1 text-sm font-semibold"
          >
            <PlusIcon />
            Add Task
          </Link>
        </div>

        {tasks.length > 0 ? (
          <ul className="border-blue-150 flex flex-col gap-3 overflow-y-auto rounded-lg pb-3 md:gap-0 md:border md:pb-0">
            {tasks.map((task) => (
              <li
                key={task.task_id}
                className="border-blue-150 md:not-last:border-b"
              >
                <EpicTaskCard task={task} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-surface-low flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-slate-200/30 px-15 py-8 md:p-12">
            <div className="bg-surface-medium rounded-xl p-4">
              <ListIcon />
            </div>
            <p className="text-center leading-6 font-medium text-slate-800">
              No tasks have been added to this epic yet
            </p>
            <Link
              href={`/project/${projectId}/tasks/add?epic_id=${epicId}`}
              className={cn(
                buttonVariants({ variant: "primary" }),
                "gap-2 rounded-xs px-4 py-2 text-xs leading-4 font-bold md:px-6 md:py-2.5",
              )}
            >
              <PlusIcon />
              Add Task
            </Link>
          </div>
        )}
      </div>
      {errors.root && <FieldError>{errors.root.message}</FieldError>}
    </form>
  );
}
