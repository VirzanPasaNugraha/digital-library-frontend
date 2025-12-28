import { useEffect, useState } from "react";
import { listMyDocuments } from "../../api/documents";
import { STATUS } from "../../constants/status";

export default function Status() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchDocs = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await listMyDocuments();
      setDocs(res.documents || []);
    } catch (err) {
      setMessage(
        err?.userMessage ||
          err?.response?.data?.message ||
          "Gagal memuat status unggahan."
      );
      setDocs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const statusBadge = (s) => {
    const base =
      "px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-200";
    if (s === STATUS.DITERIMA)
      return <span className={`${base} bg-green-100 text-green-700`}>{s}</span>;
    if (s === STATUS.PENDING)
      return <span className={`${base} bg-yellow-100 text-yellow-700`}>{s}</span>;
    if (s === STATUS.DITOLAK)
      return <span className={`${base} bg-red-100 text-red-700`}>{s}</span>;
    return <span className={`${base} bg-gray-100 text-gray-700`}>{s}</span>;
  };

  const handleDownload = (pdfUrl) => {
    window.open(pdfUrl, "_blank", "noreferrer");
  };

  return (
    <div className="max-w-6xl px-4 py-6 pb-12 mx-auto">
      {/* Header */}
      <h1 className="mb-2 text-3xl font-bold text-green-600">Status Unggahan</h1>
      <p className="mb-5 text-sm text-gray-600">
        Pantau status laporan yang telah Anda unggah
      </p>

      {/* Message */}
      {message && (
        <div className="p-3 mb-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          {message}
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl">
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <p className="font-semibold text-green-700">Daftar Unggahan</p>
          <button
            onClick={fetchDocs}
            className="px-3 py-2 text-xs border rounded hover:bg-gray-100 active:scale-[0.97] transition-all duration-150"
            disabled={loading}
          >
            {loading ? "Memuat..." : "Refresh"}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-white bg-green-700">
              <tr>
                <th className="px-4 py-3 text-left">Judul</th>
                <th className="px-4 py-3 text-left">Jenis</th>
                <th className="px-4 py-3 text-left">Tahun</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
                    Memuat data...
                  </td>
                </tr>
              ) : docs.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={5}>
                    Belum ada dokumen yang diunggah.
                  </td>
                </tr>
              ) : (
                docs.map((d) => (
                  <tr
                    key={d.id || d._id}
                    className="border-b hover:bg-green-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3">{d.judul}</td>
                    <td className="px-4 py-3">{d.tipe}</td>
                    <td className="px-4 py-3">{d.tahun}</td>
                    <td className="px-4 py-3">{statusBadge(d.status)}</td>
                    <td className="px-4 py-3">
                      {d.status === STATUS.DITERIMA ? (
                        <button
                          onClick={() => handleDownload(d.pdfUrl)}
                          className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700 active:scale-[0.98] transition-all duration-150"
                        >
                          LIHAT
                        </button>
                      ) : d.status === STATUS.PENDING ? (
                        <span className="text-sm italic text-gray-500">
                          Menunggu verifikasi admin
                        </span>
                      ) : d.status === STATUS.DITOLAK ? (
                        <div className="text-sm text-red-600">
                          <p>
                            <b>Alasan:</b> {d.alasanPenolakan || "-"}
                          </p>
                          <p className="mt-1 text-gray-600">
                            Silakan unggah laporan baru melalui menu{" "}
                            <b>Unggah Laporan</b>.
                          </p>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
