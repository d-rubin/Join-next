import { Contact } from "../types";

export const generalHelper = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getBackgroundForCategory = (category: string) => {
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

export const getAssignee = (assignee: number, contacts: Contact[]) => {
  const assignedPerson = contacts?.find((user) => user.id === assignee);
  return assignedPerson?.username;
};
