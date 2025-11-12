"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

const langs = [
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLang = (lang) => {
    const cleanedPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
    router.push(`/${lang}${cleanedPath}`); // ✅ client-side navigation
  };

  return (
    <div className="relative">
      <select
        value={locale}
        onChange={(e) => changeLang(e.target.value)}
        className="appearance-none px-2 py-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md shadow-md text-sm font-bold tracking-wide text-white cursor-pointer hover:bg-white/30 transition pr-8"
        aria-label="select Language"
      >
        {langs.map(({ code, label }) => (
          <option key={code} value={code} className="text-black">
            {label}
          </option>
        ))}
      </select>

      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white w-4 h-4"
      />
    </div>
  );
}
