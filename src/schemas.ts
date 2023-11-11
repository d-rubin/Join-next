import { z } from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
  rememberMe: z.boolean().optional(),
});

const signInSchema = z
  .object({
    name: z
      .string()
      .min(3, "The username must be at least 3 characters")
      .max(30, "The password can be at most 30 characters"),
    email: z.string().email("The email must be an existing email"),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters")
      .max(50, "The password can be at most 50 characters"),
    secondPassword: z.string(),
  })
  .refine((data) => data.password === data.secondPassword, {
    message: "The passwords must match",
    path: ["secondPassword"],
  });

const taskSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(4, "The title must have at least 4 characters")
    .max(50, "The title can have at most 50 characters"),
  description: z.string().min(1, "A description is required").max(100, "The description can be at most 100 characters"),
  assignee: z.string().min(1, "Please select person to assign"),
  due_date: z.string().min(1, "Please add the date the task is scheduled"),
  category: z.string().min(3, "Select a category"),
  status: z.string(),
});

export { loginSchema, signInSchema, taskSchema };
