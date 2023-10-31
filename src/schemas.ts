import { z } from "zod";

const LoginSchema = z.object({
  username: z.string().max(30),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

export { LoginSchema };
