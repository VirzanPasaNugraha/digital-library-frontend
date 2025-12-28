import React, { useState } from "react";
import { PROGRAMS } from "../constants/programs";

export default function FilterBar({
  filterProdi,
  setFilterProdi,
  filterTahun,
  setFilterTahun,
  filterTipe,
  setFilterTipe,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const handleReset = () => {
    setFilterProdi("");
    setFilterTahun("");
    setFilterTipe("");
  };

  return (
    <div className="max-w-6xl mx-auto mb-4 px-2">
      {/* Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-3 bg-green-600 px-4 py-2 rounded-lg shadow text-white font-semibold hover:bg-green-700"
      >
        {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
      </button>

      {showFilters && (
        <div className="
          bg-white border border-green-200 rounded-xl shadow-md
          p-4
          flex flex-col gap-3
          md:flex-row md:items-center md:gap-4
        ">
          {/* Tahun */}
          <select
            className="w-full md:w-auto p-2 border border-green-300 rounded-xl shadow-sm
              focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterTahun}
            onChange={(e) => setFilterTahun(e.target.value)}
          >
            <option value="">Semua Tahun</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          {/* Program Studi */}
          <select
            className="w-full md:w-auto p-2 border border-green-300 rounded-xl shadow-sm
              focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterProdi}
            onChange={(e) => setFilterProdi(e.target.value)}
          >
            <option value="">Semua Program Studi</option>
            {Object.keys(PROGRAMS).map((key) => (
              <option key={key} value={key}>
                {PROGRAMS[key]}
              </option>
            ))}
          </select>

          {/* Tipe Dokumen */}
          <select
            className="w-full md:w-auto p-2 border border-green-300 rounded-xl shadow-sm
              focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
          >
            <option value="">Semua Tipe</option>
            <option value="Laporan KP">Laporan KP</option>
            <option value="Skripsi">Skripsi</option>
          </select>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="
              w-full md:w-auto
              md:ml-auto
              bg-green-600 text-white font-semibold
              px-4 py-2 rounded-lg
              hover:bg-green-700 transition
            "
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
