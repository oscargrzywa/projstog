import type { Metadata } from "next";

import "./globals.css";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { NotFoundContent } from "@/components/NotFoundContent";
import { DEFAULT_LOCALE } from "@/lib/routes";
import { clashDisplay, satoshi } from "./fonts";

/**
 * 404 dla adresów, które nie pasują do żadnej trasy.
 *
 * Root layout siedzi pod dynamicznym `[lang]`, więc nieznany adres nie ma
 * layoutu, w którym mógłby się wyrenderować `not-found.tsx` — bez tego
 * pliku Next pokazywał swoją domyślną, białą stronę 404.
 * Ten plik omija layouty: sam ładuje style, fonty, nagłówek i stopkę.
 * Wymaga `experimental.globalNotFound` w next.config.ts.
 */

export const metadata: Metadata = {
  title: "404 — nie znaleziono strony | PROJSTOG",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html
      lang={DEFAULT_LOCALE}
      className={`${clashDisplay.variable} ${satoshi.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-obsydian text-bone">
        <Nav locale={DEFAULT_LOCALE} />
        <main id="tresc" className="flex-1">
          <NotFoundContent />
        </main>
        <Footer locale={DEFAULT_LOCALE} />
      </body>
    </html>
  );
}
