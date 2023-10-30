"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Task } from "../types";
import { ErrorResponse, fetchApi, TokenResponse, updateTask } from "./fetchApi";

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

const login = async (body: Object): Promise<TokenResponse> => {
  return fetchApi("/auth/login/", { method: "POST", body: JSON.stringify(body) }).then((res) => res as TokenResponse);
};
export { getTasks, isUserLoggedIn, patchTaskStatus, login, register };
