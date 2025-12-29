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
  const { data } = await api.get("/api/documents", { params });
  return data;
}

/** Admin: upload dokumen manual */
export async function adminUploadDocument(payload) {
  const fd = new FormData();

  Object.entries(payload || {}).forEach(([k, v]) => {
    if (k === "file") {
      if (v) fd.append("file", v);
      return;
    }
    appendSmart(fd, k, v);
  });

  const { data } = await api.post(
    "/api/documents/_admin/upload",
    fd,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return data;
}

export async function getDocument(id) {
  const { data } = await api.get(`/api/documents/${id}`);
  return data;
}

/** Mahasiswa: list dokumen milik sendiri (support pagination/search params) */
export async function listMyDocuments(params = {}) {
  const { data } = await api.get("/api/documents/_me/list", { params });
  return data;
}

/** Admin: list dokumen */
export async function adminListDocuments(params = {}) {
  const { data } = await api.get("/api/documents/_admin/list", { params });
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

  const { data } = await api.post("/api/documents", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

/** Admin: terima/tolak */
export async function setDocumentStatus(id, status, alasanPenolakan = "") {
  const { data } = await api.patch(`/api/documents/${id}/status`, {
    status,
    alasanPenolakan,
  });
  return data;
}

/** Admin: update metadata */
export async function adminUpdateDocument(id, payload) {
  const { data } = await api.patch(`/api/documents/${id}`, payload);
  return data;
}

/** Admin: delete */
export async function deleteDocument(id) {
  const { data } = await api.delete(`/api/documents/${id}`);
  return data;
}
