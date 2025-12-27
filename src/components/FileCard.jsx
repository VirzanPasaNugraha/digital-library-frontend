import { Link } from "react-router-dom";

export default function FileCard({ file }) {
  const abstrak = (file?.abstrak || "").toString().trim();
  const safeAbstrak = abstrak ? abstrak : "Tidak ada abstrak.";

  return (
    <div className="flex flex-col justify-between h-full p-5 transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-2xl hover:shadow-xl">
      {/* Header / Content */}
      <div className="flex-1">
        {/* Tipe Dokumen */}
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
          {file?.tipe || "-"}
        </span>

        {/* Judul (dibatasi) */}
        <h3 className="mb-1 text-lg font-bold text-gray-900 transition group-hover:text-green-700 line-clamp-2">
          {file?.judul || "-"}
        </h3>

        {/* Meta */}
        <p className="mb-3 text-sm text-gray-600">
          {(file?.penulis || "-")} • {(file?.prodi || "-")} • {(file?.tahun || "-")}
        </p>

        {/* Abstrak (dibatasi) */}
        <p className="text-sm leading-relaxed text-gray-500 line-clamp-3">
          {safeAbstrak}
        </p>
      </div>

      {/* Footer: selalu di bawah */}
      <div className="pt-5 mt-auto">
        <Link
          to={`/detail/${file?.id}`}
          className="inline-flex items-center justify-center w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
