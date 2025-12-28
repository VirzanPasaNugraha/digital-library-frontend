import React from "react";
import FileCard from "./FileCard";

export default function FileList({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="mt-8 text-center text-gray-500">
        Tidak ada dokumen.
      </p>
    );
  }

  return (
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-4 md:gap-6
      items-stretch
    ">
      {data.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}
