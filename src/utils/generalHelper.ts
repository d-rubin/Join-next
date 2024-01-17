import { twMerge } from "tw-merge";
import clsx, { ClassValue } from "clsx";
import { ErrorResponse, TContact, TTask } from "../types";

const firstCharToUpperCase = (string: string) => {
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

const getStatusText = (status: string) => {
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

const getAssignee = (assignee: number, contacts: TContact[]) => {
  const assignedPerson = contacts?.find((user) => user.id === assignee);
  return assignedPerson?.username || "-";
};

const cn = (...classNames: ClassValue[]) => twMerge(clsx(classNames));

const isErrorResponse = (response: Object): response is ErrorResponse =>
  !Array.isArray(response) && "message" in response;

const updateTaskArray = (array: unknown, updatedTask: TTask) => {
  if (array && Array.isArray(array) && !isErrorResponse(array)) {
    return array.map((task) => (task.id === updatedTask.id ? updatedTask : task));
  }
  return [];
};

const getCurrentDate = () => {
  const date = new Date();
  const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth();
  return `${date.getUTCFullYear()}-${month}-${date.getUTCDate() + 1}`;
};

export {
  firstCharToUpperCase,
  getBackgroundForCategory,
  getStatusText,
  getAssignee,
  cn,
  isErrorResponse,
  updateTaskArray,
  getCurrentDate,
};
