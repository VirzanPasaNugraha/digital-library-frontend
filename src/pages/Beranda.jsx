import { useCallback, useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import FileCard from "../components/FileCard";
import { listDocuments } from "../api/documents"; // ✅ ganti ini (bukan documentsPublic)

export default function Beranda() {
  const [search, setSearch] = useState("");
  const [filterProdi, setFilterProdi] = useState("");
  const [filterTahun, setFilterTahun] = useState("");
  const [filterTipe, setFilterTipe] = useState("");

  const [docs, setDocs] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 12;

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // kalau filter berubah, reset ke halaman 1
  useEffect(() => {
    setPage(1);
  }, [filterProdi, filterTahun, filterTipe]);

  const params = useMemo(() => {
    const p = { page, limit };

    const q = search.trim();
    if (q) p.q = q; // backend kamu support q/search

    if (filterProdi) p.prodi = filterProdi;

    if (filterTahun) {
      // backend kamu Number(tahun) jadi aman kalau kita kirim angka
      const n = Number(filterTahun);
      if (!Number.isNaN(n)) p.tahun = n;
    }

    if (filterTipe) p.tipe = filterTipe;

    return p;
  }, [search, filterProdi, filterTahun, filterTipe, page]);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await listDocuments(params);
      const list = res?.documents || [];
      const tp = res?.totalPages || 1;

      setDocs(list);
      setTotalPages(tp);

      // kalau page kebesaran setelah filter/search, rapihin
      if (page > tp) setPage(tp);
    } catch (err) {
      setMessage(
        err?.userMessage ||
          err?.response?.data?.message ||
          "Gagal memuat dokumen."
      );
      setDocs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [params, page]);

  // Debounce search & fetch
  useEffect(() => {
    const t = setTimeout(() => {
      fetchDocuments();
    }, 300);

    return () => clearTimeout(t);
  }, [fetchDocuments]);

  // ✅ Auto refresh kalau ada perubahan dokumen dari admin
  // Catatan: ini hanya bekerja di TAB yang sama (karena event browser).
  useEffect(() => {
    const handler = () => {
      fetchDocuments(); // refetch pakai params saat ini
    };

    window.addEventListener("documents:changed", handler);
    return () => window.removeEventListener("documents:changed", handler);
  }, [fetchDocuments]);

  return (
    <div className="max-w-6xl px-4 py-6 mx-auto">
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      <FilterBar
        filterProdi={filterProdi}
        setFilterProdi={setFilterProdi}
        filterTahun={filterTahun}
        setFilterTahun={setFilterTahun}
        filterTipe={filterTipe}
        setFilterTipe={setFilterTipe}
      />

      {message && (
        <div className="p-3 mt-3 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          {message}
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-center text-gray-500">Memuat dokumen...</p>
      ) : docs.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">Dokumen tidak ditemukan.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((file) => (
              <FileCard key={file.id || file._id} file={file} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">
              Halaman {page} / {totalPages}
            </span>

            <button
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
