export const metadata = {
  title: "Egypt Explorer | Quiz",
  description: "Test your knowledge about Egypt with fun and informative quizzes.",
};


export default function QuizLayout({ children }) {
  return (
    <section className="mx-auto px-6 py-10 flex items-center justify-center">
      {children}
    </section>
  );
}
