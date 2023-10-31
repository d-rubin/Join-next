import * as process from "process";
import { Contact, Task } from "../types";

export type CustomResponse = {
  status: number;
  data: Object;
};

export interface TokenResponse extends Omit<CustomResponse, "data"> {
  token: string;
}

export interface ErrorResponse extends Omit<CustomResponse, "data"> {
  message: string;
}

const fetchApi = async <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json() as T);
};

const getUser = async (token: string) => {
  return fetchApi("/contacts/user/", { method: "GET", headers: { Authorization: `Token ${token}` } });
};

const getContacts = async (): Promise<Contact[]> => {
  return fetchApi<Contact[]>("/contacts/", { method: "GET" }).then((res) => res);
};

const createTask = async (task: Task): Promise<Task | { status: 400 }> => {
  return fetchApi("/tasks/", { method: "POST", body: JSON.stringify(task) });
};

const updateTask = async (task: Task) => {
  return fetchApi(`/tasks/${task.id}/`, { method: "PATCH", body: JSON.stringify(task) });
};

export { fetchApi, getUser, getContacts, createTask, updateTask };
