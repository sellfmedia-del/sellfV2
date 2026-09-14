import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { client } from "@/sanity/lib/client";
import type { HomeBlogPost } from "@/components/HomeTestimonialsBlog";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: isEn
      ? "Sellf Media | Growth, Engineered by Data."
      : "Sellf Media | Büyüme, Veriyle İnşa Edildi.",
    description: isEn
      ? "Sellf is not an Agency. Sellf is your B2B growth engineering partner for sustainability, efficiency, and measurable growth."
      : "Sellf bir Ajans değildir. Sellf; sürdürülebilirlik, verimlilik ve ölçülebilir büyüme için B2B büyüme mühendisliği partnerinizdir.",
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}`,
      languages: {
        tr: "https://www.sellfmedia.com/tr",
        en: "https://www.sellfmedia.com/en",
        "x-default": "https://www.sellfmedia.com/tr",
      },
    },
  };
}

async function getLatestPosts(lang: string): Promise<HomeBlogPost[]> {
  const query = `*[_type == "post"] | order(_createdAt desc)[0...9] {
    _id,
    "title": select($lang == "en" => title_en, title_tr),
    "slug": slug.current,
    "category": categories[0]->title,
    coverImage,
    "createdAt": _createdAt,
    "excerpt": select($lang == "en" => pt::text(content_en), pt::text(content_tr))
  }`;

  try {
    return await client.fetch(query, { lang }, { cache: "no-store" });
  } catch {
    return [];
  }
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentLang = lang === "en" ? "en" : "tr";
  const latestPosts = await getLatestPosts(currentLang);

  return <HomeClient latestPosts={latestPosts} />;
}
