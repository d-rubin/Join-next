import { z } from "zod";
import { loginSchema, signInSchema, taskSchema } from "./schemas";

export type CustomResponse = {
  status: number;
  data: Object;
};

export type TokenResponse = Omit<CustomResponse, "data"> & {
  token: string;
};

export type ErrorResponse = Omit<CustomResponse, "data"> & {
  message: string;
};

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

type TSubtask = {
  label: string;
  is_done: boolean;
  task?: number;
  id?: number;
  toDelete?: boolean;
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

export type { PrioType, TTaskSchema, TLoginSchema, TSignInSchema, Contact, Task, TSubtask };

export enum Tags {
  Tasks = "tasks",
  Subtasks = "subtasks",
  User = "user",
  Contacts = "contacts",
  Board = "board",
}
