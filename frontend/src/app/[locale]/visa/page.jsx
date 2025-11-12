import { getTranslations } from "next-intl/server";
import { FaPassport, FaDollarSign } from "react-icons/fa";
import Image from "next/image";
import visaImg from "../../images/visa.webp";
import stamp from '../../images/stamp2.webp'
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default async function Visa({ params }) {

  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const t = await getTranslations({ locale, namespace: "visa" });

  return (
    <main className="pt-22 pb-4 flex items-center justify-center md:px-6">
      <div className="grid md:grid-cols-2 gap-8 items-center ">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Title + Intro */}
          <header>
            <h1 className="text-4xl font-bold text-white drop-shadow">
              {t("title")}
            </h1>
            <p className="mt-3 text-white/90 ">
              {t("intro")}
            </p>
          </header>

          {/* Visa Types */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white dark:bg-black rounded-xl shadow">
              <FaPassport className="text-3xl mb-2 text-blue-600" />
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {t("touristVisa.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("touristVisa.desc")}
              </p>
            </div>
            <div className="p-5 bg-white dark:bg-black rounded-xl shadow">
              <FaPassport className="text-3xl mb-2 text-green-600" />
              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {t("businessVisa.title")}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("businessVisa.desc")}
              </p>
            </div>
          </div>

          {/* Requirements, Fees, Processing */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white dark:bg-black rounded-xl shadow">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {t("requirements.title")}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <li>{t("requirements.passport")}</li>
                <li>{t("requirements.photo")}</li>
                <li>{t("requirements.booking")}</li>
                <li>{t("requirements.ticket")}</li>
              </ul>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                {t("processing.title")}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("processing.time")}
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-black rounded-xl shadow">
                <FaDollarSign className="text-2xl mb-1 text-yellow-500" />
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                  {t("fees.title")}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("fees.single")}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t("fees.multiple")}</p>
              </div>
              {/* CTA */}
              <div>
                <a
                  href="https://www.visa2egypt.gov.eg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center bg-green-600 text-white font-semibold px-6 py-3 md:py-7 rounded-xl shadow-lg w-full text-center overflow-hidden relative transition-all duration-300 transform hover:scale-105"
                >
                  {t("applyNow")}
                  <FiArrowRight className={`${locale === 'en' ? "block" : "hidden"} ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2`} />
                  <FiArrowLeft className={`${locale === 'en' ? "hidden" : "block"} mr-3 w-5 h-5 transition-transform duration-300 group-hover:-translate-x-2`} />

                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-500 pointer-events-none"></span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden md:block relative w-full h-[70vh] rounded-2xl select-none shadow-lg mt-8">
          <Image
            src={visaImg}
            alt="Visa illustration"
            fill
            className="object-cover rounded-2xl"
          />
          <Image
            alt="stamp illustration"
            src={stamp}
            className={`absolute w-32 ${locale === 'en' ? 'left-3' : 'right-3'} -top-12`} />
        </div>
      </div>
    </main>
  );
}