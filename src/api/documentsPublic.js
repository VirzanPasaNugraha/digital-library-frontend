import { api } from "./http";

/**
 * LIST / SEARCH publik
 * - Tanpa keyword  -> GET /api/documents
 * - Dengan keyword -> GET /api/documents/search (SEMANTIC)
 */
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

  const keyword = (search ?? q ?? "").toString().trim();

  // ===============================
  // 🔥 SEMANTIC SEARCH
  // ===============================
  if (keyword) {
    const { data } = await api.get("/api/documents/search", {
      params: { q: keyword },
    });
    return data;
  }

  // ===============================
  // 🔁 LIST BIASA
  // ===============================
  const query = {
    page,
    limit,
    prodi,
    tipe,
    tahun,
  };

  const { data } = await api.get("/api/documents", { params: query });
  return data;
}

// DETAIL publik
export async function getPublicDocumentById(id) {
  const { data } = await api.get(`/api/documents/${id}`);
  return data;
}
