"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import stripe from "../../images/pattern.webp";
import { FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaSnapchat, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const quickLinks = [
    { text: t("links.visa"), path: `/${locale}/visa` },
    { text: t("links.flights"), path: `/${locale}/flights` },
    { text: t("links.hotels"), path: `/${locale}/hotels` },
    { text: t("links.destinations"), path: `/${locale}/destinations` },
    { text: t("links.culture"), path: `/${locale}/culture` },
  ];

  return (
    <footer className="w-full bg-black/10 dark:bg-black/80 relative overflow-hidden pb-3">
      {/* Upper stripe image */}
      <Image src={stripe} alt="Footer stripe" className="w-full object-cover h-8 md:h-fit" />

      {/* Footer content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-bold text-lg mb-2">{t("quickLinks")}</h3>
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="text-white hover:text-yellow-400 dark:hover:text-gray-500 transition"
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* Column 2: Social Icons */}
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4">
            <Link href="https://youtube.com" target="_blank" aria-label="YouTube">
              <FaYoutube className="cursor-pointer text-3xl text-white duration-200 hover:scale-125 hover:text-gray-300" />
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
              <FaSquareXTwitter className="cursor-pointer text-3xl text-white duration-200 hover:scale-125 hover:text-gray-300" />
            </Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
              <RiInstagramFill className="cursor-pointer text-3xl text-white duration-200 hover:scale-125 hover:text-gray-300" />
            </Link>
            <Link href="https://snapchat.com" target="_blank" aria-label="Snapchat">
              <FaSnapchat className="cursor-pointer text-3xl text-white duration-200 hover:scale-125 hover:text-gray-300" />
            </Link>
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
              <FaFacebook className="cursor-pointer text-3xl text-white duration-200 hover:scale-125 hover:text-gray-300" />
            </Link>
          </div>
        </div>

        {/* Column 3: Contact Info */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-bold text-lg mb-2">{t("contact")}</h3>
          <p className="text-white">{t("email")}</p>
          <p className="text-white">{t("phone")}</p>
          <p className="text-white">{t("address")}</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t text-sm md:text-base border-white/20 mt-6 pt-4 text-center text-white font-semibold">
        {t("copyright")}
      </div>
    </footer>
  );
}
