import * as process from "process";

export interface TokenResponse {
  token?: string;
}

const fetchApi = (url: string, options?: RequestInit) => {
  return fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
  });
};

const register = (body: string): Promise<TokenResponse> => {
  return fetchApi("/auth/register/", { method: "POST", body }).then((res) => res as TokenResponse);
};

const login = (): Promise<TokenResponse> => {
  return fetchApi("/auth/login", { method: "POST" }).then((res) => res as TokenResponse);
};

export { fetchApi, register, login };
