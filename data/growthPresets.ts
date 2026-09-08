type LocalizedString = {
  tr: string;
  en: string;
};

export type GrowthInputs = {
  marketingOps: number;
  adSpend: number;
  roas: number;
  salesCount: number;
  avgBasket: number;
  margin: number;
  taxRate: number;
};

export type GrowthMetrics = {
  adRevenue: number;
  organicRevenue: number;
  grossTotal: number;
  totalRevenue: number;
  grossProfit: number;
  taxAmount: number;
  afterTaxProfit: number;
  totalExpenses: number;
  netProfit: number;
  roi: number;
};

/**
 * Tek, paylaşılan hesaplama fonksiyonu.
 * Hem canlı slider'lar (GrowthSimulator component'i) hem de aşağıdaki
 * statik sektör senaryoları (SEO/GEO için render edilen sr-only blok)
 * AYNI formülü kullanır — iki yerde aynı mantığı tekrar yazıp
 * ileride birbirinden sapmasını önlüyoruz.
 */
export function calculateGrowthMetrics(inputs: GrowthInputs): GrowthMetrics {
  const { marketingOps, adSpend, roas, salesCount, avgBasket, margin, taxRate } = inputs;

  const adRevenue = roas * adSpend;
  const organicRevenue = salesCount * avgBasket;
  const grossTotal = adRevenue + organicRevenue;
  const totalRevenue = grossTotal * 0.75; // %75 katsayısı (mevcut iş kuralı)

  const grossProfit = totalRevenue * (margin / 100);
  const taxAmount = grossProfit * (taxRate / 100);
  const afterTaxProfit = grossProfit - taxAmount;

  const totalExpenses = marketingOps + adSpend;
  const netProfit = afterTaxProfit - totalExpenses;

  const roi = totalExpenses > 0 ? ((totalRevenue - totalExpenses) / totalExpenses) * 100 : 0;

  return {
    adRevenue,
    organicRevenue,
    grossTotal,
    totalRevenue,
    grossProfit,
    taxAmount,
    afterTaxProfit,
    totalExpenses,
    netProfit,
    roi,
  };
}

export type SectorPreset = {
  id: string;
  name: LocalizedString;
  inputs: GrowthInputs;
};

/**
 * ÖNEMLİ NOT: Bu rakamlar gerçek, doğrulanmış sektör ortalamaları DEĞİLDİR.
 * Hesaplayıcının nasıl çalıştığını göstermek için seçilmiş, makul ama
 * illüstratif varsayımlardır. Gerçek müşteri/vaka verisi elde edildikçe
 * bu değerler güncellenmeli ve mümkünse kaynak eklenmelidir
 * (bkz: önceki konuşmamızdaki "kaynaksız veri" riski).
 */
export const sectorPresets: SectorPreset[] = [
  {
    id: "gida",
    name: { tr: "Gıda", en: "Food & Beverage" },
    inputs: { marketingOps: 4000, adSpend: 8000, roas: 3.5, salesCount: 1200, avgBasket: 35, margin: 25, taxRate: 20 },
  },
  {
    id: "kozmetik-guzellik",
    name: { tr: "Kozmetik ve Güzellik", en: "Cosmetics & Beauty" },
    inputs: { marketingOps: 6000, adSpend: 15000, roas: 5, salesCount: 900, avgBasket: 60, margin: 45, taxRate: 20 },
  },
  {
    id: "insaat-emlak",
    name: { tr: "İnşaat ve Emlak", en: "Construction & Real Estate" },
    inputs: { marketingOps: 8000, adSpend: 20000, roas: 2.5, salesCount: 15, avgBasket: 8000, margin: 30, taxRate: 20 },
  },
  {
    id: "otomotiv",
    name: { tr: "Otomotiv", en: "Automotive" },
    inputs: { marketingOps: 7000, adSpend: 18000, roas: 3, salesCount: 40, avgBasket: 2500, margin: 20, taxRate: 20 },
  },
  {
    id: "eticaret-giyim",
    name: { tr: "E-Ticaret ve Giyim Perakende", en: "E-Commerce & Apparel Retail" },
    inputs: { marketingOps: 5000, adSpend: 12000, roas: 4.5, salesCount: 2000, avgBasket: 25, margin: 35, taxRate: 20 },
  },
  {
    id: "erp-kurumsal-yazilim",
    name: { tr: "Kurumsal Yazılım / ERP", en: "Enterprise Software / ERP" },
    inputs: { marketingOps: 10000, adSpend: 15000, roas: 2, salesCount: 5, avgBasket: 25000, margin: 55, taxRate: 20 },
  },
  {
    id: "imalat",
    name: { tr: "Endüstriyel Üretim / İmalat", en: "Industrial Manufacturing" },
    inputs: { marketingOps: 6000, adSpend: 10000, roas: 2.2, salesCount: 20, avgBasket: 4000, margin: 22, taxRate: 20 },
  },
  {
    id: "lojistik",
    name: { tr: "Lojistik ve Tedarik Zinciri", en: "Logistics & Supply Chain" },
    inputs: { marketingOps: 5000, adSpend: 9000, roas: 2.8, salesCount: 30, avgBasket: 1800, margin: 18, taxRate: 20 },
  },
  {
    id: "medikal-cihaz",
    name: { tr: "Medikal Cihaz / Sağlık Teknolojileri", en: "Medical Devices / Health Tech" },
    inputs: { marketingOps: 9000, adSpend: 16000, roas: 2.4, salesCount: 10, avgBasket: 12000, margin: 40, taxRate: 20 },
  },
  {
    id: "b2b-saas",
    name: { tr: "B2B SaaS", en: "B2B SaaS" },
    inputs: { marketingOps: 8000, adSpend: 14000, roas: 3.2, salesCount: 25, avgBasket: 3000, margin: 60, taxRate: 20 },
  },
];