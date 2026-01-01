import { useEffect, useMemo, useState } from "react";
import {
  adminListUsers,
  adminActivateUser,
  adminBanUser,
  adminDeleteUser,
} from "../../api/users";

export default function KelolaAkun() {
  const [accounts, setAccounts] = useState([]);
  const [filterProdi, setFilterProdi] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setMessage("");
    try {
      const params = {};
      if (filterProdi) params.prodi = filterProdi;
      if (filterStatus) params.status = filterStatus;

      const res = await adminListUsers(params);
      setAccounts(res.users || []);
    } catch (err) {
      setMessage(
        err?.userMessage ||
          err?.response?.data?.message ||
          "Gagal memuat akun mahasiswa."
      );
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterProdi, filterStatus]);

  const handleAktifkan = async (id) => {
    setMessage("");
    try {
      const { user } = await adminActivateUser(id);
      setAccounts((prev) => prev.map((u) => (u.id === id ? user : u)));
    } catch (err) {
      setMessage(
        err?.userMessage ||
          err?.response?.data?.message ||
          "Gagal mengaktifkan akun."
      );
    }
  };

  const handleTolak = async (id) => {
    if (!confirm("Yakin ingin menolak / menghapus akun ini?")) return;
    setMessage("");
    try {
      await adminDeleteUser(id);
      setAccounts((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setMessage(
        err?.userMessage ||
          err?.response?.data?.message ||
          "Gagal menghapus akun."
      );
    }
  };

  const handleBanToggle = async (id) => {
    setMessage("");
    const target = accounts.find((u) => u.id === id);
    if (!target) return;

    try {
      const { user } = await adminBanUser(id, !target.is_banned);
      setAccounts((prev) => prev.map((u) => (u.id === id ? user : u)));
    } catch (err) {
      setMessage(
        err?.userMessage ||
          err?.response?.data?.message ||
          "Gagal mengubah status ban."
      );
    }
  };

  const filteredAccounts = useMemo(() => {
    return accounts;
  }, [accounts]);

  return (
  <div className="max-w-7xl mx-auto space-y-6 px-4 pt-24 md:pt-0 pb-12">
      <h1 className="mb-2 text-3xl font-bold text-green-600">
        Kelola Akun Mahasiswa
      </h1>
      <p className="mb-5 text-sm text-gray-600">
        Tambah, ubah, atau hapus akun mahasiswa. Pastikan data mahasiswa selalu
        terupdate.
      </p>

      {message && (
        <div className="p-3 mb-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          {message}
        </div>
      )}

      {/* Filter Section */}
      <div className="flex flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-end">
        <FilterSelect
          label="Filter Prodi"
          value={filterProdi}
          onChange={setFilterProdi}
          options={[
            { label: "Semua", value: "" },
            { label: "Informatika (IF)", value: "IF" },
            { label: "Sistem Informasi (SI)", value: "SI" },
          ]}
        />
        <FilterSelect
          label="Filter Status"
          value={filterStatus}
          onChange={setFilterStatus}
          options={[
            { label: "Semua", value: "" },
            { label: "Aktif", value: "Aktif" },
            { label: "Banned", value: "Banned" },
            { label: "Belum Aktif", value: "Belum Aktif" },
          ]}
        />

        <button
          type="button"
          onClick={fetchUsers}
          className="px-4 py-2 text-sm border rounded hover:bg-gray-50 disabled:opacity-60 transition"
          disabled={loading}
        >
          {loading ? "Memuat..." : "Refresh"}
        </button>
      </div>

      {/* Table Section */}
      {loading ? (
        <p className="py-6 text-center text-gray-500">Memuat akun...</p>
      ) : filteredAccounts.length === 0 ? (
        <p className="py-6 text-center text-gray-400 italic">
          Tidak ada akun mahasiswa yang sesuai filter.
        </p>
      ) : (
        <div className="overflow-x-auto shadow rounded-xl scrollbar-thin scrollbar-thumb-gray-300">
          <table className="min-w-full bg-white">
            <thead className="text-white bg-green-700">
              <tr>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">NIM</th>
                <th className="px-4 py-3 text-left">Prodi</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((acc) => (
                <tr
                  key={acc.id}
                  className="transition border-b hover:bg-green-50 hover:shadow-sm"
                >
                  <td className="px-4 py-2">{acc.name}</td>
                  <td className="px-4 py-2">{acc.nim || "N/A"}</td>
                  <td className="px-4 py-2">{acc.prodi}</td>
                  <td className="px-4 py-2">{acc.email}</td>
                  <td className="px-4 py-2 font-semibold">
                    {!acc.isActive ? (
                      <span className="text-yellow-500">Belum Aktif</span>
                    ) : acc.is_banned ? (
                      <span className="text-red-500">Banned</span>
                    ) : (
                      <span className="text-green-500">Aktif</span>
                    )}
                  </td>
                  <td className="flex flex-wrap gap-2 px-4 py-2 sm:flex-nowrap">
                    {!acc.isActive ? (
                      <>
                        <button
                          onClick={() => handleAktifkan(acc.id)}
                          className="px-3 py-1 text-xs text-white bg-green-600 rounded hover:bg-green-700 transition"
                        >
                          Aktifkan
                        </button>
                        <button
                          onClick={() => handleTolak(acc.id)}
                          className="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600 transition"
                        >
                          Tolak
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleBanToggle(acc.id)}
                        className={`px-3 py-1 rounded text-xs transition ${
                          acc.is_banned
                            ? "bg-yellow-400 text-green-900 hover:bg-yellow-300"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        {acc.is_banned ? "Unban" : "Ban"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        className="px-3 py-2 border rounded focus:ring focus:ring-green-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
