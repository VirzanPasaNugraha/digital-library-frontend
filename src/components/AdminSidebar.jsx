import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  FileTextIcon,
  UploadIcon,
  UsersIcon,
  UserIcon,
  CogIcon,
} from "lucide-react";

/* ===================== PRODI MAPPING ===================== */
const PRODI_LABEL = {
  IF: "Informatika",
  SI: "Sistem Informasi",
};

function formatProdi(value) {
  return PRODI_LABEL[value] || value || "-";
}

/* ===================== MENU ===================== */
const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <HomeIcon size={18} /> },
  { name: "Review Laporan", path: "/admin/review", icon: <FileTextIcon size={18} /> },
  { name: "Unggah Laporan", path: "/admin/upload", icon: <UploadIcon size={18} /> },
  { name: "Kelola Arsip", path: "/admin/arsip", icon: <FileTextIcon size={18} /> },
  { name: "Kelola Akun", path: "/admin/akun", icon: <UsersIcon size={18} /> },
  { name: "Profil", path: "/admin/profil", icon: <UserIcon size={18} /> },
  { name: "Pengaturan", path: "/admin/pengaturan", icon: <CogIcon size={18} /> },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Contoh data admin login (biasanya dari auth / context)
  const adminUser = {
    nama: "Admin Fakultas",
    prodi: "IF", // IF / SI dari backend
  };

  const renderMenuItems = (closeMenu) =>
    menuItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => closeMenu && setIsOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition ${
            isActive ? "bg-green-100 text-green-700" : ""
          }`
        }
      >
        {item.icon}
        {item.name}
      </NavLink>
    ));

  return (
    <>
      {/* ===================== SIDEBAR DESKTOP ===================== */}
      <aside className="hidden md:flex flex-col bg-white shadow-md rounded-xl p-5 space-y-6 fixed top-22 left-0 w-64 h-[calc(100vh-6rem-3rem)] z-40">
        <div className="mb-6">
          <div className="text-xl font-bold text-green-900">
            Dashboard Admin
          </div>

          {/* 🔽 HAPUS BLOK INI JIKA TIDAK INGIN MENAMPILKAN PRODI */}
          <div className="mt-1 text-sm text-gray-600">
            Program Studi:{" "}
            <b className="text-gray-800">
              {formatProdi(adminUser.prodi)}
            </b>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {renderMenuItems(false)}
        </nav>
      </aside>

      {/* ===================== MOBILE ===================== */}
      <div className="md:hidden">
        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 m-2 text-white bg-green-700 rounded-md shadow"
        >
          ☰
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Off-canvas */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-5 pt-20 transform transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
            <div>
              <div className="text-xl font-bold text-green-900">
                Dashboard Admin
              </div>
              <div className="text-sm text-gray-600">
                {formatProdi(adminUser.prodi)}
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-bold text-lg"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-2 mt-6">
            {renderMenuItems(true)}
          </nav>
        </aside>
      </div>
    </>
  );
}
