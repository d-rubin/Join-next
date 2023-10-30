"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Task } from "../types";
import { updateTask } from "./fetchApi";

export const isUserLoggedIn = (): boolean => {
  return !!cookies().get("authToken");
};

export const patchTaskStatus = (task: Task, update: string) => {
  updateTask({ ...task, ...{ status: update } }).then(() => {
    revalidatePath("/board");
  });
};
