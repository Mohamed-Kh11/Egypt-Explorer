"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import api from "../../[locale]/lib/axios.js";
import Image from "next/image";
import { FaStar } from "react-icons/fa";


export default function HotelsPage() {
  const t = useTranslations("hotels");
  const locale = useLocale();

  const [hotels, setHotels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [city, setCity] = useState("");

  // ✅ Fetch hotels
  useEffect(() => {
    const loadHotels = async () => {
      try {
        const res = await api.get("/hotels");
        setHotels(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error loading hotels:", err);
      }
    };
    loadHotels();
  }, []);

  // ✅ Filter by city
  const handleSearch = () => {
    if (!city) return setFiltered(hotels);
    setFiltered(hotels.filter((h) => h.city === city));
  };

  const cities = [...new Set(hotels.map((h) => h.city))];

  return (
    <main className="pt-20 px-4 lg:px-12 flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Search Form */}
        <div className="space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
              {t("title")}
            </h1>
            <p className="mt-3 text-white/90">{t("intro")}</p>
          </header>

          <div className="bg-white dark:bg-black  rounded-xl shadow-lg p-6 space-y-4">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">{t("selectCity")}</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {t("search")}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-white">
            {t("results")}
          </h2>

          {filtered.length === 0 ? (
            <p className="text-gray-300">{t("noResults")}</p>
          ) : (
            <div className="bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden flex-1">
              <div className="max-h-[70vh] overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {filtered.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="border rounded-lg shadow-sm overflow-hidden dark:bg-gray-700"
                  >
                    {hotel.imageUrl && (
                      <div className="relative w-full h-48">
                        <Image
                          src={hotel.imageUrl}
                          alt={hotel.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold dark:text-white">{hotel.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-white">
                        {hotel.city}, {hotel.country}
                      </p>

                      {/* Stars */}
                      <div className="flex items-center mt-2 text-yellow-500">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>

                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                        {hotel.description}
                      </p>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="font-bold text-yellow-600">
                          {hotel.pricePerNight} {hotel.currency}/night
                        </span>
                        <span className="text-sm text-gray-500">
                          {hotel.roomsAvailable} {t("rooms")}
                        </span>
                      </div>

                      <button className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg">
                        {t("book")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
