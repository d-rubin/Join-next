"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Task } from "../types";
import { fetchApi, updateTask } from "./fetchApi";

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

export { getTasks, isUserLoggedIn, patchTaskStatus };
