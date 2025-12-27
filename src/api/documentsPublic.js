import { api } from "./http";

// LIST publik pakai endpoint yang memang ada: GET /api/documents
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

  // backend kamu baca param "search" (bukan q)
  const keyword = (search ?? q ?? "").toString().trim();

  const query = {
    page,
    limit,
    prodi,
    tipe,
    tahun,
    ...(keyword ? { search: keyword } : {}),
  };

  const { data } = await api.get("/documents", { params: query });
  return data;
}

// DETAIL publik juga pakai endpoint yang ada: GET /api/documents/:id
export async function getPublicDocumentById(id) {
  const { data } = await api.get(`/documents/${id}`);
  return data;
}
