import { api } from "./http";

// LIST publik
// Endpoint: GET /api/documents
export async function listPublicDocuments(params = {}) {
  const {
    page = 1,
    limit = 12,
    q,
    search,
    prodi,
    tipe,
    tahun,
  } = params;

  // backend membaca param "search"
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
// Endpoint: GET /api/documents/:id
export async function getPublicDocumentById(id) {
  const { data } = await api.get(`/api/documents/${id}`);
  return data;
}
