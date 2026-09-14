"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

export type HomeBlogPost = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  coverImage: string;
  createdAt: string;
  excerpt?: string;
};

type Lang = "tr" | "en";
type LocalizedString = { tr: string; en: string };

type Testimonial = {
  id: number;
  text: LocalizedString;
  author: string;
  company: LocalizedString;
  role?: LocalizedString;
  logos: string[];
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: {
      tr: "Sellf'in bakış açısı sadece hizmet sunmanın çok ötesinde. İşin neredeyse her aşamasına entegre oluyorlar ve yarattıkları büyümenin basit sosyal medya veya reklam metriklerinin ötesine geçmesi gerektiğinin tamamen bilincindeler.",
      en: "Sellf's perspective extends far beyond mere service delivery. They integrate into almost every aspect of the business, fully aware that the growth they generate must transcend simple social media or advertising metrics.",
    },
    author: "Abdülkadir K.",
    company: { tr: "Sanko & ASCE GYO", en: "Sanko & ASCE GYO" },
    logos: ["https://cdn.sellfmedia.workers.dev/essentials/logoasce.png"],
  },
  {
    id: 2,
    text: {
      tr: "Sistemli ve son derece programlı yaklaşımları başarılarının temelidir. Kampanya mimarilerinden detaylı bütçe planlamasına kadar yıllık yol haritalarımızı inşa ettiler. Her adımda kesintisiz iletişim kurarak gelir ve kar marjlarını doğru tahmin ettiler ve bu projeksiyonları tutarlı bir şekilde gerçekleştirdiler.",
      en: "Their systematic and highly programmed approach is the root of their success. From campaign architectures to granular budget planning, they engineered our annual roadmaps. They maintained seamless communication at every step, accurately forecasting revenue and profit margins, and consistently delivering on those projections.",
    },
    author: "Cenk Ç.",
    company: { tr: "Gülsoylar & Fundora", en: "Gülsoylar & Fundora" },
    logos: ["https://cdn.sellfmedia.workers.dev/essentials/logofundora.png"],
  },
  {
    id: 3,
    text: {
      tr: "Marka kimliğini derinlemesine anlayan ve gerçek bir kavrayış olmadan hareket etmeyi reddeden veri odaklı bir ekip. Dışarıdan alınan bir hizmet gibi değil; kendi iç ekibinizin bir parçası gibi çalışıyorlar.",
      en: "A data-driven team that deeply understands brand identity and refuses to act without true comprehension. They do not feel like an outsourced service; they operate as an extension of your own internal team.",
    },
    author: "Murat Y.",
    company: { tr: "Inwest Group", en: "Inwest Group" },
    logos: ["https://cdn.sellfmedia.workers.dev/essentials/logoinwest.png"],
  },
  {
    id: 4,
    text: {
      tr: "Markamızın başlangıcından itibaren; marka kitabı oluşturma, iş ortaklıkları, kurumsal kimlik ve hatta lojistik ve muhasebe entegrasyonları dahil olmak üzere her operasyonel katmanda büyüme rotamızı yönettiler. Ortak oldukları markaları gerçekten sahiplenen, son derece uzmanlaşmış bir ekip.",
      en: "From our brand's inception, they steered our growth trajectory across every operational layer—including brandbook creation, partnerships, corporate identity, and even logistics and accounting integrations. A highly specialized team that takes genuine ownership of the brands they partner with.",
    },
    author: "Ümit B.",
    company: { tr: "Qashe & Zühre Ana", en: "Qashe & Zühre Ana" },
    logos: ["https://cdn.sellfmedia.workers.dev/essentials/logozuhre.png"],
  },
  {
    id: 5,
    text: {
      tr: "Henüz bir anlaşma imzalamadan önce bile stratejik danışmanlıklarını alıyorduk. Gerçek büyümeyi inşa etmek için geleneksel ticari ilişkilerin ötesine geçen bir destek sağlıyorlar. Vizyonlarının en nihayetinde küresel ölçekte pazarlama paradigmasını yeniden şekillendirmesini umuyoruz.",
      en: "We were receiving their strategic counsel even before signing an agreement. They provide support that transcends conventional commercial relationships to engineer true growth. We hope their vision ultimately reshapes the marketing paradigm on a global scale.",
    },
    author: "Cemile Hanım",
    company: { tr: "Trio", en: "Trio" },
    logos: ["https://cdn.sellfmedia.workers.dev/essentials/logotrio.png"],
  },
  {
    id: 6,
    text: {
      tr: "Sellf tüm sürecimiz boyunca son derece yardımcı oldu. Bankacılık uzmanlarımız işlerini kusursuz biliyorlardı ancak bunu müşterilerin dijital yolculukları ve onboarding süreçlerine nasıl uygulayacaklarını bilmiyorlardı. Tüm süreci kurdular ve büyüme yolculuğumuzu büyük ölçüde kolaylaştırdılar.",
      en: "Sellf was extremely helpful for our entire process. Our banking experts knew their jobs perfectly but did not know how to implement this across customers' digital journeys and onboarding processes. They set up the entire process and eased our growth journey a great deal.",
    },
    author: "İgor Valerie",
    company: { tr: "TIIB", en: "TIIB" },
    role: { tr: "Yönetim Kurulu Üyesi", en: "Board Member" },
    logos: ["https://logos.hunter.io/turkibu.com"],
  },
];

const copy = {
  tr: {
    testimonialEyebrow: "MÜŞTERİLERİMİZİN DİLİNDEN",
    testimonialTitle: "Müşteri Referansları",
    testimonialIntro: "Markaların büyüme yolculuklarında yanlarında olmak en büyük motivasyonumuz. İş ortaklarımızın deneyimleri, bizim için her şeyden değerli.",
    blogEyebrow: "BLOG",
    blogTitle: "Son İçgörüler",
    blogIntro: "Büyüme, pazarlama ve teknoloji dünyasından en güncel içgörüler, stratejiler ve ilham veren fikirler.",
    allPosts: "Tüm Yazılar",
    read: "Yazıyı Oku",
  },
  en: {
    testimonialEyebrow: "IN OUR CLIENTS' WORDS",
    testimonialTitle: "Client References",
    testimonialIntro: "Being alongside brands throughout their growth journey is our greatest motivation. The experiences of our partners matter more than anything else.",
    blogEyebrow: "BLOG",
    blogTitle: "Latest Insights",
    blogIntro: "The latest insights, strategies and ideas from the worlds of growth, marketing and technology.",
    allPosts: "All Articles",
    read: "Read Article",
  },
} as const;

function formatDate(value: string, lang: Lang) {
  try {
    return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function chunkPosts(posts: HomeBlogPost[]) {
  const groups: HomeBlogPost[][] = [];
  for (let i = 0; i < posts.length; i += 3) groups.push(posts.slice(i, i + 3));
  return groups;
}

export default function HomeTestimonialsBlog({ lang, posts }: { lang: Lang; posts: HomeBlogPost[] }) {
  const t = copy[lang];
  const [testimonialPage, setTestimonialPage] = useState(0);
  const testimonialPages = useMemo(() => [testimonials.slice(0, 3), testimonials.slice(3, 6)], []);
  const blogGroups = useMemo(() => chunkPosts(posts.slice(0, 9)), [posts]);

  const goTestimonials = (direction: -1 | 1) => {
    setTestimonialPage((current) => (current + direction + testimonialPages.length) % testimonialPages.length);
  };

  return (
    <section className="bg-[#f4f3ef] text-[#111] border-y border-black/[.08]">
      <div className="sellf-container grid lg:grid-cols-[.4fr_.6fr]">
        <div className="px-5 py-16 md:px-10 md:py-20 lg:border-r lg:border-black/[.09] xl:px-12">
          <p className="text-[9px] font-semibold uppercase tracking-[.28em] text-black/46">{t.testimonialEyebrow}</p>
          <h2 className="sellf-display mt-4 text-[2.8rem] leading-[.94] tracking-[-.055em] sm:text-[3.5rem] lg:text-[3.8rem]">{t.testimonialTitle}</h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-black/55 md:text-[15px]">{t.testimonialIntro}</p>

          <div className="mt-8 space-y-3">
            {testimonialPages[testimonialPage].map((item) => (
              <article key={item.id} className="rounded-[24px] border border-black/[.08] bg-white/70 px-5 py-5 shadow-[0_14px_34px_rgba(0,0,0,.025)] backdrop-blur-sm md:px-6 md:py-6">
                <p className="text-[15px] leading-[1.65] tracking-[-.015em] text-black/72">“{item.text[lang]}”</p>
                <div className="mt-5 flex items-end justify-between gap-5 border-t border-black/[.07] pt-4">
                  <div>
                    <div className="text-sm font-semibold text-black/90">{item.author}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[.14em] text-black/38">{item.company[lang]}</div>
                    {item.role ? <div className="mt-1 text-[10px] tracking-[.06em] text-black/42">{item.role[lang]}</div> : null}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.logos.map((logo) => (
                      <div key={logo} className="relative h-8 w-20 opacity-48 grayscale mix-blend-multiply">
                        {logo.startsWith("https://logos.hunter.io/") ? (
                          <img src={logo} alt={`${item.company[lang]} logo`} className="absolute inset-0 h-full w-full object-contain object-right-bottom" loading="lazy" />
                        ) : (
                          <Image src={logo} alt={`${item.company[lang]} logo`} fill className="object-contain object-right-bottom" unoptimized />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button type="button" onClick={() => goTestimonials(-1)} aria-label={lang === "tr" ? "Önceki referanslar" : "Previous references"} className="grid h-11 w-11 place-items-center rounded-full border border-black/[.16] bg-white/55 text-lg transition hover:bg-white">←</button>
              <button type="button" onClick={() => goTestimonials(1)} aria-label={lang === "tr" ? "Sonraki referanslar" : "Next references"} className="grid h-11 w-11 place-items-center rounded-full border border-black/[.16] bg-white/55 text-lg transition hover:bg-white">→</button>
            </div>
            <div className="flex items-center gap-3 text-[10px] tracking-[.16em] text-black/38">
              <span>{String(testimonialPage + 1).padStart(2, "0")} / {String(testimonialPages.length).padStart(2, "0")}</span>
              <span className="h-px w-20 bg-black/[.12]"><span className="block h-px bg-black/70 transition-all duration-500" style={{ width: `${((testimonialPage + 1) / testimonialPages.length) * 100}%` }} /></span>
            </div>
          </div>
        </div>

        <div className="px-5 py-16 md:px-10 md:py-20 xl:px-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[.28em] text-black/46">{t.blogEyebrow}</p>
              <h2 className="sellf-display mt-4 text-[2.8rem] leading-[.94] tracking-[-.055em] sm:text-[3.5rem] lg:text-[3.8rem]">{t.blogTitle}</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-black/55 md:text-[15px]">{t.blogIntro}</p>
            </div>
            <Link href={`/${lang}/blog`} className="group hidden shrink-0 items-center gap-3 border-b border-black/35 pb-1 text-[12px] font-semibold md:inline-flex">
              {t.allPosts}<span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="mt-8 max-h-[700px] overflow-y-auto overscroll-contain pr-1 snap-y snap-mandatory [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,.2)_transparent]">
            <div className="space-y-8">
              {blogGroups.map((group, groupIndex) => {
                const featured = group[0];
                const secondary = group.slice(1);
                return (
                  <div key={featured?._id ?? groupIndex} className="min-h-[680px] snap-start">
                    {featured ? (
                      <Link href={`/${lang}/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[28px] border border-black/[.08] bg-white/72 shadow-[0_18px_42px_rgba(0,0,0,.035)] md:grid-cols-[1.08fr_.92fr]">
                        <div className="relative min-h-[270px] overflow-hidden bg-[#deddd8] md:min-h-[330px]">
                          <img src={featured.coverImage} alt={featured.title} loading={groupIndex === 0 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025]" />
                        </div>
                        <div className="flex flex-col justify-between px-6 py-6 md:px-7 md:py-7">
                          <div>
                            <div className="flex items-center justify-between gap-4 text-[9px] uppercase tracking-[.18em] text-black/38">
                              <span>{featured.category || t.blogEyebrow}</span>
                              <span>{formatDate(featured.createdAt, lang)}</span>
                            </div>
                            <h3 className="mt-5 text-[1.75rem] font-semibold leading-[1.02] tracking-[-.045em] text-black/92 md:text-[2rem]">{featured.title}</h3>
                            {featured.excerpt ? <p className="mt-4 line-clamp-4 text-[13px] leading-6 text-black/52">{featured.excerpt}</p> : null}
                          </div>
                          <span className="mt-7 inline-flex w-fit items-center gap-3 border-b border-black/25 pb-1 text-[11px] font-semibold">{t.read}<span>→</span></span>
                        </div>
                      </Link>
                    ) : null}

                    {secondary.length ? (
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {secondary.map((post) => (
                          <Link key={post._id} href={`/${lang}/blog/${post.slug}`} className="group overflow-hidden rounded-[24px] border border-black/[.08] bg-white/72 shadow-[0_14px_34px_rgba(0,0,0,.025)]">
                            <div className="relative h-[155px] overflow-hidden bg-[#deddd8]">
                              <img src={post.coverImage} alt={post.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025]" />
                            </div>
                            <div className="px-5 py-5">
                              <div className="flex items-center justify-between gap-4 text-[9px] uppercase tracking-[.16em] text-black/36">
                                <span>{post.category || t.blogEyebrow}</span>
                                <span>{formatDate(post.createdAt, lang)}</span>
                              </div>
                              <h3 className="mt-4 min-h-[3.2em] text-[1.2rem] font-semibold leading-[1.15] tracking-[-.035em] text-black/90">{post.title}</h3>
                              {post.excerpt ? <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-black/48">{post.excerpt}</p> : null}
                              <span className="mt-5 inline-flex w-fit items-center gap-2 border-b border-black/20 pb-1 text-[10px] font-semibold">{t.read}<span>→</span></span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <Link href={`/${lang}/blog`} className="group mt-7 inline-flex items-center gap-3 border-b border-black/35 pb-1 text-[12px] font-semibold md:hidden">
            {t.allPosts}<span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
