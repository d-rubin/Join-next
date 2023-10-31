"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { Task } from "../types";
import { ErrorResponse, fetchApi, TokenResponse, updateTask } from "./fetchApi";
import { AddTaskSchema, LoginSchema } from "../schemas";

const fetchServer = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const authToken = cookies().get("authToken")?.value;
  return fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${authToken}`,
    },
  }).then((res) => res.json() as T);
};

const isUserLoggedIn = (): boolean => {
  return !!cookies().get("authToken");
};

const patchTaskStatus = (task: Task, update: string) => {
  updateTask({ ...task, ...{ status: update } }).then(() => {
    revalidatePath("/board");
  });
};

const getTasks = async () => {
  const response = await fetchServer("/tasks/", { method: "GET" }).then((res) => {
    return res as Task[];
  });

  if (response[0]) return response;

  return [];
};

const register = async (body: Object): Promise<TokenResponse | ErrorResponse> => {
  return fetchApi("/auth/register/", { method: "POST", body: JSON.stringify(body) }).then(
    (res) => res as TokenResponse | ErrorResponse,
  );
};

const login = async (formData: FormData, rememberMe: boolean = false): Promise<TokenResponse | ErrorResponse> => {
  const body = LoginSchema.parse({
    username: formData.get("username"),
    password: formData.get("password"),
    rememberMe,
  });
  const response = await fetchApi<TokenResponse | ErrorResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.status === 200) {
    const tokenResponse = response as TokenResponse;
    const expires = rememberMe ? Date.now() + 30 * 86400000 : Date.now() + 86400000;

    cookies().set("authToken", tokenResponse.token, { expires });
    return redirect("/summary", RedirectType.push);
  }

  return { status: response.status, message: "Ups! Wrong password. Try again." };
};

const createTask = async (
  formData: FormData,
  priority: "low" | "medium" | "high" = "low",
): Promise<Task | ErrorResponse> => {
  const body = AddTaskSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    assignee: formData.get("assignee"),
    due_date: formData.get("due_date"),
    category: formData.get("category"),
    priority,
  });

  const response = await fetchApi<Task | ErrorResponse>("/tasks/", { method: "POST", body: JSON.stringify(body) });
  if ("id" in response) {
    revalidatePath("/board");
    return response;
  }

  return { status: response.status, message: "Error while creating the Task" } as ErrorResponse;
};

export { getTasks, isUserLoggedIn, patchTaskStatus, login, register, createTask };
