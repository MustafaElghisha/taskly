"use client";

import Button from "@/components/ui/Button";
import { Field, FieldLabel } from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/Textarea";
import CloseIcon from "@/assets/icons/CloseIcon.svg";
import { Task } from "../schemas/taskSchema";
import { useIsMobile } from "@/hooks/useIsMobile";
import CopyLinkButton from "@/components/ui/CopyLinkButton";
import { statusStyles } from "../constants/tasks";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function TaskDetails({ task }: { task: Task }) {
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <div className="mx-auto grid h-full w-full max-w-4xl md:grid-cols-[5fr_3fr]">
      <div className="border-blue-150 md:border-r">
        <div className="bg-surface-low flex flex-col gap-4 rounded-tl-lg px-6 pt-12 pb-4 md:gap-6 md:bg-white md:px-8 md:py-6">
          <div className="flex items-center justify-between">
            <span
              className="flex rounded-xs px-2 py-0.5 text-xs leading-4 font-bold tracking-widest"
              style={{
                backgroundColor: statusStyles[task.status].primary,
                color: statusStyles[task.status]["primary-foreground"],
              }}
            >
              {task.task_id}
            </span>
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
              disabled={true}
              defaultValue={task.title}
              className="w-full rounded-xl! px-3 py-4.5! text-xs leading-4.5 font-medium"
            />
          </Field>
          <Separator className="hidden md:block" />
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              rows={isMobile ? 9 : 24}
              disabled={true}
              defaultValue={task.description ?? "No description provided."}
              className="text-xs leading-4.5 font-medium"
            />
          </Field>
        </div>

        <div className="bg-surface-low hidden flex-wrap items-center justify-between gap-4 rounded-bl-lg px-8 py-4.5 md:flex">
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-surface-medium rounded-sm px-4 py-2 text-slate-800"
          >
            <span className="text-sm leading-5 font-semibold">Close</span>
          </Button>
          <CopyLinkButton />
        </div>
      </div>

      <div className="bg-surface-low flex flex-col gap-4 rounded-r-lg px-6 pb-10 md:gap-6 md:p-8">
        <Field className="gap-3">
          <FieldLabel>Status</FieldLabel>
          <select
            disabled={true}
            className="border-surface-medium w-full rounded-lg border bg-white px-2 py-3 text-xs leading-4.5 font-medium"
          >
            <option>{task.status}</option>
          </select>
        </Field>
        <Field className="gap-3">
          <FieldLabel>Assignee</FieldLabel>
          <select
            disabled={true}
            className="border-surface-medium w-full rounded-lg border bg-white px-2 py-3 text-xs leading-4.5 font-medium"
          >
            <option>{task.assignee.name ?? "Unassigned"}</option>
          </select>
        </Field>
        <Field className="gap-3">
          <FieldLabel>EPIC</FieldLabel>
          <select
            disabled={true}
            className="border-surface-medium w-full rounded-lg border bg-white px-2 py-3 text-xs leading-4.5 font-medium"
          >
            <option>
              {task.epic.title ?? "No epic selected for this task."}
            </option>
          </select>
        </Field>
        <Field className="gap-3">
          <FieldLabel>DUE DATE</FieldLabel>
          <Input
            disabled={true}
            defaultValue={
              task.due_date ? formatDate(task.due_date) : "No deadline given."
            }
            className="w-full px-2 py-3 text-xs leading-4.5 font-medium md:rounded-lg md:px-2 md:py-3"
          />
        </Field>
        <Field className="gap-3">
          <FieldLabel>CREATED BY</FieldLabel>
          <Input
            disabled={true}
            defaultValue={task.created_by.name}
            className="w-full px-2 py-3 text-xs leading-4.5 font-medium md:rounded-lg md:px-2 md:py-3"
          />
        </Field>
        <Field className="gap-3">
          <FieldLabel>CREATED AT</FieldLabel>
          <Input
            disabled={true}
            defaultValue={formatDate(task.created_at)}
            className="w-full px-2 py-3 text-xs leading-4.5 font-medium md:rounded-lg md:px-2 md:py-3"
          />
        </Field>
      </div>
    </div>
  );
}
