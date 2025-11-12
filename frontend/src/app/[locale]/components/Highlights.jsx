"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

import cultureImg from "../../images/tour.webp";
import historicImg from "../../images/egypt.webp";
import adventureImg from "../../images/water.webp";

export default function Highlights() {
  const t = useTranslations("highlights");

  const topics = [
    { id: 1, title: t("culture.title"), text: t("culture.text"), image: cultureImg },
    { id: 2, title: t("historic.title"), text: t("historic.text"), image: historicImg },
    { id: 3, title: t("adventure.title"), text: t("adventure.text"), image: adventureImg },
  ];

  return (
    <section className="relative w-full min-h-[55svh] flex items-center justify-center dark:bg-black/30 px-10 py-16 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
            className="relative group rounded-3xl overflow-hidden shadow-xl min-h-[200px] bg-white/10 dark:bg-zinc-900/10 backdrop-blur-md border-4 border-yellow-400 "
          >
            {/* Background Image with bottom gradient overlay */}
            <div className="absolute inset-0">
              <Image
                src={topic.image}
                alt={topic.title}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder="blur"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Bottom overlay only for text */}
              <div className="absolute bottom-0 left-0 w-full h-full bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-end h-full p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg leading-snug">
                {topic.title}
              </h1>
              <p className="text-gray-200 text-sm mt-2 leading-relaxed drop-shadow">
                {topic.text}
              </p>
              <div className="mt-4 w-10 h-1 bg-yellow-400  rounded-full"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
