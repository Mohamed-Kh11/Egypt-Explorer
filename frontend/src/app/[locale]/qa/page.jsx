// app/[locale]/qa/page.jsx
import { getTranslations } from "next-intl/server";
import QAList from "./QAList";

export default async function QAPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const t = await getTranslations({ locale, namespace: "qa" });

  // Build questions server-side for SEO
  const questions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    q: t(`q${i + 1}`),
    a: t(`a${i + 1}`),
  }));

  return (
    <main className="flex flex-col items-center pt-24 pb-12 bg-yellow-500 dark:bg-transparent">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-white drop-shadow">
        ℹ️ {t("title")}
      </h1>

      <QAList questions={questions} locale={locale} />
    </main>
  );
}
