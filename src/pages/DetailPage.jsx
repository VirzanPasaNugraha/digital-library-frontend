import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PDFPreview from "../components/PDFPreview";
import { getPublicDocumentById } from "../api/documentsPublic";

/* ===================== AUTH HELPER ===================== */
function getToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

/* ===================== PRODI MAPPING ===================== */
const PRODI_LABEL = {
  IF: "Informatika",
  SI: "Sistem Informasi",
};

export default function DetailPage() {
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // 👉 SATU SUMBER KEBENARAN AUTH
  const isAuthenticated = Boolean(getToken());

  /* ===================== FETCH DATA ===================== */
  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setMessage("");
      try {
        const res = await getPublicDocumentById(id);
        setFile(res.document);
      } catch (err) {
        setMessage(
          err?.userMessage ||
            err?.response?.data?.message ||
            "Dokumen tidak ditemukan."
        );
        setFile(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  /* ===================== STATE HANDLING ===================== */
  if (loading) {
    return (
      <p className="mt-10 text-center text-gray-500">
        Memuat dokumen...
      </p>
    );
  }

  if (!file) {
    return (
      <p className="mt-10 text-center text-gray-500">
        {message || "Dokumen tidak ditemukan."}
      </p>
    );
  }

  /* ===================== RENDER ===================== */
  return (
    <div className="max-w-6xl px-4 py-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
        {file.judul}
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ===================== INFO ===================== */}
        <div className="p-5 bg-white shadow rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-green-700">
            Informasi Dokumen
          </h2>

          <ul className="space-y-2 text-sm text-gray-700">
            <li><b>Jenis Dokumen:</b> {file.tipe}</li>
            <li><b>Penulis:</b> {file.penulis}</li>
            <li><b>NIM:</b> {file.nim || "-"}</li>
            <li>
              <b>Program Studi:</b>{" "}
              {PRODI_LABEL[file.prodi] || file.prodi}
            </li>
            <li><b>Tahun:</b> {file.tahun}</li>
            <li>
              <b>Pembimbing:</b>{" "}
              {(file.pembimbing || []).length
                ? file.pembimbing.join(", ")
                : "-"}
            </li>
            <li>
              <b>Kata Kunci:</b>{" "}
              {(file.keywords || []).length
                ? file.keywords.join("; ")
                : "-"}
            </li>
          </ul>

          {/* ===================== ACTION BUTTONS ===================== */}
          {isAuthenticated ? (
            <button
              onClick={() => setOpenPreview(true)}
              className="w-full mt-5 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Lihat Dokumen
            </button>
          ) : (
            <p className="mt-5 text-sm text-center text-gray-500">
              Login untuk melihat dan mengunduh dokumen.
            </p>
          )}
        </div>

        {/* ===================== ABSTRACT ===================== */}
        <div className="p-5 bg-white shadow lg:col-span-2 rounded-xl">
          <h2 className="mb-4 text-lg font-semibold text-green-700">
            Abstrak
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            {file.abstrak || "-"}
          </p>
        </div>
      </div>

      {/* ===================== PREVIEW MODAL ===================== */}
      {isAuthenticated && openPreview && file?.pdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-lg relative flex flex-col">
            <button
              onClick={() => setOpenPreview(false)}
              className="absolute text-2xl text-gray-600 top-3 right-4 hover:text-black"
            >
              ✕
            </button>

            <div className="p-4 font-semibold text-green-700 border-b">
              Lihat Dokumen
            </div>

            <div className="flex-1 p-4 overflow-auto">
              <PDFPreview url={file.pdfUrl} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
