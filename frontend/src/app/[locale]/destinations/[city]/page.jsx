import { getTranslations } from "next-intl/server";
import ImageGallery from "./ImageGallery";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";


import alexandria1 from "../../../images/destinations/alex.webp";
import alexandria2 from "../../../images/destinations/alex2.webp";
import alexandria3 from "../../../images/destinations/alex3.webp";

import cairo1 from "../../../images/destinations/cairo2.webp";
import cairo2 from "../../../images/destinations/cairo.webp";
import cairo3 from "../../../images/destinations/cairo3.webp";

import aswan1 from "../../../images/destinations/aswan.webp";
import aswan2 from "../../../images/destinations/aswan2.webp";
import aswan3 from "../../../images/destinations/aswan3.webp";

import luxor1 from "../../../images/destinations/luxor3.webp";
import luxor2 from "../../../images/destinations/luxor2.webp";
import luxor3 from "../../../images/destinations/luxor.webp";

import sharm1 from "../../../images/destinations/sharm.webp";
import sharm2 from "../../../images/destinations/sharm2.webp";
import sharm3 from "../../../images/destinations/sharm3.webp";

import hurghada1 from "../../../images/destinations/hurghada.webp";
import hurghada2 from "../../../images/destinations/hurghada2.webp";
import hurghada3 from "../../../images/destinations/hurghada3.webp";


export default async function DestinationDetailPage({ params }) {
  const { locale, city } = await params; // no need for await here
  const t = await getTranslations({ locale, namespace: "destinations.details" });

  const cityImages = {
    alexandria: [alexandria1, alexandria2, alexandria3],
    cairo: [cairo1, cairo2, cairo3],
    aswan: [aswan1, aswan2, aswan3],
    luxor: [luxor1, luxor2, luxor3],
    "sharm-el-sheikh": [sharm1, sharm2, sharm3],
    hurghada: [hurghada1, hurghada2, hurghada3],
  };

  const images = cityImages[city] || [];

  return (
    <main className="relative flex flex-col items-center justify-center min-h-[90svh] pt-28 md:pt-24 dark:bg-transparent">
      <Link
        href={`/${locale}/destinations`}
        className="absolute right-0 md:right-10 top-16 md:top-20 inline-flex items-center mb-6 text-white font-semibold  transition"
      >
        <FiArrowLeft className="mx-2 w-5 h-5" />
        {t("backToDestinations")}
      </Link>
      <div className="w-full max-w-[1200px] grid lg:grid-cols-[3fr_2fr] gap-10 items-start">

        {/* IMAGE GALLERY SIDE (client component) */}
        <ImageGallery city={city} images={images} />

        {/* TEXT SIDE (server-rendered) */}
        <div className="p-4 md:p-8">
          <h1 className="text-4xl font-extrabold mb-6 text-white drop-shadow">
            {t(`${city}.name`)}
          </h1>
          <p className="text-lg text-gray-100 leading-relaxed mb-6">
            {t(`${city}.fullText`)}
          </p>
        </div>
      </div>
    </main>
  );
}