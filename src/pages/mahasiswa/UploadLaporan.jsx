import { useState, useEffect } from "react";
import { api } from "../../api/http";
import PDFPreview from "../../components/PDFPreview";


export default function UploadLaporan() {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
const [uploadedPdfUrl, setUploadedPdfUrl] = useState("");
  const [tipe, setTipe] = useState("Skripsi");
  const [previewUrl, setPreviewUrl] = useState("");
  const [tahun, setTahun] = useState("");

  const [pembimbing, setPembimbing] = useState([]);
  const [inputPembimbing, setInputPembimbing] = useState("");

  const [kataKunci, setKataKunci] = useState([]);
  const [inputKeyword, setInputKeyword] = useState("");

  const [abstrak, setAbstrak] = useState("");
  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");



  useEffect(() => {
  return () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  };
}, [previewUrl]);


  /* ================= VALIDATION ================= */
  const validateForm = () => {
    const e = {};

    if (judul.length < 10 || judul.length > 80)
      e.judul = "Judul minimal 10 dan maksimal 80 karakter";

    if (!penulis || penulis.length > 40)
      e.penulis = "Penulis wajib diisi (maks 40 karakter)";

    if (nim.length < 10 || nim.length > 15)
      e.nim = "NIM minimal 10 dan maksimal 15 karakter";

    if (!prodi) e.prodi = "Program studi wajib dipilih";

    if (!tahun || tahun.length !== 4)
      e.tahun = "Tahun harus 4 digit";

    if (kataKunci.length < 1 || kataKunci.length > 20)
      e.kataKunci = "Minimal 1 dan maksimal 20 kata kunci";

    if (!file) e.file = "File PDF wajib diupload";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= KEYWORD ================= */
 const handleKeywordKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addKeyword();
  }
};

const handlePembimbingKeyDown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addPembimbing();
  }
};


  const removeKeyword = (i) => {
    const updated = kataKunci.filter((_, idx) => idx !== i);
    setKataKunci(updated);
    if (updated.length >= 1)
      setErrors((p) => ({ ...p, kataKunci: undefined }));
  };

 const addKeyword = () => {
  const v = inputKeyword.trim();
  if (!v) return;
  if (kataKunci.some(k => k.toLowerCase() === v.toLowerCase())) return;
  setKataKunci([...kataKunci, v]);
  setInputKeyword("");
};

const addPembimbing = () => {
  const v = inputPembimbing.trim();
  if (!v) return;
  if (pembimbing.some(p => p.toLowerCase() === v.toLowerCase())) return;
  setPembimbing([...pembimbing, v]);
  setInputPembimbing("");
};



  const removePembimbing = (i) => {
    setPembimbing(pembimbing.filter((_, idx) => idx !== i));
  };

  useEffect(() => {
  document.body.style.overflow = openPreview ? "hidden" : "";
  return () => {
    document.body.style.overflow = "";
  };
}, [openPreview]);


  /* ================= FILE ================= */
 const handleFileChange = (e) => {
  const f = e.target.files?.[0];
  if (!f) return;

  if (f.type !== "application/pdf") {
    setErrors((p) => ({ ...p, file: "File harus PDF" }));
    return;
  }

  if (f.size > 10 * 1024 * 1024) {
    setErrors((p) => ({ ...p, file: "Ukuran maksimal 10 MB" }));
    return;
  }

  setFile(f);
  setPreviewUrl(URL.createObjectURL(f)); // 👈 TAMBAHAN PENTING
  setErrors((p) => ({ ...p, file: undefined }));
};


  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("penulis", penulis);
      formData.append("nim", nim);
      formData.append("prodi", prodi);
      formData.append("tipe", tipe);
      formData.append("tahun", tahun);
      formData.append("abstrak", abstrak);
      formData.append("pembimbing", JSON.stringify(pembimbing));
      formData.append("keywords", JSON.stringify(kataKunci));
      formData.append("file", file);

     const res = await api.post("/api/documents", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

// ambil pdfUrl dari backend
setUploadedPdfUrl(res.data.document.pdfUrl);


      setMessage(res?.data?.message || "Upload berhasil. Menunggu review admin.");

      setJudul("");
      setPenulis("");
      setNim("");
      setProdi("");
      setTipe("Skripsi");
      setTahun("");
      setPembimbing([]);
      setInputPembimbing("");
      setKataKunci([]);
      setInputKeyword("");
      setAbstrak("");
      setFile(null);
      setPreviewUrl("");
      setErrors({});
    } catch (err) {
      setMessage(err?.response?.data?.message || "Upload gagal.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (err) =>
    `w-full p-3 mt-1 border rounded-lg focus:ring-2 ${
      err
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-300 focus:ring-green-500"
    }`;

  return (
   <div className="w-full min-h-screen px-4 pb-24 md:px-8">
  <div className="max-w-5xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white shadow-lg rounded-xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField label="Judul Laporan" value={judul} onChange={setJudul} error={errors.judul} cls={inputClass} />
          <InputField label="Penulis" value={penulis} onChange={setPenulis} error={errors.penulis} cls={inputClass} />
          <InputField label="NIM" value={nim} onChange={setNim} error={errors.nim} cls={inputClass} />
          <SelectField
            label="Program Studi"
            value={prodi}
            onChange={setProdi}
            error={errors.prodi}
            cls={inputClass}
            options={[
              { label: "Informatika (IF)", value: "IF" },
              { label: "Sistem Informasi (SI)", value: "SI" },
            ]}
          />
          <SelectField
            label="Jenis Dokumen"
            value={tipe}
            onChange={setTipe}
            cls={inputClass}
            options={[
              { label: "Skripsi", value: "Skripsi" },
              { label: "Laporan KP", value: "Laporan KP" },
            ]}
          />
          <InputField label="Tahun" value={tahun} onChange={setTahun} error={errors.tahun} cls={inputClass} />
        </div>

        <ChipInput
          label="Pembimbing"
          values={pembimbing}
          input={inputPembimbing}
          setInput={setInputPembimbing}
          onKeyDown={handlePembimbingKeyDown}
          onAdd={addPembimbing}
          onRemove={removePembimbing}
          error={errors.pembimbing}
        />

        <ChipInput
          label="Kata Kunci"
          values={kataKunci}
          input={inputKeyword}
          setInput={setInputKeyword}
          onKeyDown={handleKeywordKeyDown}
          onAdd={addKeyword} 
          onRemove={removeKeyword}
          error={errors.kataKunci}
        />

        <TextAreaField label="Abstrak" value={abstrak} onChange={setAbstrak} />

        <div>
          <label className="block mb-1 text-sm font-medium">Upload File PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className={inputClass(errors.file)}
          />
          {file && <p className="mt-1 text-sm text-gray-600">File terpilih: {file.name}</p>}
          {errors.file && <p className="text-xs text-red-600">{errors.file}</p>}
        </div>
{previewUrl && (
  <div className="mt-4">
    <PDFPreview url={previewUrl} />
  </div>
)}



        {message && (
          <div className="p-3 text-sm text-green-800 border border-green-200 rounded-lg bg-green-50">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg disabled:opacity-70"
        >
          {loading ? "Mengunggah..." : "Upload"}
        </button>
      </form>
      {/* ===== TOMBOL LIHAT DOKUMEN ===== */}
{uploadedPdfUrl && (
  <button
    type="button"
    onClick={() => setOpenPreview(true)}
    className="w-full mt-4 py-3 font-semibold text-white bg-green-600 rounded-lg"
  >
    Lihat Dokumen
  </button>
)}

{/* ===== MODAL PREVIEW (SAMA DENGAN DetailPage) ===== */}
{openPreview && uploadedPdfUrl && (
  <div className="fixed inset-0 z-50 bg-black/60 flex">
    <div
      className="
        bg-white
        w-full h-full
        md:max-w-5xl md:h-[90vh]
        md:rounded-xl
        shadow-lg
        flex flex-col
        relative
         md:m-auto
      "
    >
      <button
        onClick={() => setOpenPreview(false)}
        className="absolute top-3 right-4 text-2xl text-gray-600"
      >
        ✕
      </button>

      <div className="p-4 font-semibold text-green-700 border-b">
        Lihat Dokumen
      </div>

      <div className="flex-1 overflow-hidden p-2 md:p-4">
        <PDFPreview url={uploadedPdfUrl} />
      </div>
    </div>
  </div>
)}

    </div>
    </div>
  );
}

/* ===================== COMPONENTS ===================== */

function InputField({ label, value, onChange, error, cls }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={cls(error)} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function SelectField({ label, value, onChange, options, error, cls }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={cls(error)}>
        <option value="">Pilih {label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function TextAreaField({ label, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-32 p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

function ChipInput({ label, values, input, setInput, onKeyDown, onAdd, onRemove, error }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">{label}</label>

      <div
        className={`flex flex-wrap gap-2 p-3 border rounded-lg focus-within:ring-2 ${
          error
            ? "border-red-500 focus-within:ring-red-400"
            : "border-gray-300 focus-within:ring-green-500"
        }`}
      >
        {values.map((v, i) => (
          <span
            key={i}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 rounded-full"
          >
            {v}
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="font-bold text-green-700 hover:text-red-600"
            >
              ×
            </button>
          </span>
        ))}

        <input
           value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={onKeyDown}
    enterKeyHint="done"
   className="flex-1 min-w-[100px] outline-none text-sm"
    placeholder="Ketik lalu klik Tambah"
        />
        <button
    type="button"
    onClick={onAdd}
    className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded"
  >
    Tambah
  </button>
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
