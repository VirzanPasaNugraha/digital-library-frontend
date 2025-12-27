import { useEffect, useMemo, useState } from "react";

function getToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

// Convert "/api/..." jadi "http://localhost:4000/api/..." kalau perlu
function toAbsoluteUrl(url) {
  if (!url) return "";

  // sudah absolute / blob / data
  if (/^(https?:)?\/\//i.test(url) || url.startsWith("blob:") || url.startsWith("data:")) {
    return url;
  }

  // kalau url dari backend kamu bentuknya "/api/...."
  if (url.startsWith("/api/")) {
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
    const origin = apiBase.replace(/\/api\/?$/, ""); // "http://localhost:4000"
    return origin + url;
  }

  // fallback: biarkan relatif
  return url;
}

export default function PDFPreview({ url }) {
  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const absUrl = useMemo(() => toAbsoluteUrl(url), [url]);

  useEffect(() => {
    let cancelled = false;
    let objectUrlToRevoke = "";

    async function load() {
      setLoading(true);
      setErr("");
      setSrc("");

      if (!absUrl) {
        setErr("URL PDF kosong.");
        setLoading(false);
        return;
      }

      // kalau sudah blob:, langsung tampilkan
      if (absUrl.startsWith("blob:") || absUrl.startsWith("data:")) {
        setSrc(absUrl);
        setLoading(false);
        return;
      }

      // Untuk endpoint file yang kemungkinan butuh auth, kita fetch pakai token -> blob
      // (ini yang bikin preview admin PENDING tetap bisa)
      const token = getToken();

      try {
        // Kalau tidak ada token, coba tampilkan direct (untuk dokumen publik DITERIMA)
        if (!token) {
          setSrc(absUrl);
          setLoading(false);
          return;
        }

        const res = await fetch(absUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          // Kalau dokumen publik, kadang server izinkan tanpa token. Tapi ini sudah pakai token.
          // Tetap tampilkan pesan error yang masuk akal.
          const msg = `Gagal memuat PDF (${res.status}).`;
          throw new Error(msg);
        }

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        objectUrlToRevoke = blobUrl;

        if (!cancelled) {
          setSrc(blobUrl);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setErr(e?.message || "Gagal memuat PDF.");
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
      if (objectUrlToRevoke) URL.revokeObjectURL(objectUrlToRevoke);
    };
  }, [absUrl]);

  if (loading) return <p className="text-sm text-gray-600">Memuat PDF...</p>;
  if (err) return <p className="text-sm text-red-600">{err}</p>;

  // Viewer paling “normal”: toolbar browser muncul, scroll enak, tidak render semua halaman manual
  return (
    <iframe
      title="Preview PDF"
      src={src}
      className="w-full h-[78vh] rounded-lg border"
    />
  );
}
