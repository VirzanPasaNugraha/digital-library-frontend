import { useEffect, useMemo, useState } from "react";
import FileCard from "../../components/FileCard";
import { STATUS } from "../../constants/status";
import {
  adminListDocuments,
  adminUpdateDocument,
  deleteDocument,
} from "../../api/documents";

/**
 * Kelola Arsip (Admin)
 * - Menampilkan hanya dokumen DITERIMA (sesuai permintaan: yang ditolak tidak masuk arsip)
 * - Bisa filter Prodi
 * - Edit metadata via modal scrollable (bukan prompt)
 * - Hapus dokumen
 */


const RULES = {
  JUDUL_MIN: 10,
  JUDUL_MAX: 200,

  PENULIS_MAX: 80,

  NIM_MIN: 10,
  NIM_MAX: 15,

  ABSTRAK_MAX: 5000,

  KEYWORD_MIN: 1,
  KEYWORD_MAX: 5,
  KEYWORD_CHAR_MIN: 4,
  KEYWORD_CHAR_MAX: 20,

  PEMBIMBING_CHAR_MIN: 5,
  PEMBIMBING_CHAR_MAX: 80,
};

export default function KelolaArsip() {
  const [files, setFiles] = useState([]);
  const [filterProdi, setFilterProdi] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);





  const fetchArsip = async () => {
    setLoading(true);
    setMessage("");
    try {
      // arsip admin = hanya DITERIMA
      const params = { status: STATUS.DITERIMA };
      if (filterProdi) params.prodi = filterProdi;

      const { documents } = await adminListDocuments(params);
      setFiles(documents || []);
    } catch (err) {
      setMessage(err?.userMessage || err?.response?.data?.message || "Gagal memuat arsip.");
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArsip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterProdi]);

  const filteredFiles = useMemo(() => {
    // ini sebenarnya sudah difilter dari backend, tapi tetap aman.
    return (files || []).filter((f) => f.status === STATUS.DITERIMA);
  }, [files]);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus dokumen ini?")) return;
    setMessage("");
    try {
      await deleteDocument(id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
      setMessage("Dokumen berhasil dihapus.");
    } catch (err) {
      setMessage(err?.userMessage || err?.response?.data?.message || "Gagal menghapus dokumen.");
    }
  };

  const openEdit = (doc) => {
    setEditing(doc);
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditing(null);
  };

  const handleSaveEdit = async (id, payload) => {
    setMessage("");
    try {
      const res = await adminUpdateDocument(id, payload);
      const updated = res?.document || res; // jaga-jaga bentuk response

     setFiles((prev) =>
  prev.map((f) =>
    f.id === id
      ? {
          ...f,
          ...updated,
          status: f.status, // ⬅️ JANGAN BIARKAN KETIMPA
        }
      : f
  )
);

      setMessage("Dokumen berhasil diperbarui.");
      closeEdit();
    } catch (err) {
      // error ditangani di modal juga, tapi kita tampilkan di halaman kalau perlu
      setMessage(err?.userMessage || err?.response?.data?.message || "Gagal menyimpan perubahan.");
      throw err;
    }
  };

  return (
  <div className="max-w-7xl mx-auto space-y-6 px-4 pt-24 md:pt-0 pb-12">
      <h1 className="mb-2 text-3xl font-bold text-green-600">Kelola Arsip</h1>
      <p className="mb-5 text-sm text-gray-600">
        Pantau dan kelola dokumen laporan yang sudah diterima. Dokumen ditolak tidak ditampilkan di arsip.
      </p>

      {message && (
        <div className="p-3 mb-4 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
          {message}
        </div>
      )}

      {/* Filter */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Filter Prodi</label>
            <select
              className="px-3 py-1 border rounded"
              value={filterProdi}
              onChange={(e) => setFilterProdi(e.target.value)}
            >
              <option value="">Semua</option>
              <option value="IF">Informatika</option>
              <option value="SI">Sistem Informasi</option>
            </select>
          </div>
        </div>

        <button
          onClick={fetchArsip}
          className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
          disabled={loading}
          type="button"
        >
          {loading ? "Memuat..." : "Refresh"}
        </button>
      </div>

      {/* File Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat dokumen...</p>
      ) : filteredFiles.length === 0 ? (
        <p className="text-center text-gray-500">Tidak ada dokumen arsip.</p>
      ) : (
        <div className="grid items-stretch grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFiles.map((file) => (
            <div key={file.id} className="relative group">
              <FileCard file={file} />

              {/* Aksi */}
              <div className="absolute flex space-x-2 transition opacity-0 top-3 right-3 group-hover:opacity-100">
                <button
                  onClick={() => openEdit(file)}
                  className="px-2 py-1 text-xs text-green-900 bg-yellow-400 rounded hover:bg-yellow-300"
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                  type="button"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Edit */}
      {editOpen && editing && (
        <EditMetadataModal
          open={editOpen}
          doc={editing}
          onClose={closeEdit}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

/* ===================== Modal Edit (Scrollable) ===================== */
function EditMetadataModal({ open, doc, onClose, onSave }) {
  const [saving, setSaving] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // Normalisasi agar aman (string/array)
  const normalizeArray = (v) => {
    if (!v) return [];
    if (Array.isArray(v)) return v.filter(Boolean).map(String);
    return String(v)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  };

  // Field form
  const [judul, setJudul] = useState(doc?.judul || "");
  const [penulis, setPenulis] = useState(doc?.penulis || "");
  const [nim, setNim] = useState(doc?.nim || "");
  const [prodi, setProdi] = useState(doc?.prodi || "IF");
  const [tipe, setTipe] = useState(doc?.tipe || "Skripsi");
  const [tahun, setTahun] = useState(doc?.tahun ? String(doc.tahun) : "");
  const [pembimbing, setPembimbing] = useState(normalizeArray(doc?.pembimbing));
  const [keywords, setKeywords] = useState(normalizeArray(doc?.keywords));
  const [abstrak, setAbstrak] = useState(
    Array.isArray(doc?.abstrak) ? doc.abstrak.join("\n") : (doc?.abstrak || "")
  );

  useEffect(() => {
    if (!open) return;
    setErrMsg("");

    setJudul(doc?.judul || "");
    setPenulis(doc?.penulis || "");
    setNim(doc?.nim || "");
    setProdi(doc?.prodi || "IF");
    setTipe(doc?.tipe || "Skripsi");
    setTahun(doc?.tahun ? String(doc.tahun) : "");
    setPembimbing(normalizeArray(doc?.pembimbing));
    setKeywords(normalizeArray(doc?.keywords));
    setAbstrak(Array.isArray(doc?.abstrak) ? doc.abstrak.join("\n") : (doc?.abstrak || ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

 const validate = () => {
  if (judul.length < RULES.JUDUL_MIN || judul.length > RULES.JUDUL_MAX)
    return "Judul minimal 10 dan maksimal 200 karakter.";

  if (!penulis || penulis.length > RULES.PENULIS_MAX)
    return "Penulis wajib diisi (maks 80 karakter).";

  if (nim.length < RULES.NIM_MIN || nim.length > RULES.NIM_MAX)
    return "NIM minimal 10 dan maksimal 15 karakter.";

  if (!prodi)
    return "Program studi wajib dipilih.";

  if (!tipe)
    return "Jenis dokumen wajib dipilih.";

  if (!/^\d{4}$/.test(tahun))
    return "Tahun harus 4 digit.";

  if (
    keywords.length < RULES.KEYWORD_MIN ||
    keywords.length > RULES.KEYWORD_MAX
  )
    return "Minimal 1 dan maksimal 5 kata kunci.";

  if (abstrak.length > RULES.ABSTRAK_MAX)
    return "Abstrak maksimal 5000 karakter.";

  return "";
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    const v = validate();
    if (v) {
      setErrMsg(v);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        judul: judul.trim(),
        penulis: penulis.trim(),
        nim: nim.trim(),
        prodi,
        tipe,
        tahun: Number(tahun),
        // kirim array (backend kamu sudah ada parser untuk array/json/string, tinggal patch-nya support)
        pembimbing: JSON.stringify(pembimbing),
  keywords: JSON.stringify(keywords),
        abstrak: abstrak || "",
      };

      await onSave(doc.id, payload);
    } catch (err) {
      setErrMsg(err?.userMessage || err?.response?.data?.message || "Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      {/* Container modal: max tinggi + flex kolom supaya body bisa scroll */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute text-2xl text-gray-600 right-4 top-3 hover:text-black"
          type="button"
          disabled={saving}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header sticky */}
        <div className="sticky top-0 z-10 p-5 bg-white border-b">
          <h2 className="text-xl font-semibold text-green-700">Edit Metadata Dokumen</h2>
          <p className="text-sm text-gray-600">
            Edit metadata tanpa bikin layar kamu menderita.
          </p>
        </div>

        {/* Body scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 p-5 space-y-4 overflow-y-auto">
          {errMsg && (
            <div className="p-3 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
              {errMsg}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputField label="Judul" value={judul} onChange={setJudul} />
            <InputField label="Penulis" value={penulis} onChange={setPenulis} />
            <InputField label="NIM" value={nim} onChange={setNim} />

            <SelectField
              label="Program Studi"
              value={prodi}
              onChange={setProdi}
              options={[
                { value: "IF", label: "Informatika (IF)" },
                { value: "SI", label: "Sistem Informasi (SI)" },
              ]}
            />

            <SelectField
              label="Jenis Dokumen"
              value={tipe}
              onChange={setTipe}
              options={[
                { value: "Skripsi", label: "Skripsi" },
                { value: "Laporan KP", label: "Laporan KP" },
              ]}
            />

            <InputField label="Tahun" value={tahun} onChange={setTahun} type="number" />

            {/* Tag input: pembimbing bisa lebih dari 1 */}
            <TagInput label="Pembimbing" values={pembimbing} setValues={setPembimbing} />
           <TagInput
  label="Kata Kunci"
  values={keywords}
  setValues={setKeywords}
/>

          </div>

        <TextAreaField
  label="Abstrak"
  value={abstrak}
  onChange={setAbstrak}
  maxLength={RULES.ABSTRAK_MAX}
/>

        </form>

        {/* Footer sticky */}
        <div className="sticky bottom-0 z-10 flex justify-end gap-2 p-4 bg-white border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
            disabled={saving}
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-70"
            disabled={saving}
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================== Small Components ===================== */
function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-green-500"
        placeholder={`Masukkan ${label.toLowerCase()}`}
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-green-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, value, onChange, maxLength }) {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-40 p-3 mt-1 border rounded"
      />
      <div className="flex justify-end text-xs text-gray-500">
        {value.length}/{maxLength}
      </div>
    </div>
  );
}


/**
 * TagInput (keyword style)
 * - Enter untuk tambah
 * - Klik x untuk hapus
 */
function TagInput({ label, values, setValues }) {
  const [input, setInput] = useState("");

  const addValue = (val) => {
  const v = (val || "").trim();
  if (!v) return;

 if (
  v.length < RULES.KEYWORD_CHAR_MIN ||
  v.length > RULES.KEYWORD_CHAR_MAX
) {
  setError("Kata kunci harus 4–20 karakter");
  return;
}


  if (label === "Pembimbing") {
    if (
      v.length < RULES.PEMBIMBING_CHAR_MIN ||
      v.length > RULES.PEMBIMBING_CHAR_MAX
    ) return;
  }

  if (values.some(x => x.toLowerCase() === v.toLowerCase())) return;

  setValues([...values, v]);
};


  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addValue(input);
      setInput("");
    }
  };

  const removeAt = (idx) => {
    setValues((values || []).filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>

      <div className="flex flex-wrap gap-2 p-3 border rounded-lg focus-within:ring-2 focus-within:ring-green-500">
        {(values || []).map((v, idx) => (
          <span
            key={`${v}-${idx}`}
            className="flex items-center gap-1 px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full"
          >
            {v}
            <button
              type="button"
              onClick={() => removeAt(idx)}
              className="font-bold text-green-600 hover:text-red-600"
              aria-label="Remove"
            >
              ×
            </button>
          </span>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`Ketik ${label.toLowerCase()} lalu Enter`}
          className="flex-1 text-sm outline-none min-w-[140px]"
        />
      </div>

      <p className="mt-1 text-xs text-gray-500">Tekan Enter untuk menambahkan.</p>
    </div>
  );
}
