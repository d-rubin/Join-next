import { twMerge } from "tw-merge";
import clsx, { ClassValue } from "clsx";
import { Contact } from "../types";

const generalHelper = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getBackgroundForCategory = (category: string) => {
  switch (category) {
    case "media":
      return "var(--color-media)";
    case "marketing":
      return "var(--color-marketing)";
    case "backoffice":
      return "var(--color-backoffice)";
    case "sales":
      return "var(--color-sales)";
    default:
      return "var(--color-design)";
  }
};

const getText = (status: string) => {
  switch (status) {
    case "toDo":
      return "to do";
    case "inProgress":
      return "in progress";
    case "awaitingFeedback":
      return "awaiting feedback";
    default:
      return "done";
  }
};

export const getAssignee = (assignee: number, contacts: Contact[]) => {
  const assignedPerson = contacts?.find((user) => user.id === assignee);
  return assignedPerson?.username || "-";
};

const cn = (...classNames: ClassValue[]) => twMerge(clsx(classNames));

export { generalHelper, getBackgroundForCategory, cn, getText };
