import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: isEn
      ? "About Us | Sellf Media — B2B Growth Engineering"
      : "Hakkımızda | Sellf Media — B2B Büyüme Mühendisliği",
    description: isEn
      ? "Sellf Media is a growth engineering partner for enterprise and C-level decision makers, combining digital marketing, data, and technical execution."
      : "Sellf Media, üst düzey karar vericiler ve C-Level yöneticiler için dijital pazarlamayı, veriyi ve teknik uygulamayı bir araya getiren bir büyüme mühendisliği ortağıdır.",
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/about`,
      languages: {
        tr: "https://www.sellfmedia.com/tr/about",
        en: "https://www.sellfmedia.com/en/about",
      },
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}