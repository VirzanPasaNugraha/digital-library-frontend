import { api } from "./http";

export async function apiRegister(payload) {
  const { data } = await api.post("/api/auth/register", payload);
  return data;
}

export async function apiLogin(email, password) {
  const { data } = await api.post("/api/auth/login", { email, password });
  return data;
}

export async function apiMe() {
  const { data } = await api.get("/api/auth/me");
  return data;
}
