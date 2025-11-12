import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/api" // 👈 points to your backend Express server
    : process.env.NEXT_PUBLIC_API_URL || "/api"; // 👈 fallback for production

const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
