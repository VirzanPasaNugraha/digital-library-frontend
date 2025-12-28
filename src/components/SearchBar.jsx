import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-6">
      {/* Icon */}
      <span className="absolute inset-y-0 left-4 flex items-center text-green-600">
        <Search size={18} />
      </span>

      <input
        type="text"
        placeholder="Cari judul, penulis, atau kata kunci..."
        value={value}
        onChange={onChange}
        className="
          w-full
          pl-11 pr-4 py-3
          text-sm md:text-base
          rounded-xl
          border border-green-200
          bg-white
          shadow-sm
          text-gray-800
          placeholder:text-gray-400
          transition-all duration-200
          focus:outline-none
          focus:ring-2 focus:ring-green-300
          focus:border-green-400
          hover:border-green-300
          hover:shadow-md
        "
      />
    </div>
  );
}
