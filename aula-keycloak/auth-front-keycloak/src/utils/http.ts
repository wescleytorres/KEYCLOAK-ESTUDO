import axios from "axios";
import { parseCookies } from "nookies";

export const http = axios.create({
  baseURL: "http://localhost:3000",
});

http.interceptors.request.use((request) => {
  if (!(typeof window === "undefined")) {
    return request;
  }

  const token = parseCookies(undefined);

  if (token["token"]) {
    request.headers["Authorization"] = `Bearer ${token["token"]}`;
  }

  return request;
});
