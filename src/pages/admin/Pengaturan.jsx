import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Pengaturan() {
  const { currentUser, updateProfile } = useAuth();
  const [name, setName] = useState(currentUser?.name || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => {
    updateProfile({ name}); // <-- pakai 'nama' dari state form
    setLoading(false);
    alert("Nama berhasil diperbarui!");
  }, 500);
};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold text-green-600 mb-2">
        Pengaturan Admin
      </h1>
      <p className="text-gray-600 text-sm mb-5">
        Atur preferensi sistem, notifikasi, dan opsi lainnya untuk administrasi Digital Library FTI.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email (tidak bisa diubah)</label>
          <input
            type="email"
            value={currentUser?.email || ""}
            disabled
            className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Password Baru</label>
          <input
            type="password"
            placeholder="Kosongkan jika tidak ingin diubah"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-green-600 text-white py-3 px-5 rounded-lg font-semibold hover:bg-green-700 transition ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              />
            </svg>
          )}
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
