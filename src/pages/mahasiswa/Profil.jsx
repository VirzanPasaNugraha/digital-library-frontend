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

export default function Profil() {
  const { currentUser } = useAuth();

  if (!currentUser)
    return (
      <p className="text-center text-gray-500 mt-10">
        Silakan login untuk melihat profil.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Profil Mahasiswa
        </h1>
        <p className="text-gray-600 mt-1 text-sm">
          Informasi akun akademik Anda
        </p>
      </div>

      {/* Card Profil */}
      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <Field label="Nama Lengkap" value={currentUser.name} />
          <Field label="NIM" value={currentUser.nim || "-"} />
          <Field
            label="Program Studi"
            value={prodiLabel(currentUser.prodi)}
          />
          <Field label="Email" value={currentUser.email} />
        </div>

        {/* Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm">
          Data akademik (NIM, Program Studi, Email) tidak dapat diubah.
          <br />
          Jika terdapat kesalahan, silakan hubungi admin prodi.
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function Field({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}
