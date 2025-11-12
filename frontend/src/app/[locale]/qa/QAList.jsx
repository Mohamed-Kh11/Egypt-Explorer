"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function QAList({ questions, locale }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="w-full max-w-6xl overflow-x-auto">
      <table className="w-full table-fixed border-separate border-spacing-y-2">
        {questions.map(({ id, q, a }) => (
          <tbody key={id}>
            {/* Question Row */}
            <tr
              className="bg-black/10 dark:bg-black/20 rounded-xl cursor-pointer"
              onClick={() => setOpenId(openId === id ? null : id)}
            >
              <td
                className={`px-5 py-4 flex items-center justify-between w-full ${
                  locale === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <span
                  className={`text-base font-semibold text-white dark:text-gray-100 flex-1 ${
                    locale === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {q}
                </span>
                {openId === id ? (
                  <FaChevronUp
                    className={`text-white shrink-0 ${
                      locale === "ar" ? "mr-2" : "ml-2"
                    }`}
                  />
                ) : (
                  <FaChevronDown
                    className={`text-white shrink-0 ${
                      locale === "ar" ? "mr-2" : "ml-2"
                    }`}
                  />
                )}
              </td>
            </tr>

            {/* Answer Row */}
            <tr>
              <td className="px-5 w-full">
                <AnimatePresence initial={false}>
                  {openId === id && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className={` text-white py-3 ${
                          locale === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
