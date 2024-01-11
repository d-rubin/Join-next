import { z } from "zod";
import { loginSchema, signInSchema, taskSchema } from "./schemas";

type TPriority = "high" | "medium" | "low";
type TLoginSchema = z.infer<typeof loginSchema>;
type TSignInSchema = z.infer<typeof signInSchema>;
type TTaskSchema = z.infer<typeof taskSchema>;

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

type TContact = {
  id: number;
  username: string;
  email: string;
};

type TTask = {
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

export enum Tags {
  Tasks = "tasks",
  Subtasks = "subtasks",
  User = "user",
  Contacts = "contacts",
  Board = "board",
}

export type { TPriority, TTaskSchema, TLoginSchema, TSignInSchema, TContact, TTask, TSubtask };
