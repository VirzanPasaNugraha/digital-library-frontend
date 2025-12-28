import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  /* ===================== SCROLL DETECTOR ===================== */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===================== LOCK SCROLL (MOBILE MENU) ===================== */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isHome = location.pathname === "/";

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleNav = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleDashboard = () => {
    if (!currentUser) return;
    navigate(
      currentUser.role === "mahasiswa"
        ? "/mahasiswa/dashboard"
        : "/admin/dashboard"
    );
    closeMenu();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  const getAvatarText = () => {
    if (!currentUser) return "U";
    if (currentUser.role?.startsWith("admin")) {
      return currentUser.prodi || "ADM";
    }
    return currentUser.name
      ?.split(" ")
      .slice(0, 2)
      .map((n) => n[0].toUpperCase())
      .join("") || "U";
  };

  const navItemClass = (path) =>
    `relative font-medium transition-colors ${
      location.pathname === path
        ? "text-yellow-300"
        : "text-white hover:text-yellow-200"
    }`;

  /* ===================== NAVBAR CLASS ===================== */
  const navbarClass = `
    fixed top-0 left-0 w-full z-50
    transition-all duration-300
    ${
      isHome && !scrolled
        ? "bg-transparent"
        : "bg-green-700 shadow-md"
    }
  `;

  return (
    <nav className={navbarClass}>
      {/* ===================== TOP BAR ===================== */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => handleNav("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={LogoFti} alt="FTI" className="h-8 w-8" />
          <span className="text-white font-bold text-lg">
            Digital Library FTI
          </span>
        </div>

        {/* ===================== DESKTOP MENU ===================== */}
        <div className="hidden md:flex items-center gap-6">
          <button
            className={navItemClass("/beranda")}
            onClick={() => handleNav("/beranda")}
          >
            Beranda
          </button>
          <button
            className={navItemClass("/tentang")}
            onClick={() => handleNav("/tentang")}
          >
            Tentang
          </button>
          <button
            className={navItemClass("/bantuan")}
            onClick={() => handleNav("/bantuan")}
          >
            Bantuan
          </button>

          {!currentUser ? (
            <>
              <button
                onClick={onLoginOpen}
                className="bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
              >
                Masuk
              </button>
              <button
                onClick={onRegisterOpen}
                className="bg-white text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Daftar
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-yellow-300 text-green-900 font-bold flex items-center justify-center"
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

        {/* ===================== MOBILE TOGGLE ===================== */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ===================== MOBILE MENU ===================== */}
      <div
        className={`
          md:hidden bg-green-700 text-white px-6 pb-4 space-y-3
          transition-all duration-300 overflow-hidden
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <button onClick={() => handleNav("/beranda")} className="block w-full">
          Beranda
        </button>
        <button onClick={() => handleNav("/tentang")} className="block w-full">
          Tentang
        </button>
        <button onClick={() => handleNav("/bantuan")} className="block w-full">
          Bantuan
        </button>

        <hr className="border-green-500" />

        {!currentUser ? (
          <>
            <button onClick={onLoginOpen} className="block w-full">
              Masuk
            </button>
            <button onClick={onRegisterOpen} className="block w-full">
              Daftar
            </button>
          </>
        ) : (
          <>
            <button onClick={handleDashboard} className="block w-full">
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-red-300"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
