// src/pages/Tentang.jsx
import React from "react";
import { FiUpload, FiSearch, FiFileText, FiCheckCircle } from "react-icons/fi";

export default function Tentang() {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 space-y-8">
      {/* Judul */}
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 text-center">
        Tentang Digital Library FTI
      </h1>

      {/* Deskripsi */}
      <p className="text-gray-700 text-lg text-center">
        Digital Library FTI adalah sistem repositori digital yang dirancang untuk
        mahasiswa Fakultas Teknologi Informasi (FTI) UNsap.
        Sistem ini memungkinkan mahasiswa untuk mengunggah, mencari,
        membaca, dan mengunduh laporan KP maupun Skripsi dengan mudah.
      </p>

      {/* Fitur */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow">
          <FiUpload className="text-4xl text-green-600 mt-1" />
          <div>
            <h3 className="font-bold text-green-700 text-lg">Unggah Laporan</h3>
            <p className="text-gray-600 text-sm">
              Mahasiswa dapat mengunggah laporan KP/Skripsi beserta metadata.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow">
          <FiSearch className="text-4xl text-green-600 mt-1" />
          <div>
            <h3 className="font-bold text-green-700 text-lg">Pencarian Cepat</h3>
            <p className="text-gray-600 text-sm">
              Cari dokumen berdasarkan judul, prodi, tipe, atau kata kunci.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow">
          <FiFileText className="text-4xl text-green-600 mt-1" />
          <div>
            <h3 className="font-bold text-green-700 text-lg">
              Preview & Download
            </h3>
            <p className="text-gray-600 text-sm">
              Dokumen dapat dipreview langsung dan diunduh jika diperlukan.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow">
          <FiCheckCircle className="text-4xl text-green-600 mt-1" />
          <div>
            <h3 className="font-bold text-green-700 text-lg">
              Validasi & Pengelolaan
            </h3>
            <p className="text-gray-600 text-sm">
              Admin dapat memvalidasi dan mengelola arsip dengan rapi.
            </p>
          </div>
        </div>
      </section>

      <p className="text-gray-700 text-lg text-center">
        Digital Library FTI meningkatkan efisiensi pengelolaan dan akses
        dokumen akademik di lingkungan FTI.
      </p>
    </div>
  );
}
