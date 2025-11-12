import { getTranslations } from "next-intl/server";
import QuizClient from "./QuizClient";

export default async function QuizPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quiz" });

  const questions = t.raw("questions");

  return (
    <QuizClient
      locale={locale}
      tStrings={{
        title: t("title"),
        description: t("description"),
        prev: t("prev"),
        next: t("next"),
        finish: t("finish"),
        resultTitle: t("resultTitle"),
        thanks: t("thanks"),
        questionNumberPattern: t.raw("questionNumber"),
        scorePattern: t.raw("score"),
      }}
      questions={questions}
    />
  );

}
