import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://digital-library-backend-liart.vercel.app");

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
