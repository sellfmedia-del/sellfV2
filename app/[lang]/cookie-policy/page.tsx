import type { Metadata } from "next";
import CookiePolicyClient from "./CookiePolicyClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: isEn
      ? "Cookie Policy | Sellf Media"
      : "Çerez Politikası | Sellf Media",
    description: isEn
      ? "Learn about the types of cookies used on sellfmedia.com and how to manage them."
      : "sellfmedia.com üzerinde kullanılan çerez türleri ve bunları nasıl yöneteceğiniz hakkında bilgi alın.",
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/cookie-policy`,
      languages: {
        tr: "https://www.sellfmedia.com/tr/cookie-policy",
        en: "https://www.sellfmedia.com/en/cookie-policy",
      },
    },
  };
}

export default function CookiePolicyPage() {
  return <CookiePolicyClient />;
}