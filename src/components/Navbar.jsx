import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import LogoFti from "../assets/logo_unsap.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onLoginOpen, onRegisterOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleNav = (path) => {
    navigate(path);
    closeMenu();
    setProfileOpen(false);
  };

  const handleDashboard = () => {
    if (!currentUser) return;
    if (currentUser.role === "mahasiswa") navigate("/mahasiswa/dashboard");
    else navigate("/admin/dashboard");
    closeMenu();
    setProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
    setProfileOpen(false);
  };

  const getAvatarText = () => {
    if (!currentUser) return "U";
    if (currentUser.role?.startsWith("admin")) return currentUser.prodi || "ADM";
    if (currentUser.name)
      return currentUser.name
        .split(" ")
        .slice(0, 2)
        .map(n => n[0].toUpperCase())
        .join("");
    return "U";
  };

  const navItemClass = (path) =>
    `relative font-medium transition-all
     ${location.pathname === path ? "text-yellow-300" : "text-white"}
     hover:text-yellow-200`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-green-700 z-50 shadow">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => handleNav("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={LogoFti} alt="FTI" className="h-8 w-8" />
          {/* Teks selalu muncul, tidak hidden */}
          <span className="text-white font-bold text-lg">
            Digital Library FTI
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <button className={navItemClass("/beranda")} onClick={() => handleNav("/beranda")}>Beranda</button>
          <button className={navItemClass("/tentang")} onClick={() => handleNav("/tentang")}>Tentang</button>
          <button className={navItemClass("/bantuan")} onClick={() => handleNav("/bantuan")}>Bantuan</button>

          {!currentUser ? (
            <>
              <button
                onClick={() => { onLoginOpen(); closeMenu(); }}
                className="bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
              >
                Masuk
              </button>
              <button
                onClick={() => { onRegisterOpen(); closeMenu(); }}
                className="bg-white text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Daftar
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-yellow-300 text-green-900 font-bold flex items-center justify-center hover:bg-yellow-200"
              >
                {getAvatarText()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="px-4 py-2 text-sm text-gray-600 border-b">
                    {currentUser.name || "Admin"}
                  </div>
                  <button
                    onClick={handleDashboard}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-green-700 text-white px-6 pb-4 space-y-3 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <button onClick={() => handleNav("/beranda")} className="block w-full text-left">Beranda</button>
        <button onClick={() => handleNav("/tentang")} className="block w-full text-left">Tentang</button>
        <button onClick={() => handleNav("/bantuan")} className="block w-full text-left">Bantuan</button>

        <hr className="border-green-500" />

        {!currentUser ? (
          <>
            <button onClick={() => { onLoginOpen(); closeMenu(); }} className="block w-full text-left">Masuk</button>
            <button onClick={() => { onRegisterOpen(); closeMenu(); }} className="block w-full text-left">Daftar</button>
          </>
        ) : (
          <>
            <button onClick={handleDashboard} className="block w-full text-left">Dashboard</button>
            <button onClick={handleLogout} className="block w-full text-left text-red-300">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
