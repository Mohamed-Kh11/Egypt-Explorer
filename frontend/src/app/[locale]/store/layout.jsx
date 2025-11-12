export const metadata = {
  title: "Egypt Explorer | Store",
  description: "Shop for Egypt-themed souvenirs, travel essentials, and gifts.",
};


export default function StoreLayout({ children }) {
  return (
    <section className="mx-auto px-6 py-10 flex items-center justify-center">
      {children}
    </section>
  );
}
