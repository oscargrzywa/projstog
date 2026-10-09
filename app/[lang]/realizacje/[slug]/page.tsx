import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CaseFacts,
  CaseProse,
  CaseStage,
  NextStudy,
} from "@/components/CaseStudy";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/content/site";
import { TODO_MARKER, getPageCopy } from "@/content/pages/blog-page";
import { getCaseStudy, listCaseStudies } from "@/lib/cms";
import { breadcrumbSchema } from "@/lib/schema";
import {
  LOCALES,
  isLocale,
  metadataAlternates,
  publicPath,
  type Locale,
} from "@/lib/routes";

/* Realizacje to zamknięta lista znana w czasie builda. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const byLocale = await Promise.all(
    LOCALES.map(async (lang) => {
      const studies = await listCaseStudies(lang);
      return studies.map((study) => ({ lang, slug: study.slug }));
    })
  );

  return byLocale.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};

  const study = await getCaseStudy(lang, slug);
  if (!study) return {};

  return {
    title: study.seo.title,
    description: study.seo.description,
    alternates: metadataAlternates(lang, ["realizacje", slug]),
    ...(study.seo.noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      title: study.seo.title,
      description: study.seo.description,
      url: publicPath(lang, ["realizacje", slug]),
      locale: lang,
      ...(study.seo.ogImage ? { images: [study.seo.ogImage] } : {}),
    },
  };
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M5 11 11 5M6 5h5v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;
  const [study, all] = await Promise.all([
    getCaseStudy(locale, slug),
    listCaseStudies(locale),
  ]);
  if (!study) notFound();

  const copy = getPageCopy(locale);
  const listHref = publicPath(locale, ["realizacje"]);
  const contactHref = publicPath(locale, ["kontakt"]);

  /* Następna wg `order` (lista przychodzi już posortowana), z zawinięciem
     — po ostatniej wraca pierwsza, więc oglądanie nie kończy się ślepo. */
  const index = all.findIndex((item) => item.slug === study.slug);
  const next = all.length > 1 ? all[(index + 1) % all.length] : null;

  /* Znacznik zostaje na widoku celowo — luka w treści ma być widoczna
     dla właściciela strony, a nie cicho zamieciona pod dywan. */
  const needsCopy =
    study.outcome.includes(TODO_MARKER) ||
    study.body.some(
      (block) =>
        ("text" in block && block.text.includes(TODO_MARKER)) ||
        ("items" in block && block.items.some((i) => i.includes(TODO_MARKER)))
    );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: SITE.name, segments: [] },
          { name: copy.work.title, segments: ["realizacje"] },
          { name: study.name, segments: ["realizacje", study.slug] },
        ])}
      />

      <article>
        {/* ========================================================= nagłówek */}
        <PageHero
          crumbsLabel={copy.work.breadcrumbLabel}
          crumbs={[
            { label: copy.work.breadcrumbHome, href: publicPath(locale, []) },
            { label: copy.work.title, href: listHref },
            { label: study.name },
          ]}
          title={study.name}
          titleClassName="max-w-[16ch]"
          lead={
            <>
              <p>{study.outcome}</p>
              {needsCopy && (
                <p className="mt-5 rounded-md border border-dashed border-hairline px-4 py-2.5 text-xs text-lichen">
                  {copy.work.todoNotice}
                </p>
              )}
            </>
          }
          actions={
            <>
              <a
                href={study.url}
                target="_blank"
                rel="noopener"
                data-magnetic
                className="btn-fill inline-flex items-center gap-2.5 rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
              >
                {copy.work.visitSite}
                <span className="font-display text-xs opacity-80">{study.domain}</span>
                <ExternalIcon />
              </a>
              <Link
                href={contactHref}
                data-magnetic
                className="rounded-full border border-bone-12 px-7 py-3.5 text-sm font-medium text-bone transition-colors duration-250 hover:border-signal"
              >
                {copy.work.cta.button}
              </Link>
            </>
          }
        />

        {/* ============================================================ scena */}
        {study.cover && <CaseStage image={study.cover} domain={study.domain} />}

        {/* ============================================================ treść */}
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-14 px-5 py-20 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:py-28">
          <CaseFacts
            items={[
              { label: copy.work.industry, value: study.industry },
              ...(study.tech.length > 0
                ? [
                    {
                      label: copy.work.tech,
                      value: (
                        <ul className="flex flex-wrap gap-1.5">
                          {study.tech.map((item) => (
                            <li key={item} className="chip font-sans">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ),
                    },
                  ]
                : []),
              {
                label: copy.work.liveAt,
                value: (
                  <a
                    href={study.url}
                    target="_blank"
                    rel="noopener"
                    className="hit inline-flex items-center gap-2.5 transition-colors hover:text-voltage"
                  >
                    <span className="live-dot" aria-hidden="true" />
                    {study.domain}
                    <ExternalIcon />
                  </a>
                ),
              },
            ]}
          />

          <CaseProse blocks={study.body} />
        </div>
      </article>

      {/* ================================================ następna realizacja */}
      {next && (
        <NextStudy
          study={next}
          href={publicPath(locale, ["realizacje", next.slug])}
          heading={copy.work.nextStudy}
          allLabel={copy.work.backToList}
          allHref={listHref}
          moreLabel={copy.work.viewStudy}
          cursorLabel={copy.work.cursorView}
        />
      )}

      <CtaBand
        heading={copy.work.cta.heading}
        lead={copy.work.cta.body}
        primary={{ label: copy.work.cta.button, href: contactHref }}
      />
    </>
  );
}
