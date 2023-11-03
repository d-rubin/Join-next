import { z } from "zod";
import { AddTaskSchema, loginSchema } from "./schemas";

type Task = {
  id?: number;
  title: string;
  description: string;
  due_date: string;
  category: string;
  priority: "high" | "medium" | "low";
  status: string;
  assignee: number;
};

type Contact = {
  id: number;
  username: string;
  email: string;
};

type TLoginSchema = z.infer<typeof loginSchema>;
type TAddTaskSchema = z.infer<typeof AddTaskSchema>;

type PrioType = "high" | "medium" | "low";

export type { PrioType, TAddTaskSchema, TLoginSchema, Contact, Task };
