
export const metadata = {
  title: "Egypt Explorer | Climate",
  description: "Learn about Egypt’s climate and weather patterns to plan your best travel time.",
};

export default function ClimateLayout({ children }) {
  return (
    <section className="mx-auto px-6 py-10 flex items-center justify-center">
      {children}
    </section>
  );
}
