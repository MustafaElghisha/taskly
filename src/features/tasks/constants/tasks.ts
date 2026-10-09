export const TASKS = [
  { status: "TO_DO", length: 0 },
  { status: "IN_PROGRESS", length: 0 },
  { status: "BLOCKED", length: 0 },
  { status: "IN_REVIEW", length: 0 },
  { status: "READY_FOR_QA", length: 0 },
  { status: "REOPENED", length: 0 },
  { status: "READY_FOR_PROD", length: 0 },
  { status: "DONE", length: 0 },
] as const;

export const TASK_STATUSES = [
  "TO_DO",
  "IN_PROGRESS",
  "BLOCKED",
  "IN_REVIEW",
  "READY_FOR_QA",
  "REOPENED",
  "READY_FOR_PROD",
  "DONE",
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export const statusStyles = {
  TO_DO: {
    primary: "hsla(215, 20%, 65%, 1)",
    text: "hsla(215, 20%, 45%, 1)",
    background: "hsla(215, 20%, 65%, 0.1)",
  },

  IN_PROGRESS: {
    primary: "hsla(216, 100%, 40%, 1)",
    text: "hsla(216, 100%, 30%, 1)",
    background: "hsla(216, 100%, 40%, 0.1)",
  },

  BLOCKED: {
    primary: "hsla(0, 75%, 42%, 1)",
    text: "hsla(0, 75%, 32%, 1)",
    background: "hsla(0, 75%, 42%, 0.1)",
  },

  IN_REVIEW: {
    primary: "hsla(218, 22%, 40%, 1)",
    text: "hsla(218, 22%, 30%, 1)",
    background: "hsla(218, 22%, 40%, 0.1)",
  },

  READY_FOR_QA: {
    primary: "hsla(217, 89%, 43%, 1)",
    text: "hsla(217, 89%, 33%, 1)",
    background: "hsla(217, 89%, 43%, 0.1)",
  },

  REOPENED: {
    primary: "hsla(0, 75%, 42%, 1)",
    text: "hsla(0, 75%, 32%, 1)",
    background: "hsla(0, 75%, 42%, 0.1)",
  },

  READY_FOR_PROD: {
    primary: "hsla(158, 100%, 15%, 1)",
    text: "hsla(158, 100%, 10%, 1)",
    background: "hsla(158, 100%, 15%, 0.1)",
  },

  DONE: {
    primary: "hsla(152, 63%, 63%, 1)",
    text: "hsla(152, 63%, 43%, 1)",
    background: "hsla(152, 63%, 63%, 0.1)",
  },
} as const;
