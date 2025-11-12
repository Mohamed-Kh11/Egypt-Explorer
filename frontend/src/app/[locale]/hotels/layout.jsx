export const metadata = {
  title: "Egypt Explorer | Hotels",
  description: "Find and book the best hotels in Egypt, from luxury resorts to budget stays.",
};

export default function HotelsLayout({ children }) {
  return (
    <section className="mx-auto px-6 py-10 flex items-center justify-center">
      {children}
    </section>
  );
}
