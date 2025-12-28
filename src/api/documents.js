import { api } from "./http";

function appendSmart(fd, key, val) {
  if (val === undefined || val === null) return;

  // object/array -> JSON string (keywords, pembimbing, dll)
  if (Array.isArray(val) || (typeof val === "object" && !(val instanceof File))) {
    fd.append(key, JSON.stringify(val));
    return;
  }

  fd.append(key, val);
}

/** Public list (default: diterima) */
export async function listDocuments(params = {}) {
<<<<<<< HEAD
  const { data } = await api.get("/api/documents", { params });
=======
  const { data } = await api.get("/documents", { params });
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}

export async function getDocument(id) {
<<<<<<< HEAD
  const { data } = await api.get(`/api/documents/${id}`);
=======
  const { data } = await api.get(`/documents/${id}`);
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}

/** Mahasiswa: list dokumen milik sendiri (support pagination/search params) */
export async function listMyDocuments(params = {}) {
<<<<<<< HEAD
  const { data } = await api.get("/api/documents/_me/list", { params });
=======
  const { data } = await api.get("/documents/_me/list", { params });
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}

/** Admin: list dokumen */
export async function adminListDocuments(params = {}) {
<<<<<<< HEAD
  const { data } = await api.get("/api/documents/_admin/list", { params });
=======
  const { data } = await api.get("/documents/_admin/list", { params });
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}

/** Upload dokumen (multipart/form-data) */
export async function uploadDocument(payload) {
  const fd = new FormData();

  // Pastikan file key = "file" (multer upload.single("file"))
  Object.entries(payload || {}).forEach(([k, v]) => {
    if (k === "file") {
      if (v) fd.append("file", v);
      return;
    }
    appendSmart(fd, k, v);
  });

<<<<<<< HEAD
  const { data } = await api.post("/api/documents", fd, {
=======
  const { data } = await api.post("/documents", fd, {
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

/** Admin: terima/tolak */
export async function setDocumentStatus(id, status, alasanPenolakan = "") {
<<<<<<< HEAD
  const { data } = await api.patch(`/api/documents/${id}/status`, {
=======
  const { data } = await api.patch(`/documents/${id}/status`, {
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
    status,
    alasanPenolakan,
  });
  return data;
}

/** Admin: update metadata */
export async function adminUpdateDocument(id, payload) {
<<<<<<< HEAD
  const { data } = await api.patch(`/api/documents/${id}`, payload);
=======
  const { data } = await api.patch(`/documents/${id}`, payload);
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}

/** Admin: delete */
export async function deleteDocument(id) {
<<<<<<< HEAD
  const { data } = await api.delete(`/api/documents/${id}`);
=======
  const { data } = await api.delete(`/documents/${id}`);
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
  return data;
}
