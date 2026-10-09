import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/content/site";
import { formatDate, getPageCopy } from "@/content/pages/blog-page";
import { listPosts } from "@/lib/cms";
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
      ? "Blog — strony internetowe, SEO lokalne, automatyzacje | PROJSTOG"
      : "Blog — websites, local SEO and automation | PROJSTOG",
    description: copy.blog.lead,
    alternates: metadataAlternates(lang, ["blog"]),
    openGraph: {
      type: "website",
      title: copy.blog.title,
      description: copy.blog.lead,
      url: publicPath(lang, ["blog"]),
      locale: lang,
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const copy = getPageCopy(lang);
  /* Źródło zwraca listę już posortowaną malejąco po dacie publikacji. */
  const posts = await listPosts(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(lang, [
          { name: SITE.name, segments: [] },
          { name: copy.blog.title, segments: ["blog"] },
        ])}
      />

      <PageHero
        crumbsLabel={copy.blog.breadcrumbLabel}
        crumbs={[
          { label: copy.blog.breadcrumbHome, href: publicPath(lang, []) },
          { label: copy.blog.title },
        ]}
        title={copy.blog.title}
        lead={<p>{copy.blog.lead}</p>}
      />

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16">
          {posts.length === 0 ? (
            <p className="reveal flex max-w-[54ch] items-center gap-3 leading-relaxed text-lichen">
              <span className="live-dot" aria-hidden="true" />
              {copy.blog.empty}
            </p>
          ) : (
            /* Lista, nie siatka kart: wpisy różnią się długością tytułu
               i zajawki, a hairline'y czytają się lepiej niż kafelki. */
            <ul className="divide-y divide-hairline border-y border-hairline">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={publicPath(lang, ["blog", post.slug])}
                    className="group block py-8"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-lichen">
                      <time dateTime={post.publishedAt}>
                        {formatDate(lang, post.publishedAt)}
                      </time>
                      <span aria-hidden="true" className="opacity-40">
                        /
                      </span>
                      <span>
                        {post.readingMinutes} {copy.blog.readingTime}
                      </span>
                    </div>

                    <h2 className="mt-3 max-w-[24ch] text-3xl transition-colors group-hover:text-voltage">
                      {post.title}
                    </h2>

                    <p className="mt-3 max-w-[62ch] leading-relaxed text-lichen">
                      {post.excerpt}
                    </p>

                    {post.tags.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-sm border border-hairline px-2 py-0.5 text-xs text-lichen"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
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
