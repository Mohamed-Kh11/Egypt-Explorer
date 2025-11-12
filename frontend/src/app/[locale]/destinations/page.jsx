import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

import alex from "../../images/destinations/alex2.webp";
import cairo from "../../images/destinations/cairo2.webp";
import aswan from "../../images/destinations/aswan3.webp";
import luxor from "../../images/destinations/luxor3.webp";
import sharm from "../../images/destinations/sharm2.webp";
import hurghada from "../../images/destinations/hurghada2.webp";

export default async function DestinationsPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "destinations" });

  const cities = [
    { id: 1, key: "luxor", name: "luxor", desc: "Known as the world’s greatest open-air museum", photo: luxor },
    { id: 2, key: "hurghada", name: "hurghada", desc: "Popular Red Sea resort town", photo: hurghada },
    { id: 3, key: "sharm-el-sheikh", name: "sharm", desc: "Famous for diving and beaches", photo: sharm },
    { id: 4, key: "aswan", name: "aswan", desc: "Peaceful Nile-side city with ancient temples", photo: aswan },
    { id: 5, key: "alexandria", name: "alexandria", desc: "Historic coastal city founded by Alexander the Great", photo: alex },
    { id: 6, key: "cairo", name: "cairo", desc: "Capital city and home of the Pyramids of Giza", photo: cairo },
  ];

  return (
    <main className="flex flex-col items-center justify-center px-6 pt-24 bg-yellow-500 dark:bg-transparent">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-white drop-shadow">
        🏝️ {t("title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={`/${locale}/destinations/${city.key}`}
            className="p-5 rounded-xl shadow bg-black/10 dark:bg-[#000000] flex flex-col items-center text-center hover:scale-105 transition"
          >
            <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
              <Image
                src={city.photo}
                alt={t(city.name)}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold text-white dark:text-gray-100">
              {t(city.name)}
            </h2>
            <p className="text-sm text-gray-100 dark:text-gray-300">
              {t(`${city.name}_desc`, { default: city.desc })}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
