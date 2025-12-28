import { api } from "./http";

export async function apiRegister(payload) {
<<<<<<< HEAD
  const { data } = await api.post("/api/auth/register", payload);
=======
  const { data } = await api.post("/auth/register", payload);
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}

export async function apiLogin(email, password) {
<<<<<<< HEAD
  const { data } = await api.post("/api/auth/login", { email, password });
=======
  const { data } = await api.post("/auth/login", { email, password });
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}

export async function apiMe() {
<<<<<<< HEAD
  const { data } = await api.get("/api/auth/me");
=======
  const { data } = await api.get("/auth/me");
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}
