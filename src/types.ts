import { z } from "zod";
import { taskSchema, loginSchema, signInSchema } from "./schemas";

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
type TSignInSchema = z.infer<typeof signInSchema>;
type TTaskSchema = z.infer<typeof taskSchema>;

type PrioType = "high" | "medium" | "low";

export type { PrioType, TTaskSchema, TLoginSchema, TSignInSchema, Contact, Task };
