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
      {/* Tentang Pengembang Sistem */}
<section className="pt-12 space-y-10">
  <div className="text-center space-y-3">
    <h2 className="text-2xl font-bold text-green-800">
      Tentang Pengembang Sistem
    </h2>
    <p className="text-gray-700 max-w-3xl mx-auto">
      Sistem Digital Library FTI dikembangkan oleh mahasiswa Fakultas Teknologi
      Informasi sebagai bagian dari pengembangan sistem informasi akademik
      untuk mendukung pengelolaan dan akses dokumen secara digital,
      terstruktur, dan berkelanjutan.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
   {[
  {
    name: "M Reksa Aji Winangun",
    npm: "220660121001",
    photo: "/Reksa.jpeg",
    wa: "https://wa.me/6285280171108",
    linkedin: "https://www.linkedin.com/in/m-reksa-aji-winangun-55b614372/",
  },
  {
    name: "Syauqi Zainun Nauval",
    npm: "220660121022",
    photo: "/Syauqi.jpeg",
    wa: "https://wa.me/6287879827605",
    linkedin: "https://www.linkedin.com/in/syauqi-zn/",
  },
  {
    name: "Rifan Warosy Sirojudin",
    npm: "220660121033",
    photo: "/Rifan.jpeg",
    wa: "https://wa.me/6287736165742",
    linkedin: "https://www.linkedin.com/in/rifanwae/",
  },
  {
    name: "Muhammad Fajar Lutfiana",
    npm: "220660121036",
    photo: "/Fajar.jpeg",
    wa: "https://wa.me/6281213498274",
    linkedin: "https://www.linkedin.com/in/muhammad-fajar-luthfiana-030762371/",
  },
  {
    name: "Virzan Pasa Nugraha",
    npm: "220660121054",
    photo: "/Virzan.jpg",
    wa: "https://wa.me/6282128223596",
    linkedin: "https://www.linkedin.com/in/virzan-pasa-nugraha-349940332/",
  },
  {
    name: "Siti Rachmania Putri",
    npm: "220660121066",
    photo: "/Siti.jpeg",
    wa: "https://wa.me/6287727102370",
    linkedin: "https://www.linkedin.com/in/sitirachmaniaputri/",
  },
].map((dev, idx) => (

      <div
        key={idx}
        className="bg-white rounded-2xl shadow-md p-6 text-center space-y-4"
      >
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 overflow-hidden">
       <img
  src={dev.photo}
  alt={dev.name}
  className="w-full h-full object-cover"
  loading="lazy"
/>

        </div>

        <div>
          <h3 className="font-bold text-green-700">{dev.name}</h3>
          <p className="text-sm text-gray-600">{dev.npm}</p>
        </div>

       <div className="flex justify-center gap-3">
  <a
    href={dev.wa}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 text-white text-sm px-4 py-2 rounded-full hover:bg-green-700 transition"
  >
    WhatsApp
  </a>

  {dev.linkedin && (
    <a
      href={dev.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition"
    >
      LinkedIn
    </a>
  )}
</div>

      </div>
    ))}
  </div>
</section>
    </div>
  );
}
