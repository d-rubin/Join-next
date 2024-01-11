"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { Contact, ErrorResponse, Tags, Task, TokenResponse, TSubtask } from "../types";
import { loginSchema, signInSchema, taskSchema } from "../schemas";

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

// Todo: is probably not working with "use server"
const isUserLoggedIn = (): boolean => {
  return !!cookies().get("authToken");
};

const updateTask = async (task: unknown): Promise<ErrorResponse | Task> => {
  let response: Task | ErrorResponse | null = null;
  if (task && typeof task === "object" && "id" in task)
    response = await fetchServer<Task | ErrorResponse>(`/tasks/${task.id}/`, {
      method: "PATCH",
      cache: "no-store",
      body: JSON.stringify(task),
    });

  if (!response) {
    return { status: 404, message: "Couldn't update the Task." } as ErrorResponse;
  }

  revalidateTag(Tags.Tasks);
  revalidateTag(Tags.Subtasks);
  return response;
};

const getTasks = async () => {
  const response = await fetchServer("/tasks/", { next: { tags: [Tags.Tasks] }, cache: "no-store" }).then((res) => {
    return res as Task[];
  });

  if (response[0]) return response;

  return [];
};

const patchTaskStatus = async (task: Task, update: string) => {
  await updateTask({ ...task, ...{ status: update } });
  revalidateTag(Tags.Tasks);
  return getTasks();
};

const register = async (body: unknown) => {
  const isValid = signInSchema.safeParse(body);

  if (!isValid.success) {
    const { error } = isValid;

    // todo: Resolve errors
    if (error.name) return { status: 401, name: "name", message: error.name } as ErrorResponse;
    // if (error.email) return { status: 401, name: "name", message: error.name };
    // if (error.password) return { status: 401, name: "name", message: error.name };
    // if (error.secondPassword) return { status: 401, name: "name", message: error.name };
    return { status: 404, name: "secondPassword", message: "Something went wrong." } as ErrorResponse;
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
      // Todo: Check if Error "can not mutate cookies SSR" is still throwing
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
    revalidateTag(Tags.Tasks);
    return response;
  }

  return { status: response.status, message: "Couldn't create the Task" } as ErrorResponse;
};

const getContacts = async () => {
  return fetchServer<Contact[]>("/contacts/", { next: { tags: [Tags.Contacts] } });
};

const getCurrentUser = async () => {
  return fetchServer<{ username: string; email: string }>("/contacts/currentUser", { next: { tags: [Tags.User] } });
};

const deleteTask = async (id: number) => {
  fetchServer(`/tasks/${id}/`, { method: "DELETE" }).then(() => {
    revalidateTag(Tags.Tasks);
    revalidateTag(Tags.Subtasks);
  });
};

const getSubtasks = async () => {
  return fetchServer<TSubtask[]>("/tasks/subtasks", { next: { tags: [Tags.Subtasks] }, cache: "no-store" });
};

const createSubtask = async (subtask: TSubtask) => {
  const response = await fetchServer<TSubtask | ErrorResponse>(`/tasks/subtasks/create/`, {
    method: "POST",
    body: JSON.stringify(subtask),
  });
  revalidateTag(Tags.Subtasks);
  return response;
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
  return { message: "Subtask has no id", status: 400 } as ErrorResponse;
};

const deleteSubtask = async (subtaskId: number) => {
  return fetchServer(`/tasks/subtasks/edit/${subtaskId}`, {
    method: "DELETE",
  }).then((res) => {
    revalidateTag(Tags.Subtasks);
    return res;
  });
};

const handleMutateSubtasks = async (mutatedSubtasks: TSubtask[], taskId?: number) => {
  await Promise.all(
    mutatedSubtasks.map(async (subtask) => {
      if (subtask.id) {
        if (subtask.toDelete) {
          await deleteSubtask(subtask.id);
        } else {
          await updateSubtask(subtask);
        }
      } else if (taskId) await createSubtask(subtask);
    }),
  ).then((res) => {
    revalidateTag(Tags.Subtasks);
    return res;
  });
};

const revalidateTagCSR = (tag: string) => revalidateTag(tag);

export {
  createTask,
  getTasks,
  updateTask,
  patchTaskStatus,
  deleteTask,
  getContacts,
  getSubtasks,
  createSubtask,
  updateSubtask,
  deleteSubtask,
  handleMutateSubtasks,
  login,
  register,
  isUserLoggedIn,
  logout,
  getCurrentUser,
  revalidateTagCSR,
};
