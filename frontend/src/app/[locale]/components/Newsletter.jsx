"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
    const locale = useLocale();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center bg-black/10 dark:bg-black text-white px-10 py-16 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("title")}</h2>
      <p className="text-sm md:text-base opacity-90 mb-6 max-w-lg text-center">
        {t("subtitle")}
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg rounded-full bg-white overflow-hidden shadow-md"
      >
        <div className={`flex items-center ${locale === 'en' ? "pl-4" : "pr-4"}`}>
          <Mail className="text-gray-500" size={20} />
        </div>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          className="flex-1 px-3 py-3 text-gray-800 placeholder:py-2 focus:outline-none w-2/3"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600  duration-300  px-1 md:px-5 flex items-center justify-center gap-1 md:gap-2 font-semibold text-[11px] md:text-base"
        >
          {t("button")}
          <ArrowRight className="size-3 md:size-4" />
        </button>
      </form>

      {submitted && (
        <p className="mt-4 text-green-100 font-medium">{t("success")}</p>
      )}
    </section>
  );
}
