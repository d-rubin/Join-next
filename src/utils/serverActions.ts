"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { TContact, ErrorResponse, Tags, TTask, TokenResponse, TSubtask } from "../types";
import { loginSchema, signInSchema, taskSchema } from "../schemas";
import { isErrorResponse } from "./generalHelper";

const fetchServer = async <T>(url: string, options?: RequestInit): Promise<T | ErrorResponse> => {
  const authToken = cookies().get("authToken")?.value;

  return fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(authToken ? { Authorization: `Token ${authToken}` } : {}) },
  })
    .then((res) => res.json() as T)
    .catch((err) => {
      return { status: 500, message: "Could not fetch. ERROR: ", err } as ErrorResponse;
    });
};

// Todo: Check if Error "can not mutate cookies SSR" is still throwing
const logout = () => {
  cookies().delete("authToken");
  revalidatePath("/", "layout");
  redirect("/logout", RedirectType.replace);
};

const isUserLoggedIn = (): boolean => {
  return !!cookies().get("authToken");
};

const register = async (body: unknown): Promise<ErrorResponse | TokenResponse> => {
  const isValid = signInSchema.safeParse(body);

  if (!isValid.success) {
    const { error } = isValid;

    if (error.name) return { status: 401, name: "name", message: error.name } as ErrorResponse;
    return { status: 404, message: "Something went wrong." } as ErrorResponse;
  }

  const response = await fetchServer<TokenResponse>("/auth/register/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if ("message" in response) {
    switch (response.message) {
      case "Email already in use":
        return { status: response.status, name: "email", message: response.message } as ErrorResponse;
      case "Name already in use":
        return { status: response.status, name: "name", message: response.message } as ErrorResponse;
      default:
        return { status: response.status, name: "secondPassword", message: response.message } as ErrorResponse;
    }
  }

  if (response.status === 201) {
    cookies().set("authToken", response.token, { expires: new Date(Date.now() + 86400000) });
    return response;
  }

  return response;
};

const login = async (fieldValues: unknown, rememberMe: boolean = false): Promise<TokenResponse | ErrorResponse> => {
  const isValid = loginSchema.safeParse(fieldValues);

  if (isValid.success) {
    const response = await fetchServer<TokenResponse>("/auth/login/", {
      method: "POST",
      body: JSON.stringify(isValid.data),
    });

    if (response.status === 200) {
      const expires = new Date(rememberMe ? Date.now() + 30 * 86400000 : Date.now() + 86400000);
      cookies().set("authToken", (response as TokenResponse).token, { expires });
      redirect("/summary", RedirectType.push);
    }
  }

  return { status: 401, message: "Ups! Wrong password. Try again." };
};

const createTask = async (body: unknown): Promise<TTask | ErrorResponse> => {
  const isValid = taskSchema.safeParse(body);

  if (!isValid.success) {
    return { status: 404, message: "Couldn't create the Task" };
  }

  const response = await fetchServer<TTask>("/tasks/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if ("id" in response) {
    revalidateTag(Tags.Tasks);
    return response;
  }

  return { status: +response.status, message: "Couldn't create the Task" };
};

const getTasks = async (): Promise<TTask[] | ErrorResponse> => {
  return fetchServer("/tasks/", { cache: "no-store", next: { tags: [Tags.Tasks] } });
};

const updateTask = async (task: TTask): Promise<TTask[]> => {
  console.log("updatedTask", task);
  const response =
    task.id &&
    (await fetchServer<TTask>(`/tasks/${task.id}/`, {
      method: "PATCH",
      body: JSON.stringify(task),
    }));
  console.log("Response\n", response);

  revalidateTag(Tags.Tasks);
  revalidateTag(Tags.Subtasks);
  const tasks = await getTasks();
  console.log("Tasks\n", tasks);

  if ((tasks && isErrorResponse(tasks)) || (response && isErrorResponse(response))) return [];
  console.log(
    "return \n",
    !isErrorResponse(tasks) ? tasks.map((elem: TTask) => (elem.id === task.id ? task : elem)) : [],
  );
  return !isErrorResponse(tasks) ? tasks.map((elem: TTask) => (elem.id === task.id ? task : elem)) : [];
};

const deleteTask = async (id: number): Promise<ErrorResponse> => {
  return fetchServer(`/tasks/${id}/`, { method: "DELETE" }).then(() => {
    revalidateTag(Tags.Tasks);
    revalidateTag(Tags.Subtasks);
    return { status: 200, message: "OK" };
  });
};

const getCurrentUser = async () => {
  return fetchServer<{ username: string; email: string }>("/contacts/currentUser", { next: { tags: [Tags.User] } });
};

const getContacts = async (): Promise<TContact[] | ErrorResponse> => {
  return fetchServer<TContact[]>("/contacts/", { next: { tags: [Tags.Contacts] } });
};

const createSubtask = async (subtask: TSubtask): Promise<TSubtask | ErrorResponse> => {
  const response = await fetchServer<TSubtask>(`/tasks/subtasks/create/`, {
    method: "POST",
    body: JSON.stringify(subtask),
  });
  revalidateTag(Tags.Subtasks);
  return response;
};

const getSubtasks = async () => {
  return fetchServer<TSubtask[]>("/tasks/subtasks", { next: { tags: [Tags.Subtasks] }, cache: "no-store" });
};

const updateSubtask = async (subtask: TSubtask): Promise<TSubtask | ErrorResponse> => {
  if (subtask.id)
    return fetchServer<TSubtask>(`/tasks/subtasks/edit/${subtask.id}`, {
      method: "PATCH",
      body: JSON.stringify(subtask),
    }).then((res) => {
      revalidateTag(Tags.Subtasks);
      return res;
    });
  return { message: "Subtask has no id", status: 400 };
};

const deleteSubtask = async (subtaskId: number): Promise<ErrorResponse> => {
  if (subtaskId)
    return fetchServer(`/tasks/subtasks/edit/${subtaskId}`, {
      method: "DELETE",
    }).then(() => {
      revalidateTag(Tags.Subtasks);
      return { message: "OK", status: 200 };
    });
  return { message: "Subtask has no id", status: 400 };
};

const handleMutateSubtasks = async (mutatedSubtasks: TSubtask[], taskId?: number): Promise<ErrorResponse> => {
  return Promise.all(
    mutatedSubtasks.map(async (subtask) => {
      if (subtask.id) {
        if (subtask.toDelete) {
          await deleteSubtask(subtask.id);
        } else {
          await updateSubtask(subtask);
        }
      } else if (taskId) await createSubtask(subtask);
    }),
  ).then(() => {
    revalidateTag(Tags.Subtasks);
    return { message: "OK", status: 200 };
  });
};

const revalidateTagCSR = (tag: string) => revalidateTag(tag);

export {
  logout,
  isUserLoggedIn,
  login,
  register,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getCurrentUser,
  getContacts,
  createSubtask,
  getSubtasks,
  updateSubtask,
  deleteSubtask,
  handleMutateSubtasks,
  revalidateTagCSR,
};
