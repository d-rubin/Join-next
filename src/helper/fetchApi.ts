import * as process from "process";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Credentials": "true",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
//   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
// };

export interface TokenResponse {
  token?: string;
}

const fetchApi = (url: string, options?: RequestInit) => {
  return fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const register = (body: Object): Promise<TokenResponse> => {
  return fetchApi("/auth/register/", { method: "POST", body: JSON.stringify(body) }).then(
    (res) => res as TokenResponse,
  );
};

const login = (): Promise<TokenResponse> => {
  return fetchApi("/auth/login", { method: "POST" }).then((res) => res as TokenResponse);
};

export { fetchApi, register, login };
