
export const metadata = {
  title: "Egypt Explorer | Forum",
  description: "Join the Egypt Forum to share your travel experiences, tips, and opinions about Egypt.",
};

export default function ForumLayout({ children }) {


  return (
    <section className="mx-auto px-10 py-10 flex flex-col items-center justify-center">
      {children}
    </section>
  );
}
