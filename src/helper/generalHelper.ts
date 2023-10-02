import { User } from "../interface";

export const generalHelper = (string: string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getBackgroundForCategory = (category: string) => {
  switch (category) {
    case "media":
      return "bg-media";
    case "marketing":
      return "bg-marketing";
    case "backoffice":
      return "bg-backoffice";
    case "sales":
      return "bg-sales";
    default:
      return "bg-design";
  }
};

export const getAssignee = (assignee: number, contacts: User[]) => {
  const assignedPerson = contacts?.find((user) => user.id === assignee);
  return assignedPerson?.username;
};
