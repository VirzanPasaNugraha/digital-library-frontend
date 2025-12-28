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
      setMessage(err?.userMessage || err?.response?.data?.message || "Gagal memuat status unggahan.");
      setDocs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const statusBadge = (s) => {
    if (s === STATUS.DITERIMA)
      return <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">{s}</span>;
    if (s === STATUS.PENDING)
      return <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">{s}</span>;
    if (s === STATUS.DITOLAK)
      return <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">{s}</span>;
    return <span className="px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">{s}</span>;
  };

  const handleDownload = (pdfUrl) => {
    // buka di tab baru, browser handle download/preview
    window.open(pdfUrl, "_blank", "noreferrer");
  };

  return (
    <div className="max-w-6xl px-4 py-6 mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-green-600">Status Unggahan</h1>
      <p className="mb-5 text-sm text-gray-600">Pantau status laporan yang telah Anda unggah</p>

      {message && (
        <div className="p-3 mb-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          {message}
        </div>
      )}

      <div className="overflow-hidden bg-white shadow rounded-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <p className="font-semibold text-green-700">Daftar Unggahan</p>
          <button
            onClick={fetchDocs}
            className="px-3 py-2 text-xs border rounded hover:bg-gray-50"
            disabled={loading}
          >
            {loading ? "Memuat..." : "Refresh"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
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
                  <tr key={d.id || d._id} className="border-b">
                    <td className="px-4 py-3">{d.judul}</td>
                    <td className="px-4 py-3">{d.tipe}</td>
                    <td className="px-4 py-3">{d.tahun}</td>
                    <td className="px-4 py-3">{statusBadge(d.status)}</td>
                    <td className="px-4 py-3">
                      {d.status === STATUS.DITERIMA ? (
                        <button
                          onClick={() => handleDownload(d.pdfUrl)}
                          className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                        >
                          LIHAT
                        </button>
                      ) : d.status === STATUS.PENDING ? (
                        <span className="text-sm italic text-gray-500">Menunggu verifikasi admin</span>
                      ) : d.status === STATUS.DITOLAK ? (
                        <div className="text-sm text-red-600">
                          <p><b>Alasan:</b> {d.alasanPenolakan || "-"}</p>
                          <p className="mt-1 text-gray-600">
                            Silakan unggah laporan baru melalui menu <b>Unggah Laporan</b>.
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
