// app/[locale]/contact/page.jsx
import { getTranslations } from "next-intl/server";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default async function ContactPage({ params }) {
  const { locale } = await params; // ✅ await params
  const t = await getTranslations({ locale, namespace: "contact" });

  const contactMethods = [
    {
      id: "email",
      icon: <FaEnvelope className="text-yellow-400 dark:text-gray-300 text-2xl" />,
      label: t("email"),
      value: "info@egypt.com",
    },
    {
      id: "phone",
      icon: <FaPhone className="text-yellow-400 dark:text-gray-300 text-2xl" />,
      label: t("phone"),
      value: "+20 123 456 789",
    },
    {
      id: "address",
      icon: <FaMapMarkerAlt className="text-yellow-400 dark:text-gray-300 text-2xl" />,
      label: t("address"),
      value: t("addressText"),
    },
  ];

  const socials = [
    { id: "facebook", icon: <FaFacebook />, url: "https://facebook.com" },
    { id: "instagram", icon: <FaInstagram />, url: "https://instagram.com" },
    { id: "twitter", icon: <FaTwitter />, url: "https://twitter.com" },
    { id: "youtube", icon: <FaYoutube />, url: "https://youtube.com" },
  ];

  return (
    <main className="flex flex-col items-center pt-24 bg-yellow-500 dark:bg-transparent px-4">
      {/* Title + description */}
      <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow text-center mb-3">
        {t("title")}
      </h1>
      <p className="text-lg text-white/90 dark:text-gray-300 text-center mb-12 max-w-2xl">
        {t("description")}
      </p>

      {/* Contact info */}
      <div
        className={`grid gap-8 md:grid-cols-3 w-full max-w-6xl ${
          locale === "ar" ? "text-right" : "text-left"
        }`}
      >
        {contactMethods.map(({ id, icon, label, value }) => (
          <div
            key={id}
            className="bg-black/20 dark:bg-black/30 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
          >
            {icon}
            <h2 className="text-xl font-semibold text-white mt-3">{label}</h2>
            <p className="text-sm text-gray-100 dark:text-gray-300 mt-1">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-white dark:text-gray-200 mb-7">
          {t("followUs")}
        </h2>
        <div className="flex gap-8 text-3xl text-white">
          {socials.map(({ id, icon, url }) => (
            <Link
              key={id}
              href={url}
              target="_blank"
              className="hover:text-gray-300 transition"
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}


