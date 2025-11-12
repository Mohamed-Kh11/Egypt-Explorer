"use client";

import { motion } from "framer-motion";
import { Map, Plane, Book, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import logo from "../../images/pyramid.webp";

export default function Hero() {
  const t = useTranslations("home");
  const locale = useLocale();

  const features = [
    { icon: <Map className="w-6 h-6" />, text: t("Destinations") },
    { icon: <Book className="w-6 h-6" />, text: t("hero.cultureHistory") },
    { icon: <Plane className="w-6 h-6" />, text: t("hero.planTrip") },
    { icon: <Users className="w-6 h-6" />, text: t("hero.community") },
  ];

  return (
    <section className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center text-white px-4 pt-8 md:pt-8">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10" />

      {/* Logo */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-4"
      >
        <Image
          src={logo}
          alt="Egypt Explorer Logo"
          width={100}
          height={100}
          priority
          className="mx-auto"
        />
      </motion.div>

      {/* Headline – visible immediately for LCP */}
      <motion.h1
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 drop-shadow-lg max-w-[90%]"
      >
        {t("hero.title")}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="max-w-xl md:text-lg sm:text-xl mb-6 text-gray-200"
      >
        {t("hero.subtitle")}
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-4 mb-8"
      >
        <Link
          href={`${locale}/destinations`}
          className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-semibold shadow-md transition"
        >
          {t("hero.startExploring")}
        </Link>
        <Link
          href={`${locale}/visa`}
          className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition border border-white/30"
        >
          {t("hero.planTrip")}
        </Link>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="hidden md:grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3"
      >
        {features.map((f, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white/10 rounded-full">{f.icon}</div>
            <span className="text-sm font-medium">{f.text}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
