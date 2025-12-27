import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Cari judul, penulis, atau kata kunci..."
      className="
        w-full p-3 border border-green-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
        mb-4
      "
      value={value}
      onChange={onChange}
    />
  );
}
