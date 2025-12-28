import { useState, useEffect } from "react";

export default function RejectReasonModal({ open, onClose, onSubmit }) {
  const [reason, setReason] = useState("");

  /* ===================== LOCK SCROLL ===================== */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-x-hidden">
      <div
        className="
          relative w-full max-w-md
          bg-white rounded-xl shadow-lg
          p-5
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-2 text-2xl text-gray-500 hover:text-black"
          aria-label="Tutup"
        >
          ✕
        </button>

        <h2 className="mb-3 text-lg font-semibold text-green-700 break-words">
          Alasan Penolakan
        </h2>

        <textarea
          className="
            w-full min-h-[8rem]
            p-3 border rounded-lg
            focus:ring-2 focus:ring-green-500
            resize-y
          "
          placeholder="Tulis alasan penolakan yang jelas..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={() => onSubmit(reason)}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            disabled={!reason.trim()}
          >
            Tolak & Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
