import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import "../globals.css";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { localBusinessSchema } from "@/lib/schema";
import { SITE } from "@/content/site";
import { LOCALES, isLocale, type Locale } from "@/lib/routes";
import { getDictionary } from "@/content/dictionary";
import { clashDisplay, satoshi } from "../fonts";

/* Obie wersje językowe prerenderowane na etapie builda. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  /* Pozwala używać ścieżek względnych w canonical i OG — składa je w pełny URL. */
  metadataBase: new URL(SITE.url),
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;
  const t = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${clashDisplay.variable} ${satoshi.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-obsydian text-bone">
        {/* Dane strukturalne firmy — obecne na każdej podstronie. */}
        <JsonLd data={localBusinessSchema(locale)} />

        <a href="#tresc" className="skip-link">
          {t.a11y.skipToContent}
        </a>

        <Nav locale={locale} />

        {/* Nawigacja w App Routerze jest transition, więc ViewTransition
            animuje zmianę podstrony sam. Granica tylko wokół treści —
            nagłówek i stopka stoją w miejscu. Keyframes `page-swap`
            w globals.css. */}
        <main id="tresc" className="flex-1">
          <ViewTransition default="page-swap">
            {children}
          </ViewTransition>
        </main>

        <Footer locale={locale} />

        {/* Wyspy klienckie od ruchu — same się wyłączają przy dotyku
            i przy prefers-reduced-motion. */}
        <SmoothScroll />
        <Cursor />
      </body>
    </html>
  );
}
