import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { apiRegister } from "../api/auth";

export default function AuthModal({
  open,
  mode: initialMode = "login",
  onClose,
}) {
  const { login } = useAuth();

  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("IF");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const ALLOWED_DOMAIN = "student.unsap.ac.id";

  const isAllowedStudentEmail = useMemo(() => {
    const trimmed = (email || "").trim();
    const re = new RegExp(
      `^[^\\s@]+@${ALLOWED_DOMAIN.replace(".", "\\.")}$`,
      "i"
    );
    return re.test(trimmed);
  }, [email]);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setName("");
      setNim("");
      setProdi("IF");
      setMode(initialMode);
      setMessage("");
    } else {
      setMode(initialMode);
      setMessage("");
    }
  }, [open, initialMode]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "login") {
        const result = await login({
          email: email.trim(),
          password,
        });

        if (result?.success) {
          onClose();
        } else {
          setMessage(result?.message || "Login gagal");
        }
      } else {
        const normalizedEmail = email.trim().toLowerCase();

        if (!isAllowedStudentEmail) {
          setMessage(`Registrasi hanya untuk email @${ALLOWED_DOMAIN}`);
          return;
        }

        const res = await apiRegister({
          name,
          email: normalizedEmail,
          password,
          nim,
          prodi,
        });

        setMessage(
          res?.message || "Akun berhasil dibuat. Tunggu aktivasi admin."
        );
        setMode("login");
        setPassword("");
      }
    } catch (err) {
      setMessage(
        err?.userMessage ||
          err?.response?.data?.message ||
          "Terjadi kesalahan"
      );
    } finally {
      setLoading(false);
    }
  };

  const disableSubmit =
    loading || (mode === "register" && !isAllowedStudentEmail);

  return (
    /* ===================== MODAL WRAPPER ===================== */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-x-hidden">
      {/* ===================== MODAL CARD ===================== */}
      <div className="
        relative
        w-full
        max-w-md
        bg-white
        p-6
        rounded-xl
        shadow-xl
        max-h-[90vh]
        overflow-y-auto
      ">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="mb-5 text-3xl font-bold text-center text-green-600">
          {mode === "login" ? "Masuk" : "Daftar"}
        </h2>

        {/* ===================== FORM ===================== */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "register" && (
            <>
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full p-3 border rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="NIM (12 digit)"
                className="w-full p-3 border rounded-lg"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                required
              />

              <select
                className="w-full p-3 border rounded-lg"
                value={prodi}
                onChange={(e) => setProdi(e.target.value)}
                required
              >
                <option value="IF">Informatika</option>
                <option value="SI">Sistem Informasi</option>
              </select>
            </>
          )}

          <input
            type="email"
            placeholder={
              mode === "register"
                ? `NIM@${ALLOWED_DOMAIN}`
                : "Email"
            }
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern={
              mode === "register"
                ? `^[^\\s@]+@${ALLOWED_DOMAIN.replace(".", "\\.")}$`
                : undefined
            }
            title={
              mode === "register"
                ? `Gunakan email @${ALLOWED_DOMAIN}`
                : undefined
            }
          />

          {mode === "register" &&
            email.trim() !== "" &&
            !isAllowedStudentEmail && (
              <p className="text-sm text-red-500 break-words">
                Email harus berakhiran @{ALLOWED_DOMAIN}
              </p>
            )}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={disableSubmit}
            className="
              w-full
              py-3
              font-semibold
              text-white
              bg-green-600
              rounded-lg
              hover:bg-green-700
              disabled:opacity-70
            "
          >
            {loading
              ? mode === "login"
                ? "Masuk..."
                : "Mendaftar..."
              : mode === "login"
              ? "Masuk"
              : "Daftar"}
          </button>
        </form>

        {/* ===================== MESSAGE ===================== */}
        {message && (
          <p className="mt-3 text-center text-red-500 break-words">
            {message}
          </p>
        )}

        {/* ===================== SWITCH MODE ===================== */}
        <p className="mt-4 text-center text-gray-600">
          {mode === "login"
            ? "Belum punya akun? "
            : "Sudah punya akun? "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setMessage("");
            }}
            className="font-semibold text-green-700"
            disabled={loading}
          >
            {mode === "login" ? "Daftar" : "Masuk"}
          </button>
        </p>
      </div>
    </div>
  );
}
