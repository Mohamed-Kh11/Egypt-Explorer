// app/[locale]/components/DeferredClients.jsx
"use client";

import { useEffect, useState } from "react";

export default function DeferredClients({ children }) {
  const [NavBar, setNavBar] = useState(null);
  const [Footer, setFooter] = useState(null);
  const [Toaster, setToaster] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [
        { default: NavBarComp },
        { default: FooterComp },
        toastModule,
      ] = await Promise.all([
        import("./NavBar"),
        import("./Footer"),
        import("react-hot-toast"),
      ]);

      if (!mounted) return;

      setNavBar(() => NavBarComp);
      setFooter(() => FooterComp);
      setToaster(() => toastModule.Toaster || toastModule.default);
    }

    if ("requestIdleCallback" in window) {
      requestIdleCallback(load, { timeout: 500 });
    } else {
      const id = setTimeout(load, 300);
      return () => clearTimeout(id);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {NavBar ? <NavBar /> : <div aria-hidden className="h-16" />}
      {children}
      {Footer ? <Footer /> : <div aria-hidden className="h-24" />}
      {Toaster ? <Toaster position="top-center" reverseOrder={false} /> : null}
    </>
  );
}
