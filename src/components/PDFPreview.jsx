import { useEffect, useMemo, useState } from "react";

function getToken() {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("jwt") ||
    ""
  );
}

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function toAbsoluteUrl(url) {
  if (!url) return "";

  if (
    /^(https?:)?\/\//i.test(url) ||
    url.startsWith("blob:") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  if (url.startsWith("/api/")) {
    const apiBase =
      import.meta.env.VITE_API_URL || "http://localhost:4000/api";
    const origin = apiBase.replace(/\/api\/?$/, "");
    return origin + url;
  }

  return url;
}

export default function PDFPreview({ url }) {
  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const absUrl = useMemo(() => toAbsoluteUrl(url), [url]);

  useEffect(() => {
    let revoked = "";

    async function load() {
      setLoading(true);
      setErr("");

      if (!absUrl) {
        setErr("URL PDF kosong.");
        setLoading(false);
        return;
      }

      // Mobile: tidak render iframe PDF
      if (isMobile()) {
        setSrc(absUrl);
        setLoading(false);
        return;
      }

      const token = getToken();

      try {
        if (!token) {
          setSrc(absUrl);
          setLoading(false);
          return;
        }

        const res = await fetch(absUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error(`Gagal memuat PDF (${res.status})`);
        }

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        revoked = blobUrl;

        setSrc(blobUrl);
        setLoading(false);
      } catch (e) {
        setErr(e.message || "Gagal memuat PDF.");
        setLoading(false);
      }
    }

    load();

    return () => {
      if (revoked) URL.revokeObjectURL(revoked);
    };
  }, [absUrl]);

  if (loading) return <p className="text-sm text-gray-600">Memuat PDF...</p>;
  if (err) return <p className="text-sm text-red-600">{err}</p>;

  // ================= MOBILE =================
  if (isMobile()) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg"
        >
          Buka PDF
        </a>
      </div>
    );
  }

  // ================= DESKTOP =================
  return (
    <iframe
      title="Preview PDF"
      src={src}
      className="w-full h-full rounded-lg border"
    />
  );
}
