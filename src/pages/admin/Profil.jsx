import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function ProfilAdmin() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Silakan login untuk melihat profil.
      </p>
    );
  }

  // Field yang ditampilkan di admin
  const fields = [
    { label: "Nama Lengkap", value: currentUser.name || "-" },
    { label: "Email", value: currentUser.email || "-" },
    { label: "Role", value: currentUser.role || "-" },
    { label: "Program Studi", value: currentUser.prodi || "-" },
    { label: "NIM", value: currentUser.nim || "-" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Profil Admin
        </h1>
        <p className="text-gray-600 mt-1 text-sm">
          Kelola informasi akun admin Anda
        </p>
      </div>

      {/* Card Profil */}
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          {fields.map((f) => (
            <Field key={f.label} label={f.label} value={f.value} />
          ))}
        </div>

        {/* Info tambahan */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm">
          Data akun admin tidak dapat diubah langsung dari sini. <br />
          Jika perlu perubahan, hubungi super admin atau pihak terkait.
        </div>

        {/* Tombol Edit */}
        <Link
          to="/admin/pengaturan"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm font-semibold -mb-2 inline-block"
        >
          Edit Profil
        </Link>
      </div>
    </div>
  );
}

/* Komponen kecil */
function Field({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}
