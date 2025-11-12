import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { GiClothes, GiEgyptianWalk, GiPartyPopper } from "react-icons/gi";
import cultureImg from "./../../images/cloth.webp";

export default async function CulturePage({ params }) {
  const { locale } = await params; // ✅ await params

  const t = await getTranslations({ locale, namespace: "culture" });

  const sections = [
    {
      id: "clothing",
      icon: <GiClothes className="text-yellow-400 text-2xl shrink-0" />,
      title: t("clothingTitle"),
      text: t("clothingText"),
    },
    {
      id: "traditions",
      icon: <GiEgyptianWalk className="text-yellow-400 text-2xl shrink-0" />,
      title: t("traditionsTitle"),
      text: t("traditionsText"),
    },
    {
      id: "festivals",
      icon: <GiPartyPopper className="text-yellow-400 text-2xl shrink-0" />,
      title: t("festivalsTitle"),
      text: t("festivalsText"),
    },
  ];

  return (
    <main className="flex flex-col items-center pt-24 bg-yellow-500 dark:bg-transparent px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-white drop-shadow text-center">
        🎉 {t("title")}
      </h1>

      <div
        className={`max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center ${
          locale === "ar" ? "text-right" : "text-left"
        }`}
      >
        <div className="space-y-6 text-white dark:text-gray-200 leading-relaxed">
          <p className="text-lg">{t("intro")}</p>

          {sections.map(({ id, icon, title, text }) => (
            <div
              key={id}
              className="bg-black/20 dark:bg-black/30 p-4 rounded-xl shadow hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-3 mb-2">
                {icon}
                <h2 className="text-xl font-semibold">{title}</h2>
              </div>
              <p className="text-sm text-gray-100 dark:text-gray-300">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl transition-transform">
            <Image
              src={cultureImg}
              alt={t("title")}
              className="object-cover"
              width={520}
              height={400}
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
