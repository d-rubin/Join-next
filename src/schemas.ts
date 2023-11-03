import { z } from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
  rememberMe: z.boolean().optional(),
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

export { loginSchema, AddTaskSchema };
