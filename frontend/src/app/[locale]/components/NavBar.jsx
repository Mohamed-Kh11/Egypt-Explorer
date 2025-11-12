"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { PiSignOut } from "react-icons/pi";

import {
  Map,
  Plane,
  Image as ImageIcon,
  Menu,
  Sun,
  Moon,
  User,
  ChevronDown,
  Users,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import LanguageSwitcher from "./LanguageSwitcher";
import SideNav from "./SideNav";
import logo from "../../images/pyramid.webp";

const NavBar = () => {
  const t = useTranslations("home");
  const locale = useLocale();
  const { data: session, status } = useSession();

  const [slide, setSlide] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const menuRef = useRef(null);
  const [darkNav, setDarkNav] = useState(false);

  // Close dropdown + change navbar bg on scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => setDarkNav(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // On mount, sync theme state with <html> class
  useEffect(() => {
    setMounted(true);
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  // Apply theme when toggled
  useEffect(() => {
    if (!mounted) return;

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode, mounted]);

  const sections = [
    {
      title: "Travel",
      icon: <Plane size={18} className="hidden xl:block" />,
      links: [
        { text: "Tourist Visa", path: `/${locale}/visa` },
        { text: "Flight Tickets", path: `/${locale}/flights` },
        { text: "Hotel Booking", path: `/${locale}/hotels` },
      ],
    },
    {
      title: "Explore",
      icon: <Map size={18} className="hidden xl:block" />,
      links: [
        { text: "Destinations", path: `/${locale}/destinations` },
        { text: "Climate", path: `/${locale}/climate` },
        { text: "Culture", path: `/${locale}/culture` },
      ],
    },
    {
      title: "More",
      icon: <ImageIcon size={18} className="hidden xl:block" />,
      links: [
        { text: "Gallery", path: `/${locale}/gallery` },
        { text: "Quiz", path: `/${locale}/quiz` },
        { text: "Store", path: `/${locale}/store` },
      ],
    },
    {
      title: "Contact",
      icon: <Users size={18} className="hidden xl:block" />,
      links: [
        { text: "Q&A", path: `/${locale}/qa` },
        { text: "Forum", path: `/${locale}/forum` },
        { text: "Contact Us", path: `/${locale}/contact` },
      ],
    },
  ];

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] z-50">
        <nav
          className={`backdrop-blur-2xl ${
            darkNav ? "bg-gray-900/90" : "bg-gray-900/50"
          } dark:bg-black rounded-2xl shadow-xl duration-300`}
        >
          <div className="flex items-center justify-between px-5 py-3">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <Image src={logo} alt="Logo" width={44} height={44} />
              <span className="text-white font-bold text-base lg:text-xl tracking-wide font-[Fugaz]">
                Egypt Explorer
              </span>
            </Link>

            {/* Menu (Desktop) */}
            <ul
              ref={menuRef}
              className="hidden lg:flex gap-2 relative items-center select-none"
            >
              {sections.map((section, index) => (
                <li key={index} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === index ? null : index)
                    }
                    className="flex items-center gap-3 text-white font-medium hover:bg-white/20 p-2 rounded-md transition"
                  >
                    {section.icon}
                    <span>{t(section.title)}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === index && (
                      <motion.ul
                        dir={locale === "ar" ? "rtl" : "ltr"}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-[14px] backdrop-blur-2xl ${
                          darkNav ? "bg-[#1a1f27]" : "bg-[#443e2c]"
                        } dark:bg-black py-2 px-3 w-fit min-w-28 text-nowrap rounded-b-lg`}
                      >
                        {section.links.map(({ text, path }) => (
                          <li key={path}>
                            <Link
                              href={path}
                              className="block px-1 py-2 text-white hover:bg-white/10 rounded-md transition"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {t(text)}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <LanguageSwitcher variant="pill" />
              </div>

              {mounted && (
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                  className="hidden sm:flex p-2 rounded-full hover:bg-white/20 transition"
                  title="appearance"
                >
                  {darkMode ? (
                    <Moon size={22} className="text-white" />
                  ) : (
                    <Sun size={22} className="text-white" />
                  )}
                </button>
              )}

              {/* ✅ User Session */}
              {status === "loading" ? null : session ? (
                <div className="flex items-center gap-3 md:gap-1">
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
                  <span className="text-white hidden sm:block max-w-[80px] text-center text-[10px]">
                    {session.user?.name || "User"}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-white text-sm bg-yellow-500  px-3 py-1 rounded-md hover:bg-red-700 transition"
                    title={locale === "en" ? "Sign out" : " تسجيل خروج"}
                    aria-label="sign out button"
                  >
                    <PiSignOut className="text-lg h-7" />
                  </button>
                </div>
              ) : (
                <Link
                  href={`/${locale}/signin`}
                  aria-label="Sign in"
                  className="hidden sm:flex p-2 rounded-full hover:bg-white/20 transition"
                  title={locale === "en" ? "Sign in" : " تسجيل دخول"}
                >
                  <User size={22} className="text-white" />
                </Link>
              )}
              <button
                onClick={() => setSlide(true)}
                aria-label="Open menu"
                className="lg:hidden text-white hover:scale-110 transition-transform"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <SideNav slide={slide} setSlide={setSlide} menuItems={sections} />
    </>
  );
};

export default NavBar;
