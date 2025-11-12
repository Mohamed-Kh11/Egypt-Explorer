
export const metadata = {
  title: "Egypt Explorer | Culture",
  description: "Discover the rich culture, traditions, and heritage of Egypt.",
};


export default function CultureLayout({ children }) {
  return (
    <section className="mx-auto px-6 py-10 flex items-center justify-center">
      {children}
    </section>
  );
}
