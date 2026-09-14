import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const metadataCopy = {
  tr: {
    title: "Hakkımızda | Sellf Media — Büyüme Sistemleri ve Pazarlama Standardı",
    description:
      "Sellf Media'nın kuruluş hikâyesini, Growth ve Operasyon modelini, BHS ve RGI ölçüm sistemlerini ve pazarlamanın global standardını oluşturma vizyonunu keşfedin.",
    ogLocale: "tr_TR",
  },
  en: {
    title: "About Us | Sellf Media — Growth Systems and Marketing Standards",
    description:
      "Discover Sellf Media's founding story, Growth and Operations model, BHS and RGI measurement systems, and vision to build a global standard for marketing.",
    ogLocale: "en_US",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "tr";
  const meta = metadataCopy[locale];
  const canonical = "https://www.sellfmedia.com/" + locale + "/about";

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        tr: "https://www.sellfmedia.com/tr/about",
        en: "https://www.sellfmedia.com/en/about",
        "x-default": "https://www.sellfmedia.com/tr/about",
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Sellf Media",
      locale: meta.ogLocale,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang === "en" ? "en" : "tr";
  const isEn = locale === "en";
  const canonical = "https://www.sellfmedia.com/" + locale + "/about";

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": canonical + "#aboutpage",
        url: canonical,
        name: metadataCopy[locale].title,
        description: metadataCopy[locale].description,
        inLanguage: isEn ? "en-US" : "tr-TR",
        isPartOf: {
          "@id": "https://www.sellfmedia.com/#website",
        },
        about: {
          "@id": "https://www.sellfmedia.com/#organization",
        },
        mainEntity: {
          "@id": "https://www.sellfmedia.com/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://www.sellfmedia.com/#organization",
        name: "Sellf Media",
        url: "https://www.sellfmedia.com",
        founder: {
          "@id": "https://www.sellfmedia.com/#yigit-konuk",
        },
        knowsAbout: [
          "Growth strategy",
          "Marketing operations",
          "Performance marketing",
          "BHS",
          "RGI",
          "Step by Step methodology",
          "Sustainable growth",
          "Scalable growth",
          "Marketing efficiency",
        ],
        award: [
          "Best Growth Marketing & Sales Performance Consultancy 2026 — Türkiye",
        ],
      },
      {
        "@type": "Person",
        "@id": "https://www.sellfmedia.com/#yigit-konuk",
        name: "Yiğit Konuk",
        jobTitle: isEn ? "Founder & CEO" : "Kurucu & CEO",
        worksFor: {
          "@id": "https://www.sellfmedia.com/#organization",
        },
        award: [
          "Middle East CEO of the Year 2024",
          "Best Digital Marketing Business Leader",
          "Global Startup Awards Association — Founder of the Year Nominee 2023",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <AboutClient />
    </>
  );
}
