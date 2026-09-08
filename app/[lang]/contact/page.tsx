import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: isEn
      ? "Contact Us | Sellf Media — B2B Growth Engineering"
      : "İletişim | Sellf Media — B2B Büyüme Mühendisliği",
    description: isEn
      ? "Reach the Sellf Media team in Istanbul via WhatsApp, email, or in person to discuss your growth engineering needs."
      : "Büyüme mühendisliği ihtiyaçlarınızı konuşmak için İstanbul'daki Sellf Media ekibine WhatsApp, e-posta veya yüz yüze ulaşın.",
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/contact`,
      languages: {
        tr: "https://www.sellfmedia.com/tr/contact",
        en: "https://www.sellfmedia.com/en/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}