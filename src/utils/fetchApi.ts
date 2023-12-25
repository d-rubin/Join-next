import * as process from "process";
import { Contact } from "../types";

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

const getContacts = async (): Promise<Contact[]> => {
  return fetchApi<Contact[]>("/contacts/", { method: "GET" }).then((res) => res);
};

export { fetchApi, getContacts };
