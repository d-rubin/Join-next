"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { Task } from "../types";
import { ErrorResponse, fetchApi, TokenResponse, updateTask } from "./fetchApi";
import { LoginSchema } from "../schemas";

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
export { getTasks, isUserLoggedIn, patchTaskStatus, login, register };
