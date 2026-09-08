"use client";

const logoRow1 = [
  "https://cdn.sellfmedia.workers.dev/essentials/logoaretias.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoasce.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logocms.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logocominify.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logodaysinn.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoeternal.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoevepack.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logogkc.png",
  "https://cdn.sellfmedia.workers.dev/essentials/18.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logogoldium.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logogrey.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logolions.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logolvmh.png",
];

const logoRow2 = [
  "https://cdn.sellfmedia.workers.dev/essentials/logomuratbey.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logonarpos.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logonutralen.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoshevec.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logophilips.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logophysio.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoqashe.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logorollbab.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logoscnitzel.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logosfera.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logouko.png",
  "https://cdn.sellfmedia.workers.dev/essentials/logozuhre.png",
];

function LogoStrip({ logos, reverse = false }: { logos: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max items-center ${reverse ? "home-logo-strip-r" : "home-logo-strip-l"}`}>
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="flex h-[78px] w-[132px] shrink-0 items-center justify-center px-4 sm:w-[150px] md:h-[88px] md:w-[172px] md:px-6 xl:w-[188px]"
          >
            <img
              src={logo}
              alt={`Brand Logo ${(index % logos.length) + 1}`}
              className="max-h-10 max-w-full object-contain grayscale opacity-70 transition-[opacity,filter] duration-300 hover:grayscale-0 hover:opacity-100 md:max-h-12"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomeLogoStrips() {
  return (
    <section className="home-logo-strips overflow-hidden border-y border-black/[.08] bg-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes homeLogoStripLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes homeLogoStripRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .home-logo-strip-l { animation: homeLogoStripLeft 54s linear infinite; }
        .home-logo-strip-r { animation: homeLogoStripRight 58s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .home-logo-strip-l, .home-logo-strip-r { animation: none; }
        }
      `}} />
      <LogoStrip logos={logoRow1} />
      <LogoStrip logos={logoRow2} reverse />
    </section>
  );
}
