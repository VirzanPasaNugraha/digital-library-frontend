import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { api } from "@/api/http";

export default function ArsipPage() {
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/documents/search", {
          params: { q: searchValue },
        });
        setDocs(res.data.documents || []);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce

    return () => clearTimeout(t);
  }, [query]);

  return (
    <>
      <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />

      {loading && <p>Mencari secara semantic...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {docs.map((d) => (
          <DocumentCard key={d.id} doc={d} />
        ))}
      </div>
    </>
  );
}
