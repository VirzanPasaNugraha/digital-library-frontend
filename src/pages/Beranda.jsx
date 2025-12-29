import { useCallback, useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import FileCard from "../components/FileCard";
import { listPublicDocuments } from "../api/documentsPublic";

export default function Beranda() {
  /* ===================== STATE ===================== */
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

  /* ===================== RESET PAGE SAAT FILTER BERUBAH ===================== */
  useEffect(() => {
    setPage(1);
  }, [filterProdi, filterTahun, filterTipe]);

  /* ===================== PARAMS API (STABLE) ===================== */
  const params = useMemo(() => {
    const p = { page, limit };

    const q = search.trim();
    if (q) p.q = q;
    if (filterProdi) p.prodi = filterProdi;
    if (filterTahun && !Number.isNaN(Number(filterTahun))) {
      p.tahun = Number(filterTahun);
    }
    if (filterTipe) p.tipe = filterTipe;

    return p;
  }, [search, filterProdi, filterTahun, filterTipe, page]);

  /* ===================== FETCH DATA (TANPA LOOP) ===================== */
  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setMessage("");

    try {
     const res = await listPublicDocuments(params);
      const list = res?.documents || [];
      const tp = res?.totalPages || 1;

      setDocs(list);
      setTotalPages(tp);
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
  }, [params]);

  /* ===================== DEBOUNCE FETCH ===================== */
  useEffect(() => {
    const t = setTimeout(() => {
      fetchDocuments();
    }, 300);

    return () => clearTimeout(t);
  }, [fetchDocuments]);

  /* ===================== AUTO REFRESH EVENT ===================== */
  useEffect(() => {
    const handler = () => fetchDocuments();
    window.addEventListener("documents:changed", handler);

    return () => {
      window.removeEventListener("documents:changed", handler);
    };
  }, [fetchDocuments]);

  /* ===================== RENDER ===================== */
  return (
    <div className="max-w-6xl px-4 py-8 mx-auto space-y-6">
      {/* Search */}
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filter */}
      <FilterBar
        filterProdi={filterProdi}
        setFilterProdi={setFilterProdi}
        filterTahun={filterTahun}
        setFilterTahun={setFilterTahun}
        filterTipe={filterTipe}
        setFilterTipe={setFilterTipe}
      />

      {/* Error Message */}
      {message && (
        <div className="p-3 text-sm text-center text-red-700 border border-red-200 rounded-lg bg-red-50 shadow-sm">
          {message}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-12 text-gray-500">
          <svg
            className="w-6 h-6 mb-2 animate-spin text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            />
          </svg>
          Memuat dokumen...
        </div>
      ) : docs.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          Tidak ada dokumen yang ditemukan.
        </p>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 gap-y-8 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {docs.map((file) => (
              <FileCard key={file.id || file._id} file={file} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              className="px-4 py-2 border rounded hover:bg-gray-50 transition-all disabled:opacity-50"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span className="text-sm font-medium text-gray-700">
              Halaman{" "}
              <span className="font-semibold text-green-700">{page}</span> /{" "}
              {totalPages}
            </span>

            <button
              className="px-4 py-2 border rounded hover:bg-gray-50 transition-all disabled:opacity-50"
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
