// src/pages/Tentang.jsx
import React from "react";
import { FiUpload, FiSearch, FiFileText, FiCheckCircle } from "react-icons/fi";

export default function Tentang() {
  const features = [
    {
      icon: <FiUpload className="text-4xl text-green-600 mt-1" />,
      title: "Unggah Laporan",
      desc: "Mahasiswa dapat mengunggah laporan KP/Skripsi beserta metadata dengan mudah dan cepat.",
    },
    {
      icon: <FiSearch className="text-4xl text-green-600 mt-1" />,
      title: "Pencarian Cepat",
      desc: "Cari dokumen berdasarkan judul, program studi, tipe dokumen, atau kata kunci tertentu.",
    },
    {
      icon: <FiFileText className="text-4xl text-green-600 mt-1" />,
      title: "Preview & Download",
      desc: "Setiap dokumen dapat dipreview langsung di browser dan diunduh bila diperlukan.",
    },
    {
      icon: <FiCheckCircle className="text-4xl text-green-600 mt-1" />,
      title: "Validasi & Pengelolaan",
      desc: "Admin dapat memvalidasi laporan dan mengelola arsip digital secara efisien.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800">
          Tentang Digital Library FTI
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          Digital Library FTI adalah sistem repositori digital yang dirancang
          untuk mahasiswa Fakultas Teknologi Informasi Universitas Siliwangi.
          Platform ini memudahkan proses unggah, pencarian, pembacaan, dan
          pengunduhan laporan KP maupun Skripsi secara efisien dan terintegrasi.
        </p>
      </div>

      {/* Fitur Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 gap-y-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <h3 className="font-bold text-green-700 text-lg mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Closing Paragraph */}
      <p className="text-gray-700 text-center text-lg leading-relaxed max-w-3xl mx-auto">
        Dengan adanya Digital Library FTI, proses penyimpanan dan akses dokumen
        akademik menjadi lebih mudah, transparan, dan berkelanjutan di lingkungan
        Fakultas Teknologi Informasi.
      </p>
    </div>
  );
}
