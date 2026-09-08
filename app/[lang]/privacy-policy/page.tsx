import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: isEn
      ? "Privacy Policy | Sellf Media"
      : "Gizlilik Politikası | Sellf Media",
    description: isEn
      ? "How Sellf Media processes, protects, and shares your personal data."
      : "Sellf Media'nın kişisel verilerinizi nasıl işlediği, koruduğu ve paylaştığı hakkında bilgi alın.",
    alternates: {
      canonical: `https://www.sellfmedia.com/${lang}/privacy-policy`,
      languages: {
        tr: "https://www.sellfmedia.com/tr/privacy-policy",
        en: "https://www.sellfmedia.com/en/privacy-policy",
      },
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}