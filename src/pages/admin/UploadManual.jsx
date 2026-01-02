import { useEffect, useState } from "react";
import { adminUploadDocument } from "../../api/documents";
import PDFPreview from "../../components/PDFPreview";



export default function UploadManual() {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [errors, setErrors] = useState({});
  const [openPreview, setOpenPreview] = useState(false);
const [uploadedPdfUrl, setUploadedPdfUrl] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [tipe, setTipe] = useState("Skripsi");
  const [tahun, setTahun] = useState("");

  // pembimbing (array + input)
  const [pembimbing, setPembimbing] = useState([]);
  const [inputPembimbing, setInputPembimbing] = useState("");

  // keyword
  const [kataKunci, setKataKunci] = useState([]);
  const [inputKeyword, setInputKeyword] = useState("");

  const [abstrak, setAbstrak] = useState("");
  const [filePdf, setFilePdf] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  // ===== VALIDATION RULES (UPLOAD MANUAL) =====
const RULES = {
  JUDUL_MIN: 10,
  JUDUL_MAX: 160,
  PENULIS_MAX: 80,
  NIM_MIN: 10,
  NIM_MAX: 15,
  ABSTRAK_MAX: 800,
  KEYWORD_MIN: 1,
  KEYWORD_MAX: 40,
};



  /* ================= KEYWORD ================= */
 const handleKeywordKeyDown = (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();

  const value = inputKeyword.trim();
  if (!value) return;

  if (value.length < 4 || value.length > 20) {
    setErrors(p => ({ ...p, kataKunci: "Keyword 4–20 karakter" }));
    return;
  }

  if (kataKunci.some(k => k.toLowerCase() === value.toLowerCase())) return;

  setKataKunci([...kataKunci, value]);
  setInputKeyword("");
  setErrors(p => ({ ...p, kataKunci: undefined }));
};


const removeKeyword = (i) => {
  const updated = kataKunci.filter((_, idx) => idx !== i);
  setKataKunci(updated);

  if (updated.length >= 1)
    setErrors(p => ({ ...p, kataKunci: undefined }));
};



  /* ================= PEMBIMBING ================= */
const handlePembimbingKeyDown = (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();

  const value = inputPembimbing.trim();
  if (!value) return;

  if (value.length < 5 || value.length > 30) {
    setErrors((p) => ({
      ...p,
      pembimbing: "Nama pembimbing 5–30 karakter",
    }));
    return;
  }

  if (pembimbing.some((p) => p.toLowerCase() === value.toLowerCase())) return;

  setPembimbing([...pembimbing, value]);
  setInputPembimbing("");
  setErrors((p) => ({ ...p, pembimbing: undefined }));
};


/* ================= VALIDATION ================= */
const validateForm = () => {
  const e = {};

  if (judul.length < 10 || judul.length > 160)
    e.judul = "Judul minimal 10 dan maksimal 160 karakter";

  if (!penulis || penulis.length > 80)
    e.penulis = "Penulis wajib diisi (maks 80 karakter)";

  if (nim.length < 10 || nim.length > 15)
    e.nim = "NIM minimal 10 dan maksimal 15 karakter";

  if (!prodi)
    e.prodi = "Program studi wajib dipilih";

  if (!tahun || tahun.length !== 4)
    e.tahun = "Tahun harus 4 digit";

  if (kataKunci.length < 1 || kataKunci.length > 20)
    e.kataKunci = "Minimal 1 dan maksimal 20 kata kunci";

  if (!filePdf)
    e.file = "File PDF wajib diupload";

  setErrors(e);
  return Object.keys(e).length === 0;
};


  /* ================= FILE PDF ================= */
 const handlePdfChange = (e) => {
  const f = e.target.files?.[0];
  if (!f) return;

  if (f.type !== "application/pdf") {
    setErrors(p => ({ ...p, file: "File harus PDF" }));
    return;
  }

  if (f.size > 10 * 1024 * 1024) {
    setErrors(p => ({ ...p, file: "Ukuran maksimal 10 MB" }));
    return;
  }

  setFilePdf(f);
  setPreviewUrl(URL.createObjectURL(f));
  setErrors(p => ({ ...p, file: undefined }));
};

const removePembimbing = (i) => {
  const updated = pembimbing.filter((_, idx) => idx !== i);
  setPembimbing(updated);

  if (updated.length >= 1)
    setErrors(p => ({ ...p, pembimbing: undefined }));
};

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const addKeyword = () => {
  const value = inputKeyword.trim();
  if (!value) return;

  if (value.length < 4 || value.length > 20) {
    setErrors(p => ({ ...p, kataKunci: "Keyword 4–20 karakter" }));
    return;
  }

  if (kataKunci.some(k => k.toLowerCase() === value.toLowerCase())) return;

  setKataKunci([...kataKunci, value]);
  setInputKeyword("");
  setErrors(p => ({ ...p, kataKunci: undefined }));
};


useEffect(() => {
  if (openPreview) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [openPreview]);


const addPembimbing = () => {
  const value = inputPembimbing.trim();
  if (!value) return;

  if (value.length < 5 || value.length > 30) {
    setErrors(p => ({ ...p, pembimbing: "Nama pembimbing 5–30 karakter" }));
    return;
  }

  if (pembimbing.some(p => p.toLowerCase() === value.toLowerCase())) return;

  setPembimbing([...pembimbing, value]);
  setInputPembimbing("");
  setErrors(p => ({ ...p, pembimbing: undefined }));
};

  /* ================= SUBMIT ================= */
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  if (!validateForm()) return;

  try {
    setLoading(true);

   const res = await adminUploadDocument({
  judul,
  penulis,
  nim,
  prodi,
  tipe,
  tahun,
  abstrak,
  pembimbing,
  keywords: kataKunci,
  file: filePdf,
});

// ⬇️ SAMAKAN DENGAN UploadLaporan
setUploadedPdfUrl(res.document.pdfUrl);
setPreviewUrl("");
setFilePdf(null);

    setMessage(res?.message || "Upload admin berhasil");
  } catch (err) {
    setMessage(
      err?.response?.data?.message || "Upload admin gagal"
    );
  } finally {
    setLoading(false);
  }
};





  return (
<div className="max-w-7xl mx-auto space-y-6 px-4 pt-24 md:pt-0 pb-12">

    <div className="max-w-5xl mx-auto">

      <h1 className="mb-3 text-2xl md:text-3xl font-bold text-green-600">
        Unggah Laporan Admin
      </h1>


      {message && (
        <div className="p-3 mb-4 text-sm text-red-700 border rounded bg-red-50">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 bg-white rounded-xl shadow"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
  label="Judul"
  value={judul}
  onChange={setJudul}
  error={errors.judul} minLength={10} maxLength={160} />
         <InputField
  label="Penulis"
  value={penulis}
  onChange={setPenulis}
  error={errors.penulis} maxLength={80} />
<InputField
  label="NIM"
  value={nim}
  onChange={setNim}
  error={errors.nim} maxLength={15} />

          <SelectField
            label="Program Studi"
            value={prodi}
            onChange={setProdi}
            options={[
              { value: "", label: "Pilih Prodi" },
              { value: "IF", label: "IF" },
              { value: "SI", label: "SI" },
            ]}
            error={errors.prodi}
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

          <InputField
  label="Tahun"
  value={tahun}
  onChange={setTahun}
  error={errors.tahun} maxLength={4} />
        </div>

        {/* PEMBIMBING */}
       <TagInput
  label="Pembimbing"
  values={pembimbing}
  inputValue={inputPembimbing}
  onInputChange={setInputPembimbing}
  onKeyDown={handlePembimbingKeyDown}
  onAdd={addPembimbing}
  onRemove={removePembimbing}
  error={errors.pembimbing}
/>


        {/* KEYWORD */}
       <TagInput
  label="Kata Kunci"
  values={kataKunci}
  inputValue={inputKeyword}
  onInputChange={setInputKeyword}
  onKeyDown={handleKeywordKeyDown}
   onAdd={addKeyword}  
  onRemove={removeKeyword}
  error={errors.kataKunci}
/>


       <TextAreaField
  label="Abstrak"
  value={abstrak}
  onChange={setAbstrak}
  maxLength={RULES.ABSTRAK_MAX}
  error={errors.abstrak}
/>


       <div>
  <label className="block font-medium">Upload PDF</label>
  <input
    type="file"
    accept="application/pdf"
    onChange={handlePdfChange}
    className={errors.file ? "border-red-500" : ""}
  />
  {errors.file && <p className="text-xs text-red-600">{errors.file}</p>}
</div>


       {previewUrl && (
  <div className="mt-4">
    <PDFPreview url={previewUrl} />
  </div>
)}


        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 font-semibold text-white bg-green-600 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
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

/* ================== COMPONENTS ================== */

function InputField({ label, value, onChange, error }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 mt-1 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}


function SelectField({ label, value, onChange, options, error }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 mt-1 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}


function TextAreaField({ label, value, onChange, maxLength, error }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-32 p-3 mt-1 border rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span className="text-red-600">{error}</span>
        <span>{value.length}/{maxLength}</span>
      </div>
    </div>
  );
}


function TagInput({
  label,
  values,
  inputValue,
  onInputChange,
  onKeyDown,
  onAdd,
  onRemove,
  error,
}) {
  return (

      <div>
  <label className="text-sm font-medium">{label}</label>

  <div
    className={`flex flex-wrap items-center gap-2 p-3 border rounded ${
      error ? "border-red-500" : "border-gray-300"
    }`}
  >
    {values.map((v, i) => (
      <span
        key={i}
        className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 rounded"
      >
        {v}
        <button
          type="button"
          onClick={() => onRemove(i)}
          className="text-red-500"
        >
          ×
        </button>
      </span>
    ))}

    {/* INPUT */}
    <input
      value={inputValue}
      onChange={(e) => onInputChange(e.target.value)}
      onKeyDown={onKeyDown}   // desktop only
      enterKeyHint="done"
      inputMode="text"
     className="flex-1 min-w-[100px] outline-none text-sm"
      placeholder="Ketik lalu klik Tambah"
    />

    {/* TOMBOL MOBILE */}
    <button
      type="button"
      onClick={onAdd}
     className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded whitespace-nowrap"

    >
      Tambah
    </button>
  </div>


      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

