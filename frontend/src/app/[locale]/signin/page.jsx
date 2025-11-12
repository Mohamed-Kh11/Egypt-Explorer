"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import background from "../../images/back.webp";
import { toast } from "react-hot-toast";
import Link from "next/link"; // 👈 add Link

export default function SignInPage() {
  const t = useTranslations("signin");
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
    callbackUrl: `/${locale}`,
  });

  if (result?.error) {
    toast.error("Invalid email or password");
  } else {
    toast.success("Logged in successfully!");
    setTimeout(() => {
      window.location.href = result?.url || `/${locale}`;
    }, 2000); // wait 2 seconds before redirect
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
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-yellow-600 transition"
          >
            {t("signin")}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-500"></div>
          <span className="mx-3 text-gray-300">{t("or")}</span>
          <div className="flex-grow border-t border-gray-500"></div>
        </div>

        {/* Google Sign-in */}
        <button
          onClick={() => signIn("google", { callbackUrl: `/${locale}` })}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl" />
          {t("google")}
        </button>

        {/* 👇 Sign up redirect */}
        <p className="text-center text-white/80 mt-6">
          {t("noAccount")}{" "}
          <Link
            href={`/${locale}/signup`}
            className="text-yellow-300 hover:underline font-semibold"
          >
            {t("signup")}
          </Link>
        </p>
      </div>
    </main>
  );
}
