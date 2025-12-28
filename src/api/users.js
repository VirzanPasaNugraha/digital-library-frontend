import { api } from "./http";

export async function adminListUsers(params = {}) {
<<<<<<< HEAD
  const { data } = await api.get("/api/users", { params });
=======
  const { data } = await api.get("/users", { params });
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}

export async function adminActivateUser(id) {
<<<<<<< HEAD
  const { data } = await api.patch(`/api/users/${id}/activate`);
=======
  const { data } = await api.patch(`/users/${id}/activate`);
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}

export async function adminBanUser(id, is_banned) {
<<<<<<< HEAD
  const { data } = await api.patch(`/api/users/${id}/ban`, { is_banned });
=======
  const { data } = await api.patch(`/users/${id}/ban`, { is_banned });
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}

export async function adminDeleteUser(id) {
<<<<<<< HEAD
  const { data } = await api.delete(`/api/users/${id}`);
=======
  const { data } = await api.delete(`/users/${id}`);
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}
