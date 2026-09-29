import type { Metadata } from "next";

import { NotFoundContent } from "@/components/NotFoundContent";

/** Strona 404 dla notFound() wywołanego w podstronach. Treść wspólna
 *  z `app/global-not-found.tsx`. */

export const metadata: Metadata = {
  title: "404 — nie znaleziono strony | PROJSTOG",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
