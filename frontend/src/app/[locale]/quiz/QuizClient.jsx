"use client";

import { useState, useEffect } from "react";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper to format patterns like "Question {num} of {total}"
function formatPattern(pattern, values) {
  return pattern.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

export default function QuizClient({ locale, tStrings, questions }) {
  const [shuffledQuestions] = useState(() => shuffleArray(questions));
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(shuffledQuestions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const handleAnswer = (optionIndex) => {
    if (answers[current] !== null) return;
    const newAnswers = [...answers];
    newAnswers[current] = optionIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (current + 1 < shuffledQuestions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  // Auto advance 2.5s after answering
  useEffect(() => {
    if (answers[current] !== null && !finished) {
      const timer = setTimeout(() => {
        nextQuestion();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [answers, current, finished]);

  const score = answers.reduce((acc, ans, idx) => {
    if (ans !== null && shuffledQuestions[idx].options[ans].correct) return acc + 1;
    return acc;
  }, 0);

  return (
    <main
      className="flex flex-col items-center pt-24 bg-yellow-500 dark:bg-transparent px-4 min-h-screen"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow text-center mb-5">
        📝 {tStrings.title}
      </h1>
      <p className="text-white/90 dark:text-gray-300 text-lg text-center mb-6">
        {tStrings.description}
      </p>

      {!finished ? (
        <div className="lg:min-w-[700px] w-full bg-black/20 dark:bg-black/30 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-3">
            {formatPattern(tStrings.questionNumberPattern, {
              num: current + 1,
              total: shuffledQuestions.length,
            })}
          </h2>

          <p className="text-lg text-white mb-6">
            {shuffledQuestions[current].question}
          </p>

          <div className="grid gap-4">
            {shuffledQuestions[current].options.map((option, idx) => {
              const selected = answers[current];
              const isCorrect = option.correct;
              const isChosen = selected === idx;

              let bgClass =
                "bg-yellow-400/30 hover:bg-yellow-400/50 ";
              if (selected !== null) {
                if (isChosen && !isCorrect) bgClass = "bg-red-600";
                if (isCorrect) bgClass = "bg-green-600";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  aria-pressed={isChosen}
                  aria-disabled={selected !== null}
                  className={`p-3 rounded-lg text-white transition ${bgClass}`}
                >
                  {option.text}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevQuestion}
              disabled={current === 0}
              className="px-4 py-2 rounded-lg bg-yellow-400/50  text-white disabled:opacity-40"
            >
              {tStrings.prev}
            </button>
            <button
              onClick={nextQuestion}
              className="px-4 py-2 rounded-lg bg-yellow-500 text-white"
            >
              {current + 1 < shuffledQuestions.length
                ? tStrings.next
                : tStrings.finish}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-black/20 dark:bg-black/30 p-8 rounded-2xl shadow-xl text-center text-white max-w-md">
          <h2 className="text-2xl font-bold mb-4">{tStrings.resultTitle}</h2>
          <p className="text-lg mb-2">
            {formatPattern(tStrings.scorePattern, {
              score,
              total: shuffledQuestions.length,
            })}
          </p>
          <p className="text-sm text-gray-200">{tStrings.thanks}</p>
        </div>
      )}
    </main>
  );
}
