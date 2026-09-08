import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const dict = {
  tr: {
    back: "← İçeriklere Dön",
    published: "Yayınlanma tarihi:",
    notFound: "Makale bulunamadı.",
    noContent: "Bu makale için henüz içerik girilmemiş.",
    metaSuffix: "Sellf Media Büyüme Blogu",
    relatedTitle: "İlgili Yazılar"
  },
  en: {
    back: "← Back to Insights",
    published: "Published on",
    notFound: "Article not found.",
    noContent: "No content available for this article.",
    metaSuffix: "Sellf Media Growth Blog",
    relatedTitle: "Related Insights"
  }
};

// 1. Sorgu Güncellendi: 'lang' ve 'slug' alıyor
async function getPost(slug: string, lang: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "title": select($lang == "en" => title_en, title_tr),
    "content": select($lang == "en" => content_en, content_tr),
    "category": categories[0]->title,
    "categoryRefs": categories[]->_id,
    coverImage,
    _createdAt,
    _updatedAt
  }`
  
  const data = await client.fetch(query, { slug, lang }, { cache: 'no-store' })
  return data
}

// İlgili Yazılar: önce aynı kategoriden, yetmezse en yeni yazılarla tamamlanır.
// Amaç: her yazının site içinde en az 3-4 farklı sayfadan (birbirinden) link alması —
// tek giriş noktası (sadece /blog listeleme sayfası) olmaktan çıkarmak.
async function getRelatedPosts(slug: string, lang: string, categoryRefs: string[]) {
  const query = `
    *[_type == "post" && slug.current != $slug && count((categories[]->_id)[@ in $categoryRefs]) > 0]
      | order(_createdAt desc) [0...3] {
      "title": select($lang == "en" => title_en, title_tr),
      "slug": slug.current,
      coverImage
    }
  `
  const related = await client.fetch(query, { slug, lang, categoryRefs: categoryRefs || [] }, { cache: 'no-store' })

  if (related.length >= 3) return related

  // Aynı kategoriden 3'ten az çıktıysa, en yeni yazılarla tamamla (tekrar etmeden)
  const fallbackQuery = `
    *[_type == "post" && slug.current != $slug && !(slug.current in $exclude)]
      | order(_createdAt desc) [0...${3 - related.length}] {
      "title": select($lang == "en" => title_en, title_tr),
      "slug": slug.current,
      coverImage
    }
  `
  const exclude = related.map((p: { slug: string }) => p.slug)
  const fallback = await client.fetch(fallbackQuery, { slug, lang, exclude }, { cache: 'no-store' })

  return [...related, ...fallback]
}

// Google başlığı ~60 karakterde kesiyor. H1'e (post.title) dokunmuyoruz —
// sadece arama sonucunda görünen <title> etiketini kelime sınırında kısaltıyoruz.
function truncateTitle(title: string, suffix: string, maxLength = 60): string {
  const full = `${title} | ${suffix}`;
  if (full.length <= maxLength) return full;

  const budget = maxLength - suffix.length - 3; // " | " için pay
  const cut = title.slice(0, budget);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;

  return `${trimmed}… | ${suffix}`;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const currentLang = (lang as "tr" | "en") || "tr";
  const post = await getPost(slug, currentLang);
  const t = dict[currentLang];

  if (!post) {
    return { title: currentLang === "en" ? 'Article Not Found' : 'Makale Bulunamadı' }
  }

  const metaTitle = truncateTitle(post.title, "Sellf Media");

  return {
    title: metaTitle,
    description: `${t.metaSuffix}: ${post.title}`,
    alternates: {
      // Diğer sayfalarda (about, services, portfolio, blog listeleme) zaten vardı —
      // blog yazısı şablonunda eksikti. /tr ve /en aynı slug'ı kullandığı için
      // Google bu iki sürümü duplicate değil, dil alternatifi olarak okuyabilsin diye ekliyoruz.
      canonical: `https://www.sellfmedia.com/${currentLang}/blog/${slug}`,
      languages: {
        tr: `https://www.sellfmedia.com/tr/blog/${slug}`,
        en: `https://www.sellfmedia.com/en/blog/${slug}`,
      },
    },
    openGraph: {
      // OpenGraph paylaşım kartlarında kesilme daha az sorun — orijinal başlık kalsın
      title: `${post.title} | Sellf Media`,
      images: post.coverImage ? [post.coverImage] : [],
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const currentLang = (lang as "tr" | "en") || "tr";
  const t = dict[currentLang];
  
  // Veriyi dille birlikte çekiyoruz
  const post = await getPost(slug, currentLang);
  const relatedPosts = post ? await getRelatedPosts(slug, currentLang, post.categoryRefs) : [];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-500">
        {t.notFound}
      </div>
    )
  }

  const dateLocale = currentLang === "tr" ? "tr-TR" : "en-US";
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(post._createdAt).toLocaleDateString(dateLocale, dateOptions);

  const canonicalUrl = `https://www.sellfmedia.com/${currentLang}/blog/${slug}`;

  // BlogPosting JSON-LD — henüz Sanity şemasında bir "yazar" alanı olmadığı için
  // author'ı uydurmak yerine kurumsal varlığı (Organization) author olarak veriyoruz.
  // Yazar alanı ileride eklenirse burası kolayca güncellenir.
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    inLanguage: currentLang,
    datePublished: post._createdAt,
    dateModified: post._updatedAt || post._createdAt,
    ...(post.coverImage && { image: [post.coverImage] }),
    ...(post.category && { articleSection: post.category }),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    author: { "@type": "Organization", name: "Sellf Media", url: "https://www.sellfmedia.com" },
    publisher: {
      "@type": "Organization",
      name: "Sellf Media",
      logo: { "@type": "ImageObject", url: "https://www.sellfmedia.com/logo-siyah.svg" },
    },
  };

  return (
    <main className="bg-white min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <Link href={`/${currentLang}/blog`} className="text-sm font-semibold text-zinc-500 hover:text-black transition-colors flex items-center gap-2">
          {t.back}
        </Link>
      </div>

      <header className="max-w-3xl mx-auto px-6 mb-12">
        {post.category && (
          <span className="text-[#4fbfa0] text-xs font-bold uppercase tracking-widest mb-4 block">
            {post.category}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight mb-6">
          {post.title}
        </h1>
        <div className="text-sm text-zinc-500 font-medium">
          {t.published} {formattedDate}
        </div>
      </header>

      {post.coverImage && (
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 mb-16">
          <div className="aspect-[21/9] w-full relative rounded-2xl overflow-hidden bg-zinc-100">
            <img src={post.coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      )}

      <article className="max-w-2xl mx-auto px-6 prose prose-lg prose-zinc">
        {post.content ? (
          <PortableText value={post.content} />
        ) : (
          <p className="text-zinc-500 italic">{t.noContent}</p>
        )}
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 mt-20 pt-12 border-t border-zinc-200">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-black mb-8">
            {t.relatedTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related: { title: string; slug: string; coverImage?: string }) => (
              <Link
                key={related.slug}
                href={`/${currentLang}/blog/${related.slug}`}
                className="group block overflow-hidden rounded-xl bg-zinc-100 aspect-[4/3] relative"
              >
                {related.coverImage ? (
                  <img
                    src={related.coverImage}
                    alt={related.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-5 flex items-end">
                  <h3 className="text-white font-bold text-lg leading-snug">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}