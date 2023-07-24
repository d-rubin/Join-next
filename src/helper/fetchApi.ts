import * as process from "process";
import { Task, User } from "../interface";

export interface CustomResponse {
  status: number;
}

export interface TokenResponse extends CustomResponse {
  token?: string;
}

const fetchApi = (url: string, options?: RequestInit) => {
  const result = fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return result;
};

const register = (body: Object): Promise<TokenResponse> => {
  return fetchApi("/auth/register/", { method: "POST", body: JSON.stringify(body) }).then(
    (res) => res as TokenResponse,
  );
};

const login = (body: Object): Promise<TokenResponse> => {
  return fetchApi("/auth/login/", { method: "POST", body: JSON.stringify(body) }).then((res) => res as TokenResponse);
};

const getTasks = () => {
  return fetchApi("/tasks/", { method: "GET" }).then((res) => res as Task[]);
};

const getUser = (token: string) => {
  return fetchApi("/contacts/user/", { method: "GET", headers: { Authorization: `Token ${token}` } });
};

const getContacts = (): Promise<User[]> => {
  return fetchApi("/contacts/", { method: "GET" }).then((res) => res);
};

const createTask = (task: Task) => {
  return fetchApi("/tasks/", { method: "POST", body: JSON.stringify(task) });
};

const updateTask = (task: Task) => {
  return fetchApi(`/tasks/${task.id}`, { method: "PATCH", body: JSON.stringify(task) });
};

export { fetchApi, register, login, getTasks, getUser, getContacts, createTask, updateTask };
