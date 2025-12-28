import { useEffect, useMemo, useState } from "react";
import PDFPreview from "../../components/PDFPreview";
import { STATUS } from "../../constants/status";
import { adminListDocuments, setDocumentStatus } from "../../api/documents";

function withWatermark(url) {
  if (!url) return "";
  return url.replace(
    "/upload/",
    "/upload/fl_layer_apply,l_watermark,g_center,o_20,w_0.6/"
  );
}

export default function ReviewLaporan() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [openReject, setOpenReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const reviewFiles = useMemo(
    () => files.filter((f) => f.status === STATUS.PENDING),
    [files]
  );

  const fetchPending = async () => {
    setLoading(true);
    setMessage("");
    try {
      const { documents } = await adminListDocuments({ status: STATUS.PENDING });
      setFiles(documents || []);

      if (selectedFile) {
        const still = (documents || []).find((d) => d.id === selectedFile.id);
        if (!still) setSelectedFile(null);
        else setSelectedFile(still);
      }
    } catch (err) {
      setMessage(
        err?.userMessage || err?.response?.data?.message || "Gagal memuat data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTerima = async (fileId) => {
    setMessage("");
    setLoading(true);
    try {
      await setDocumentStatus(fileId, STATUS.DITERIMA);
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      if (selectedFile?.id === fileId) setSelectedFile(null);
      setMessage("Dokumen diterima. (Jika email aktif, notifikasi akan dikirim.)");
    } catch (err) {
      setMessage(
        err?.userMessage || err?.response?.data?.message || "Gagal menerima dokumen."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTolakSubmit = async () => {
    if (!selectedFile?.id) return;
    const alasan = rejectReason.trim();
    if (!alasan) {
      setMessage("Alasan penolakan wajib diisi.");
      return;
    }

    setMessage("");
    setLoading(true);
    try {
      await setDocumentStatus(selectedFile.id, STATUS.DITOLAK, alasan);
      setFiles((prev) => prev.filter((f) => f.id !== selectedFile.id));
      setSelectedFile(null);
      setOpenReject(false);
      setRejectReason("");
      setMessage("Dokumen ditolak. (Jika email aktif, notifikasi akan dikirim.)");
    } catch (err) {
      setMessage(
        err?.userMessage || err?.response?.data?.message || "Gagal menolak dokumen."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatTanggal = (iso) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString("id-ID");
    } catch {
      return iso;
    }
  };

  const openRejectModal = () => {
    if (!selectedFile?.id) return;
    setRejectReason("");
    setOpenReject(true);
  };

  const previewUrl = useMemo(() => {
    if (!selectedFile?.pdfUrl) return "";
    return selectedFile.status === STATUS.PENDING
      ? selectedFile.pdfUrl
      : withWatermark(selectedFile.pdfUrl);
  }, [selectedFile]);

  return (
    <div className="px-4 py-6 pb-12 mx-auto max-w-7xl">
      <h1 className="mb-2 text-3xl font-bold text-green-600">Review Laporan</h1>
      <p className="mb-5 text-sm text-gray-600">
        Lihat dan verifikasi laporan KP/Skripsi mahasiswa. Pastikan dokumen sesuai pedoman sebelum diterima.
      </p>

      {message && (
        <div className="p-3 mb-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Daftar laporan */}
        <div className="p-5 bg-white shadow rounded-xl transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-green-700">
              Daftar Laporan Pending
            </h2>
            <button
              type="button"
              onClick={fetchPending}
              className="px-3 py-1 text-xs border rounded hover:bg-gray-50 transition-all duration-200 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Memuat..." : "Refresh"}
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Memuat data...</p>
          ) : reviewFiles.length === 0 ? (
            <p className="text-gray-500">Tidak ada laporan untuk direview.</p>
          ) : (
            <ul className="space-y-3">
              {reviewFiles.map((file) => (
                <li
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className={`cursor-pointer border rounded p-3 transition-all duration-200 hover:bg-green-50 ${
                    selectedFile?.id === file.id
                      ? "bg-green-50 border-green-300"
                      : "border-gray-200"
                  }`}
                >
                  <p className="font-semibold text-gray-800">{file.judul}</p>
                  <p className="text-sm text-gray-600">
                    {file.penulis} | {file.prodi} | {file.tahun}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Detail laporan */}
        <div className="p-5 bg-white shadow lg:col-span-2 rounded-xl transition-all duration-200 hover:shadow-lg">
          {selectedFile ? (
            <>
              <h2 className="mb-4 text-lg font-semibold text-green-700">
                {selectedFile.judul}
              </h2>

              <div className="grid grid-cols-1 gap-4 mb-4 text-sm md:grid-cols-2">
                <div className="space-y-1">
                  <p><b>Penulis:</b> {selectedFile.penulis}</p>
                  <p><b>NIM:</b> {selectedFile.nim}</p>
                  <p><b>Program Studi:</b> {selectedFile.prodi}</p>
                  <p><b>Tahun:</b> {selectedFile.tahun}</p>
                  <p><b>Jenis:</b> {selectedFile.tipe}</p>
                </div>
                <div className="space-y-1">
                  <p><b>Status:</b> {selectedFile.status}</p>
                  <p><b>Tanggal Upload:</b> {formatTanggal(selectedFile.createdAt)}</p>
                  <p><b>Keywords:</b> {(selectedFile.keywords || []).join(", ")}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="mb-1 font-semibold text-green-700">Abstrak</h3>
                <p className="text-sm text-gray-600">{selectedFile.abstrak || "-"}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setOpenPreview(true)}
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 active:scale-[0.98] transition-all duration-200"
                >
                  Preview Dokumen
                </button>

                <button
                  onClick={() => handleTerima(selectedFile.id)}
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
                  disabled={loading}
                >
                  Terima
                </button>

                <button
                  onClick={openRejectModal}
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
                  disabled={loading}
                >
                  Tolak
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Pilih laporan untuk melihat detail.</p>
          )}
        </div>
      </div>

      {/* Modal Preview */}
      {openPreview && selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-lg relative">
            <button
              onClick={() => setOpenPreview(false)}
              className="absolute text-2xl top-3 right-4 hover:text-red-600 transition-all duration-200"
            >
              ✕
            </button>

            <div className="p-4 font-semibold text-green-700 border-b">
              Preview Dokumen
            </div>

            <div className="h-full p-4 overflow-auto">
              <PDFPreview url={previewUrl} />
            </div>
          </div>
        </div>
      )}

      {/* Modal Tolak */}
      {openReject && selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md p-5 bg-white shadow-lg rounded-xl">
            <button
              onClick={() => setOpenReject(false)}
              className="absolute text-2xl top-3 right-4 hover:text-red-600 transition-all duration-200"
              disabled={loading}
            >
              ✕
            </button>

            <h3 className="mb-2 text-lg font-semibold text-green-700">
              Alasan Penolakan
            </h3>
            <p className="mb-3 text-sm text-gray-600">
              Dokumen: <b>{selectedFile.judul}</b>
            </p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Tulis alasan penolakan yang jelas..."
              disabled={loading}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setOpenReject(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50 transition-all duration-200 disabled:opacity-70"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleTolakSubmit}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Tolak & Kirim"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
