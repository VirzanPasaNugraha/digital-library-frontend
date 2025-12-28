import React, { useState } from "react";
import { PROGRAMS } from "../constants/programs";

export default function FilterBar({
  filterProdi,
  setFilterProdi,
  filterTahun,
  setFilterTahun,
  filterTipe,
  setFilterTipe
}) {
  const [showFilters, setShowFilters] = useState(false);

  const handleReset = () => {
    setFilterProdi("");
    setFilterTahun("");
    setFilterTipe("");
  };

  return (
    <div className="max-w-6xl mx-auto mb-4">
      {/* Tombol Tampilkan/Sembunyikan Filter */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-green-600 border px-4 py-2 rounded-lg shadow text-white text-bold hover:bg-green-700"
      >
        {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
      </button>

      {/* Filter Card */}
      {showFilters && (
        <div className="bg-white border border-green-200 rounded-xl shadow-md p-4 flex flex-wrap items-center gap-4">
          {/* Tahun - kiri */}
          <select
            className="p-2 border border-green-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-auto"
            value={filterTahun}
            onChange={e => setFilterTahun(e.target.value)}
          >
            <option value="">Semua Tahun</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2023">2022</option>
          </select>

          {/* Program Studi - tengah */}
          <select
            className="p-2 border border-green-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-auto"
            value={filterProdi}
            onChange={e => setFilterProdi(e.target.value)}
          >
            <option value="">Semua Program Studi</option>
            {Object.keys(PROGRAMS).map(key => (
              <option key={key} value={key}>{PROGRAMS[key]}</option>
            ))}
          </select>

          {/* Tipe Dokumen - kanan */}
          <select
            className="p-2 border border-green-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-auto"
            value={filterTipe}
            onChange={e => setFilterTipe(e.target.value)}
          >
            <option value="">Semua Tipe</option>
            <option value="Laporan KP">Laporan KP</option>
            <option value="Skripsi">Skripsi</option>
          </select>

          {/* Reset Filter - ujung kanan */}
          <div className="ml-auto">
            <button
              onClick={handleReset}
              className="bg-green-600 text-white text-bold px-3 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Reset Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
