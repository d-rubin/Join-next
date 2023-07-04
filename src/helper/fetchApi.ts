import * as process from "process";

interface TokenResponse {
  token?: string;
}

const fetchApi = (url: string, options?: RequestInit): Promise<Response> => {
  return fetch(`${process.env.API_URL}${url}`, options);
};

const register = (): Promise<TokenResponse> => {
  return fetchApi("/auth/register/", { method: "POST" });
};

const login = () => {
  return fetchApi("/auth/login", { method: "POST" });
};

export default fetchApi;
