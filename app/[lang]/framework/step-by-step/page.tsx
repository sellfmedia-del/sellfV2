import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StepByStepPage from "@/components/StepByStepPage";

const baseUrl = "https://www.sellfmedia.com";
const locales = ["tr", "en"] as const;
type SupportedLang = (typeof locales)[number];
type RouteParams = { lang: string };

const seo = {
  tr: {
    title: "Step by Step Metodolojisi: Başarıya Giden 6 Aşama | Sellf",
    description:
      "Sellf'in Step by Step metodolojisi; Gelişim, Kurulum, Olgunlaşma, Acı Eşiği, Genişleme ve Yıllanma aşamalarıyla kalıcı başarıyı ve sürdürülebilir ilerlemeyi açıklar.",
    ogTitle: "Step by Step — Başarı Bir Sıçrama Değil, Bir Süreçtir | Sellf",
    ogDescription:
      "Kişilerin ve kurumların hedeflerine daha düşük hata payıyla, sürdürülebilir ve kalıcı biçimde ulaşmaları için geliştirilen Sellf başarı metodolojisi.",
    breadcrumb: "Step by Step Metodolojisi",
    definition:
      "Step by Step, kişilerin ve kurumların başarıya daha düşük hata payıyla, sürdürülebilir ve kalıcı biçimde ulaşmasını altı temel gelişim aşaması ve tekrar döngüsü üzerinden açıklayan Sellf metodolojisidir.",
    stageNames: ["Gelişim", "Kurulum", "Olgunlaşma", "Acı Eşiği", "Genişleme", "Yıllanma", "Tekrar"],
    stageDescriptions: [
      "Kişinin, kurucunun veya fikrin kabiliyet, tutku, ihtiyaç ve sürdürülebilirlik eksenlerinde kendini tanıdığı aşama.",
      "Fikrin ekip, paydaş, sürdürülebilirlik modeli ve kurucudan bağımsız sistem yapısıyla temellendirildiği aşama.",
      "İlk sonuçların ve geri bildirimlerin analiz edilerek Reaction before Action ilkesiyle sistemin geliştirildiği aşama.",
      "Sonuç görünmeden önce dayanıklılık, algı ve sürekliliğin sınandığı kaçınılmaz eşik.",
      "Şafak Eşiği sonrasında büyümeyi oluşturan faktörlerin tanımlanıp sistematik hale getirildiği aşama.",
      "Başarı Rehaveti'ne kapılmadan başarıyı koruma, derinleştirme ve daha ileri bir düzeye taşıma aşaması.",
      "Kazanılan tecrübeyle aynı gelişim döngüsünü daha yüksek bir seviyede yeniden başlatma ilkesi.",
    ],
  },
  en: {
    title: "Step by Step Methodology: 6 Stages of Sustainable Success | Sellf",
    description:
      "Sellf's Step by Step methodology explains lasting success through Development, Setup, Maturation, Pain Threshold, Expansion, Aging and the cycle of repetition.",
    ogTitle: "Step by Step — Success Is Not a Leap, It Is a Process | Sellf",
    ogDescription:
      "Sellf's methodology for helping people and organizations reach goals with a lower margin of error and build sustainable, lasting progress.",
    breadcrumb: "Step by Step Methodology",
    definition:
      "Step by Step is Sellf's methodology for explaining how people and organizations reach lasting success with a lower margin of error through six core development stages and a cycle of repetition.",
    stageNames: ["Development", "Setup", "Maturation", "Pain Threshold", "Expansion", "Aging", "Repeat"],
    stageDescriptions: [
      "The stage where a person, founder or idea identifies strengths, passion, external need and a sustainable model.",
      "The stage where the idea is grounded in a team, stakeholders, a sustainability model and a system that can work beyond the founder.",
      "The stage where early outcomes and feedback improve the system through the principle of Reaction before Action.",
      "The unavoidable threshold where endurance, perception and continuity are tested before visible results arrive.",
      "The stage after the Dawn Threshold where the factors creating growth are identified and systematized.",
      "The stage of preserving and extending success without falling into Success Complacency.",
      "The principle of starting the same development cycle again at a higher level using accumulated experience.",
    ],
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as SupportedLang)) return {};
  const currentLang = lang as SupportedLang;
  const content = seo[currentLang];
  const canonicalUrl = `${baseUrl}/${currentLang}/framework/step-by-step`;

  return {
    title: content.title,
    description: content.description,
    keywords: currentLang === "tr"
      ? ["Step by Step metodolojisi", "başarı metodolojisi", "sürdürülebilir başarı", "kişisel gelişim framework", "kurumsal gelişim", "Acı Eşiği", "Şafak Eşiği", "Reaction before Action", "Sellf"]
      : ["Step by Step methodology", "success methodology", "sustainable success", "development framework", "Pain Threshold", "Dawn Threshold", "Reaction before Action", "Sellf"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${baseUrl}/tr/framework/step-by-step`,
        en: `${baseUrl}/en/framework/step-by-step`,
        "x-default": `${baseUrl}/tr/framework/step-by-step`,
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

export default async function StepByStepRoute({ params }: { params: Promise<RouteParams> }) {
  const { lang } = await params;
  if (!locales.includes(lang as SupportedLang)) notFound();

  const currentLang = lang as SupportedLang;
  const content = seo[currentLang];
  const canonicalUrl = `${baseUrl}/${currentLang}/framework/step-by-step`;
  const methodologyId = `${canonicalUrl}#methodology`;

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
        about: { "@id": methodologyId },
        mainEntity: { "@id": methodologyId },
        mentions: [
          { "@id": `${baseUrl}/${currentLang}/framework/bhs#bhs` },
          { "@id": `${baseUrl}/${currentLang}/framework/rgi#rgi` },
          { "@id": `${baseUrl}/${currentLang}/framework/operating-model#operating-model` },
        ],
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          name: "Sellf Media",
          url: baseUrl,
        },
      },
      {
        "@type": "DefinedTerm",
        "@id": methodologyId,
        name: "Step by Step",
        alternateName: currentLang === "tr" ? "Step by Step Metodolojisi" : "Step by Step Methodology",
        description: content.definition,
        url: canonicalUrl,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: currentLang === "tr" ? "Sellf Başarı ve Büyüme Framework'leri" : "Sellf Success and Growth Frameworks",
          url: `${baseUrl}/${currentLang}`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#stages`,
        name: currentLang === "tr" ? "Step by Step aşamaları" : "Step by Step stages",
        numberOfItems: 7,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: content.stageNames.map((name, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          description: content.stageDescriptions[index],
          url: `${canonicalUrl}#${currentLang === "tr"
            ? ["gelisim", "kurulum", "olgunlasma", "aci-esigi", "genisleme", "yillanma", "tekrar"][index]
            : ["development", "setup", "maturation", "pain-threshold", "expansion", "aging", "repeat"][index]}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Sellf Media", item: `${baseUrl}/${currentLang}` },
          {
            "@type": "ListItem",
            position: 2,
            name: currentLang === "tr" ? "Sellf İşletim Sistemi" : "Sellf Operating System",
            item: `${baseUrl}/${currentLang}#operating-system`,
          },
          { "@type": "ListItem", position: 3, name: content.breadcrumb, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <StepByStepPage lang={currentLang} />
    </>
  );
}
