import { Link } from "react-router-dom";

const PRODI_LABEL = {
  IF: "Informatika",
  SI: "Sistem Informasi",
};

export default function FileCard({ file }) {
  const abstrak = (file?.abstrak || "").toString().trim();
  const safeAbstrak = abstrak || "Tidak ada abstrak.";

  return (
    <div className="
      flex flex-col justify-between h-full
      p-5 bg-white border border-gray-200
      rounded-2xl shadow-sm
      transition-all duration-300
      hover:shadow-xl
    ">
      {/* Content */}
      <div className="flex-1">
        <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-green-700 bg-green-100 rounded-full break-words">
          {file?.tipe || "-"}
        </span>

        <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-2 break-words">
          {file?.judul || "-"}
        </h3>

        <p className="mb-3 text-sm text-gray-600 break-words">
          {(file?.penulis || "-")} •{" "}
          {PRODI_LABEL[file?.prodi] || file?.prodi || "-"} •{" "}
          {(file?.tahun || "-")}
        </p>

        <p className="text-sm leading-relaxed text-gray-500 line-clamp-3 break-words">
          {safeAbstrak}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-5 mt-auto">
        <Link
          to={`/detail/${file?.id}`}
          className="inline-flex items-center justify-center w-full py-2.5
            font-semibold text-white bg-green-600 rounded-lg
            hover:bg-green-700 transition"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
