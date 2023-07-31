import * as process from "process";
import { Task, User } from "../interface";

export type CustomResponse = {
  status: number;
  data: Object;
};

export interface TokenResponse extends CustomResponse {
  token?: string;
}

const fetchApi = async (url: string, options?: RequestInit) => {
  return fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const register = async (body: Object): Promise<TokenResponse> => {
  return fetchApi("/auth/register/", { method: "POST", body: JSON.stringify(body) }).then(
    (res) => res as TokenResponse,
  );
};

const login = async (body: Object): Promise<TokenResponse> => {
  return fetchApi("/auth/login/", { method: "POST", body: JSON.stringify(body) }).then((res) => res as TokenResponse);
};

const getTasks = async () => {
  return fetchApi("/tasks/", { method: "GET" }).then((res) => res as Task[]);
};

const getUser = async (token: string) => {
  return fetchApi("/contacts/user/", { method: "GET", headers: { Authorization: `Token ${token}` } });
};

const getContacts = async (): Promise<User[]> => {
  return fetchApi("/contacts/", { method: "GET" }).then((res) => res);
};

const createTask = async (task: Task) => {
  return fetchApi("/tasks/", { method: "POST", body: JSON.stringify(task) });
};

const updateTask = async (task: Task) => {
  return fetchApi(`/tasks/${task.id}`, { method: "PATCH", body: JSON.stringify(task) });
};

export { fetchApi, register, login, getTasks, getUser, getContacts, createTask, updateTask };
