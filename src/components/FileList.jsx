import React from "react";
import FileCard from "./FileCard";

export default function FileList({ data }) {
  if (!data || !Array.isArray(data) || data.length === 0) 
    return <p className="text-gray-500 text-center mt-8">Tidak ada dokumen.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}
