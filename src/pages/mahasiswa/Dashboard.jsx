import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { STATUS } from "../../constants/status";
import { Link } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import { listMyDocuments } from "../../api/documents";

export default function DashboardMahasiswa() {
  const { currentUser } = useAuth();

  const [myFiles, setMyFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!currentUser) {
    return (
      <p className="mt-10 text-center text-gray-500">
        Silakan login untuk melihat dashboard.
      </p>
    );
  }

  const user = currentUser;

  const fetchMyDocs = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await listMyDocuments({ page: 1, limit: 1000 });
      setMyFiles(res?.documents || []);
    } catch (err) {
      setMyFiles([]);
      setMessage(
        err?.userMessage ||
          err?.response?.data?.message ||
          "Gagal memuat dokumen mahasiswa."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDocs();
  }, []);

  const stats = useMemo(() => {
    const total = myFiles.length;
    const diterima = myFiles.filter((f) => f.status === STATUS.DITERIMA).length;
    const pending = myFiles.filter((f) => f.status === STATUS.PENDING).length;
    const ditolak = myFiles.filter((f) => f.status === STATUS.DITOLAK).length;
    return { total, diterima, pending, ditolak };
  }, [myFiles]);

  const latestFile = useMemo(() => {
    if (!myFiles.length) return null;
    const sorted = [...myFiles].sort((a, b) => {
      const ta = new Date(a.createdAt || a.tanggalUpload || 0).getTime();
      const tb = new Date(b.createdAt || b.tanggalUpload || 0).getTime();
      return tb - ta;
    });
    return sorted[0] || null;
  }, [myFiles]);

  return (
  <div className="max-w-7xl mx-auto space-y-6 px-4 pt-24 md:pt-0 pb-12">


      {/* Header */}
      <DashboardHeader title="Dashboard Mahasiswa" user={user} />

      {message && (
        <div className="p-3 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          {message}
        </div>
      )}

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Laporan"
          value={loading ? "..." : stats.total}
          color="gray"
        />
        <StatCard
          title="Diterima"
          value={loading ? "..." : stats.diterima}
          color="green"
        />
        <StatCard
          title="Pending"
          value={loading ? "..." : stats.pending}
          color="yellow"
        />
        <StatCard
          title="Ditolak"
          value={loading ? "..." : stats.ditolak}
          color="red"
        />
      </div>

      {/* Status Terakhir */}
      <div className="p-6 bg-white shadow rounded-xl transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-green-700">
            Status Laporan Terakhir
          </h2>
          <button
            type="button"
            onClick={fetchMyDocs}
            className="px-3 py-1 text-xs border rounded hover:bg-gray-50 transition-all duration-200 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Memuat..." : "Refresh"}
          </button>
        </div>

        {!latestFile ? (
          <p className="text-sm text-gray-500">Belum ada laporan yang diunggah.</p>
        ) : (
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold text-gray-900">{latestFile.judul}</p>
              <span
                className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full font-semibold ${
                  latestFile.status === STATUS.DITERIMA
                    ? "bg-green-100 text-green-700"
                    : latestFile.status === STATUS.DITOLAK
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {latestFile.status}
              </span>
            </div>

            <Link
              to="/mahasiswa/status"
              className="text-sm font-semibold text-green-700 hover:underline transition-all duration-200"
            >
              Lihat Detail
            </Link>
          </div>
        )}
      </div>

      {/* CTA Upload */}
      <div className="flex flex-col items-center justify-between gap-4 p-6 text-white bg-green-600 rounded-xl shadow-md sm:flex-row transition-all duration-300 hover:shadow-lg hover:bg-green-700">
        <div>
          <h3 className="text-xl font-bold">Unggah Laporan Baru</h3>
          <p className="text-sm text-green-100">
            Pastikan menggunakan template watermark resmi
          </p>
        </div>

        <Link
          to="/mahasiswa/upload"
          className="px-6 py-2 font-semibold text-green-700 bg-white rounded-lg hover:bg-green-100 active:scale-[0.98] transition-all duration-200"
        >
          Upload Sekarang
        </Link>
      </div>
    </div>
  );
}

/* ===================== Komponen Statistik ===================== */
function StatCard({ title, value, color = "green" }) {
  const colorMap = {
    green: "text-green-700",
    yellow: "text-yellow-700",
    gray: "text-gray-700",
    red: "text-red-700",
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-white shadow rounded-xl transition-all duration-200 hover:shadow-lg">
      <p className="mb-2 text-sm text-gray-500">{title}</p>
      <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  );
}
