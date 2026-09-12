import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OperatingModelPage from "@/components/OperatingModelPage";

const baseUrl = "https://www.sellfmedia.com";
const locales = ["tr", "en"] as const;
type SupportedLang = (typeof locales)[number];
type RouteParams = { lang: string };

const seo = {
  tr: {
    title: "Büyüme ve Operasyon: Sellf İşletim Modeli | Sellf",
    description:
      "Sellf'in Büyüme ve Operasyon ekiplerinin hedeflerden BHS ve RGI takibine, yol haritasından uygulama ve sürekli denetime kadar birlikte nasıl çalıştığını keşfedin.",
    ogTitle: "Büyüme ve Operasyon — Sellf İşletim Modeli",
    ogDescription:
      "Marka hedefi belirler. Sellf rotayı kurar. Büyüme yönü ve sorumluluğu, Operasyon ise uygulamayı üstlenir.",
    breadcrumb: "Büyüme ve Operasyon",
  },
  en: {
    title: "Growth & Operations: Sellf Operating Model | Sellf Media",
    description:
      "Explore how Sellf's Growth and Operations teams work together from objectives and BHS to RGI, the strategic roadmap, execution and continuous governance.",
    ogTitle: "Growth & Operations — Sellf Operating Model",
    ogDescription:
      "The brand defines the goal. Sellf builds the route. Growth owns direction and accountability; Operations owns execution.",
    breadcrumb: "Growth & Operations",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as SupportedLang)) return {};

  const currentLang = lang as SupportedLang;
  const canonicalUrl = `${baseUrl}/${currentLang}/framework/operating-model`;
  const content = seo[currentLang];

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${baseUrl}/tr/framework/operating-model`,
        en: `${baseUrl}/en/framework/operating-model`,
        "x-default": `${baseUrl}/tr/framework/operating-model`,
      },
    },
    openGraph: {
      title: content.ogTitle,
      description: content.ogDescription,
      url: canonicalUrl,
      siteName: "Sellf Media",
      locale: currentLang === "tr" ? "tr_TR" : "en_US",
      alternateLocale: currentLang === "tr" ? ["en_US"] : ["tr_TR"],
      type: "website",
    },
  };
}

export default async function OperatingModelRoute({ params }: { params: Promise<RouteParams> }) {
  const { lang } = await params;
  if (!locales.includes(lang as SupportedLang)) notFound();

  const currentLang = lang as SupportedLang;
  const canonicalUrl = `${baseUrl}/${currentLang}/framework/operating-model`;
  const content = seo[currentLang];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: content.title,
        description: content.description,
        inLanguage: currentLang,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          name: "Sellf Media",
          url: baseUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Sellf Media",
            item: `${baseUrl}/${currentLang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: currentLang === "tr" ? "Sellf İşletim Sistemi" : "Sellf Operating System",
            item: `${baseUrl}/${currentLang}#operating-system`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content.breadcrumb,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <OperatingModelPage lang={currentLang} />
    </>
  );
}
