import { Link } from "react-router-dom";
import { STATUS_LABEL } from "../constants/status";

const PRODI_LABEL = {
  IF: "Informatika",
  SI: "Sistem Informasi",
};

export default function FileCard({ file }) {
  const abstrak = (file?.abstrak || "").toString().trim();
  const safeAbstrak = abstrak || "Tidak ada abstrak.";

  return (
    <div
      className="
        flex flex-col justify-between h-full
        p-5 bg-white border border-gray-200
        rounded-2xl shadow-sm
        hover:shadow-2xl hover:border-green-400
        transition-all duration-300 transform
        hover:-translate-y-2 hover:scale-[1.02]
        hover:bg-gradient-to-br hover:from-green-50 hover:to-white
        group
      "
    >
      {/* Content */}
      <div className="flex-1">
       <div className="flex items-center justify-between mb-3">
  <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
    {file?.tipe || "-"}
  </span>

  <div className="flex flex-col items-end gap-1">
    <span className="text-xs font-semibold text-gray-500">
      {file?.tahun || "-"}
    </span>

    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full
        ${file?.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : ""}
        ${file?.status === "DITERIMA" ? "bg-green-100 text-green-700" : ""}
        ${file?.status === "DITOLAK" ? "bg-red-100 text-red-700" : ""}
      `}
    >
      {STATUS_LABEL[file?.status] || file?.status}
    </span>
  </div>
</div>


        <h3
          className="
            mb-2 text-lg font-bold text-gray-900 line-clamp-2
            group-hover:text-green-700 transition-colors
          "
        >
          {file?.judul || "-"}
        </h3>

        <p className="mb-3 text-sm text-gray-600 italic">
          {(file?.penulis || "-")} •{" "}
          <span className="font-medium text-green-700">
            {PRODI_LABEL[file?.prodi] || file?.prodi || "-"}
          </span>
        </p>

        <p className="text-sm leading-relaxed text-gray-500 line-clamp-3">
          {safeAbstrak}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-5 mt-auto">
        <Link
          to={`/detail/${file?.id}`}
          className="
            inline-flex items-center justify-center w-full py-2.5
            font-semibold text-white rounded-lg
            bg-green-600 hover:bg-green-700
            group-hover:shadow-lg group-hover:scale-[1.03]
            transition-all duration-300
          "
        >

          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
