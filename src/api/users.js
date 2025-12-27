import { api } from "./http";

export async function adminListUsers(params = {}) {
  const { data } = await api.get("/users", { params });
  return data;
}

export async function adminActivateUser(id) {
  const { data } = await api.patch(`/users/${id}/activate`);
  return data;
}

export async function adminBanUser(id, is_banned) {
  const { data } = await api.patch(`/users/${id}/ban`, { is_banned });
  return data;
}

export async function adminDeleteUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}
