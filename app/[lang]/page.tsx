import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/content/dictionary";
import { LiquidField } from "@/components/LiquidField";
import { HeroLens } from "@/components/HeroLens";
import { CodeField } from "@/components/CodeField";
import { StackWipe } from "@/components/StackWipe";
import { ProcessFilm } from "@/components/ProcessFilm";
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

  const [categories, work, posts] = await Promise.all([
    listServiceCategories(lang),
    listCaseStudies(lang),
    listPosts(lang),
  ]);

  const latestPosts = posts.slice(0, 3);
  /* Etykieta kursora nad wierszem realizacji (czyta ją components/Cursor). */
  const cursorViewLabel = lang === "pl" ? "Zobacz" : "View";
  const dateFormat = new Intl.DateTimeFormat(lang === "pl" ? "pl-PL" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <JsonLd data={personSchema(lang)} />

      {/* =============================================================== hero */}
      <section
        data-cursor="lens"
        data-nav-overlay
        className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden border-b border-hairline pt-20"
      >
        {/* Kod pisany w tle (canvas — zero tekstu w HTML-u). Wrapper niesie
            parallax, bo komponent sam nie przyjmuje klas. */}
        <div className="parallax-recede absolute inset-0 -z-10" aria-hidden="true">
          <CodeField />
        </div>
        {/* Nad siatką, pod treścią. `.aurora` zostaje jako rezerwa bez WebGL. */}
        <LiquidField />
        <div className="aurora parallax-drift" aria-hidden="true" />

        {/* Wyrównanie do LEWEJ. Na 17 przebadanych stronach studiów ani jedno
            hero nie było wyśrodkowane — środkowanie czyta się jak szablon.
            Kolejność też stamtąd: mały tekst PRZED wielkim nagłówkiem.
            Wejście: `.enter` z indeksem `--i` (stagger w CSS). H1 dostaje
            `.enter-emerge` — bez opacity 0, bo to kandydat LCP. */}
        <div className="mx-auto w-full max-w-6xl px-5 py-20 lg:py-24">
          <p
            className="enter flex items-center gap-2.5 text-sm text-bone-45"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-voltage"
              aria-hidden="true"
            />
            {t.home.badge}
          </p>

          {/* Nagłówek z soczewką „pod wodą" — h1 nadal renderuje się
              serwerowo, soczewka to dekoracyjna kopia (HeroLens). */}
          <HeroLens
            text={t.home.h1}
            className="enter-emerge mt-8"
            headingClassName="hero-title max-w-[14ch]"
            style={{ "--i": 1 } as React.CSSProperties}
          />

          <p
            className="enter lead mt-10 max-w-[52ch] text-lg leading-[1.5] text-bone-70"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {t.home.lead}
          </p>

          {/* `.enter` na kontenerze, nie na przyciskach — animacja z fill
              `both` trzymałaby `transform` przycisku i blokowała efekt
              magnetyczny, który steruje tą samą właściwością. */}
          <div
            className="enter mt-12 flex flex-wrap items-center gap-x-4 gap-y-3"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <Link
              href={publicPath(lang, ["kontakt"])}
              data-magnetic
              className="btn-fill rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
            >
              {t.home.ctaPrimary}
            </Link>
            <Link
              href={publicPath(lang, ["realizacje"])}
              data-magnetic
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
        </div>
      </section>

      {/* Przejście przy zjeździe z hero: warstwy „budującej się" strony + dym. */}
      <StackWipe />

      {/* ============================================================= usługi */}
      <section className="mx-auto max-w-6xl px-5 py-28">
        <div className="section-head">
          <h2 className="mask-reveal text-5xl">
            <span className="mask-reveal__inner">{t.home.services.heading}</span>
          </h2>
          <Link
            href={publicPath(lang, ["oferta"])}
            className="reveal text-sm font-medium text-voltage underline-offset-4 hover:underline"
          >
            {t.home.services.all}
          </Link>
        </div>
        <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-lichen">
          {t.home.services.lead}
        </p>

        <div className="reveal-stagger mt-14 grid gap-5 md:grid-cols-2">
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
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-2">
            <div>
              <h2 className="mask-reveal max-w-[16ch] text-5xl">
                <span className="mask-reveal__inner">
                  {t.home.notAgency.heading}
                </span>
              </h2>
              <p className="reveal mt-6 max-w-[56ch] leading-relaxed text-lichen">
                {t.home.notAgency.lead}
              </p>
            </div>
            <div className="lg:pt-2">
              <p className="reveal max-w-[24ch] font-display text-3xl text-voltage">
                {t.home.notAgency.punchline}
              </p>
              <p className="reveal mt-6 max-w-[58ch] leading-relaxed text-lichen">
                {t.home.notAgency.detail}
              </p>
            </div>
          </div>


        </div>
      </section>

      {/* ============================================================= proces */}
      {/* Film „od briefu do klienta". Tytuły i opisy rozdziałów lecą do
          HTML-u z SSR (lista <ol> w ProcessFilm), makieta jest dekoracją. */}
      <section className="overflow-x-clip border-y border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-28">
          <h2 className="mask-reveal max-w-[18ch] text-5xl">
            <span className="mask-reveal__inner">{t.home.process.heading}</span>
          </h2>
          <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-lichen">
            {t.home.process.lead}
          </p>

          <div className="mt-14">
            <ProcessFilm copy={t.home.process} />
          </div>
        </div>
      </section>

      {/* ========================================================= realizacje */}
      <section className="mx-auto max-w-6xl px-5 py-28">
        <div className="section-head">
          <h2 className="mask-reveal text-5xl">
            <span className="mask-reveal__inner">{t.home.work.heading}</span>
          </h2>
          <Link
            href={publicPath(lang, ["realizacje"])}
            className="reveal text-sm font-medium text-voltage underline-offset-4 hover:underline"
          >
            {t.home.work.all}
          </Link>
        </div>
        <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-lichen">
          {t.home.work.lead}
        </p>

        {/* Lista, nie siatka kart — każdy wiersz niesie nazwę, branżę,
            efekt i stack, więc czyta się jak spis dokonań, a nie jak
            kolejna galeria kafelków. */}
        <ul className="mt-14 divide-y divide-hairline border-y border-hairline">
          {work.map((study) => (
            <li key={study.slug} className="reveal">
              <Link
                href={publicPath(lang, ["realizacje", study.slug])}
                data-cursor="view"
                data-cursor-label={cursorViewLabel}
                className="work-row group grid gap-x-8 gap-y-3 py-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto]"
              >
                <div>
                  <h3 className="work-row__name text-2xl group-hover:text-voltage">
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
              <h2 className="mask-reveal text-5xl">
                <span className="mask-reveal__inner">{t.home.blog.heading}</span>
              </h2>
              <Link
                href={publicPath(lang, ["blog"])}
                className="reveal text-sm font-medium text-voltage underline-offset-4 hover:underline"
              >
                {t.home.blog.all}
              </Link>
            </div>
            <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-lichen">
              {t.home.blog.lead}
            </p>

            <div className="reveal-stagger mt-14 grid gap-8 md:grid-cols-3">
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
          <h2 className="mask-reveal text-6xl">
            <span className="mask-reveal__inner">{t.home.contact.heading}</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-[54ch] leading-relaxed text-lichen">
            {t.home.contact.lead}
          </p>

          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={publicPath(lang, ["kontakt"])}
              data-magnetic
              className="btn-fill rounded-md bg-signal px-6 py-3.5 text-sm font-medium text-bone"
            >
              {t.home.contact.cta}
            </Link>
            <a
              href={`tel:${SITE.phoneRaw}`}
              data-magnetic
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
