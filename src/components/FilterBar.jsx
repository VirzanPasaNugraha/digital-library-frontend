import React, { useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { PROGRAMS } from "../constants/programs";

export default function FilterBar({
  filterProdi = "",
  setFilterProdi = () => {},
  filterTahun = "",
  setFilterTahun = () => {},
  filterTipe = "",
  setFilterTipe = () => {},
}) {

  const [showFilters, setShowFilters] = useState(false);

  const handleReset = () => {
    setFilterProdi("");
    setFilterTahun("");
    setFilterTipe("");
  };

  return (
    <div className="max-w-6xl mx-auto mb-6 px-2">
      {/* ===================== TOGGLE ===================== */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="
          inline-flex items-center gap-2
          mb-4
          bg-green-600 text-white
          px-4 py-2 rounded-lg
          font-semibold text-sm
          shadow-sm
          hover:bg-green-700 transition
        "
      >
        <SlidersHorizontal size={16} />
        {showFilters ? "Sembunyikan Filter" : "Tampilkan Filter"}
      </button>

      {showFilters && (
        <div
          className="
            bg-white
            border border-green-200
            rounded-2xl
            shadow-sm
            p-5
            flex flex-col gap-4
            md:flex-row md:items-end md:gap-4
          "
        >
          {/* ===================== TAHUN ===================== */}
          <div className="flex flex-col gap-1 w-full md:w-40">
            <label className="text-xs font-semibold text-green-700">
              Tahun
            </label>
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="
                w-full
                p-2.5
                border border-green-300
                rounded-lg
                text-sm
                bg-white
                focus:outline-none
                focus:ring-2 focus:ring-green-300
              "
            >
              <option value="">Semua Tahun</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          {/* ===================== PRODI ===================== */}
          <div className="flex flex-col gap-1 w-full md:w-64">
            <label className="text-xs font-semibold text-green-700">
              Program Studi
            </label>
            <select
              value={filterProdi}
              onChange={(e) => setFilterProdi(e.target.value)}
              className="
                w-full
                p-2.5
                border border-green-300
                rounded-lg
                text-sm
                bg-white
                focus:outline-none
                focus:ring-2 focus:ring-green-300
              "
            >
              <option value="">Semua Program Studi</option>
              {Object.keys(PROGRAMS).map((key) => (
                <option key={key} value={key}>
                  {PROGRAMS[key]}
                </option>
              ))}
            </select>
          </div>

          {/* ===================== TIPE ===================== */}
          <div className="flex flex-col gap-1 w-full md:w-48">
            <label className="text-xs font-semibold text-green-700">
              Tipe Dokumen
            </label>
            <select
              value={filterTipe}
              onChange={(e) => setFilterTipe(e.target.value)}
              className="
                w-full
                p-2.5
                border border-green-300
                rounded-lg
                text-sm
                bg-white
                focus:outline-none
                focus:ring-2 focus:ring-green-300
              "
            >
              <option value="">Semua Tipe</option>
              <option value="Laporan KP">Laporan KP</option>
              <option value="Skripsi">Skripsi</option>
            </select>
          </div>

          {/* ===================== RESET ===================== */}
          <button
            onClick={handleReset}
            className="
              mt-2 md:mt-0
              md:ml-auto
              inline-flex items-center gap-2
              px-4 py-2.5
              rounded-lg
              border border-green-300
              text-green-700 font-semibold text-sm
              hover:bg-green-50
              transition
            "
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
