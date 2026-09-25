import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import "../globals.css";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { SITE } from "@/content/site";
import { LOCALES, isLocale, type Locale } from "@/lib/routes";
import { getDictionary } from "@/content/dictionary";

/* Clash Display — tylko nagłówki. Wariant variable, jeden plik na wszystkie grubości. */
const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  weight: "200 700",
  display: "swap",
  variable: "--font-clash",
  fallback: ["system-ui", "sans-serif"],
});

/* Satoshi — tekst ciągły i interfejs. */
const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Variable.woff2", style: "normal" },
    { path: "../fonts/Satoshi-VariableItalic.woff2", style: "italic" },
  ],
  weight: "300 900",
  display: "swap",
  variable: "--font-satoshi",
  fallback: ["system-ui", "sans-serif"],
});

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

        <main id="tresc" className="flex-1">
          {children}
        </main>

        <Footer locale={locale} />
      </body>
    </html>
  );
}
