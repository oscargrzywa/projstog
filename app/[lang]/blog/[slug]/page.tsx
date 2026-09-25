import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { RichText } from "@/components/RichText";
import { SITE } from "@/content/site";
import { formatDate, getPageCopy } from "@/content/pages/blog-page";
import { getPost, listPosts } from "@/lib/cms";
import type { PostSummary } from "@/lib/cms/types";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import {
  LOCALES,
  isLocale,
  metadataAlternates,
  publicPath,
  type Locale,
} from "@/lib/routes";

/* Komplet wpisów znany w czasie builda — wszystko inne to 404,
   bez prób renderowania nieistniejących slugów na żądanie. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const byLocale = await Promise.all(
    LOCALES.map(async (lang) => {
      const posts = await listPosts(lang);
      return posts.map((post) => ({ lang, slug: post.slug }));
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

  const post = await getPost(lang, slug);
  if (!post) return {};

  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: metadataAlternates(lang, ["blog", slug]),
    ...(post.seo.noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      title: post.seo.title,
      description: post.seo.description,
      url: publicPath(lang, ["blog", slug]),
      locale: lang,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      ...(post.seo.ogImage ? { images: [post.seo.ogImage] } : {}),
    },
  };
}

/**
 * Dwa–trzy wpisy „obok".
 * Najpierw te dzielące tag z bieżącym (temat ma pierwszeństwo przed datą),
 * potem najnowsze, żeby sekcja nigdy nie została pusta przy jednym tagu.
 */
function relatedPosts(
  posts: PostSummary[],
  current: string,
  tags: string[]
): PostSummary[] {
  const others = posts.filter((post) => post.slug !== current);
  const byTag = others.filter((post) =>
    post.tags.some((tag) => tags.includes(tag))
  );
  const rest = others.filter((post) => !byTag.includes(post));

  return [...byTag, ...rest].slice(0, 3);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;
  const [post, all] = await Promise.all([
    getPost(locale, slug),
    listPosts(locale),
  ]);
  if (!post) notFound();

  const copy = getPageCopy(locale);
  const related = relatedPosts(all, post.slug, post.tags);

  return (
    <>
      <JsonLd
        data={articleSchema(locale, {
          slug: post.slug,
          title: post.title,
          description: post.seo.description,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: SITE.name, segments: [] },
          { name: copy.blog.title, segments: ["blog"] },
          { name: post.title, segments: ["blog", post.slug] },
        ])}
      />

      <article>
        {/* --------------------------------------------------------- nagłówek */}
        <header className="mx-auto max-w-6xl px-5 pt-12 pb-10 lg:pt-16">
          <Link
            href={publicPath(locale, ["blog"])}
            className="text-sm text-lichen underline-offset-4 transition-colors hover:text-voltage hover:underline"
          >
            {copy.blog.backToList}
          </Link>

          <h1 className="mt-6 max-w-[20ch] text-5xl">{post.title}</h1>

          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-lichen">
            {post.excerpt}
          </p>

          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-hairline pt-5 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wide text-lichen">
                {copy.blog.author}
              </dt>
              <dd className="mt-1 text-bone">
                {post.author.name}
                {post.author.role && (
                  <span className="text-lichen"> — {post.author.role}</span>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wide text-lichen">
                {copy.blog.published}
              </dt>
              <dd className="mt-1 text-bone">
                <time dateTime={post.publishedAt}>
                  {formatDate(locale, post.publishedAt)}
                </time>
              </dd>
            </div>

            {post.updatedAt && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-lichen">
                  {copy.blog.updated}
                </dt>
                <dd className="mt-1 text-bone">
                  <time dateTime={post.updatedAt}>
                    {formatDate(locale, post.updatedAt)}
                  </time>
                </dd>
              </div>
            )}

            <div>
              <dt className="text-xs uppercase tracking-wide text-lichen">
                {copy.blog.readingTime}
              </dt>
              <dd className="mt-1 text-bone">{post.readingMinutes}</dd>
            </div>
          </dl>
        </header>

        {/* ------------------------------------------------------------ treść */}
        <div className="border-t border-hairline">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <RichText blocks={post.body} />

            {post.tags.length > 0 && (
              <ul className="mt-14 flex flex-wrap gap-2">
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
          </div>
        </div>
      </article>

      {/* ------------------------------------------------------- inne wpisy */}
      {related.length > 0 && (
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <h2 className="text-2xl">{copy.blog.related}</h2>

            <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={publicPath(locale, ["blog", other.slug])}
                    className="group block py-5"
                  >
                    <span className="font-display text-xl text-bone transition-colors group-hover:text-voltage">
                      {other.title}
                    </span>
                    <span className="mt-1 block text-sm text-lichen">
                      <time dateTime={other.publishedAt}>
                        {formatDate(locale, other.publishedAt)}
                      </time>
                      {" · "}
                      {other.readingMinutes} {copy.blog.readingTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- kontakt */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="max-w-[20ch] text-4xl">{copy.blog.cta.heading}</h2>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-lichen">
            {copy.blog.cta.body}
          </p>
          <Link
            href={publicPath(locale, ["kontakt"])}
            className="mt-8 inline-block rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian"
          >
            {copy.blog.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
