export const metadata = {
  title: "Egypt Explorer | Destinations",
  description: "Explore the top destinations in Egypt, including historical sites, beaches, and cultural hotspots.",
};


export default function DestinationsLayout({ children }) {
  return (
    <section className="mx-auto px-6 py-10 flex items-center justify-center">
      {children}
    </section>
  );
}
