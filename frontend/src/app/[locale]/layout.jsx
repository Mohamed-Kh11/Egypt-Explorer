import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import getMessages from "../../../i18n/request";
import { routing } from "../../../i18n/routing";
import { Toaster } from "react-hot-toast";

import "../../app/globals.css";
import Providers from "./components/providers";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Egypt Explorer",
  description: "Discover the wonders of Egypt",
};

export default async function AuthLayout({ children, params }) {
  // ✅ Await params in Next.js 15
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const { messages } = await getMessages({ requestLocale: locale });

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        {/* ✅ Prevent theme flicker before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem("theme");
                  if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`bg-yellow-500 dark:bg-black/90 ${
          locale === "en" ? "font-[Poppins]" : "font-[Alex]"
        }`}
      >
        <Providers locale={locale} messages={messages}>
          <NavBar />
          {children}
          <Toaster position="top-center" reverseOrder={false} />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
