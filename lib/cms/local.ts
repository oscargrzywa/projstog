/**
 * Lokalne źródło treści — dane trzymane w plikach TypeScript w `content/`.
 *
 * Docelowo do zastąpienia klientem headless CMS. Dopóki treści jest mało
 * i pisze je jedna osoba, pliki w repo są szybsze i tańsze od CMS-a,
 * a typowanie łapie błędy w trakcie builda.
 *
 * Ten moduł jest jedynym miejscem, które wie, skąd naprawdę biorą się dane.
 */

import type {
  CaseStudy,
  CaseStudySummary,
  ContentSource,
  Post,
  PostSummary,
  ServiceCategory,
} from "./types";
import type { Locale } from "@/lib/routes";

import { POSTS } from "@/content/posts";
import { CASE_STUDIES } from "@/content/case-studies";
import { SERVICE_CATEGORIES } from "@/content/services";

/** Średnie tempo czytania po polsku — ~200 słów na minutę. */
function readingMinutes(post: { body: { text?: string; items?: string[] }[] }) {
  const words = post.body
    .map((block) => block.text ?? block.items?.join(" ") ?? "")
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toSummary(post: Post): PostSummary {
  const { body: _body, author: _author, seo: _seo, ...summary } = post;
  return summary;
}

function toCaseSummary(study: CaseStudy): CaseStudySummary {
  const { body: _body, seo: _seo, ...summary } = study;
  return summary;
}

export const localSource: ContentSource = {
  async listPosts(locale: Locale): Promise<PostSummary[]> {
    return POSTS[locale]
      .map((post) => ({ ...post, readingMinutes: readingMinutes(post) }))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .map(toSummary);
  },

  async getPost(locale: Locale, slug: string): Promise<Post | null> {
    const post = POSTS[locale].find((p) => p.slug === slug);
    if (!post) return null;
    return { ...post, readingMinutes: readingMinutes(post) };
  },

  async listCaseStudies(locale: Locale): Promise<CaseStudySummary[]> {
    return [...CASE_STUDIES[locale]]
      .sort((a, b) => a.order - b.order)
      .map(toCaseSummary);
  },

  async getCaseStudy(locale: Locale, slug: string): Promise<CaseStudy | null> {
    return CASE_STUDIES[locale].find((c) => c.slug === slug) ?? null;
  },

  async listServiceCategories(locale: Locale): Promise<ServiceCategory[]> {
    return SERVICE_CATEGORIES[locale];
  },

  async getServiceCategory(
    locale: Locale,
    slug: string
  ): Promise<ServiceCategory | null> {
    return SERVICE_CATEGORIES[locale].find((c) => c.slug === slug) ?? null;
  },
};
