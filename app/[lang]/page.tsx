import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/content/dictionary";
import { ABOUT_PAGE } from "@/content/pages/about";
import { BASE_CITY, PUBLISHED_CITIES, CITIES } from "@/content/cities";
import { SITE } from "@/content/site";
import { listServiceCategories, listCaseStudies, listPosts } from "@/lib/cms";
import { personSchema } from "@/lib/schema";
import { isLocale, metadataAlternates, publicPath } from "@/lib/routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const pl = lang === "pl";
  return {
    title: pl
      ? "Strony internetowe Mielec i Podkarpacie — PROJSTOG"
      : "Web design in Mielec and south-eastern Poland — PROJSTOG",
    description: pl
      ? "Strony internetowe, sklepy i automatyzacje AI dla firm z Mielca, Rzeszowa, Dębicy i całego Podkarpacia. Robi je jedna osoba — od rozmowy po wsparcie po wdrożeniu."
      : "Websites, online stores and AI automation for companies in Mielec, Rzeszów, Dębica and the wider region. Built by one person, start to finish.",
    alternates: metadataAlternates(lang, []),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);
  const about = ABOUT_PAGE[lang];

  const [categories, work, posts] = await Promise.all([
    listServiceCategories(lang),
    listCaseStudies(lang),
    listPosts(lang),
  ]);

  const latestPosts = posts.slice(0, 3);
  const dateFormat = new Intl.DateTimeFormat(lang === "pl" ? "pl-PL" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <JsonLd data={personSchema(lang)} />

      {/* =============================================================== hero */}
      <section className="relative isolate overflow-hidden border-b border-hairline">
        <div className="grid-texture" aria-hidden="true" />
        <div className="aurora" aria-hidden="true" />

        {/* Wyrównanie do LEWEJ. Na 17 przebadanych stronach studiów ani jedno
            hero nie było wyśrodkowane — środkowanie czyta się jak szablon.
            Kolejność też stamtąd: mały tekst PRZED wielkim nagłówkiem. */}
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-24 lg:pt-32 lg:pb-32">
          <p className="flex items-center gap-2.5 text-sm text-bone-45">
            <span
              className="h-1.5 w-1.5 rounded-full bg-voltage"
              aria-hidden="true"
            />
            {t.home.badge}
          </p>

          <h1 className="mt-8 max-w-[15ch] text-7xl">{t.home.h1}</h1>

          <p className="lead mt-10 max-w-[52ch] text-lg leading-[1.5] text-bone-70">
            {t.home.lead}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Link
              href={publicPath(lang, ["kontakt"])}
              className="rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone transition-colors duration-250 ease-[var(--ease-out-quart)] hover:bg-voltage hover:text-obsydian"
            >
              {t.home.ctaPrimary}
            </Link>
            <Link
              href={publicPath(lang, ["realizacje"])}
              className="rounded-full border border-bone-12 px-7 py-3.5 text-sm font-medium text-bone transition-colors duration-250 ease-[var(--ease-out-quart)] hover:border-signal"
            >
              {t.home.ctaSecondary}
            </Link>

            <span className="text-sm text-bone-45">
              {t.home.orCall}{" "}
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="text-bone transition-colors hover:text-voltage"
              >
                {SITE.phone}
              </a>
            </span>
          </div>

          {/* Meta jako wiersz tekstu, nie pudełko ze statystykami.
              Licznik „lat doświadczenia" w czterech kolumnach z ikonkami
              nie pojawił się na żadnej z przebadanych stron. */}
          <dl className="mt-20 flex flex-wrap gap-x-12 gap-y-4 border-t border-bone-12 pt-8 text-sm">
            <div className="flex gap-2">
              <dt className="text-bone-45">{t.home.stats.sinceLabel}</dt>
              <dd className="tabular text-bone">{SITE.foundedYear}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-bone-45">{t.home.stats.baseLabel}</dt>
              <dd className="text-bone">{BASE_CITY.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-bone-45">{t.home.stats.replyLabel}</dt>
              <dd className="text-bone">{t.home.stats.replyValue}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ============================================================= usługi */}
      <section className="mx-auto max-w-6xl px-5 py-28">
        <div className="section-head">
          <h2 className="text-5xl">{t.home.services.heading}</h2>
          <Link
            href={publicPath(lang, ["oferta"])}
            className="text-sm font-medium text-voltage underline-offset-4 hover:underline"
          >
            {t.home.services.all}
          </Link>
        </div>
        <p className="mt-5 max-w-[56ch] leading-relaxed text-lichen">
          {t.home.services.lead}
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={publicPath(lang, ["oferta", category.slug])}
              className="panel flex flex-col"
            >
              <h3 className="text-3xl">{category.title}</h3>
              <p className="mt-4 max-w-[50ch] text-sm leading-[1.6] text-bone-70">
                {category.lead}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {category.services.map((service) => (
                  <li key={service.slug} className="chip">
                    {service.title}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================= nie agencja */}
      <section className="border-y border-hairline bg-basalt">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <div>
              <h2 className="max-w-[16ch] text-5xl">
                {t.home.notAgency.heading}
              </h2>
              <p className="mt-6 max-w-[56ch] leading-relaxed text-lichen">
                {t.home.notAgency.lead}
              </p>
              <p className="mt-8 max-w-[24ch] font-display text-3xl text-voltage">
                {t.home.notAgency.punchline}
              </p>
              <p className="mt-6 max-w-[58ch] leading-relaxed text-lichen">
                {t.home.notAgency.detail}
              </p>
            </div>

            {/* Skąd naprawdę są firmy rankujące na podkarpackie frazy. */}
            <ul className="divide-y divide-hairline self-start rounded-lg border border-hairline">
              {about.competitorOrigins.map((origin) => (
                <li
                  key={origin.city}
                  className="flex items-baseline justify-between gap-4 px-5 py-4"
                >
                  <span className="font-display text-lg text-bone">
                    {origin.city}
                  </span>
                  <span className="text-right text-xs text-lichen">
                    {origin.distance}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================== lokalizacje (hub SEO) */}
      <section className="mx-auto max-w-6xl px-5 py-28">
        <div className="section-head">
          <h2 className="text-5xl">{t.home.local.heading}</h2>
          <Link
            href={publicPath(lang, ["strony-internetowe"])}
            className="text-sm font-medium text-voltage underline-offset-4 hover:underline"
          >
            {t.home.local.all}
          </Link>
        </div>
        <p className="mt-5 max-w-[56ch] leading-relaxed text-lichen">
          {t.home.local.lead}
        </p>

        {/* Miasta z gotową podstroną są linkami — to hub linkowania
            wewnętrznego. Pozostałe tylko jako tekst, bo nie mają jeszcze
            własnej strony i link prowadziłby na 404. */}
        <ul className="mt-12 flex flex-wrap gap-2.5">
          {PUBLISHED_CITIES.map((city) => (
            <li key={city.slug}>
              <Link
                href={publicPath(lang, ["strony-internetowe", city.slug])}
                className="inline-block rounded-full border border-bone-12 px-4 py-2 text-sm text-bone transition-colors duration-250 ease-[var(--ease-out-quart)] hover:border-signal hover:text-voltage"
              >
                {city.name}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-lichen">
          {CITIES.filter((c) => !PUBLISHED_CITIES.includes(c))
            .map((c) => c.name)
            .join(", ")}
          .
        </p>
      </section>

      {/* ============================================================= proces */}
      <section className="border-y border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-5xl">{t.home.process.heading}</h2>

          {/* Numeracja jest tu uzasadniona — to faktyczna kolejność etapów. */}
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.process.steps.map((step, index) => (
              <li key={step.title} className="border-t border-hairline pt-5">
                <span className="font-display text-sm text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-lichen">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ========================================================= realizacje */}
      <section className="mx-auto max-w-6xl px-5 py-28">
        <div className="section-head">
          <h2 className="text-5xl">{t.home.work.heading}</h2>
          <Link
            href={publicPath(lang, ["realizacje"])}
            className="text-sm font-medium text-voltage underline-offset-4 hover:underline"
          >
            {t.home.work.all}
          </Link>
        </div>
        <p className="mt-5 max-w-[56ch] leading-relaxed text-lichen">
          {t.home.work.lead}
        </p>

        {/* Lista, nie siatka kart — każdy wiersz niesie nazwę, branżę,
            efekt i stack, więc czyta się jak spis dokonań, a nie jak
            kolejna galeria kafelków. */}
        <ul className="mt-14 divide-y divide-hairline border-y border-hairline">
          {work.map((study) => (
            <li key={study.slug}>
              <Link
                href={publicPath(lang, ["realizacje", study.slug])}
                className="group grid gap-x-8 gap-y-3 py-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto]"
              >
                <div>
                  <h3 className="text-2xl transition-colors group-hover:text-voltage">
                    {study.name}
                  </h3>
                  <span className="mt-1 block text-xs text-lichen">
                    {study.industry}
                  </span>
                </div>

                <p className="max-w-[56ch] text-sm leading-relaxed text-lichen">
                  {study.outcome}
                </p>

                <div className="flex flex-col items-start gap-2 md:items-end">
                  <span className="font-display text-sm text-bone transition-colors group-hover:text-voltage">
                    {study.domain}
                  </span>
                  <ul className="flex flex-wrap gap-1.5 md:justify-end">
                    {study.tech.slice(0, 3).map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* =============================================================== blog */}
      {latestPosts.length > 0 && (
        <section className="border-y border-hairline bg-basalt">
          <div className="mx-auto max-w-6xl px-5 py-28">
            <div className="section-head">
              <h2 className="text-5xl">{t.home.blog.heading}</h2>
              <Link
                href={publicPath(lang, ["blog"])}
                className="text-sm font-medium text-voltage underline-offset-4 hover:underline"
              >
                {t.home.blog.all}
              </Link>
            </div>
            <p className="mt-5 max-w-[56ch] leading-relaxed text-lichen">
              {t.home.blog.lead}
            </p>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={publicPath(lang, ["blog", post.slug])}
                  className="group border-t border-hairline pt-5 transition-colors hover:border-signal"
                >
                  <time
                    dateTime={post.publishedAt}
                    className="text-xs text-lichen"
                  >
                    {dateFormat.format(new Date(post.publishedAt))}
                  </time>
                  <h3 className="mt-2 text-xl transition-colors group-hover:text-voltage">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-lichen">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ kontakt */}
      <section className="relative isolate overflow-hidden">
        <div className="aurora" aria-hidden="true" />
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h2 className="text-6xl">{t.home.contact.heading}</h2>
          <p className="mx-auto mt-6 max-w-[54ch] leading-relaxed text-lichen">
            {t.home.contact.lead}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={publicPath(lang, ["kontakt"])}
              className="rounded-md bg-signal px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
            >
              {t.home.contact.cta}
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="rounded-md border border-hairline px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:border-signal"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
