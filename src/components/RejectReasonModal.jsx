import { useState } from "react";

export default function RejectReasonModal({ open, onClose, onSubmit }) {
  const [reason, setReason] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="relative w-full max-w-md p-5 bg-white shadow-lg rounded-xl">
        <button onClick={onClose} className="absolute text-2xl right-3 top-2">✕</button>

        <h2 className="mb-3 text-lg font-semibold text-green-700">Alasan Penolakan</h2>

        <textarea
          className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="Tulis alasan penolakan yang jelas..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={() => onSubmit(reason)}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Tolak & Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
