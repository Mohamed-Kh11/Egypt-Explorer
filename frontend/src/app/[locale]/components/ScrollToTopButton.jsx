// src/app/[locale]/components/ScrollToTopButton.jsx
"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  function ResetScroll() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showButton) return null;

  return (
    <button
      onClick={ResetScroll}
      className="fixed bottom-6 right-6 z-50 bg-[#c99a0c]  text-white p-3 rounded-full border shadow-2xl hover:bg-yellow-500 transition"
    >
      <FaArrowUp size={20} />
    </button>
  );
}
