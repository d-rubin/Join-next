import { z } from "zod";

const LoginSchema = z.object({
  username: z.string().max(30),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

const AddTaskSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(4, "The title must have at least 4 characters")
    .max(50, "The title can have at most 50 characters"),
  description: z.string().max(100),
  assignee: z.string(),
  due_date: z.string(),
  category: z.string(),
  priority: z.string(),
});

export { LoginSchema, AddTaskSchema };
