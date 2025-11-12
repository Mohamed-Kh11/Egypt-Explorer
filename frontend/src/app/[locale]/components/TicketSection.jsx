"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import ticketLight from "../../images/travel.webp";

export default function TicketSection({ ResetScroll }) {
  const t = useTranslations("ticket");
  const locale = useLocale();



  return (
    <section className="min-h-[78svh] flex items-center justify-center px-6 md:px-10 py-14 md:py-10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 max-w-6xl w-full mx-auto text-center md:text-left">
        
        {/* Image */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2">
          <Image
            src={ticketLight}
            alt={t("imageAlt")}
            className="rounded-2xl max-w-[250px] md:max-w-[400px] object-contain transition-opacity duration-500"
            width={400}
            height={400}
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-6 w-full md:w-1/2">
          <h1 className="text-xl md:text-3xl font-bold text-white text-center md:leading-relaxed ">
            {t("title")}
          </h1>

          <Link
            href={`/${locale}/visa`}
            onClick={ResetScroll}
            className="group relative inline-flex items-center gap-2 rounded-2xl bg-black/10 dark:bg-yellow-500 px-6 py-3 text-sm md:text-lg font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            {t("button")}
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
