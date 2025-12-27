// src/pages/Bantuan.jsx
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqData = [
  {
    question: "Bagaimana cara mendaftar?",
    answer:
      "Klik tombol 'Daftar' di navbar dan gunakan email kampus Anda (@student.unsap.ac.id) untuk registrasi."
  },
  {
    question: "Bagaimana cara login?",
    answer:
      "Klik tombol 'Masuk' di navbar, masukkan email dan password yang sudah terdaftar."
  },
  {
    question: "Bagaimana cara mengunggah laporan KP atau Skripsi?",
    answer:
      "Setelah login, akses dashboard mahasiswa, pilih menu 'Unggah Laporan', isi form dan unggah file PDF."
  },
  {
    question: "Bagaimana cara melihat dokumen lain?",
    answer:
      "Gunakan fitur pencarian atau filter di halaman Beranda untuk menemukan laporan yang Anda cari."
  },
  {
    question: "Bagaimana cara mengakses file PDF penuh?",
    answer:
      "Mahasiswa yang sudah login dapat melihat dan mengunduh PDF lengkap dari laporan."
  },
  {
    question: "Apakah dokumen publik bisa diakses tanpa login?",
    answer:
      "Hanya dokumen berstatus 'Diterima' yang dapat diakses publik. Preview PDF penuh memerlukan akun aktif."
  }
];

export default function Bantuan() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 text-center">
        FAQ – Pertanyaan yang Sering Diajukan
      </h1>

      <p className="text-gray-700 text-lg text-center">
        Halaman ini berisi panduan penggunaan sistem dan jawaban atas pertanyaan
        yang sering diajukan oleh pengguna Digital Library FTI.
      </p>

      <div className="space-y-4">
        {faqData.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-xl shadow hover:shadow-md transition"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-green-700 font-semibold hover:bg-green-50 rounded-xl"
            >
              {faq.question}
              {openIndex === idx ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {openIndex === idx && (
              <div className="px-6 pb-4 text-gray-700 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
