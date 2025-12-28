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
      <div className="relative w-full min-h-[75vh] flex items-center justify-center text-center text-white overflow-hidden">
        <img
          src={BgFTI}
          alt="Library Background"
          className="absolute inset-0 w-full h-full object-cover brightness-60"
        />

        <div className="relative z-10 px-6 py-24 md:py-32 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-xl">
            {user?.role?.startsWith("admin")
              ? `Selamat Datang, Admin`
              : "Selamat Datang di Digital Library FTI"}
          </h1>

          <p className="text-lg md:text-xl mb-8 drop-shadow-md text-gray-100 leading-relaxed">
            Jelajahi laporan Kerja Praktek dan Skripsi mahasiswa FTI UNSAP
            dengan sistem repositori digital terintegrasi.
          </p>

          <button
            onClick={handleJelajahi}
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 active:scale-[0.97] transition-all duration-300"
          >
            Jelajahi Koleksi
          </button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800">
          Mengapa Memilih Digital Library FTI?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-12">
          {[
            {
              icon: "📚",
              title: "Koleksi Lengkap",
              desc: "Ribuan laporan akademik yang dapat diakses kapan pun dan di mana pun.",
            },
            {
              icon: "🔍",
              title: "Pencarian Cepat",
              desc: "Temukan laporan berdasarkan judul, penulis, prodi, atau tahun dengan mudah.",
            },
            {
              icon: "⚡",
              title: "Akses Mudah",
              desc: "Tampilan antarmuka yang ramah pengguna dan responsif di semua perangkat.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
