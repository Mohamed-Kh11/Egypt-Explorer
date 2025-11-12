"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import api from "../../[locale]/lib/axios.js";


export default function Flights() {
  const t = useTranslations("flights");
  const locale = useLocale();

  const [flights, setFlights] = useState([]);
  const [filtered, setFiltered] = useState([]); // ✅ start empty

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const departureCities = [
    "Frankfurt",
    "Paris",
    "London",
    "New York",
    "Dubai",
    "Istanbul",
    "Rome",
    "Madrid",
    "Toronto",
    "Doha",
  ];

  const arrivalCities = [
    "Cairo",
    "Alexandria",
    "Sharm El-Sheikh",
    "Luxor",
    "Hurghada",
  ];

  // ✅ Fetch flights
  useEffect(() => {
    const loadFlights = async () => {
      try {
        const res = await api.get("/flights");
        setFlights(res.data);
      } catch (err) {
        console.error("Error loading flights:", err);
      }
    };
    loadFlights();
  }, []);

  // ✅ Search
  const handleSearch = () => {
    let results = flights;

    if (from) results = results.filter((f) => f.departureCity === from);
    if (to) results = results.filter((f) => f.arrivalCity === to);
    if (date) {
      const selectedDate = new Date(date).toDateString();
      results = results.filter(
        (f) => new Date(f.departureTime).toDateString() === selectedDate
      );
    }

    setFiltered(results);
  };

  return (
    <main className="pt-20 px-4 lg:px-12 flex flex-col">
      {/* Responsive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Search Form */}
        <div className="space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
              {t("title")}
            </h1>
            <p className="mt-3 text-white/90">{t("intro")}</p>
          </header>

          <div className="bg-white dark:bg-black rounded-xl shadow-lg p-6 space-y-4">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">{t("from")}</option>
              {departureCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">{t("to")}</option>
              {arrivalCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />

            <button
              onClick={handleSearch}
              className="w-full bg-yellow-600 hover:bg-yellow-700  text-white font-semibold py-3 rounded-lg transition"
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex-1">
              {/* Scrollable table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-yellow-600 text-white sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-4">{t("airline")}</th>
                      <th className="py-3 px-4">{t("from")}</th>
                      <th className="py-3 px-4">{t("to")}</th>
                      <th className="py-3 px-4">{t("date")}</th>
                      <th className="py-3 px-4">{t("price")}</th>
                      <th className="py-3 px-4">{t("action")}</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="max-h-[70vh] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filtered.map((f, idx) => (
                      <tr
                        key={f._id}
                        className={`hover:bg-gray-100 dark:hover:bg-gray-700 transition dark:text-white ${
                          idx % 2 === 0
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-50 dark:bg-gray-700"
                        }`}
                      >
                        <td className="py-3 px-4 font-semibold">{f.airline}</td>
                        <td className="py-3 px-4">{f.departureCity}</td>
                        <td className="py-3 px-4">{f.arrivalCity}</td>
                        <td className="py-3 px-4">
                          {new Date(f.departureTime).toLocaleString(locale)}
                        </td>
                        <td className="py-3 px-4 text-yellow-600 dark:text-gray-300 font-bold">
                          ${f.price}
                        </td>
                        <td className="py-3 px-4">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                            {t("book")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
