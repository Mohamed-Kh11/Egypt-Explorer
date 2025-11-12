export const metadata = {
  title: "Egypt Explorer | Q&A",
  description: "Ask questions and get answers about traveling in Egypt from experts and the community.",
};


export default function QaLayout({ children }) {
  return (
    <section className="mx-auto px-6 py-10 flex items-center justify-center">
      {children}
    </section>
  );
}
