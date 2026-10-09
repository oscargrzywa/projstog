import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { CEIDG_URL, CONTACT_PAGE, GOOGLE_MAPS_URL } from "@/content/pages/contact";
import { getDictionary } from "@/content/dictionary";
import { SITE } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { isLocale, metadataAlternates } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const copy = CONTACT_PAGE[lang];
  return {
    title: copy.seo.title,
    description: copy.seo.description,
    alternates: metadataAlternates(lang, ["kontakt"]),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const copy = CONTACT_PAGE[lang];
  const t = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: copy.breadcrumbHome, segments: [] },
          { name: t.nav.contact, segments: ["kontakt"] },
        ])}
      />

      <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <h1 className="max-w-[16ch] text-6xl">{copy.h1}</h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-lichen">
          {copy.lead}
        </p>

        {/* Telefon i mail nad formularzem — kto chce zadzwonić, nie powinien
            najpierw przewijać przez cały formularz. */}
        <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-3">
          <div className="bg-obsydian p-6">
            <dt className="text-sm text-lichen">{copy.phoneLabel}</dt>
            <dd className="mt-2">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="hit font-display text-2xl text-bone transition-colors hover:text-voltage"
              >
                {SITE.phone}
              </a>
              <p className="mt-2 text-sm text-lichen">{copy.phoneNote}</p>
            </dd>
          </div>

          <div className="bg-obsydian p-6">
            <dt className="text-sm text-lichen">{copy.emailLabel}</dt>
            <dd className="mt-2">
              <a
                href={`mailto:${SITE.email}`}
                className="hit font-display text-xl break-all text-bone transition-colors hover:text-voltage"
              >
                {SITE.email}
              </a>
              <p className="mt-2 text-sm text-lichen">{copy.emailNote}</p>
            </dd>
          </div>

          <div className="bg-obsydian p-6">
            <dt className="text-sm text-lichen">{copy.hoursLabel}</dt>
            <dd className="mt-2">
              <span className="font-display text-xl text-bone">
                {SITE.hours.opens}–{SITE.hours.closes}
              </span>
              <p className="mt-2 text-sm text-lichen">{copy.hoursNote}</p>
            </dd>
          </div>
        </dl>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
          <section>
            <h2 className="text-3xl">{copy.formHeading}</h2>
            <div className="mt-8">
              <ContactForm locale={lang} />
            </div>
          </section>

          <aside className="space-y-12">
            <section>
              <h2 className="text-2xl">{copy.responseHeading}</h2>
              <ul className="mt-5 space-y-3">
                {copy.responsePoints.map((point) => (
                  <li
                    key={point}
                    className="border-l border-hairline pl-4 text-sm leading-relaxed text-lichen"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl">{copy.locationHeading}</h2>
              <p className="mt-5 text-sm leading-relaxed text-lichen">
                {copy.locationBody}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-lichen">
                {copy.locationTravel}
              </p>

              {/* Zamiast iframe'a Google Maps — link. Osadzona mapa kosztuje
                  LCP i dokłada third-party na stronie, która ma być szybka. */}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hit mt-4 inline-block text-sm font-medium text-voltage underline-offset-4 hover:underline"
              >
                {copy.mapsLinkLabel}
              </a>
            </section>

            {/* Dane rejestrowe — identyczne z CEIDG i JSON-LD (NAP). */}
            <section>
              <h2 className="text-2xl">{copy.companyHeading}</h2>
              <dl className="mt-5 divide-y divide-hairline border-y border-hairline text-sm">
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-lichen">{copy.companyLabels.name}</dt>
                  <dd className="text-right text-bone">{SITE.legalName}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-lichen">{copy.companyLabels.nip}</dt>
                  <dd className="text-right font-mono text-bone">{SITE.nip}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-lichen">{copy.companyLabels.regon}</dt>
                  <dd className="text-right font-mono text-bone">{SITE.regon}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-lichen">{copy.companyLabels.address}</dt>
                  <dd className="text-right text-bone">
                    <address className="not-italic">
                      {SITE.address.street}
                      <br />
                      {SITE.address.postalCode} {SITE.address.city}
                    </address>
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-lichen">
                {copy.companyNote}{" "}
                <a
                  href={CEIDG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hit font-medium text-voltage underline-offset-4 hover:underline"
                >
                  {copy.companyLink} ↗
                </a>
              </p>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
