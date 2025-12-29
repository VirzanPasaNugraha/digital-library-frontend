import React from "react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full max-w-3xl mx-auto mb-8">
      <div
        className="
          relative
          rounded-xl
          bg-white
          border border-green-300/60
          shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]
          transition-all duration-200
          hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.35)]
          focus-within:border-green-600
          focus-within:shadow-[0_0_0_3px_rgba(22,163,74,0.15)]
        "
      >
        {/* Icon */}
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Cari judul, penulis, atau kata kunci"}
          className="
            w-full
            rounded-xl
            bg-transparent
            py-3.5 pl-12 pr-12
            text-sm md:text-base
            text-gray-900
            placeholder:text-gray-400
            outline-none
          "
        />

        {/* Clear */}
        {value && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: "" } })}
            className="
              absolute inset-y-0 right-4
              flex items-center
              text-gray-400
              hover:text-gray-700
              transition
            "
            aria-label="Clear"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
