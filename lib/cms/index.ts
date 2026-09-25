/**
 * Punkt dostępu do treści.
 *
 * Widoki importują WYŁĄCZNIE stąd. Nigdy bezpośrednio z `content/*`.
 *
 * ── Podmiana na headless CMS ────────────────────────────────────────────
 * 1. Napisz nową implementację interfejsu `ContentSource`
 *    (np. `lib/cms/sanity.ts`), która odpytuje CMS.
 * 2. Podmień jedną linijkę poniżej — `const source = ...`.
 * 3. Koniec. Żaden komponent ani route nie wymaga zmiany.
 *
 * Funkcje są asynchroniczne już teraz, choć lokalne źródło zwraca dane
 * natychmiast — właśnie po to, żeby krok 2. nie pociągnął za sobą zmian
 * w sygnaturach wywołań w całym drzewie.
 *
 * Przy podmianie na CMS pamiętaj jeszcze o:
 *  - rewalidacji (`revalidateTag` / webhook z CMS-a po publikacji),
 *  - `generateStaticParams`, które musi pobrać listę slugów ze źródła.
 */

import { localSource } from "./local";
import type { ContentSource } from "./types";

/* ⬇ JEDYNE miejsce do zmiany przy przejściu na headless CMS. */
const source: ContentSource = localSource;

export const listPosts = source.listPosts.bind(source);
export const getPost = source.getPost.bind(source);

export const listCaseStudies = source.listCaseStudies.bind(source);
export const getCaseStudy = source.getCaseStudy.bind(source);

export const listServiceCategories = source.listServiceCategories.bind(source);
export const getServiceCategory = source.getServiceCategory.bind(source);

export type * from "./types";
