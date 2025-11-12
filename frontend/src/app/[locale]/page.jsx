// app/[locale]/page.jsx
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import back2 from "../images/egypt2.webp";

import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import EgyptFact from "./components/Facts";
import TicketSection from "./components/TicketSection";
import Newsletter from "./components/Newsletter";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default async function Home() {
  const t = await getTranslations("home"); // ✅ server-side translations

  return (
    <main className="relative">
      {/* Optimized Background image */}
      <div className="absolute top-0 left-0 w-full h-screen -z-10">
        <Image
          src={back2}
          alt={t("heroImageAlt")}
          fill
          priority // ✅ load first (LCP)
          sizes="100vw" // ✅ responsive, only loads screen size
          placeholder="blur" // ✅ instant blurred preview
          className="object-cover opacity-50 dark:opacity-30"
        />
      </div>

      {/* Content Sections */}
      <Hero />
      <Highlights />
      <EgyptFact />
      <TicketSection />
      <Newsletter />

      {/* Utility */}
      <ScrollToTopButton />
    </main>
  );
}
