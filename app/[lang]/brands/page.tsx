import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrandsPage from "@/components/BrandsPage";
import { ownBrands } from "@/data/OwnBrands";

const baseUrl = "https://www.sellfmedia.com";
const locales = ["tr", "en"] as const;
type SupportedLang = (typeof locales)[number];
type RouteParams = { lang: string };

const seo = {
  tr: {
    title: "Sellf'in Kendi Markaları ve Yazılımları | Sellf Media",
    description:
      "SellfScale, SellfTask, OtopartTR ve SellfCompete'i keşfedin. Sellf'in yalnızca danışmanlık vermekle kalmayıp kendi yazılım, ürün ve şirketlerini nasıl inşa edip büyüttüğünü görün.",
    ogTitle: "Kendi Markalarımız — Sellf Ekosistemi",
    ogDescription:
      "İnşa ederiz, sahipleniriz, büyütürüz. Sellf'in kendi yazılımları, ürünleri ve şirketlerinden oluşan ekosistemini keşfedin.",
  },
  en: {
    title: "Sellf's Own Brands and Software Products | Sellf Media",
    description:
      "Explore SellfScale, SellfTask, OtopartTR and SellfCompete, and see how Sellf builds, operates and grows its own software products and companies.",
    ogTitle: "Our Own Brands — The Sellf Ecosystem",
    ogDescription:
      "We build, we own, we grow. Explore Sellf's ecosystem of software products, brands and companies.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as SupportedLang)) return {};

  const currentLang = lang as SupportedLang;
  const content = seo[currentLang];
  const canonicalUrl = `${baseUrl}/${currentLang}/brands`;

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${baseUrl}/tr/brands`,
        en: `${baseUrl}/en/brands`,
        "x-default": `${baseUrl}/tr/brands`,
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

export default async function BrandsRoute({ params }: { params: Promise<RouteParams> }) {
  const { lang } = await params;
  if (!locales.includes(lang as SupportedLang)) notFound();

  const currentLang = lang as SupportedLang;
  const canonicalUrl = `${baseUrl}/${currentLang}/brands`;
  const content = seo[currentLang];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
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
        mainEntity: { "@id": `${canonicalUrl}#brands` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#brands`,
        name: currentLang === "tr" ? "Sellf'in Kendi Markaları" : "Sellf's Own Brands",
        numberOfItems: ownBrands.length,
        itemListElement: ownBrands.map((brand, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Brand",
            name: brand.name,
            url: brand.href,
            description: brand.description[currentLang],
          },
        })),
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
            name: currentLang === "tr" ? "Kendi Markalarımız" : "Our Own Brands",
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <BrandsPage lang={currentLang} />
    </>
  );
}
