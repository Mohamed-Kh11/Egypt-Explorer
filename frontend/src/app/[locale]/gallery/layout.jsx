

export const metadata = {
  title: "Egypt Explorer | Gallery",
  description: "View stunning images of Egypt’s landmarks, cities, and natural beauty.",
};

export default function GalleryLayout({ children }) {
  return (
    <section className="mx-auto px-10 py-10 flex items-center justify-center">
      {children}
    </section>
  );
}
