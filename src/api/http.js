import axios from "axios";

<<<<<<< HEAD
const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://digital-library-backend-liart.vercel.app");

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
=======
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    err.userMessage = err?.response?.data?.message || err.message || "Request gagal";
    return Promise.reject(err);
  }
);
>>>>>>> 929b5a87787104ff766e2aece274e1b6e30e112c
