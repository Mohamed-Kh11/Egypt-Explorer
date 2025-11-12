"use client"; // 👈 this is required

import { Provider } from "react-redux";
import store from "../../redux/store";
import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "next-auth/react";

const timeZone = "Africa/Cairo";

export default function Providers({ children, locale, messages }) {
  return (
    <SessionProvider>
      <NextIntlClientProvider
        locale={locale}
        timeZone={timeZone}
        messages={messages}
      >
        <Provider store={store}>{children}</Provider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
