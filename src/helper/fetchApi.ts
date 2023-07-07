import * as process from "process";
import { Task } from "../interface";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Credentials": "true",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
//   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
// };

export interface CustomResponse {
  status: number;
}

export interface TokenResponse extends CustomResponse {
  token?: string;
}

const fetchApi = (url: string, options?: RequestInit) => {
  return fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
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
  return fetchApi("/contacts/user/", { method: "GET", headers: { Authorization: `Token ${token}` } }).then(
    (res) => res,
  );
};

export { fetchApi, register, login, getTasks, getUser };
