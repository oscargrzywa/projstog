/**
 * Dane strukturalne schema.org.
 *
 * Natywny <script>, nie `next/script` — JSON-LD to dane, nie kod wykonywalny,
 * a Next zaleca dla niego zwykły tag skryptu.
 *
 * `.replace(/</g, "\\u003c")` jest obowiązkowe: JSON.stringify nie sanityzuje
 * treści, więc bez tego dane zawierające "</script>" pozwoliłyby wyjść
 * z kontekstu skryptu (XSS).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
