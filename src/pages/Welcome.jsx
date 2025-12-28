// src/pages/Welcome.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BgFTI from "../assets/bg_fti.jpg";

export default function Welcome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleJelajahi = () => {
    navigate("/beranda");
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative w-full h-[70vh] flex items-center justify-center -mt-8">
        <img
          src={BgFTI}
          alt="Library Background"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            {user?.role?.startsWith("admin")
              ? `Selamat Datang, Admin`
              : "Selamat Datang di Digital Library FTI"}
          </h1>

          <p className="text-lg md:text-xl mb-6 drop-shadow-lg">
            Jelajahi Laporan Kerja Praktek dan Tugas Akhir mahasiswa FTI.
          </p>

          <button
            onClick={handleJelajahi}
            className="bg-yellow-400 text-green-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition shadow-xl"
          >
            Jelajahi Koleksi
          </button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
          Mengapa Memilih Digital Library FTI?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Koleksi Lengkap</h3>
            <p className="text-gray-600">
              Menyediakan laporan akademik yang bisa kamu akses kapan saja.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Pencarian Cepat</h3>
            <p className="text-gray-600">
              Temukan dokumen dengan mudah dan cepat.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Akses Mudah</h3>
            <p className="text-gray-600">
              Tampilan responsif dan mudah digunakan.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
