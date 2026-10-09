import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/ContactForm";
import { CopyValue } from "@/components/CopyValue";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CEIDG_URL, CONTACT_PAGE } from "@/content/pages/contact";
import { getDictionary } from "@/content/dictionary";
import { SITE } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { isLocale, metadataAlternates, publicPath } from "@/lib/routes";

import "@/components/contact.css";

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

/** Strzałka w kółku przy klikalnym wierszu karty kontaktu. */
function GoArrow() {
  return (
    <span aria-hidden="true" className="contact-card__go">
      <svg viewBox="0 0 16 16">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  );
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

      {/* ============================================================ nagłówek */}
      {/* Telefon i mail w karcie obok nagłówka — kto chce zadzwonić, nie
          przewija przez formularz. */}
      <PageHero
        crumbs={[
          { label: copy.breadcrumbHome, href: publicPath(lang, []) },
          { label: t.nav.contact },
        ]}
        crumbsLabel={copy.crumbsLabel}
        title={copy.h1}
        lead={copy.lead}
        actions={
          <a
            href="#formularz"
            data-magnetic
            className="btn-fill rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
          >
            {copy.formJump}
          </a>
        }
        aside={
          <div className="contact-card">
            <dl>
              <div className="contact-card__row">
                <dt>{copy.phoneLabel}</dt>
                <dd>
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="contact-card__link font-display text-2xl whitespace-nowrap sm:text-3xl"
                  >
                    {SITE.phone}
                  </a>
                  <p className="contact-card__note">{copy.phoneNote}</p>
                  <GoArrow />
                </dd>
              </div>

              <div className="contact-card__row">
                <dt>{copy.emailLabel}</dt>
                <dd>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="contact-card__link font-display text-xl break-all"
                  >
                    {SITE.email}
                  </a>
                  <p className="contact-card__note">{copy.emailNote}</p>
                  <GoArrow />
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      {/* ========================================================= formularz */}
      <section id="formularz" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-16 lg:py-28">
          <div>
            <h2 className="mask-reveal max-w-[16ch] text-5xl">
              <span className="mask-reveal__inner">{copy.formHeading}</span>
            </h2>
            {/* Opakowanie zmienia tylko wygląd — logika formularza bez zmian. */}
            <div className="contact-form-shell reveal mt-10">
              <ContactForm locale={lang} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start lg:pt-24">
            <h2 className="mask-reveal text-3xl">
              <span className="mask-reveal__inner">{copy.responseHeading}</span>
            </h2>
            <ul className="contact-promises reveal-stagger mt-8">
              {copy.responsePoints.map((point) => (
                <li key={point}>
                  <span aria-hidden="true" className="contact-promises__check">
                    <svg viewBox="0 0 16 16">
                      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
                    </svg>
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ========================================================= dane firmy */}
      <section className="border-y border-hairline bg-basalt">
        <div className="mx-auto max-w-6xl px-5 py-24 lg:py-28">
          {/* Dane rejestrowe — identyczne z CEIDG i JSON-LD (NAP). */}
          <section aria-labelledby="dane-firmy" className="contact-record reveal">
            <div className="contact-record__head">
              <h2 id="dane-firmy" className="text-3xl">
                {copy.companyHeading}
              </h2>
              <p className="text-sm leading-relaxed text-lichen">
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
            </div>

            <dl className="contact-record__grid">
              <div className="contact-record__cell">
                <dt>{copy.companyLabels.name}</dt>
                <dd className="font-display text-xl text-bone">{SITE.legalName}</dd>
              </div>
              <div className="contact-record__cell">
                <dt>{copy.companyLabels.nip}</dt>
                <dd>
                  <span className="font-mono text-lg text-bone tabular">{SITE.nip}</span>
                  <CopyValue
                    value={SITE.nip}
                    label={copy.companyLabels.nip}
                    copyLabel={copy.copyLabel}
                    copiedLabel={copy.copiedLabel}
                  />
                </dd>
              </div>
              <div className="contact-record__cell">
                <dt>{copy.companyLabels.regon}</dt>
                <dd>
                  <span className="font-mono text-lg text-bone tabular">{SITE.regon}</span>
                  <CopyValue
                    value={SITE.regon}
                    label={copy.companyLabels.regon}
                    copyLabel={copy.copyLabel}
                    copiedLabel={copy.copiedLabel}
                  />
                </dd>
              </div>
              <div className="contact-record__cell">
                <dt>{copy.companyLabels.address}</dt>
                <dd>
                  <address className="not-italic leading-relaxed text-bone">
                    {SITE.address.street}
                    <br />
                    {SITE.address.postalCode} {SITE.address.city}
                  </address>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </section>
    </>
  );
}
