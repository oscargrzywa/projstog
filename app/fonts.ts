import localFont from "next/font/local";

/* Fonty w osobnym module: używa ich layout `[lang]` i `global-not-found`,
   który omija layouty i musi załadować wszystko sam. */

/* Clash Display — tylko nagłówki. Wariant variable, jeden plik na wszystkie grubości. */
export const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  weight: "200 700",
  display: "swap",
  variable: "--font-clash",
  fallback: ["system-ui", "sans-serif"],
});

/* Satoshi — tekst ciągły i interfejs. */
export const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Variable.woff2", style: "normal" },
    { path: "./fonts/Satoshi-VariableItalic.woff2", style: "italic" },
  ],
  weight: "300 900",
  display: "swap",
  variable: "--font-satoshi",
  fallback: ["system-ui", "sans-serif"],
});
