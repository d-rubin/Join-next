import * as process from "process";

const fetchApi = (url: string, options?: RequestInit): Promise<Response> => {
  return fetch(`${process.env.API_URL}${url}`, options);
};

export default fetchApi;
