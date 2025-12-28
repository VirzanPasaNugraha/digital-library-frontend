import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UploadIcon,
  FileTextIcon,
  UserIcon,
  CogIcon,
} from "lucide-react";

/* ===================== MENU ITEMS ===================== */
const menuItems = [
  {
    name: "Dashboard",
    path: "/mahasiswa/dashboard",
    icon: <HomeIcon size={18} />,
  },
  {
    name: "Unggah Laporan",
    path: "/mahasiswa/upload",
    icon: <UploadIcon size={18} />,
  },
  {
    name: "Status Unggahan",
    path: "/mahasiswa/status",
    icon: <FileTextIcon size={18} />,
  },
  {
    name: "Profil",
    path: "/mahasiswa/profil",
    icon: <UserIcon size={18} />,
  },
  {
    name: "Pengaturan",
    path: "/mahasiswa/pengaturan",
    icon: <CogIcon size={18} />,
  },
];

export default function MahasiswaSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  /* ===================== LOCK SCROLL (MOBILE) ===================== */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ===================== RENDER MENU ===================== */
  const renderMenuItems = (closeOnClick = false) =>
    menuItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => closeOnClick && setIsOpen(false)}
        className={({ isActive }) =>
          `
          flex items-center gap-3 px-4 py-2 rounded-lg
          font-medium text-gray-700
          hover:bg-green-50 hover:text-green-700
          transition
          ${isActive ? "bg-green-100 text-green-700" : ""}
        `
        }
      >
        {item.icon}
        <span className="break-words">{item.name}</span>
      </NavLink>
    ));

  return (
    <>
      {/* ===================== SIDEBAR DESKTOP ===================== */}
      <aside
        className="
          hidden md:flex flex-col
          bg-white shadow-md rounded-xl
          p-5 space-y-6
          fixed top-22 left-0
          w-64
          h-[calc(100vh-6rem-3rem)]
          z-40
        "
      >
        <div className="text-xl font-bold text-green-900 mb-8 break-words">
          Dashboard Mahasiswa
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
          className="
            p-2 m-2
            text-white bg-green-700
            rounded-md shadow
          "
        >
          ☰
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Off-canvas Sidebar */}
        <aside
          className={`
            fixed top-0 left-0
            h-full w-64
            bg-white shadow-md
            p-5 pt-20
            transform transition-transform duration-300
            z-50
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Header */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
            <span className="text-xl font-bold text-green-900 break-words">
              Dashboard Mahasiswa
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 font-bold text-lg"
            >
              ✕
            </button>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-2 mt-4">
            {renderMenuItems(true)}
          </nav>
        </aside>
      </div>
    </>
  );
}
