"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { MdLightbulbOutline } from "react-icons/md";
import { FaRandom } from "react-icons/fa";
import { FcIdea } from "react-icons/fc";
import { GiEgyptianSphinx } from "react-icons/gi";



export default function EgyptFact() {
  const t = useTranslations("facts");

  // ✅ Facts loaded from i18n (e.g., in your en.json file under "facts")
  const facts = [
    t("fact1"),
    t("fact2"),
    t("fact3"),
    t("fact4"),
    t("fact5"),
    t("fact6"),
    t("fact7"),
    t("fact8"),
    t("fact9"),
    t("fact10"),
  ];

  const [fact, setFact] = useState("");

  useEffect(() => {
    setFact(facts[Math.floor(Math.random() * facts.length)]);
  }, [t]); // ✅ re-runs if language changes

  const shuffleFact = () => {
    setFact(facts[Math.floor(Math.random() * facts.length)]);
  };

  return (
    <section className="relative w-full min-h-[60svh] px-4 py-6 md:py-20 md:min-h-[40svh] flex items-center justify-center ">
      {/* Absolute Background */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 max-w-5xl  flex flex-col gap-6 text-center px-4"
      >
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide flex items-center justify-center gap-2 text-white ">
          <GiEgyptianSphinx   className="text-5xl hidden md:block" />
          {t("title")} :
        </h2>

        {/* Fact + Shuffle */}
        <div className="flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={fact}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xl mb-4 md:text-2xl md:leading-relaxed max-w-3xl md:max-w-lx text-white  drop-shadow-md"
            >
              {fact}
            </motion.p>
          </AnimatePresence>

          <button
            onClick={shuffleFact}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white dark:text-white font-medium transition"
          >
            <FaRandom />
            {t("shuffle")}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
