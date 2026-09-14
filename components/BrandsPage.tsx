import { ownBrands } from "@/data/OwnBrands";

type Lang = "tr" | "en";

const copy = {
  tr: {
    eyebrow: "SELLF EKOSİSTEMİ",
    title: "Kendi ürünlerimizi ve şirketlerimizi de büyütürüz.",
    intro:
      "Sellf yalnızca danışmanlık veren veya operasyon yöneten bir yapı değildir. Kendi problemlerimizden ve gördüğümüz pazar ihtiyaçlarından doğan yazılımları, ürünleri ve şirketleri de kurar; işletir ve ölçekleriz.",
    sectionEyebrow: "KENDİ MARKALARIMIZ",
    sectionTitle: "İnşa ettiğimiz sistemler.",
    sectionIntro:
      "Her biri farklı bir probleme odaklanır. Ortak noktaları ise aynı Sellf yaklaşımıyla kurulmalarıdır: veri, sistem, sürdürülebilirlik ve ölçeklenebilirlik.",
    visit: "Markayı Ziyaret Et",
    noteTitle: "Sadece anlatmıyoruz. Uyguluyoruz.",
    note:
      "Kendi şirketlerimizi ve yazılımlarımızı kurmak, markalara önerdiğimiz büyüme sistemlerini kendi sermayemiz, zamanımız ve operasyonlarımız üzerinde de test etmemizi sağlar.",
  },
  en: {
    eyebrow: "SELLF ECOSYSTEM",
    title: "We grow our own products and companies, too.",
    intro:
      "Sellf is not only a consultancy or an execution partner. We also build, operate and scale software products and companies born from problems we experience and market needs we identify ourselves.",
    sectionEyebrow: "OUR OWN BRANDS",
    sectionTitle: "Systems we have built.",
    sectionIntro:
      "Each focuses on a different problem. What they share is the same Sellf approach: data, systems, sustainability and scalability.",
    visit: "Visit Brand",
    noteTitle: "We do not only advise. We operate.",
    note:
      "Building our own companies and software lets us test the growth systems we recommend to brands against our own capital, time and operations.",
  },
} as const;

export default function BrandsPage({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <main className="bg-[#f4f3ef] text-[#111]">
      <section className="relative overflow-hidden bg-[#090b0b] pt-28 text-white md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_14%,rgba(255,255,255,.055),transparent_28%),radial-gradient(circle_at_18%_88%,rgba(105,145,125,.08),transparent_28%)]" />
        <div className="sellf-container relative px-5 py-20 md:px-10 md:py-28 xl:px-12">
          <p className="text-[9px] font-semibold uppercase tracking-[.3em] text-white/48">{t.eyebrow}</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
            <h1 className="sellf-display max-w-[10ch] text-[3.6rem] leading-[.92] tracking-[-.06em] sm:text-[5rem] xl:text-[6rem]">
              {t.title}
            </h1>
            <p className="max-w-xl text-[15px] leading-[1.8] text-white/62 md:text-base">{t.intro}</p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-white/[.09] bg-white/[.09] md:grid-cols-4">
            <div className="bg-[#0e1111] px-6 py-7">
              <div className="text-[2.2rem] font-semibold tracking-[-.05em]">4</div>
              <div className="mt-2 text-[9px] uppercase tracking-[.22em] text-white/38">{lang === "tr" ? "Kendi Marka" : "Own Brands"}</div>
            </div>
            <div className="bg-[#0e1111] px-6 py-7">
              <div className="text-[2.2rem] font-semibold tracking-[-.05em]">13+</div>
              <div className="mt-2 text-[9px] uppercase tracking-[.22em] text-white/38">{lang === "tr" ? "Ülkede Operasyon" : "Countries of Operation"}</div>
            </div>
            <div className="bg-[#0e1111] px-6 py-7">
              <div className="text-[1.15rem] font-semibold tracking-[-.02em]">Software</div>
              <div className="mt-2 text-[9px] uppercase tracking-[.22em] text-white/38">SellfScale · SellfTask · SellfCompete</div>
            </div>
            <div className="bg-[#0e1111] px-6 py-7">
              <div className="text-[1.15rem] font-semibold tracking-[-.02em]">Marketplace</div>
              <div className="mt-2 text-[9px] uppercase tracking-[.22em] text-white/38">OtopartTR</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sellf-container px-5 py-20 md:px-10 md:py-28 xl:px-12">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.28em] text-black/42">{t.sectionEyebrow}</p>
            <h2 className="sellf-display mt-5 max-w-[8ch] text-[3.2rem] leading-[.94] tracking-[-.055em] md:text-[4.4rem]">{t.sectionTitle}</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-black/54 md:text-[15px]">{t.sectionIntro}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {ownBrands.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative min-h-[310px] overflow-hidden rounded-[26px] border border-black/[.08] bg-[#0e1111] p-7 text-white shadow-[0_18px_42px_rgba(0,0,0,.055)] transition duration-500 hover:-translate-y-1"
              >
                <div
                  className="pointer-events-none absolute inset-x-[-18%] bottom-[-38%] h-[70%] rounded-[50%] blur-2xl transition-transform duration-700 group-hover:scale-110"
                  style={{ background: brand.accent }}
                />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-[9px] uppercase tracking-[.2em] text-white/35">{brand.kind[lang]}</div>
                        <h3 className="mt-4 text-[2rem] font-semibold tracking-[-.045em]">{brand.name}</h3>
                      </div>
                      <span className="text-xl font-semibold text-white/68">{brand.mark}</span>
                    </div>
                    <p className="mt-7 max-w-[31ch] text-[14px] leading-[1.7] text-white/60">{brand.description[lang]}</p>
                  </div>
                  <div className="mt-10 flex items-end justify-between gap-5 border-t border-white/[.09] pt-5">
                    <span className="text-[11px] font-semibold text-white/82">{t.visit} →</span>
                    <span className="text-[9px] uppercase tracking-[.16em] text-white/30">{brand.domain}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/[.08]">
        <div className="sellf-container grid gap-8 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-start xl:px-12">
          <h2 className="sellf-display max-w-[9ch] text-[2.8rem] leading-[.96] tracking-[-.05em] md:text-[3.8rem]">{t.noteTitle}</h2>
          <p className="max-w-2xl text-[15px] leading-[1.8] text-black/58 md:text-base">{t.note}</p>
        </div>
      </section>
    </main>
  );
}
