// app/[locale]/destinations/[city]/ImageGallery.jsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ city, images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      {/* Main image */}
      {images.length > 0 && (
        <div className="relative w-full md:flex-1 h-[250px] sm:h-[300px] md:h-[450px] rounded-xl overflow-hidden shadow-lg order-1 md:order-none">
          <Image
            src={images[currentIndex]}
            alt={`${city} image ${currentIndex + 1}`}
            fill
            className="object-cover transition-all duration-500"
            priority
          />
        </div>
      )}

      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 order-2 md:order-none justify-center">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative w-20 h-20 rounded-lg cursor-pointer overflow-hidden border-4 
            ${index === currentIndex ? "border-white/40 dark:border-gray-300" : "border-transparent"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={img}
              alt={`${city} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
