import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { solutionSlugs } from "@/data/SolutionIndex";

const baseUrl = "https://www.sellfmedia.com";
const locales = ["tr", "en"] as const;

// Statik sayfalar — sabit route'lar, her iki dil için de üretilecek.
// "thank-you" bilerek dışarıda bırakıldı: bu bir dönüşüm-sonrası sayfası,
// arama sonuçlarında görünmesi anlamlı değil.
const staticPaths = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/cookie-policy",
];

type BlogSlugEntry = { slug: string; updatedAt: string };

async function getBlogSlugs(): Promise<BlogSlugEntry[]> {
  try {
    const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, "updatedAt": coalesce(_updatedAt, _createdAt) }`;
    const posts = await client.fetch(query, {}, { cache: "no-store" });
    return (posts || []).filter((p: { slug: string }) => Boolean(p.slug));
  } catch (error) {
    // Sanity'e erişilemezse sitemap yine de statik sayfalarla üretilmeye devam etsin —
    // sitemap'in tamamen çökmesindense eksik ama çalışan bir sitemap daha iyi.
    console.error("sitemap.ts: blog slug fetch başarısız oldu", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
  }

  // Solution detail sayfaları statik veri kaynağından gelir.
  // Blog/Sanity mantığını değiştirmeden her iki dilde sitemap'e eklenir.
  for (const locale of locales) {
    for (const slug of solutionSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  const blogSlugs = await getBlogSlugs();
  for (const locale of locales) {
    for (const { slug, updatedAt } of blogSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(updatedAt),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
