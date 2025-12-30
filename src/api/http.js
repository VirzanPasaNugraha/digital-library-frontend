import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://digital-library-backend-3k5k.vercel.app");

export const api = axios.create({
  baseURL,
});

// Request interceptor: attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: normalize error message
api.interceptors.response.use(
  (res) => res,
  (err) => {
    err.userMessage =
      err?.response?.data?.message ||
      err.message ||
      "Request gagal";
    return Promise.reject(err);
  }
);
