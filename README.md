# Digital Library - Prototipe Interaktif

Prototype Digital Library FTI merupakan aplikasi perpustakaan digital berbasis web yang dirancang untuk mendukung pengelolaan dan pencarian Laporan Kerja Praktik (KP) dan Skripsi di lingkungan Fakultas Teknologi Informasi (FTI).

Aplikasi ini dibuat sebagai luaran Kerja Praktik (KP) dan berfokus pada perancangan antarmuka (UI/UX) serta simulasi alur sistem menggunakan data dummy, tanpa backend dan database nyata.

🎯 Tujuan Proyek

Menyediakan prototype sistem perpustakaan digital untuk laporan KP dan Skripsi

Memudahkan mahasiswa dalam mencari referensi laporan terdahulu

Mensimulasikan alur unggah dan review laporan oleh admin prodi

Menjadi media demonstrasi konsep sistem untuk kebutuhan akademik (KP)

👥 Role Pengguna

Aplikasi ini memiliki tiga role utama:

Role	Deskripsi
Mahasiswa	Mengunggah laporan KP/Skripsi, melihat status unggahan, dan mengakses dokumen yang telah diterima
Admin IF	Melakukan review laporan dari Program Studi Informatika
Admin SI	Melakukan review laporan dari Program Studi Sistem Informndasi
🔁 Alur Sistem (Simulasi)
👤 Mahasiswa

Login ke sistem (dummy)

Mengunggah laporan KP atau Skripsi

Laporan berstatus Pending

Melihat status laporan: Pending / Diterima / Ditolak

Jika ditolak, mahasiswa dapat mengunggah ulang laporan

🛠️ Admin Prodi (IF / SI)

Melihat daftar laporan sesuai prodi

Preview dokumen PDF

Memberikan keputusan:

Diterima → tampil di repository

Ditolak → disertai alasan penolakan

⚠️ Seluruh alur di atas bersifat simulasi frontend menggunakan data dummy.

🧩 Fitur Utama

🔍 Pencarian dokumen berdasarkan judul, penulis, dan kata kunci

🗂️ Filter berdasarkan prodi dan tahun

📄 Preview dokumen PDF (PDF.js)

⬆️ Upload laporan (dummy)

📊 Dashboard Admin & Mahasiswa

👥 Manajemen role pengguna (dummy)

🛠️ Teknologi yang Digunakan

Frontend: React.js

Build Tool: Vite

Styling: Tailwind CSS

State Management: React Context (Auth)

PDF Preview: PDF.js

Data: Dummy Data (tanpa backend)

📁 Struktur Folder Utama
digital-library/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── constants/
│   ├── context/
│   └── assets/
├── package.json
├── vite.config.js
└── README.md
▶️ Cara Menjalankan Project
1. Clone Repository
git clone https://github.com/Syauqi25062003/digital-library-fti.git
cd digital-library-fti
2. Install Dependencies
npm install
3. Jalankan Aplikasi
npm run dev

Aplikasi akan berjalan di browser pada:

http://localhost:5173
📌 Catatan Penting

Proyek ini hanya prototype frontend

Tidak terhubung ke backend atau database

Seluruh data bersifat dummy

Digunakan untuk kebutuhan Kerja Praktik (KP) dan pembelajaran

✔ Prototype frontend selesai ✔ Alur utama sistem tersedia ✔ Siap untuk demonstrasi & laporan KP

👨‍🎓 Kontributor

Kelompok 1
220660121001 - M Reksa Aji Winangun
220660121022 - Syauqi Zainun Nauval
220660121033 - Rifan Warosy Sirojudin
220660121036 - Muhammad Fajar Lutfiana
220660121054 - Virzan Pasa Nugraha
220660121066 - Siti Rachmania Putri

Program Studi: Fakultas Teknologi Informasi

Kegiatan: Kerja Praktik (KP)

📄 Lisensi

Proyek ini dibuat untuk keperluan akademik dan pembelajaran.