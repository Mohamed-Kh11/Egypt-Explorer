"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function StorePage() {
  const t = useTranslations("store");
  const locale = useLocale();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/products"); // adjust API URL
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Skeleton placeholder cards
  const SkeletonCard = () => (
    <div className="p-4 rounded-xl shadow bg-black/10 dark:bg-[#000000] flex flex-col items-center text-center animate-pulse">
      <div className="h-48 w-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-lg mb-3" />
      <div className="h-4 w-3/4 bg-gray-400 dark:bg-gray-600 rounded mb-2" />
      <div className="h-3 w-5/6 bg-gray-400 dark:bg-gray-600 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-400 dark:bg-gray-600 rounded mb-3" />
      <div className="h-8 w-20 bg-gray-500 dark:bg-gray-700 rounded" />
    </div>
  );

  return (
    <main className="flex flex-col items-center justify-center px-6 pt-24 bg-yellow-500 dark:bg-transparent">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-white drop-shadow">
        🛍️ {t("title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <div
                key={product._id}
                className="p-4 rounded-xl shadow bg-black/10 dark:bg-[#000000] flex flex-col items-center text-center hover:scale-105 transition"
              >
                {/* Product Image */}
                <div className="h-48 w-full flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
                  <Image
                    src={product.image}
                    width={200}
                    height={200}
                    className="max-h-44 object-contain"
                    alt={product.name?.[locale] || product.name?.en || "Product"}
                  />
                </div>

                {/* Name */}
                <h2 className="text-md font-semibold text-white dark:text-gray-100">
                  {product.name?.[locale] || product.name?.en}
                </h2>

                {/* Description */}
                <p className="text-xs text-gray-100 dark:text-gray-300 mb-2">
                  {product.description?.[locale] || product.description?.en}
                </p>

                {/* Price */}
                <p className="text-sm font-bold text-yellow-300 mb-3">
                  ${product.price.toFixed(2)}
                </p>

                {/* Purchase Button */}
                <Link
                  href={`/${locale}/store/${product._id}`}
                  className="px-3 py-1.5 bg-yellow-400 text-black rounded-lg text-sm font-medium hover:bg-yellow-500 transition"
                >
                  {t("purchase")}
                </Link>
              </div>
            ))}
      </div>
    </main>
  );
}
