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
import { HomeServices } from "@/components/HomeServices";
import { CaseLocation } from "@/components/CaseLocation";
import { REVIEWS } from "@/content/reviews";
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
      ? "Strony internetowe Rzeszów i cała Polska | PROJSTOG"
      : "Web design in Rzeszów and across Poland | PROJSTOG",
    description: pl
      ? "Strony internetowe i sklepy dla firm z Rzeszowa i całej Polski. Zakres, termin i cenę znasz przed startem, a przez cały projekt masz jeden kontakt."
      : "Websites and online stores for businesses in Rzeszów and across Poland. You know the scope, deadline and price before we start, with one contact throughout.",
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
                className="hit text-bone transition-colors hover:text-voltage"
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
            className="hit reveal text-sm font-medium text-voltage underline-offset-4 hover:underline"
          >
            {t.home.services.all}
          </Link>
        </div>
        <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-lichen">
          {t.home.services.lead}
        </p>

        <HomeServices
          categories={categories}
          scenes={t.home.services.scenes}
          hrefFor={(slug) => publicPath(lang, ["oferta", slug])}
          cursorLabel={cursorViewLabel}
        />
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

      {/* ============================================================ Rzeszów */}
      {/* Główna treść pod frazy lokalne. Podstron miast nie ma (decyzja
          z 2026-09-29), więc to strona główna odpowiada na „strony
          internetowe Rzeszów", nie zawężając oferty: klient to cała Polska.
          NAP z `SITE`, spójny z wizytówką Google. */}
      <section className="mx-auto max-w-6xl px-5 py-28">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]">
          <div>
            <h2 className="mask-reveal max-w-[18ch] text-5xl">
              <span className="mask-reveal__inner">{t.home.local.heading}</span>
            </h2>
            <p className="reveal mt-6 max-w-[58ch] leading-relaxed text-lichen">
              {t.home.local.lead}
            </p>
            <ul className="reveal-stagger mt-12 divide-y divide-hairline border-y border-hairline">
              {t.home.local.points.map((point) => (
                <li
                  key={point.title}
                  className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]"
                >
                  <h3 className="text-xl">{point.title}</h3>
                  <p className="leading-relaxed text-lichen">{point.text}</p>
                </li>
              ))}
            </ul>
            <Link
              href={`${publicPath(lang, ["oferta", "marketing-i-widocznosc"])}#google-moja-firma`}
              className="hit reveal mt-8 inline-block text-sm font-medium text-voltage underline-offset-4 hover:underline"
            >
              {t.home.local.link}
            </Link>
          </div>

          <aside className="reveal rounded-2xl border border-hairline bg-basalt p-6 lg:mt-2 lg:self-start">
            <h3 className="text-xl">{t.home.local.asideHeading}</h3>
            <p className="mt-5 font-display text-bone">{SITE.name}</p>
            <address className="mt-2 leading-relaxed text-lichen not-italic">
              {SITE.address.street}
              <br />
              {SITE.address.postalCode} {SITE.address.city}
            </address>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="hit mt-4 inline-block font-display text-xl whitespace-nowrap text-bone transition-colors hover:text-voltage"
            >
              {SITE.phone}
            </a>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hit mt-5 block text-sm font-medium text-voltage underline-offset-4 hover:underline"
            >
              {t.home.local.maps} ↗
            </a>
          </aside>
        </div>
      </section>

      {/* ============================================================= proces */}
      {/* Makieta „strona buduje się sama". Nagłówek, lead i CTA są tu,
          w HTML-u z SSR; sama makieta to dekoracja (aria-hidden). */}
      <section className="overflow-x-clip border-y border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-28">
          <h2 className="mask-reveal max-w-[18ch] text-5xl">
            <span className="mask-reveal__inner">{t.home.process.heading}</span>
          </h2>
          <p className="reveal mt-5 max-w-[60ch] leading-relaxed text-lichen">
            {t.home.process.lead}
          </p>

          <div className="mt-12">
            <ProcessFilm copy={t.home.process} />
          </div>

          <div className="reveal mt-8 flex justify-center">
            <Link
              href={publicPath(lang, ["kontakt"])}
              data-magnetic
              className="btn-fill rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-bone"
            >
              {t.home.process.cta}
            </Link>
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
            className="hit reveal text-sm font-medium text-voltage underline-offset-4 hover:underline"
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
                className="work-row group grid gap-x-8 gap-y-3 py-8 md:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto]"
              >
                <div>
                  <h3 className="work-row__name text-2xl group-hover:text-voltage">
                    {study.name}
                  </h3>
                  <span className="mt-1.5 flex flex-col items-start gap-1 text-xs text-lichen">
                    {study.industry}
                    <CaseLocation location={study.location} className="text-bone-70" />
                  </span>
                </div>

                {/* Tablet: opis pod nazwą na pełną szerokość, trzy kolumny od lg. */}
                <p className="max-w-[56ch] text-sm leading-relaxed text-lichen md:order-last md:col-span-2 lg:order-none lg:col-span-1">
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

      {/* ============================================================== opinie */}
      {/* Prawdziwe opinie z wizytówki Google, bez `aggregateRating` w JSON-LD
          (powód w lib/schema.ts). Treść po polsku także w wersji EN. */}
      <section className="border-y border-hairline bg-basalt">
        <div className="mx-auto max-w-6xl px-5 py-28">
          <div className="section-head">
            <h2 className="mask-reveal text-5xl">
              <span className="mask-reveal__inner">{t.home.reviews.heading}</span>
            </h2>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hit reveal text-sm font-medium text-voltage underline-offset-4 hover:underline"
            >
              {t.home.reviews.all} ↗
            </a>
          </div>
          <p className="reveal mt-5 max-w-[56ch] leading-relaxed text-lichen">
            {t.home.reviews.lead}
          </p>

          <ul className="reveal mt-14 gap-6 md:columns-2 lg:columns-3">
            {REVIEWS.map((review) => (
              <li
                key={review.name}
                className="mb-6 break-inside-avoid rounded-2xl border border-hairline bg-obsydian p-6"
              >
                <p
                  role="img"
                  aria-label={`${review.stars} ${t.home.reviews.starsLabel}`}
                  className="text-sm tracking-widest text-voltage"
                >
                  {"★".repeat(review.stars)}
                </p>
                <blockquote lang="pl" className="mt-4 leading-relaxed text-bone-70">
                  {review.text}
                </blockquote>
                <p className="mt-4 text-sm font-medium text-bone">{review.name}</p>
              </li>
            ))}
          </ul>
        </div>
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
                className="hit reveal text-sm font-medium text-voltage underline-offset-4 hover:underline"
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
