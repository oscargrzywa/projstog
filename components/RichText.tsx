/**
 * Renderer treści blokowej.
 *
 * Jedyne miejsce w projekcie, które wie, jak blok `RichTextBlock` wygląda
 * na ekranie. Widoki podają tablicę bloków i nic więcej — dzięki temu
 * podmiana źródła treści na headless CMS (Portable Text z Sanity, Rich Text
 * z Contentful, Lexical z Payload) sprowadza się do mapowania na te same
 * typy z `lib/cms/types.ts`, bez dotykania warstwy prezentacji.
 *
 * Server Component — zero JS po stronie klienta. Treść musi być w HTML-u
 * w pierwszej odpowiedzi serwera, bo to ona ma się indeksować.
 *
 * Zasady typograficzne:
 *  - kolumna tekstu `max-w-[66ch]` — poniżej 80 znaków w wierszu,
 *  - odstępy rosną wraz z rangą bloku (nagłówek dostaje więcej powietrza
 *    nad sobą niż akapit), a pierwszy blok nie ma marginesu górnego,
 *  - obrazy i cytaty mogą wyjść poza kolumnę tekstu, ale nie poza treść.
 */

import Image from "next/image";

import type { RichText as RichTextBlocks, RichTextBlock } from "@/lib/cms/types";

/** Szerokość kolumny tekstu ciągłego. Jedno miejsce, żeby nie rozjechała się między blokami. */
const COLUMN = "max-w-[66ch]";

function Block({ block }: { block: RichTextBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={`${COLUMN} mt-6 leading-[1.75] text-bone/85 first:mt-0`}>
          {block.text}
        </p>
      );

    case "heading":
      /* h2 i h3 dostają Clash Display z globals.css — bez klasy czcionki. */
      return block.level === 2 ? (
        <h2 className={`${COLUMN} mt-14 text-3xl text-bone first:mt-0`}>
          {block.text}
        </h2>
      ) : (
        <h3 className={`${COLUMN} mt-10 text-2xl text-bone first:mt-0`}>
          {block.text}
        </h3>
      );

    case "list": {
      const items = block.items.map((item, index) => (
        <li key={index} className="pl-1.5 leading-[1.75]">
          {item}
        </li>
      ));

      return block.ordered ? (
        <ol
          className={`${COLUMN} mt-6 list-decimal space-y-2.5 pl-5 text-bone/85 marker:text-lichen marker:tabular-nums first:mt-0`}
        >
          {items}
        </ol>
      ) : (
        <ul
          className={`${COLUMN} mt-6 list-disc space-y-2.5 pl-5 text-bone/85 marker:text-signal first:mt-0`}
        >
          {items}
        </ul>
      );
    }

    case "quote":
      return (
        <figure className="mt-10 max-w-[58ch] border-l-2 border-signal pl-6 first:mt-0">
          <blockquote className="font-display text-xl leading-snug text-bone">
            {block.text}
          </blockquote>
          {block.cite && (
            <figcaption className="mt-3 text-sm text-lichen">
              {block.cite}
            </figcaption>
          )}
        </figure>
      );

    case "image":
      return (
        <figure className="mt-10 max-w-[52rem] first:mt-0">
          {/* Stałe proporcje + `fill`: model treści nie niesie wymiarów obrazu,
              więc rezerwujemy miejsce ramką, inaczej układ skacze przy ładowaniu (CLS). */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-hairline bg-basalt">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(max-width: 768px) 100vw, 52rem"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-lichen">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "callout":
      return (
        <aside
          className={`${COLUMN} mt-10 rounded-md border border-hairline border-l-2 border-l-voltage bg-basalt px-5 py-4 leading-relaxed text-bone first:mt-0`}
        >
          {block.text}
        </aside>
      );

    default: {
      /* Nowy wariant bloku w `lib/cms/types.ts` zepsuje tu build zamiast
         po cichu zniknąć ze strony. */
      const exhaustive: never = block;
      void exhaustive;
      return null;
    }
  }
}

export function RichText({ blocks }: { blocks: RichTextBlocks }) {
  if (blocks.length === 0) return null;

  return (
    <div className="text-base">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}
