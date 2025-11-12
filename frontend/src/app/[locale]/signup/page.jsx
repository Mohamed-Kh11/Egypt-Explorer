"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import background from "../../images/back.webp";
import api from "../lib/axios.js"; // 👈 import axios instance

export default function SignUpPage() {
  const t = useTranslations("signup");
  const locale = useLocale();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create user in backend
      const { data } = await api.post("/users", {
        name,
        email,
        password,
      });

      toast.success(data.message || "Account created successfully!");

      // 2. Auto login with NextAuth
      const loginResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: `/${locale}`,
      });

      if (loginResult?.error) {
        toast.error("Login failed after sign up");
      } else {
        toast.success("Welcome 🎉");
        window.location.href = loginResult?.url || `/${locale}`;
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error creating account";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen pt-24 bg-yellow-500 dark:bg-transparent px-4">
      <div className="absolute w-[99svw] h-full top-0 z-10">
        <Image
          src={background}
          alt="background"
          className="h-full w-full object-cover opacity-10"
        />
      </div>

      <div className="w-full md:min-w-[500px] bg-[#b78e0f] dark:bg-black p-8 rounded-2xl shadow-lg z-20">
        <h1 className="text-4xl font-bold text-center text-white drop-shadow mb-4">
          {t("title")}
        </h1>
        <p className="text-center text-white/80 mb-8">{t("subtitle")}</p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`space-y-5 ${locale === "ar" ? "text-right" : "text-left"}`}
        >
          <div>
            <label className="block text-sm text-white mb-1">{t("name")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black/30 dark:bg-[#1b1b1b] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">{t("email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black/30 dark:bg-[#1b1b1b] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-1">{t("password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black/30 dark:bg-[#1b1b1b] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-yellow-600 transition disabled:opacity-50"
          >
            {loading ? t("loading") : t("signup")}
          </button>
        </form>
      </div>
    </main>
  );
}
