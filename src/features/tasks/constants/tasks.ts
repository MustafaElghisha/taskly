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
    primary: "hsla(225, 100%, 94%, 1)",
    "primary-foreground": "hsla(215, 87%, 13%, 1)",
    secondary: "hsla(215, 20%, 65%, 1)",
  },

  IN_PROGRESS: {
    primary: "hsla(216, 100%, 40%, 0.1)",
    "primary-foreground": "hsla(216, 100%, 30%, 1)",
    secondary: "hsla(216, 100%, 40%, 1)",
  },

  BLOCKED: {
    primary: "hsla(6, 100%, 92%, 1)",
    "primary-foreground": "hsla(356, 100%, 29%, 1)",
    secondary: "hsla(0, 75%, 42%, 1)",
  },

  IN_REVIEW: {
    primary: "hsla(225, 100%, 94%, 1)",
    "primary-foreground": "hsla(215, 87%, 13%, 1)",
    secondary: "hsla(218, 22%, 40%, 1)",
  },

  READY_FOR_QA: {
    primary: "hsla(217, 89%, 43%, 1)",
    "primary-foreground": "hsla(0, 0%, 100%, 1)",
    secondary: "hsla(217, 89%, 43%, 1)",
  },

  REOPENED: {
    primary: "hsla(0, 75%, 42%, 1)",
    "primary-foreground": "hsla(0, 0%, 100%, 1)",
    secondary: "hsla(0, 75%, 42%, 1)",
  },

  READY_FOR_PRODUCTION: {
    primary: "hsla(158, 100%, 15%, 1)",
    "primary-foreground": "hsla(0, 0%, 100%, 1)",
    secondary: "hsla(158, 100%, 15%, 1)",
  },

  DONE: {
    primary: "hsla(150, 91%, 74%, 1)",
    "primary-foreground": "hsla(158, 100%, 15%, 1)",
    secondary: "hsla(152, 63%, 63%, 1)",
  },
} as const;
