import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LangProvider } from "./components/LangContext";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PROJSTOG — Cyfrowe rozwiązania, które zarabiają na Ciebie",
  description:
    "Strony internetowe, automatyzacje AI, chatboty, sklepy e-commerce, CRM i więcej. Oscar Grzywa z Mielca — jeden człowiek, pełne rozwiązania cyfrowe.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <div className="global-aurora" aria-hidden="true">
          <div className="ab1" /><div className="ab2" /><div className="ab3" /><div className="ab4" />
        </div>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
