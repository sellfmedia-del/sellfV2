import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const dict = {
  tr: {
    title: "Dijital Sınırdan Görüşler, Haberler ve Hikayeler",
    subtitle: "Dijital pazarlama ve büyüme mühendisliği üzerine stratejik perspektifler.",
    readMore: "Devamını Oku",
    noImage: "Kapak Görseli Yok"
  },
  en: {
    title: "Insights, News and Stories from the Digital Frontier",
    subtitle: "Strategic perspectives on digital marketing and growth engineering.",
    readMore: "Read More",
    noImage: "No Cover Image"
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = (lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  return {
    title: `${t.title} | Sellf Media`,
    description: t.subtitle,
    alternates: {
      canonical: `https://www.sellfmedia.com/${currentLang}/blog`,
      languages: {
        tr: "https://www.sellfmedia.com/tr/blog",
        en: "https://www.sellfmedia.com/en/blog",
      },
    },
  };
}

// 1. Sorgu Güncellendi: 'lang' parametresi alıyor
const getPosts = async (lang: string) => {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    _id,
    "title": select($lang == "en" => title_en, title_tr),
    "slug": slug.current,
    "category": categories[0]->title,
    coverImage
  }`
  
  const data = await client.fetch(query, { lang }, { cache: 'no-store' })
  return data
}

export default async function BlogPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const currentLang = (lang as "tr" | "en") || "tr";
  
  // Postları çekereken dili gönderiyoruz
  const posts = await getPosts(currentLang);
  const t = dict[currentLang];

  return (
    <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-black">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 font-medium">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[350px]">
        {posts.map((post: any, index: number) => {
          let bentoClasses = "col-span-1 row-span-1"
          if (index === 0) bentoClasses = "md:col-span-2 lg:col-span-2 row-span-2" 
          else if (index === 3) bentoClasses = "md:col-span-2 lg:col-span-2 row-span-1" 
          else if (index === 4) bentoClasses = "md:col-span-1 lg:col-span-2 row-span-1" 

          return (
            <Link 
              href={`/${currentLang}/blog/${post.slug}`} 
              key={post._id}
              className={`group relative block overflow-hidden rounded-2xl bg-zinc-900 ${bentoClasses}`}
            >
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-500">
                  {t.noImage}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-80"></div>

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div className="flex justify-start">
                  {post.category && (
                    <span className="bg-[#4fbfa0] text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-lg">
                      {post.category}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex flex-col items-start gap-5">
                  <h2 className={`font-bold text-white leading-tight ${
                    index === 0 ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-xl md:text-2xl'
                  }`}>
                    {post.title}
                  </h2>
                  <span className="inline-block border border-white/60 text-white px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all duration-300">
                    {t.readMore}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}