const logoMap: Record<string, string> = {
  "ASCE GYO": "https://cdn.sellfmedia.workers.dev/essentials/logoasce.png",
  "CMS Makina": "https://cdn.sellfmedia.workers.dev/essentials/logocms.png",
  Evepack: "https://cdn.sellfmedia.workers.dev/essentials/logoevepack.png",
  GKC: "https://cdn.sellfmedia.workers.dev/essentials/logogkc.png",
  Goldium: "https://cdn.sellfmedia.workers.dev/essentials/logogoldium.png",
  "Grey Manner": "https://cdn.sellfmedia.workers.dev/essentials/logogrey.png",
  "Lions Darwin": "https://cdn.sellfmedia.workers.dev/essentials/logolions.png",
  LVMH: "https://cdn.sellfmedia.workers.dev/essentials/logolvmh.png",
  NutralEN: "https://cdn.sellfmedia.workers.dev/essentials/logonutralen.png",
  Philips: "https://cdn.sellfmedia.workers.dev/essentials/logophilips.png",
  Fizyohol: "https://cdn.sellfmedia.workers.dev/essentials/logophysio.png",
  Qashé: "https://cdn.sellfmedia.workers.dev/essentials/logoqashe.png",
  Rollbab: "https://cdn.sellfmedia.workers.dev/essentials/logorollbab.png",
  "Schnitzel Landmann": "https://cdn.sellfmedia.workers.dev/essentials/logoscnitzel.png",
  Sfera: "https://cdn.sellfmedia.workers.dev/essentials/logosfera.png",
  "Sfera.ai": "https://cdn.sellfmedia.workers.dev/essentials/logosfera.png",
  Shevec: "https://cdn.sellfmedia.workers.dev/essentials/logoshevec.png",
  "S'hevec": "https://cdn.sellfmedia.workers.dev/essentials/logoshevec.png",
  "Zühre Ana": "https://cdn.sellfmedia.workers.dev/essentials/logozuhre.png",
};

export default function SolutionProofMark({ brand }: { brand: string }) {
  const src = logoMap[brand];

  if (!src) {
    return (
      <span className="text-sm font-semibold tracking-[-.035em] text-white/76 md:text-base">
        {brand}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${brand} logo`}
      loading="lazy"
      className="max-h-10 max-w-[132px] object-contain brightness-0 invert opacity-60 transition-[opacity,filter,transform] duration-500 group-hover:scale-[1.025] group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 md:max-h-12 md:max-w-[160px]"
    />
  );
}
