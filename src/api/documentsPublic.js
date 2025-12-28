import { api } from "./http";

// LIST publik
export async function listPublicDocuments(params = {}) {
  const { page = 1, limit = 12, q, search, prodi, tipe, tahun } = params;

  const keyword = (search ?? q ?? "").toString().trim();

  const query = {
    page,
    limit,
    prodi,
    tipe,
    tahun,
    ...(keyword ? { search: keyword } : {}),
  };

  const { data } = await api.get("/api/documents", { params: query });
  return data;
}

// DETAIL publik
export async function getPublicDocumentById(id) {
  const { data } = await api.get(`/api/documents/${id}`);
  return data;
}
