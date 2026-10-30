export const TASK_STATUSES = [
  "TO_DO",
  "IN_PROGRESS",
  "BLOCKED",
  "IN_REVIEW",
  "READY_FOR_QA",
  "REOPENED",
  "READY_FOR_PRODUCTION",
  "DONE",
] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export const statusStyles = {
  TO_DO: {
    primary: "hsla(225, 100%, 95%, 1)",
    "primary-foreground": "hsla(215, 70%, 18%, 1)",
    secondary: "hsla(215, 16%, 55%, 1)",
  },

  IN_PROGRESS: {
    primary: "hsla(216, 100%, 40%, 0.12)",
    "primary-foreground": "hsla(216, 90%, 32%, 1)",
    secondary: "hsla(216, 90%, 42%, 1)",
  },

  BLOCKED: {
    primary: "hsla(6, 100%, 94%, 1)",
    "primary-foreground": "hsla(356, 75%, 32%, 1)",
    secondary: "hsla(0, 68%, 45%, 1)",
  },

  IN_REVIEW: {
    primary: "hsla(225, 60%, 95%, 1)",
    "primary-foreground": "hsla(215, 55%, 22%, 1)",
    secondary: "hsla(218, 18%, 42%, 1)",
  },

  READY_FOR_QA: {
    primary: "hsla(217, 82%, 42%, 1)",
    "primary-foreground": "hsla(217, 100%, 88%, 1)",
    secondary: "hsla(217, 82%, 42%, 1)",
  },

  REOPENED: {
    primary: "hsla(0, 68%, 42%, 1)",
    "primary-foreground": "hsla(6, 100%, 88%, 1)",
    secondary: "hsla(0, 68%, 42%, 1)",
  },

  READY_FOR_PRODUCTION: {
    primary: "hsla(158, 85%, 19%, 1)",
    "primary-foreground": "hsla(150, 65%, 82%, 1)",
    secondary: "hsla(158, 85%, 19%, 1)",
  },

  DONE: {
    primary: "hsla(150, 75%, 80%, 1)",
    "primary-foreground": "hsla(158, 85%, 19%, 1)",
    secondary: "hsla(152, 52%, 60%, 1)",
  },
} as const;
