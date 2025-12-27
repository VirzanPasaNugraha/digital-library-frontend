import React from "react";

export default function Footer() {
  return (
    <footer className="py-5 text-white bg-green-700">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} Digital Library FTI - Universitas Sebelas April Sumedang</p>
      </div>
    </footer>
  );
}
