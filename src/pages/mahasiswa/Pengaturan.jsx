import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

/* Helper: mapping kode prodi ke label */
const prodiLabel = (kode) => {
  switch (kode) {
    case "IF":
      return "Informatika";
    case "SI":
      return "Sistem Informasi";
    default:
      return kode || "-";
  }
};

export default function Pengaturan() {
  const { currentUser, updateProfile } = useAuth();

  if (!currentUser)
    return (
      <p className="mt-10 text-center text-gray-500">
        Silakan login untuk mengatur profil.
      </p>
    );

  const [name, setName] = useState(currentUser.name);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      updateProfile({ name });
      setLoading(false);
      alert("Nama berhasil diperbarui!");
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 px-4">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-green-600">
          Pengaturan Akun
        </h1>
        <p className="mt-1 text-gray-600">
          Kelola informasi dasar akun Anda
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 bg-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
      >
        {/* Nama */}
        <FieldEditable
          label="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          loading={loading}
        />

        {/* Read-only fields */}
        <FieldReadOnly label="NIM" value={currentUser.nim || "-"} />
        <FieldReadOnly
          label="Program Studi"
          value={prodiLabel(currentUser.prodi)}
        />
        <FieldReadOnly label="Email" value={currentUser.email} />

        {/* Info */}
        <div className="p-4 text-sm text-yellow-700 border border-yellow-200 rounded-lg bg-yellow-50">
          NIM, Program Studi, dan Email tidak dapat diubah.
          <br />
          Hubungi admin prodi jika terjadi kesalahan data.
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 active:scale-[0.98] disabled:opacity-60 transition-all duration-200 font-semibold"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function FieldEditable({ label, value, onChange, loading }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={loading}
        required
        className="w-full px-4 py-2 transition-all duration-200 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none disabled:bg-gray-100"
      />
    </div>
  );
}

function FieldReadOnly({ label, value }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        value={value}
        disabled
        className="w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-lg cursor-not-allowed"
      />
    </div>
  );
}
