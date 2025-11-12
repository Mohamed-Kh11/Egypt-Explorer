

export const metadata = {
  title: "Egypt Explorer | Visa",
  description: "Get the latest information about Egypt visa requirements, application process, and travel tips.",
};

export default function VisaLayout({ children }) {
  return (
    <section className=" mx-auto px-6 py-10 min-h-[90svh] overflow-y-auto">
      {children}
    </section>
  );
}
