import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { WorkFeature } from "@/components/WorkFeature";
import { WorkStack } from "@/components/WorkStack";
import { SITE } from "@/content/site";
import { getPageCopy } from "@/content/pages/blog-page";
import { listCaseStudies } from "@/lib/cms";
import { breadcrumbSchema } from "@/lib/schema";
import { isLocale, metadataAlternates, publicPath } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const copy = getPageCopy(lang);
  const pl = lang === "pl";

  return {
    title: pl
      ? "Realizacje — strony internetowe dla firm z Podkarpacia | PROJSTOG"
      : "Work — websites built for companies in south-eastern Poland | PROJSTOG",
    description: copy.work.lead,
    alternates: metadataAlternates(lang, ["realizacje"]),
    openGraph: {
      type: "website",
      title: copy.work.title,
      description: copy.work.lead,
      url: publicPath(lang, ["realizacje"]),
      locale: lang,
    },
  };
}

export default async function WorkIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const copy = getPageCopy(lang);
  const studies = await listCaseStudies(lang);
  const contactHref = publicPath(lang, ["kontakt"]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: SITE.name, segments: [] },
          { name: copy.work.title, segments: ["realizacje"] },
        ])}
      />

      {/* ============================================================= nagłówek */}
      <PageHero
        crumbsLabel={copy.work.breadcrumbLabel}
        crumbs={[
          { label: copy.work.breadcrumbHome, href: publicPath(lang, []) },
          { label: copy.work.title },
        ]}
        title={copy.work.title}
        lead={<p>{copy.work.lead}</p>}
        actions={
          <Link
            href={contactHref}
            data-magnetic
            className="btn-fill rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
          >
            {copy.work.cta.button}
          </Link>
        }
        aside={studies.length > 0 ? <WorkStack studies={studies} /> : undefined}
      />

      {/* ================================================================ lista */}
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-28 lg:pt-24">
        {studies.length === 0 ? (
          <p className="max-w-[54ch] leading-relaxed text-lichen">
            {copy.work.empty}
          </p>
        ) : (
          <>
            <p className="reveal flex max-w-[60ch] items-start gap-3 text-sm leading-relaxed text-lichen">
              <span className="live-dot mt-2" aria-hidden="true" />
              {copy.work.shotHint}
            </p>

            {/* Duże wiersze zamiast siatki kafelków — zrzut całej strony
                po jednej stronie, konkret po drugiej, naprzemiennie. */}
            <ul className="mt-10 border-t border-hairline">
              {studies.map((study) => (
                <WorkFeature
                  key={study.slug}
                  study={study}
                  href={publicPath(lang, ["realizacje", study.slug])}
                  cursorLabel={copy.work.cursorView}
                  moreLabel={copy.work.viewStudy}
                />
              ))}
            </ul>
          </>
        )}
      </section>

      <CtaBand
        heading={copy.work.cta.heading}
        lead={copy.work.cta.body}
        primary={{ label: copy.work.cta.button, href: contactHref }}
      />
    </>
  );
}
