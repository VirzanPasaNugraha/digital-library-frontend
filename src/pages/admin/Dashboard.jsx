import { useEffect, useMemo, useState } from "react";
import { STATUS } from "../../constants/status";
import { adminListDocuments } from "../../api/documents";
import { useAuth } from "../../context/AuthContext";

function StatCard({ title, value, badgeClass = "", icon }) {
  return (
    <div className="flex flex-col flex-1 justify-between p-5 bg-white border border-gray-100 shadow rounded-xl hover:shadow-lg transition duration-200 min-h-[120px]">
      <div className="flex items-center gap-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${badgeClass}`}>
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardAdmin() {
  const { user } = useAuth?.() || {};
  const [filterProdi, setFilterProdi] = useState(""); // "" = semua
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    diterima: 0,
    ditolak: 0,
  });

  const adminLabel = useMemo(() => {
    const role = user?.role || "";
    if (role === "admin-if") return "Admin IF";
    if (role === "admin-si") return "Admin SI";
    return user?.name ? `Admin ${user.name}` : "Admin";
  }, [user]);

  const fetchCounts = async () => {
    setLoading(true);
    setMessage("");

    try {
      const baseParams = {
        page: 1,
        limit: 1,
      };
      if (filterProdi) baseParams.prodi = filterProdi;

      const totalRes = await adminListDocuments({ ...baseParams });
      const total = Number(totalRes?.total || 0);

      const [pendingRes, diterimaRes, ditolakRes] = await Promise.all([
        adminListDocuments({ ...baseParams, status: STATUS.PENDING }),
        adminListDocuments({ ...baseParams, status: STATUS.DITERIMA }),
        adminListDocuments({ ...baseParams, status: STATUS.DITOLAK }),
      ]);

      setCounts({
        total,
        pending: Number(pendingRes?.total || 0),
        diterima: Number(diterimaRes?.total || 0),
        ditolak: Number(ditolakRes?.total || 0),
      });
    } catch (err) {
      setMessage(err?.userMessage || err?.response?.data?.message || "Gagal memuat statistik admin.");
      setCounts({ total: 0, pending: 0, diterima: 0, ditolak: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterProdi]);

  return (
    <div className="px-4 py-6 mx-auto max-w-7xl">
      <h1 className="mb-2 text-4xl font-bold text-green-600">Dashboard Admin</h1>
      <p className="mb-6 text-sm text-gray-600">
        Selamat datang, <span className="font-semibold">{adminLabel}</span>
      </p>

      {message && (
        <div className="p-3 mb-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          {message}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Filter Prodi:</label>
          <select
            className="px-3 py-2 border rounded"
            value={filterProdi}
            onChange={(e) => setFilterProdi(e.target.value)}
            disabled={loading}
          >
            <option value="">Semua</option>
            <option value="IF">IF</option>
            <option value="SI">SI</option>
          </select>
        </div>

        <button
          type="button"
          onClick={fetchCounts}
          disabled={loading}
          className="px-4 py-2 ml-auto text-sm border rounded hover:bg-gray-50 disabled:opacity-60 transition"
        >
          {loading ? "Memuat..." : "Refresh"}
        </button>
      </div>

      {/* Responsive grid improvement */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StatCard
          title="Total Dokumen"
          value={counts.total}
          badgeClass="bg-green-50 text-green-700"
          icon="📄"
        />
        <StatCard
          title="Menunggu Verifikasi"
          value={counts.pending}
          badgeClass="bg-yellow-50 text-yellow-700"
          icon="⏳"
        />
        <StatCard
          title="Diterima"
          value={counts.diterima}
          badgeClass="bg-green-50 text-green-700"
          icon="✅"
        />
        <StatCard
          title="Ditolak"
          value={counts.ditolak}
          badgeClass="bg-red-50 text-red-700"
          icon="⛔"
        />
      </div>
    </div>
  );
}
