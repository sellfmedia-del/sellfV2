import type { MetadataRoute } from "next";

const baseUrl = "https://www.sellfmedia.com";
const protectedPaths = ["/api/", "/thank-you"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: protectedPaths,
      },
      // AI crawler'lar için açıkça izin — bazı hosting/CDN varsayılanları
      // bunları farkında olmadan engelleyebiliyor, o yüzden tek tek belirtiyoruz.
      // Genel crawler kuralındaki mevcut exclusions bu özel gruplarda da aynen korunur.
      { userAgent: "GPTBot", allow: "/", disallow: protectedPaths },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: protectedPaths },
      { userAgent: "ChatGPT-User", allow: "/", disallow: protectedPaths },
      { userAgent: "ClaudeBot", allow: "/", disallow: protectedPaths },
      { userAgent: "Claude-SearchBot", allow: "/", disallow: protectedPaths },
      { userAgent: "Claude-User", allow: "/", disallow: protectedPaths },
      { userAgent: "PerplexityBot", allow: "/", disallow: protectedPaths },
      { userAgent: "Perplexity-User", allow: "/", disallow: protectedPaths },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
