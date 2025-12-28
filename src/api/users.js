import { api } from "./http";

export async function adminListUsers(params = {}) {
  const { data } = await api.get("/api/users", { params });
  return data;
}

export async function adminActivateUser(id) {
  const { data } = await api.patch(`/api/users/${id}/activate`);
  return data;
}

export async function adminBanUser(id, is_banned) {
  const { data } = await api.patch(`/api/users/${id}/ban`, { is_banned });
  return data;
}

export async function adminDeleteUser(id) {
  const { data } = await api.delete(`/api/users/${id}`);
  return data;
}
