import React from "react";
import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-5">
      {/* Icon */}
      <span className="absolute inset-y-0 left-4 flex items-center text-green-500 dark:text-green-400">
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
          rounded-2xl
          border border-green-200 dark:border-green-700
          bg-white/80 dark:bg-gray-900/70
          backdrop-blur-md
          shadow-md
          text-gray-800 dark:text-white
          placeholder:text-gray-400
          transition-all duration-200
          focus:outline-none
          focus:ring-2 focus:ring-green-400
          focus:border-green-400
          hover:shadow-lg
        "
      />
    </div>
  );
}
