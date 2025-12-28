import { api } from "./http";

<<<<<<< HEAD
// LIST publik
export async function listPublicDocuments(params = {}) {
  const { page = 1, limit = 12, q, search, prodi, tipe, tahun } = params;

=======
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
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  const keyword = (search ?? q ?? "").toString().trim();

  const query = {
    page,
    limit,
    prodi,
    tipe,
    tahun,
    ...(keyword ? { search: keyword } : {}),
  };

<<<<<<< HEAD
  const { data } = await api.get("/api/documents", { params: query });
  return data;
}

// DETAIL publik
export async function getPublicDocumentById(id) {
  const { data } = await api.get(`/api/documents/${id}`);
=======
  const { data } = await api.get("/documents", { params: query });
  return data;
}

// DETAIL publik juga pakai endpoint yang ada: GET /api/documents/:id
export async function getPublicDocumentById(id) {
  const { data } = await api.get(`/documents/${id}`);
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}
