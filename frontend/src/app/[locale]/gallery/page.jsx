"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import alex from "../../images/destinations/alex.webp";
import alex2 from "../../images/destinations/alex2.webp";
import alex3 from "../../images/destinations/alex3.webp";

import cairo from "../../images/destinations/cairo.webp";
import cairo2 from "../../images/destinations/cairo2.webp";
import cairo3 from "../../images/destinations/cairo3.webp";
import cairo7 from "../../images/destinations/cairo7.webp";

import aswan from "../../images/destinations/aswan.webp";
import aswan2 from "../../images/destinations/aswan2.webp";
import aswan3 from "../../images/destinations/aswan3.webp";

import sharm from "../../images/destinations/sharm.webp";
import sharm2 from "../../images/destinations/sharm2.webp";
import sharm3 from "../../images/destinations/sharm3.webp";

import hurghada from "../../images/destinations/hurghada.webp";
import hurghada2 from "../../images/destinations/hurghada2.webp";
import hurghada3 from "../../images/destinations/hurghada3.webp";

import luxor from "../../images/destinations/luxor.webp";
import luxor2 from "../../images/destinations/luxor2.webp";
import luxor3 from "../../images/destinations/luxor3.webp";

import cairo4 from "../../images/gallery/cairo.webp";
import cairo5 from "../../images/gallery/cairo2.webp";
import matrouh from "../../images/gallery/matrouh.webp";
import cairo6 from "../../images/gallery/qanatr.webp";
import sharm4 from "../../images/gallery/Sharm.webp";
import minya from "../../images/gallery/minya.webp";
import sinai from "../../images/gallery/sinai.webp";

// shuffle helper
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [selectedCity, setSelectedCity] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const locale = useLocale();

  const imagesPerPage = 9;

  const galleryImages = [
    { src: cairo, city: "Cairo" },
    { src: cairo2, city: "Cairo" },
    { src: cairo3, city: "Cairo" },
    { src: cairo4, city: "Cairo" },
    { src: cairo5, city: "Cairo" },
    { src: cairo6, city: "Cairo" },
    { src: cairo7, city: "Cairo" },

    { src: alex, city: "Alexandria" },
    { src: alex2, city: "Alexandria" },
    { src: alex3, city: "Alexandria" },

    { src: luxor, city: "Luxor" },
    { src: luxor2, city: "Luxor" },
    { src: luxor3, city: "Luxor" },

    { src: sharm, city: "Sharm El Sheikh" },
    { src: sharm2, city: "Sharm El Sheikh" },
    { src: sharm3, city: "Sharm El Sheikh" },
    { src: sharm4, city: "Sharm El Sheikh" },

    { src: aswan, city: "Aswan" },
    { src: aswan2, city: "Aswan" },
    { src: aswan3, city: "Aswan" },

    { src: hurghada, city: "Hurghada" },
    { src: hurghada2, city: "Hurghada" },
    { src: hurghada3, city: "Hurghada" },

    { src: matrouh, city: "Matrouh" },
    { src: minya, city: "Minya" },
    { src: sinai, city: "Sinai" },
  ];

  // shuffle once on mount
  const shuffledImages = useMemo(() => shuffleArray(galleryImages), []);

  // filter
  const filteredImages =
    selectedCity === "all"
      ? shuffledImages
      : shuffledImages.filter((img) => img.city === selectedCity);

  // pagination
  const indexOfLast = currentPage * imagesPerPage;
  const indexOfFirst = indexOfLast - imagesPerPage;
  const currentImages = filteredImages.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setCurrentPage(1);
  };

  // reset scroll on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <main className="flex flex-col items-center justify-center pt-24 pb-6 bg-yellow-500 dark:bg-transparent min-h-[90svh]">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-white drop-shadow">
        📸 {t("title")}
      </h1>

      {/* Dropdown */}
      <div className="relative w-fit mb-6">
        <select
          value={selectedCity}
          onChange={handleCityChange}
          aria-label={t("filterByCity")}
          className={`appearance-none px-4 py-2 rounded-xl shadow bg-[#a17f18] dark:bg-[#000000] text-white dark:text-gray-100 ${
            locale === "ar" ? "pl-8 pr-4" : "pr-8 pl-4"
          }`}
        >
          <option value="all">{t("allCities")}</option>
          {[...new Set(galleryImages.map((img) => img.city))].map((city) => (
            <option key={city} value={city}>
              {t(city)}
            </option>
          ))}
        </select>

        {/* custom arrow */}
        <span
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-white ${
            locale === "ar" ? "left-3" : "right-3"
          }`}
        >
          ▼
        </span>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {currentImages.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-4 rounded-xl shadow bg-black/10 dark:bg-[#000000] flex flex-col items-center text-center transition"
          >
            {/* fixed height image wrapper */}
            <div
              onClick={() => setSelectedImage(img.src)}
              className="w-full h-40 md:h-48 lg:h-60 bg-gray-300 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.city}
                width={500}
                height={500}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg font-semibold text-white dark:text-gray-100">
              {t(img.city)}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          aria-label={t("prev")}
          className="px-4 py-2 rounded-xl shadow bg-black/10 dark:bg-[#000000] text-white dark:text-gray-100 disabled:opacity-50"
        >
          {t("prev")}
        </button>
        <span className="px-3 py-2 text-white dark:text-gray-100">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          aria-label={t("next")}
          className="px-4 py-2 rounded-xl shadow bg-black/10 dark:bg-[#000000] text-white dark:text-gray-100 disabled:opacity-50"
        >
          {t("next")}
        </button>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full p-4">
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
              className="absolute top-7 right-9 text-white text-3xl font-bold"
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Enlarged"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </main>
  );
}
