import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

import Welcome from "./pages/Welcome";
import Beranda from "./pages/Beranda";
import Tentang from "./pages/Tentang";
import Bantuan from "./pages/Bantuan";
import DetailPage from "./pages/DetailPage";

// Mahasiswa
import MahasiswaDashboard from "./pages/mahasiswa/Dashboard";
import UploadLaporan from "./pages/mahasiswa/UploadLaporan";
import Status from "./pages/mahasiswa/Status";
import ProfilMahasiswa from "./pages/mahasiswa/Profil";
import Pengaturan from "./pages/mahasiswa/Pengaturan";
import MahasiswaLayout from "./layouts/MahasiswaLayout";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import ReviewLaporan from "./pages/admin/ReviewLaporan";
import UploadManual from "./pages/admin/UploadManual";
import KelolaArsip from "./pages/admin/KelolaArsip";
import KelolaAkun from "./pages/admin/KelolaAkun";
import ProfilAdmin from "./pages/admin/Profil";
import Profilpengaturan from "./pages/admin/Pengaturan";
import AdminLayout from "./layouts/AdminLayout";

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <Router>
      {/* WRAPPER UTAMA: bikin footer selalu di bawah */}
      <div className="flex flex-col min-h-screen">
        <Navbar
          onLoginOpen={() => setLoginOpen(true)}
          onRegisterOpen={() => setRegisterOpen(true)}
        />
        <AuthModal open={loginOpen} mode="login" onClose={() => setLoginOpen(false)} />
        <AuthModal open={registerOpen} mode="register" onClose={() => setRegisterOpen(false)} />

        {/* KONTEN UTAMA */}
        <main className="flex-1 pt-24">
          <Routes>
            {/* Publik */}
            <Route path="/" element={<Welcome />} />
            <Route path="/beranda" element={<Beranda />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="/bantuan" element={<Bantuan />} />
            <Route path="/detail/:id" element={<DetailPage />} />

            {/* Mahasiswa */}
            <Route
              path="/mahasiswa/dashboard"
              element={
                <MahasiswaLayout>
                  <MahasiswaDashboard />
                </MahasiswaLayout>
              }
            />
            <Route
              path="/mahasiswa/upload"
              element={
                <MahasiswaLayout>
                  <UploadLaporan />
                </MahasiswaLayout>
              }
            />
            <Route
              path="/mahasiswa/status"
              element={
                <MahasiswaLayout>
                  <Status />
                </MahasiswaLayout>
              }
            />
            <Route
              path="/mahasiswa/profil"
              element={
                <MahasiswaLayout>
                  <ProfilMahasiswa />
                </MahasiswaLayout>
              }
            />
            <Route
              path="/mahasiswa/pengaturan"
              element={
                <MahasiswaLayout>
                  <Pengaturan />
                </MahasiswaLayout>
              }
            />

            {/* Admin */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/review"
              element={
                <AdminLayout>
                  <ReviewLaporan />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/upload"
              element={
                <AdminLayout>
                  <UploadManual />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/arsip"
              element={
                <AdminLayout>
                  <KelolaArsip />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/akun"
              element={
                <AdminLayout>
                  <KelolaAkun />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/profil"
              element={
                <AdminLayout>
                  <ProfilAdmin />
                </AdminLayout>
              }
            />
            <Route
              path="/admin/pengaturan"
              element={
                <AdminLayout>
                  <Profilpengaturan />
                </AdminLayout>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
