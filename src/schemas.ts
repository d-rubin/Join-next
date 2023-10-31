import { z } from "zod";

const LoginSchema = z.object({
  username: z.string().max(30),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

const AddTaskSchema = z.object({
  title: z.string().max(50),
  description: z.string().max(100),
  assignee: z.string(),
  due_date: z.string(),
  category: z.string(),
  priority: z.string(),
});

export { LoginSchema, AddTaskSchema };
