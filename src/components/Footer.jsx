import React from "react";

export default function Footer() {
  return (
    <footer className="py-5 bg-green-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm break-words">
          Digital Library FTI - Universitas Sebelas April | Kerja Praktek {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
