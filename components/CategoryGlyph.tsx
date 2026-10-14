/**
 * Znak kategorii usług — ten sam motyw, co makieta danej kategorii.
 * Wspólny dla strony głównej i wyjść z podstron kategorii, żeby każdy
 * obszar miał w całej witrynie jedną, rozpoznawalną ikonę.
 *
 * Obrys w atrybutach, nie tylko w CSS — znak rysuje się poprawnie
 * wszędzie, a grubość linii i rozmiar ustawia arkusz miejsca użycia.
 */

import type { ServiceCategorySlug } from "@/lib/cms";

const GLYPHS: Record<ServiceCategorySlug, string> = {
  "strony-i-sklepy": "M3.5 5h17v14h-17zM3.5 9h17M6.5 7h.01M9 7h.01",
  "sztuczna-inteligencja":
    "M5 9a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5zM19 9a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5zM12 20.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5zM7.3 7.6l3.5 8M16.7 7.6l-3.5 8M7.5 6.5h9",
  "marketing-i-widocznosc":
    "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21zM12 12.2a2.2 2.2 0 1 0 0-4.4a2.2 2.2 0 1 0 0 4.4z",
  "opieka-i-wsparcie": "M3 12h4l2.5-6 4 12 2.5-6H21",
};

export function CategoryGlyph({
  slug,
  className,
}: {
  slug: ServiceCategorySlug;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={GLYPHS[slug]} />
    </svg>
  );
}
