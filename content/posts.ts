/**
 * Wpisy blogowe.
 *
 * ⚠ SLUGI SĄ WSPÓLNE DLA OBU JĘZYKÓW.
 * `publicPath()` przepuszcza segmenty dynamiczne bez tłumaczenia, więc
 * przełącznik języka (`switchLocale`) zadziała tylko wtedy, gdy wpis PL i jego
 * odpowiednik EN mają IDENTYCZNY `slug`. Gdyby kiedyś doszła mapa slugów per
 * język w `lib/routes.ts`, można to rozdzielić — do tego czasu slug polski
 * obowiązuje w obu wersjach.
 *
 * ⚠ `readingMinutes` zostawiamy na 0 — realną wartość liczy `lib/cms/local.ts`
 * przy odczycie, na podstawie długości `body`. Ręczne wpisywanie rozjeżdża się
 * z treścią przy pierwszej edycji.
 */

import type { Post } from "@/lib/cms/types";
import type { Locale } from "@/lib/routes";

export const POSTS: Record<Locale, Post[]> = {
  pl: [],
  en: [],
};
