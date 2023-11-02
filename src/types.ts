export type Task = {
  id?: number;
  title: string;
  description: string;
  due_date: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: string;
  assignee: number;
};

export type Contact = {
  id: number;
  username: string;
  email: string;
};

export type PrioType = "high" | "medium" | "low";
