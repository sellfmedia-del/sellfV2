"use client";

import { useState } from "react";
import { useParams } from "next/navigation"; // 1. Dil Radarı Eklendi
import {
  LineChart,
  Line,
  BarChart, // Kullanılmasa da orijinal kodda import edildiği için bırakıldı
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { calculateGrowthMetrics, sectorPresets } from "@/data/growthPresets";

// 2. Sözlük Eklendi
const dict = {
  tr: {
    subtitle: "Büyüme Simülatörü",
    title1: "Potansiyelinizi ",
    title2: "Hesaplayın.",
    desc: "Tahmin etmeyi bırakın. Mevcut operasyonel metriklerinizi girin ve mühendislik harikası sistemimizin ölçeklenebilir gerçekliğinizi yansıtmasını izleyin.",
    opInputs: "Operasyonel Girdiler",
    marketingOps: "Pazarlama Operasyonları (Aylık)",
    adSpend: "Reklam Harcaması (Aylık)",
    targetRoas: "Hedef ROAS",
    organicSales: "Organik Satış Sayısı",
    avgBasket: "Ortalama Sepet Tutarı",
    margin: "Kâr Marjı",
    taxRate: "Vergi Oranı",
    totalRev: "Toplam Gelir",
    netProfit: "Net Kâr",
    engRoi: "Hedeflenen ROI",
    monthProj: "6 Aylık Projeksiyon Trendi",
    monthPrefix: "Ay",
    netProfitChart: "Net Kâr ($)",
    roiChart: "ROI (%)",
    sysArch: "Sistem Mimarisi Dökümü",
    adRev: "Reklam Kaynaklı Gelir",
    orgRev: "Organik Satış Geliri",
    grossTotal: "Brüt Toplam",
    totalRevFactor: "Toplam Gelir (x0.75)",
    grossProfit: "Brüt Kâr",
    taxDed: "Vergi Kesintisi",
    afterTax: "Vergi Sonrası Kâr",
    markExp: "Pazarlama Giderleri",
    adSpending: "Reklam Harcaması",
    totalExp: "Toplam Giderler",
    finalRoi: "Nihai ROI",
    sectorScenarios: "Sektöre Göre Örnek Senaryolar",
    sectorScenariosDisclaimer: "Aşağıdaki değerler, hesaplayıcının mantığını göstermek için seçilmiş illüstratif varsayımlardır; doğrulanmış bir sektör ortalaması olarak yorumlanmamalıdır.",
    scenarioAssumptions: "Varsayımlar",
    scenarioResults: "Sonuçlar"
  },
  en: {
    subtitle: "Growth Simulator",
    title1: "Calculate Your ",
    title2: "Potential.",
    desc: "Stop guessing. Input your current operational metrics and watch our engineered framework project your scalable reality.",
    opInputs: "Operational Inputs",
    marketingOps: "Marketing Ops (Monthly)",
    adSpend: "Ad Spend (Monthly)",
    targetRoas: "Target ROAS",
    organicSales: "Organic Sales Count",
    avgBasket: "Avg. Basket Value",
    margin: "Margin",
    taxRate: "Tax Rate",
    totalRev: "Total Revenue",
    netProfit: "Net Profit",
    engRoi: "Engineered ROI",
    monthProj: "6-Month Projection Trend",
    monthPrefix: "Month",
    netProfitChart: "Net Profit ($)",
    roiChart: "ROI (%)",
    sysArch: "System Architecture Breakdown",
    adRev: "Ad-Driven Revenue",
    orgRev: "Organic Sales Revenue",
    grossTotal: "Gross Total",
    totalRevFactor: "Total Revenue (x0.75)",
    grossProfit: "Gross Profit",
    taxDed: "Tax Deduction",
    afterTax: "After-Tax Profit",
    markExp: "Marketing Expenses",
    adSpending: "Ad Spending",
    totalExp: "Total Expenses",
    finalRoi: "Final ROI",
    sectorScenarios: "Example Scenarios by Sector",
    sectorScenariosDisclaimer: "The figures below are illustrative assumptions chosen to demonstrate how the calculator works; they should not be interpreted as a verified sector average.",
    scenarioAssumptions: "Assumptions",
    scenarioResults: "Results"
  }
};

export default function GrowthSimulator() {
  // 3. Dil Seçimi
  const params = useParams();
  const currentLang = (params?.lang as "tr" | "en") || "tr";
  const t = dict[currentLang];

  // --- STATE (INPUT VARIABLES) ---
  const [marketingOps, setMarketingOps] = useState<number>(5000);
  const [adSpend, setAdSpend] = useState<number>(10000);
  const [roas, setRoas] = useState<number>(4);
  const [salesCount, setSalesCount] = useState<number>(500);
  const [avgBasket, setAvgBasket] = useState<number>(50);
  const [margin, setMargin] = useState<number>(40);
  const [taxRate, setTaxRate] = useState<number>(20);

  // Formatlama Fonksiyonları
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;

  // --- CALCULATED METRICS ---
  // ÖNEMLİ: Bu artık useEffect içinde değil, doğrudan render sırasında hesaplanıyor.
  // Sebep: useEffect yalnızca tarayıcıda "mount" sonrası çalışır — sunucu tarafında
  // (SSR) ilk üretilen HTML'de metrics hâlâ başlangıç değeriyle (0) görünürdü.
  // Senkron hesaplama sayesinde ilk HTML çıktısında zaten gerçek, anlamlı
  // varsayılan sayılar oluyor — hem Google hem AI crawler'lar bunu doğrudan okuyabiliyor.
  // Hesaplama mantığı artık data/growthPresets.ts içindeki paylaşılan
  // fonksiyonda — aşağıdaki 10 statik sektör senaryosuyla AYNI formülü kullanıyor.
  const metrics = calculateGrowthMetrics({
    marketingOps,
    adSpend,
    roas,
    salesCount,
    avgBasket,
    margin,
    taxRate,
  });
  const { totalRevenue, totalExpenses, afterTaxProfit } = metrics;

  // --- PROJECTION DATA FOR CHARTS ---
  // 6 Aylık Projeksiyon Verisi (Sellf Optimizasyonu ile simüle edilmiş %5 aylık bileşik büyüme trendi)
  const chartData = Array.from({ length: 6 }).map((_, i) => {
    // Her ay için hafif bir iyileşme çarpanı (Growth Engineering Simulation)
    const multiplier = Math.pow(1.05, i);
    const monthlyRev = totalRevenue * multiplier;
    const monthlyExp = totalExpenses * (1 + i * 0.01); // Giderler daha yavaş artar
    const monthlyNet = afterTaxProfit * multiplier - monthlyExp;
    const monthlyRoi = ((monthlyRev - monthlyExp) / monthlyExp) * 100;

    return {
      month: `${t.monthPrefix} ${i + 1}`, // Dil koduna göre 'Ay' veya 'Month'
      NetProfit: Math.round(monthlyNet),
      ROI: Math.round(monthlyRoi),
    };
  });

  return (
    <div className="w-full bg-[#0b0d0d] py-20 md:py-28 border-b border-white/10">
      <div className="sellf-container flex flex-col gap-12">
        
        {/* BAŞLIK */}
        <div className="grid lg:grid-cols-[.72fr_1.28fr] gap-8 items-end mb-4">
          <h4 className="sellf-kicker text-white/38 mb-4">
            {t.subtitle}
          </h4>
          <h2 className="sellf-display text-5xl md:text-7xl text-white">
            {t.title1} <span className="text-white/52">{t.title2}</span>
          </h2>
          <p className="text-white/52 mt-6 max-w-2xl text-sm md:text-base leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* ANA BENTO GRID (Terminal Arayüzü) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* KONTROL PANELİ (Sol Sütun) */}
          <div className="lg:col-span-4 bg-sellf-white/5 border border-sellf-white/10 rounded-none p-6 md:p-8 backdrop-blur-md flex flex-col gap-6">
            <h3 className="text-xl font-bold text-sellf-white uppercase tracking-wide border-b border-sellf-white/10 pb-4 mb-2">
              {t.opInputs}
            </h3>

            {/* Range Slider Component Bileşeni */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm font-semibold">
                <label className="text-sellf-grey">{t.marketingOps}</label>
                <span className="text-sellf-white">{formatCurrency(marketingOps)}</span>
              </div>
              <input type="range" min="0" max="50000" step="1000" value={marketingOps} onChange={(e) => setMarketingOps(Number(e.target.value))} className="w-full accent-sellf-primary" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm font-semibold">
                <label className="text-sellf-grey">{t.adSpend}</label>
                <span className="text-sellf-white">{formatCurrency(adSpend)}</span>
              </div>
              <input type="range" min="0" max="100000" step="1000" value={adSpend} onChange={(e) => setAdSpend(Number(e.target.value))} className="w-full accent-sellf-primary" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm font-semibold">
                <label className="text-sellf-grey">{t.targetRoas}</label>
                <span className="text-sellf-white">{roas.toFixed(1)}x</span>
              </div>
              <input type="range" min="0" max="20" step="0.5" value={roas} onChange={(e) => setRoas(Number(e.target.value))} className="w-full accent-sellf-primary" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm font-semibold">
                <label className="text-sellf-grey">{t.organicSales}</label>
                <span className="text-sellf-white">{salesCount}</span>
              </div>
              <input type="range" min="0" max="5000" step="10" value={salesCount} onChange={(e) => setSalesCount(Number(e.target.value))} className="w-full accent-sellf-primary" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm font-semibold">
                <label className="text-sellf-grey">{t.avgBasket}</label>
                <span className="text-sellf-white">{formatCurrency(avgBasket)}</span>
              </div>
              <input type="range" min="0" max="1000" step="10" value={avgBasket} onChange={(e) => setAvgBasket(Number(e.target.value))} className="w-full accent-sellf-primary" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-semibold">
                  <label className="text-sellf-grey">{t.margin}</label>
                  <span className="text-sellf-white">{margin}%</span>
                </div>
                <input type="range" min="0" max="100" step="1" value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-full accent-sellf-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-semibold">
                  <label className="text-sellf-grey">{t.taxRate}</label>
                  <span className="text-sellf-white">{taxRate}%</span>
                </div>
                <input type="range" min="0" max="50" step="1" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full accent-sellf-primary" />
              </div>
            </div>
          </div>

          {/* SONUÇLAR VE GRAFİKLER (Sağ Sütun) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Skor Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Revenue Card */}
              <div className="bg-white/[.035] border border-sellf-white/10 p-6 rounded-none flex flex-col justify-center">
                <span className="text-sellf-grey text-sm font-bold tracking-widest uppercase mb-2">{t.totalRev}</span>
                <span className="text-3xl lg:text-4xl font-black text-sellf-white tracking-tight">{formatCurrency(metrics.totalRevenue)}</span>
              </div>
              
              {/* Net Profit Card */}
              <div className="bg-white/[.035] border border-sellf-white/10 p-6 rounded-none flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sellf-primary/20 rounded-full blur-3xl"></div>
                <span className="text-sellf-grey text-sm font-bold tracking-widest uppercase mb-2 relative z-10">{t.netProfit}</span>
                <span className={`text-3xl lg:text-4xl font-black tracking-tight relative z-10 ${metrics.netProfit >= 0 ? 'text-white' : 'text-red-500'}`}>
                  {formatCurrency(metrics.netProfit)}
                </span>
              </div>

              {/* ROI Card */}
              <div className="bg-white/[.045] border border-white/10 p-6 rounded-none flex flex-col justify-center ">
                <span className="text-sellf-white/80 text-sm font-bold tracking-widest uppercase mb-2">{t.engRoi}</span>
                <span className="text-3xl lg:text-4xl font-black text-sellf-white tracking-tight">{formatPercent(metrics.roi)}</span>
              </div>
            </div>

            {/* Grafikler (Recharts) */}
            <div className="bg-sellf-white/5 border border-sellf-white/10 rounded-none p-6 h-[350px]">
              <h3 className="text-sellf-grey text-xs font-bold tracking-widest uppercase mb-6">{t.monthProj}</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#888" fontSize={12} tickFormatter={(val) => `$${val / 1000}k`} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#7e8585" fontSize={12} tickFormatter={(val) => `${val}%`} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="NetProfit" stroke="#f0f0ee" strokeWidth={3} dot={{ r: 4, fill: '#f0f0ee' }} activeDot={{ r: 6 }} name={t.netProfitChart} />
                  <Line yAxisId="right" type="monotone" dataKey="ROI" stroke="#7e8585" strokeWidth={3} dot={{ r: 4, fill: '#7e8585' }} name={t.roiChart} />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

        {/* DETAYLI HESAPLAMA DÖKÜMÜ (Receipt / Breakdown) */}
        <div className="bg-sellf-white/5 border border-sellf-white/10 rounded-none p-6 md:p-10">
          <h3 className="text-xl font-bold text-sellf-white uppercase tracking-wide border-b border-sellf-white/10 pb-4 mb-6">
            {t.sysArch}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-4 text-sm font-medium">
            
            {/* Sütun 1: Gelir Kanalları */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between"><span className="text-sellf-grey">{t.adRev}</span><span className="text-sellf-white">{formatCurrency(metrics.adRevenue)}</span></div>
              <div className="flex justify-between"><span className="text-sellf-grey">{t.orgRev}</span><span className="text-sellf-white">{formatCurrency(metrics.organicRevenue)}</span></div>
              <div className="flex justify-between border-t border-sellf-white/10 pt-2"><span className="text-sellf-grey">{t.grossTotal}</span><span className="text-sellf-white">{formatCurrency(metrics.grossTotal)}</span></div>
              <div className="flex justify-between text-sellf-primary font-bold"><span className="uppercase">{t.totalRevFactor}</span><span>{formatCurrency(metrics.totalRevenue)}</span></div>
            </div>

            {/* Sütun 2: Kârlılık ve Vergi */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between"><span className="text-sellf-grey">{t.grossProfit.replace("{margin}", margin.toString())} ({margin}%)</span><span className="text-sellf-white">{formatCurrency(metrics.grossProfit)}</span></div>
              <div className="flex justify-between"><span className="text-sellf-grey">{t.taxDed.replace("{taxRate}", taxRate.toString())} ({taxRate}%)</span><span className="text-red-400">-{formatCurrency(metrics.taxAmount)}</span></div>
              <div className="flex justify-between border-t border-sellf-white/10 pt-2 font-bold"><span className="text-sellf-grey uppercase">{t.afterTax}</span><span className="text-sellf-white">{formatCurrency(metrics.afterTaxProfit)}</span></div>
            </div>

            {/* Sütun 3: Giderler */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between"><span className="text-sellf-grey">{t.markExp}</span><span className="text-sellf-white">{formatCurrency(marketingOps)}</span></div>
              <div className="flex justify-between"><span className="text-sellf-grey">{t.adSpending}</span><span className="text-sellf-white">{formatCurrency(adSpend)}</span></div>
              <div className="flex justify-between border-t border-sellf-white/10 pt-2 font-bold"><span className="text-sellf-grey uppercase">{t.totalExp}</span><span className="text-red-400">-{formatCurrency(metrics.totalExpenses)}</span></div>
            </div>

            {/* Sütun 4: Final Çıktılar */}
            <div className="flex flex-col gap-3 bg-white/[.04] p-4 rounded-none border border-white/10">
              <div className="flex justify-between text-lg font-black"><span className="text-sellf-white uppercase">{t.netProfit}</span><span className={metrics.netProfit >= 0 ? "text-white" : "text-red-500"}>{formatCurrency(metrics.netProfit)}</span></div>
              <div className="flex justify-between text-lg font-black"><span className="text-sellf-white uppercase">{t.finalRoi}</span><span className="text-sellf-primary">{formatPercent(metrics.roi)}</span></div>
            </div>

          </div>
        </div>

        {/* SEKTÖRE GÖRE ÖRNEK SENARYOLAR — sr-only:
            Ekranda görünmez, ama HTML'de her zaman var. Slider'lara dokunmadan
            AI crawler'lar (JS çalıştırmadıkları için) ve Google artık bu
            hesaplayıcının 10 farklı B2B sektörü için nasıl bir çıktı ürettiğini
            somut, spesifik rakamlarla görebiliyor. Aynı formül (calculateGrowthMetrics)
            kullanıldığı için canlı hesaplayıcıyla hiçbir zaman tutarsız düşmez. */}
        <div className="sr-only">
          <h3>{t.sectorScenarios}</h3>
          <p>{t.sectorScenariosDisclaimer}</p>
          {sectorPresets.map((preset) => {
            const presetMetrics = calculateGrowthMetrics(preset.inputs);
            return (
              <article key={preset.id}>
                <h4>{preset.name[currentLang]}</h4>
                <p>
                  {t.scenarioAssumptions}: {t.marketingOps} {formatCurrency(preset.inputs.marketingOps)},{" "}
                  {t.adSpend} {formatCurrency(preset.inputs.adSpend)}, {t.targetRoas} {preset.inputs.roas.toFixed(1)}x,{" "}
                  {t.organicSales} {preset.inputs.salesCount}, {t.avgBasket} {formatCurrency(preset.inputs.avgBasket)},{" "}
                  {t.margin} {preset.inputs.margin}%, {t.taxRate} {preset.inputs.taxRate}%.
                </p>
                <p>
                  {t.scenarioResults}: {t.totalRev} {formatCurrency(presetMetrics.totalRevenue)},{" "}
                  {t.netProfit} {formatCurrency(presetMetrics.netProfit)}, {t.engRoi} {formatPercent(presetMetrics.roi)}.
                </p>
              </article>
            );
          })}
        </div>

      </div>
    </div>
  );
}