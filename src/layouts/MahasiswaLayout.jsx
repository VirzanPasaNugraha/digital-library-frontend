// src/layouts/MahasiswaLayout.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MahasiswaSidebar from "../components/MahasiswaSidebar";

export default function MahasiswaLayout({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== "mahasiswa") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <MahasiswaSidebar />

      {/* Konten utama */}
      <div className="flex flex-col flex-1 md:ml-64 overflow-x-hidden">
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
