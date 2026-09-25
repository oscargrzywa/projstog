import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PRIVACY_PAGE, PRIVACY_UPDATED_AT } from "@/content/pages/privacy";
import { SITE } from "@/content/site";
import { isLocale, metadataAlternates } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const copy = PRIVACY_PAGE[lang];
  return {
    title: copy.seo.title,
    description: copy.seo.description,
    alternates: metadataAlternates(lang, ["polityka-prywatnosci"]),
    /* Jedyna strona wyłączona z indeksowania. Uwaga: NIE ustawiamy tu
       `nosnippet` — ta dyrektywa wyklucza z AI Overviews, a `noindex`
       w zupełności wystarcza. */
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const copy = PRIVACY_PAGE[lang];
  const updated = new Intl.DateTimeFormat(lang === "pl" ? "pl-PL" : "en-GB", {
    dateStyle: "long",
  }).format(new Date(PRIVACY_UPDATED_AT));

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:py-20">
      <h1 className="text-5xl">{copy.h1}</h1>
      <p className="mt-4 text-sm text-lichen">
        {copy.updated} {updated}
      </p>

      {/* Dokument nie przeszedł weryfikacji prawnej — mówimy o tym wprost
          i na górze, a nie drobnym drukiem na dole. */}
      <aside className="mt-8 rounded-lg border border-signal/40 bg-basalt p-6">
        <h2 className="text-xl text-voltage">{copy.disclaimerTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-lichen">
          {copy.disclaimerBody}
        </p>
      </aside>

      <p className="mt-10 leading-relaxed text-lichen">{copy.intro}</p>

      {copy.sections.map((section) => (
        <section key={section.heading} className="mt-12">
          <h2 className="text-2xl">{section.heading}</h2>
          {section.blocks.map((block, index) => (
            <div key={index}>
              <p className="mt-4 leading-relaxed text-lichen">{block.text}</p>
              {block.items && (
                <ul className="mt-4 space-y-2">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="border-l border-hairline pl-4 text-sm leading-relaxed text-lichen"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}

      <section className="mt-12 border-t border-hairline pt-8">
        <h2 className="text-2xl">{copy.contactHeading}</h2>
        <p className="mt-4 leading-relaxed text-lichen">{copy.contactBody}</p>
        <a
          href={`mailto:${SITE.email}`}
          className="mt-4 inline-block font-display text-xl text-bone transition-colors hover:text-voltage"
        >
          {SITE.email}
        </a>
      </section>
    </div>
  );
}
