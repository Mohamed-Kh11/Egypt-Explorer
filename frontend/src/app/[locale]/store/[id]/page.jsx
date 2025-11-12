"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

export default function BuyPage() {
  const t = useTranslations("buy");
  const locale = useLocale();
  const { id } = useParams(); // from /store/[id]

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Order form state
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState("cash");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [orderRef, setOrderRef] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error(t("notFound"));
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, t]);

  const handleOrder = () => {
    if (!address || !city || !phone) {
      toast.error(t("fillDetails"));
      return;
    }
    const ref = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderRef(ref);

    toast.success(t("orderPlacedToast"));

    // Here you could send order details to backend
    console.log({
      productId: product._id,
      quantity,
      payment,
      address,
      city,
      phone,
      reference: ref,
    });
  };

  if (loading) return <p className="text-center text-white pt-20">{t("loading")}</p>;
  if (!product) return <p className="text-center text-red-500 pt-20">{t("notFound")}</p>;

  return (
    <main className="pt-12 flex flex-col items-center text-white">
      <Toaster position="top-right" />
      <div className="w-full max-w-7xl bg-black/20 dark:bg-[#111] p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: Product Image */}
          <div className="flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              width={500}
              height={500}
              className="w-full h-full object-contain max-h-[500px]"
              alt={product.name?.[locale] || product.name?.en}
            />
          </div>

          {/* RIGHT: Either Form OR Invoice */}
          {!orderRef ? (
            <div className="flex flex-col justify-between h-full md:max-h-[500px]">
              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {product.name?.[locale] || product.name?.en}
                </h1>
                <p className="mb-2 text-gray-200">
                  {product.description?.[locale] || product.description?.en}
                </p>
                <p className="text-2xl font-bold text-yellow-300 mb-4">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Order Form */}
              <div className="flex flex-col gap-4">
                {/* Quantity */}
                <div>
                  <label className="block mb-1">{t("quantity")}</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-28 text-black rounded px-2 py-1"
                  />
                </div>

                {/* Payment */}
                <div>
                  <label className="block mb-3 md:mb-1">{t("paymentMethod")}</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="cash"
                        checked={payment === "cash"}
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      {t("cash")}
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        value="credit"
                        checked={payment === "credit"}
                        onChange={(e) => setPayment(e.target.value)}
                      />
                      {t("credit")}
                    </label>
                  </div>
                </div>

                {/* Address & City */}
                <div className="flex gap-3 w-full justify-center">
                  <div className="w-full">
                    <label className="block mb-1">{t("address")}</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-black rounded px-2 py-1"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block mb-1">{t("city")}</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-black rounded px-2 py-1"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-1">{t("phone")}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-black rounded px-2 py-1"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleOrder}
                  className="w-full mt-2 bg-yellow-400 text-white py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
                >
                  {t("placeOrder")}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full md:max-h-[500px] bg-gray-100 dark:bg-[#111] p-6 rounded-lg shadow-lg transition-colors">

              {/* Header */}
              <div className="border-b border-gray-300 dark:border-gray-700 pb-3 mb-4">
                <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
                  🧾 {t("invoice")}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("reference")}: <span className="text-green-600 dark:text-green-400 font-semibold">{orderRef}</span>
                </p>
              </div>

              {/* Invoice Body */}
              <div className="flex-1 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">{t("invoiceProduct")}:</span>
                  <span className="text-gray-900 dark:text-gray-200">{product.name?.[locale] || product.name?.en}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">{t("invoiceQuantity")}:</span>
                  <span className="text-gray-900 dark:text-gray-200">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">{t("invoicePrice")}:</span>
                  <span className="text-gray-900 dark:text-gray-200">${product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-300 dark:border-gray-700 pt-2">
                  <span className="font-bold text-yellow-600 dark:text-yellow-300">{t("total")}:</span>
                  <span className="font-bold text-yellow-600 dark:text-yellow-300">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">{t("invoicePayment")}:</span>
                  <span className="text-gray-900 dark:text-gray-200">{payment === "cash" ? t("cash") : t("credit")}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800 dark:text-gray-300">{t("invoiceAddress")}:</span>
                  <p className="ml-2 text-gray-900 dark:text-gray-200">{address}, {city}</p>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800 dark:text-gray-300">{t("invoicePhone")}:</span>
                  <span className="text-gray-900 dark:text-gray-200">{phone}</span>
                </div>
              </div>
            </div>

          )}
        </div>
      </div>
    </main>
  );
}
