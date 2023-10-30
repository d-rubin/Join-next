"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { Task } from "../types";
import { ErrorResponse, fetchApi, TokenResponse, updateTask } from "./fetchApi";

const LoginSchema = z.object({
  username: z.string().max(30),
  password: z.string().min(8),
});

const isUserLoggedIn = (): boolean => {
  return !!cookies().get("authToken");
};

const patchTaskStatus = (task: Task, update: string) => {
  updateTask({ ...task, ...{ status: update } }).then(() => {
    revalidatePath("/board");
  });
};

const getTasks = async () => {
  return fetchApi("/tasks/", { method: "GET" }).then((res) => res as Task[]);
};

const register = async (body: Object): Promise<TokenResponse | ErrorResponse> => {
  return fetchApi("/auth/register/", { method: "POST", body: JSON.stringify(body) }).then(
    (res) => res as TokenResponse | ErrorResponse,
  );
};

const login = async (formData: FormData): Promise<TokenResponse | ErrorResponse> => {
  const body = LoginSchema.parse({ username: formData.get("username"), password: formData.get("password") });
  const response = await fetchApi("/auth/login/", { method: "POST", body: JSON.stringify(body) });

  if (response.status === 200) return redirect("/summary", RedirectType.push);

  return { status: response.status, message: "Username or password incorrect" };
};
export { getTasks, isUserLoggedIn, patchTaskStatus, login, register };
