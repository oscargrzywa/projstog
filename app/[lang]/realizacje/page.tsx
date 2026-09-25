import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
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

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: SITE.name, segments: [] },
          { name: copy.work.title, segments: ["realizacje"] },
        ])}
      />

      <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 lg:pt-24">
        <h1 className="text-6xl">{copy.work.title}</h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-lichen">
          {copy.work.lead}
        </p>
      </section>

      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-12">
          {studies.length === 0 ? (
            <p className="max-w-[54ch] leading-relaxed text-lichen">
              {copy.work.empty}
            </p>
          ) : (
            <ul className="divide-y divide-hairline border-y border-hairline">
              {studies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={publicPath(lang, ["realizacje", study.slug])}
                    className="group block py-8"
                  >
                    {/* Dwie kolumny od md: po lewej tożsamość klienta,
                        po prawej to, po co strona powstała. */}
                    <div className="grid gap-x-10 gap-y-4 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
                      <div>
                        <h2 className="text-3xl transition-colors group-hover:text-voltage">
                          {study.name}
                        </h2>
                        <p className="mt-2 text-sm text-lichen">
                          {study.industry}
                        </p>
                        <p className="mt-1 font-mono text-xs text-lichen opacity-70">
                          {study.domain}
                        </p>
                      </div>

                      <div>
                        <p className="max-w-[62ch] leading-relaxed text-bone/85">
                          {study.outcome}
                        </p>

                        {study.tech.length > 0 && (
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {study.tech.map((item) => (
                              <li
                                key={item}
                                className="rounded-sm border border-hairline px-2 py-0.5 text-xs text-lichen"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
