"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { Task } from "../types";
import { ErrorResponse, TokenResponse } from "./fetchApi";
import { loginSchema, signInSchema, taskSchema } from "../schemas";

const fetchServer = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const authToken = cookies().get("authToken")?.value;

  return fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(authToken ? { Authorization: `Token ${authToken}` } : {}) },
  }).then((res) => res.json() as T);
};

const logout = () => {
  cookies().delete("authToken");
  revalidatePath("/", "layout");
  redirect("/logout", RedirectType.replace);
};

const isUserLoggedIn = (): boolean => {
  return !!cookies().get("authToken");
};

const updateTask = async (task: unknown): Promise<ErrorResponse | null> => {
  let response: Task | ErrorResponse | null = null;

  if (task && typeof task === "object" && "id" in task)
    response = await fetchServer<Task | ErrorResponse>(`/tasks/${task.id}/`, {
      method: "PATCH",
      body: JSON.stringify(task),
    });

  if (!response) {
    return { status: 404, message: "Couldn't update the Task." } as ErrorResponse;
  }

  revalidateTag("tasks");
  return null;
};

const patchTaskStatus = (task: Task, update: string) => {
  return updateTask({ ...task, ...{ status: update } });
};

const getTasks = async () => {
  const response = await fetchServer("/tasks/", { method: "GET", next: { tags: ["tasks"] } }).then((res) => {
    return res as Task[];
  });

  if (response[0]) return response;

  return [];
};

const register = async (body: unknown) => {
  const isValid = signInSchema.safeParse(body);

  if (!isValid.success) {
    const { error } = isValid;

    // todo: Resolve errors
    if (error.name) return { status: 401, name: "name", message: error.name };
    // if (error.email) return { status: 401, name: "name", message: error.name };
    // if (error.password) return { status: 401, name: "name", message: error.name };
    // if (error.secondPassword) return { status: 401, name: "name", message: error.name };
    return { status: 404, name: "secondPassword", message: "Something went wrong." };
  }

  const response = await fetchServer<TokenResponse | ErrorResponse>("/auth/register/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (response.status === 201) {
    cookies().set("authToken", (response as TokenResponse).token, { expires: new Date(Date.now() + 86400000) });
    return response as TokenResponse;
  }
  if ("message" in response) {
    switch (response.message) {
      case "Email already in use":
        return { status: response.status, name: "email", message: response.message };
      case "Name already in use":
        return { status: response.status, name: "name", message: response.message };
      default:
        return { status: response.status, name: "secondPassword", message: response.message };
    }
  }

  return { detail: "Invalid token." };
};

const login = async (fieldValues: unknown, rememberMe: boolean = false) => {
  const isValid = loginSchema.safeParse(fieldValues);

  if (isValid.success) {
    const response = await fetchServer<TokenResponse | ErrorResponse>("/auth/login/", {
      method: "POST",
      body: JSON.stringify(isValid.data),
    });

    if (response.status === 200) {
      const expires = new Date(rememberMe ? Date.now() + 30 * 86400000 : Date.now() + 86400000);
      cookies().set("authToken", (response as TokenResponse).token, { expires });
      redirect("/summary", RedirectType.push);
    }
  }

  return { status: 401, message: "Ups! Wrong password. Try again." } as ErrorResponse;
};

const createTask = async (body: unknown) => {
  const isValid = taskSchema.safeParse(body);

  if (!isValid.success) {
    // const { error } = isValid;

    // todo: Resolve errors
    // if (error.title) return { status: 401, name: "name", message: error.name };
    // if (error.email) return { status: 401, name: "name", message: error.name };
    // if (error.password) return { status: 401, name: "name", message: error.name };
    // if (error.secondPassword) return { status: 401, name: "name", message: error.name };
    return { status: 404, message: "Couldn't create the Task" } as ErrorResponse;
  }

  const response = await fetchServer<Task | ErrorResponse>("/tasks/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if ("id" in response) {
    revalidateTag("tasks");
    return redirect("/board", RedirectType.push);
  }

  return { status: response.status, message: "Couldn't create the Task" } as ErrorResponse;
};

const getCurrentUser = () => {
  return fetchServer<{ username: string; email: string }>("/contacts/currentUser");
};

const deleteTask = (id: number) => {
  fetchServer(`/tasks/${id}/`, { method: "DELETE" }).then(() => {
    revalidateTag("tasks");
    return redirect("/board");
  });
};

export {
  createTask,
  getTasks,
  updateTask,
  patchTaskStatus,
  deleteTask,
  login,
  register,
  isUserLoggedIn,
  logout,
  getCurrentUser,
};
