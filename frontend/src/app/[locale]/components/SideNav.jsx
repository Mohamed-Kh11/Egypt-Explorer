"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, User, Sun, Moon } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSession, signIn, signOut } from "next-auth/react";

const SideNav = ({ slide, setSlide, menuItems }) => {
  const t = useTranslations("home");
  const locale = useLocale();
  const { data: session, status } = useSession();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const isRTL = locale === "ar";
  const initialX = isRTL ? "-100%" : "100%";
  const asidePosition = isRTL ? "left-0" : "right-0";

  return (
    <AnimatePresence>
      {slide && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSlide(false)}
          />

          {/* Drawer */}
          <motion.aside
            className={`fixed top-0 ${asidePosition} h-full w-72 bg-yellow-500 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl z-50 flex flex-col justify-between`}
            initial={{ x: initialX }}
            animate={{ x: 0 }}
            exit={{ x: initialX }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Top Section */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300/30 dark:border-gray-700">
              <h2 className="text-lg font-bold text-white dark:text-gray-100">
                {t("Menu") ?? "Menu"}
              </h2>
              <button
                onClick={() => setSlide(false)}
                className="text-white dark:text-gray-300"
              >
                <X size={26} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 overflow-y-auto">
              {menuItems.map((section) => (
                <div key={section.title} className="mb-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-wide mb-2">
                    {section.icon}
                    <span>{t(section.title)}</span>
                  </div>
                  <ul className="flex flex-col gap-2 pl-6">
                    {section.links.map(({ text, path }) => (
                      <li key={path}>
                        <Link
                          href={path}
                          onClick={() => setSlide(false)}
                          className="block text-white dark:text-gray-100 text-lg hover:text-gray-500 transition"
                        >
                          {t(text)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-300/30 dark:border-gray-700">
              <div className="flex flex-col gap-4 items-center">
                {/* Language + Dark Mode */}
                <div className="flex gap-4 items-center">
                  <LanguageSwitcher />
                  <button
                    onClick={() => setDarkMode((prev) => !prev)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                  >
                    {darkMode ? (
                      <Moon size={22} className="text-yellow-400" />
                    ) : (
                      <Sun size={22} className="text-gray-800 dark:text-gray-200" />
                    )}
                  </button>
                </div>

                {/* ✅ User Session */}
                {status === "loading" ? null : session ? (
                  <div className="flex items-center gap-3">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <User size={22} className="text-white" />
                    )}
                    <span className="text-white text-sm truncate max-w-[100px]">
                      {session.user?.name || "User"}
                    </span>
                    <button
                      onClick={() => signOut({ callbackUrl: `/${locale}` })}
                      className="bg-yellow-500 dark:bg-gray-400 px-3 py-1 rounded-md hover:bg-red-700 text-white text-sm"
                    >
                      {locale === "en" ? "Sign out" : "تسجيل خروج"}
                    </button>
                  </div>
                ) : (
                  <Link
                    href={`/${locale}/signin`}
                    className="flex items-center gap-2 text-white hover:text-gray-300"
                  >
                    <User size={22} />
                    <span>{locale === "en" ? "Sign in" : "تسجيل دخول"}</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideNav;
