"use client";

import EpicIcon from "@/assets/icons/EpicIcon.svg";
import CloseIcon from "@/assets/icons/CloseIcon.svg";
import CalendarIcon from "@/assets/icons/CalendarIcon.svg";
import ChevronUpIcon from "@/assets/icons/ChevronUpIcon.svg";
import ListIcon from "@/assets/icons/ListIcon.svg";
import PlusIcon from "@/assets/icons/PlusIcon.svg";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Field, FieldLabel } from "@/components/ui/Field";
import Button, { buttonVariants } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { cn, formatDate } from "@/lib/utils";
import { Epic } from "../schemas/getEpicsSchema";
import { useParams, useRouter } from "next/navigation";
import CopyLinkButton from "@/components/ui/CopyLinkButton";
import Link from "next/link";

export default function EpicForm({ epic }: { epic: Epic }) {
  const router = useRouter();
  const { projectId, epicId } = useParams<{
    projectId: string;
    epicId: string;
  }>();

  return (
    <div className="md:shadow-edit-container mx-auto grid max-w-2xl rounded-lg p-6 md:bg-white md:p-8">
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
          disabled
          className="w-full p-2 font-semibold text-slate-800 md:rounded-xl md:p-3 md:text-xl md:leading-8 md:font-bold"
          defaultValue={epic.title}
        />
      </Field>

      <Field>
        <Textarea
          disabled
          rows={5}
          defaultValue={epic.description ?? "No description provided"}
          className="rounded-lg p-2 text-sm leading-5 text-slate-800 md:rounded-xl md:p-3 md:text-base md:leading-6.5"
        />
      </Field>

      <div className="grid gap-3 py-5 md:grid-cols-2 md:gap-4 md:py-8">
        <Field>
          <FieldLabel>Assignee</FieldLabel>
          <div className="relative flex items-center">
            <Avatar
              name={epic.assignee.name ?? ""}
              className="bg-blue-250 text-3xs! absolute left-2 size-6! rounded-full leading-4 font-bold! text-slate-500"
            />
            <Input
              disabled
              defaultValue={epic.assignee.name ?? "Unassigned"}
              className="w-full p-2 ps-10 text-sm leading-5 font-medium text-slate-800 md:rounded-lg md:py-2.5"
            />
            <ChevronUpIcon className="absolute right-2 rotate-180" />
          </div>
        </Field>
        <Field>
          <FieldLabel>Deadline</FieldLabel>
          <div className="relative flex items-center">
            <CalendarIcon className="absolute left-2 text-slate-800/40" />
            <Input
              disabled
              defaultValue={
                epic.deadline
                  ? formatDate(epic.deadline.split("T")[0])
                  : "Unassigned"
              }
              className="w-full p-2 ps-6 text-sm leading-5 font-medium text-slate-800 md:rounded-lg md:py-2.5"
            />
            <ChevronUpIcon className="absolute right-2 rotate-180" />
          </div>
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
      </div>
    </div>
  );
}
