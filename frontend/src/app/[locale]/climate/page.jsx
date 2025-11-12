"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaTemperatureHigh, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const API_KEY = "9680e4315b1f40c7ac715001251003";
const cities = ["cairo", "alexandria", "aswan", "luxor", "sharm-el-sheikh", "hurghada"];

export default function ClimatePage() {
  const [weatherData, setWeatherData] = useState({});
  const locale = useLocale();
  const t = useTranslations("climate");

  useEffect(() => {
    async function fetchWeather(city) {
      const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
      const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(API_URL)}`;

      try {
        const response = await fetch(PROXY_URL);
        const data = await response.json();
        const parsed = JSON.parse(data.contents);

        setWeatherData(prev => ({
          ...prev,
          [city]: parsed.current,
        }));
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    }

    cities.forEach(city => fetchWeather(city));
  }, []);

  return (
    <main className="min-h-[90svh] px-6 pt-24 bg-yellow-500 dark:bg-transparent">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white drop-shadow">
        🌤️ {t("title")}
      </h1>

      <p className="text-center max-w-3xl mx-auto mb-10 text-gray-100 dark:text-gray-300">
        {t("intro")}
      </p>

      {/* Weather cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cities.map(city => (
          <div
            key={city}
            className="p-5 rounded-xl shadow bg-black/10 dark:bg-black/20 text-white dark:text-gray-100"
          >
            <h2 className="text-xl font-semibold mb-3">{t(`cities.${city}.name`)}</h2>
            {weatherData[city] ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaTemperatureHigh className="text-red-400" />
                  <span>{weatherData[city].temp_c}°C — {weatherData[city].condition.text}</span>
                </div>
                <div className="flex items-center gap-2">
                  <WiHumidity className="text-blue-300" />
                  <span>{t("humidity")}: {weatherData[city].humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaWind className="text-gray-300" />
                  <span>{t("wind")}: {weatherData[city].wind_kph} km/h</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-200">{t("loading")}</p>
            )}

            {/* Static climate description */}
            <p className="text-sm mt-4 text-gray-100 dark:text-gray-300">
              {t(`cities.${city}.climate`)}
            </p>
          </div>
        ))}
      </div>

      {/* Seasonal tips */}
      <section className="max-w-3xl mx-auto mt-12 text-gray-100 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">🧳 {t("tips.title")}</h2>
        <ul className="space-y-2">
          <li><b>{t("tips.winter.title")}:</b> {t("tips.winter.text")}</li>
          <li><b>{t("tips.spring.title")}:</b> {t("tips.spring.text")}</li>
          <li><b>{t("tips.summer.title")}:</b> {t("tips.summer.text")}</li>
          <li><b>{t("tips.autumn.title")}:</b> {t("tips.autumn.text")}</li>
        </ul>
      </section>
    </main>
  );
}
