/**
 * Proxy (w Next.js 16 to dawne `middleware`).
 *
 * Zadanie: przepisać PUBLICZNY adres na WEWNĘTRZNĄ ścieżkę routera.
 *
 *   /oferta               -> /pl/oferta
 *   /en/services          -> /en/oferta
 *   /en/web-design/mielec -> /en/strony-internetowe/mielec
 *
 * `NextResponse.rewrite` zachowuje oryginalny adres w pasku przeglądarki,
 * więc polskie URL-e nigdy nie pokazują prefiksu `/pl`.
 *
 * Uwaga: w Next 16 proxy działa na runtime Node.js i opcja `runtime`
 * jest tu niedozwolona — jej ustawienie rzuca błąd.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { internalPath } from "./lib/routes";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const target = internalPath(pathname);

  return NextResponse.rewrite(new URL(`${target}${search}`, request.url));
}

export const config = {
  /**
   * Pomijamy: API, zasoby Next, pliki metadanych i wszystko z kropką
   * (pliki statyczne). Bez tego przepisalibyśmy np. `/sitemap.xml`
   * na `/pl/sitemap.xml` i zwróciło 404.
   */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
