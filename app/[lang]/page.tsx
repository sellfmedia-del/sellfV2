import type { Metadata } from "next";
import HomeClient from "./HomeClient";

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

export default function HomePage() {
  return <HomeClient />;
}