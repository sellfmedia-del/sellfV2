import type {
  AuditDimension, BusinessModel, DimensionScore, Locale, PrimaryGoal, ScannedAsset, ScannedPage,
  SurfaceAuditResult, SurfaceFinding,
} from './types.ts'

type RuleOutcome = 'pass' | 'fail' | 'unknown'
type RuleEvaluation = {
  code: string
  dimension: AuditDimension
  weight: number
  outcome: RuleOutcome
  finding?: SurfaceFinding
}

const dimensions: AuditDimension[] = ['discoverability', 'conversion', 'trust', 'measurement', 'technical', 'consistency']

const copy = {
  tr: {
    verdict: {
      ready: ['Dijital yüzey karar üretmeye hazır', 'Taranabilen varlıklarda kritik bir altyapı kopukluğu görülmedi. İyileştirmeler büyümeyi hızlandırabilir ancak temel akış çalışıyor.'],
      conditional: ['Büyüme potansiyeli var, fakat yüzeyde önemli sızıntılar bulunuyor', 'Kritik olmayan fakat ticari sonucu ve ölçüm güvenini zayıflatan sorunlar tespit edildi. Öncelikli bulgular çözülmeden trafik veya bütçe artışı beklenen sonucu vermeyebilir.'],
      notReady: ['Dijital yüzey büyümeyi güvenle taşıyamıyor', 'Dönüşüm, ölçüm veya erişilebilirlik katmanında kritik kopukluklar bulundu. Yeni yatırım öncesinde bu altyapı sorunları giderilmeli.'],
      review: ['Yeterli doğrulanabilir kanıt bulunamadı', 'Motor yalnızca gözlemleyebildiği sinyalleri değerlendirir. Erişilemeyen varlıkları veri dışa aktarımı veya manuel kanıtla tamamlayın.'],
    },
  },
  en: {
    verdict: {
      ready: ['The digital surface is ready to support decisions', 'No critical infrastructure break was found in the assets that could be verified. Improvements can accelerate growth, but the core path is working.'],
      conditional: ['Growth potential exists, but important leaks remain', 'Issues that weaken commercial outcomes or measurement confidence were detected. Increasing traffic or budget before resolving them may not produce the expected result.'],
      notReady: ['The digital surface cannot support growth reliably', 'Critical breaks were found in conversion, measurement or accessibility. Resolve these infrastructure issues before increasing investment.'],
      review: ['Not enough verifiable evidence was available', 'The engine evaluates only observable signals. Complete inaccessible assets with an export or manual evidence.'],
    },
  },
} as const

function finding(
  locale: Locale,
  code: string,
  severity: SurfaceFinding['severity'],
  dimension: AuditDimension,
  tr: [string, string, string, string?],
  en: [string, string, string, string?],
  page?: ScannedPage,
): SurfaceFinding {
  const value = locale === 'tr' ? tr : en
  return {code, severity, dimension, title: value[0], detail: value[1], evidence: value[2], action: value[3], assetUrl: page?.url}
}

function pageRules(page: ScannedPage, kind: ScannedAsset['kind'], locale: Locale, goal: PrimaryGoal): RuleEvaluation[] {
  const ok = page.status >= 200 && page.status < 400 && !page.fetchError
  if (!ok) return [{
    code: 'page-unreachable', dimension: 'technical', weight: 12, outcome: 'fail',
    finding: finding(locale, 'page-unreachable', 'critical', 'technical',
      ['Varlığa erişilemiyor', 'Girilen URL başarılı bir yanıt üretmedi.', `HTTP durumu: ${page.status || 'yanıt yok'}`, 'URL, yönlendirme ve erişim kurallarını kontrol edin.'],
      ['The asset is unreachable', 'The submitted URL did not return a successful response.', `HTTP status: ${page.status || 'no response'}`, 'Review the URL, redirects and access rules.'], page),
  }]

  const isLanding = kind === 'landing'
  const requiresConversion = goal === 'lead' || goal === 'sale'
  const hasTitle = page.title.trim().length >= 10 && page.title.trim().length <= 65
  const hasDescription = page.description.trim().length >= 50 && page.description.trim().length <= 180
  const rules: RuleEvaluation[] = [
    {code: 'https', dimension: 'technical', weight: 8, outcome: page.url.startsWith('https://') ? 'pass' : 'fail', finding: !page.url.startsWith('https://') ? finding(locale, 'https', 'critical', 'technical', ['Güvenli bağlantı kullanılmıyor', 'Sayfa HTTPS üzerinden sunulmuyor.', page.url, 'HTTPS yönlendirmesini zorunlu hâle getirin.'], ['Secure transport is missing', 'The page is not served over HTTPS.', page.url, 'Enforce HTTPS redirects.'], page) : undefined},
    {code: 'viewport', dimension: 'technical', weight: 5, outcome: page.hasViewport ? 'pass' : 'fail', finding: !page.hasViewport ? finding(locale, 'viewport', 'important', 'technical', ['Mobil viewport tanımı bulunamadı', 'Sayfanın mobil cihazlarda beklenen ölçekte görüntülenmesi doğrulanamadı.', '<meta name="viewport"> bulunamadı', 'Responsive viewport etiketi ekleyin.'], ['Mobile viewport is missing', 'Correct mobile scaling could not be verified.', '<meta name="viewport"> was not found', 'Add a responsive viewport tag.'], page) : undefined},
    {code: 'indexable', dimension: 'discoverability', weight: 10, outcome: page.hasNoIndex ? 'fail' : 'pass', finding: page.hasNoIndex ? finding(locale, 'indexable', isLanding ? 'verification' : 'critical', 'discoverability', ['Sayfa arama motorlarına kapalı', 'Noindex sinyali bulundu. Landing page için bilinçli olabilir; ana site için organik erişimi engeller.', 'robots meta: noindex', 'Bu tercihin bilinçli olduğunu doğrulayın.'], ['The page is closed to search engines', 'A noindex signal was found. This may be intentional for a landing page but blocks organic visibility on a core site.', 'robots meta: noindex', 'Confirm that this is intentional.'], page) : undefined},
    {code: 'title', dimension: 'discoverability', weight: 6, outcome: hasTitle ? 'pass' : 'fail', finding: !hasTitle ? finding(locale, 'title', 'important', 'discoverability', ['Başlık etiketi eksik veya zayıf', 'Sayfa başlığı bulunamadı ya da sağlıklı uzunluk aralığının dışında.', `Tespit edilen başlık: ${page.title || 'yok'}`, 'Her sayfa için açıklayıcı ve benzersiz bir title kullanın.'], ['The title tag is missing or weak', 'The page title is absent or outside a useful length range.', `Detected title: ${page.title || 'none'}`, 'Use a descriptive and unique title for each page.'], page) : undefined},
    {code: 'description', dimension: 'discoverability', weight: 4, outcome: hasDescription ? 'pass' : 'fail', finding: !hasDescription ? finding(locale, 'description', 'improvement', 'discoverability', ['Meta açıklama geliştirilmeli', 'Arama sonucu açıklaması bulunamadı veya sağlıklı uzunluk aralığının dışında.', `Karakter sayısı: ${page.description.length}`, 'Sayfanın teklifini ve faydasını anlatan özgün bir açıklama ekleyin.'], ['Meta description needs improvement', 'The search-result description is missing or outside a useful length range.', `Character count: ${page.description.length}`, 'Add a unique description that explains the offer and value.'], page) : undefined},
    {code: 'canonical', dimension: 'discoverability', weight: 4, outcome: page.canonical ? 'pass' : 'fail', finding: !page.canonical ? finding(locale, 'canonical', 'improvement', 'discoverability', ['Canonical sinyali bulunamadı', 'Tercih edilen sayfa adresi arama motorlarına açıkça bildirilmiyor.', 'rel="canonical" bulunamadı', 'Sayfanın kendisini işaret eden canonical etiketi ekleyin.'], ['Canonical signal is missing', 'The preferred page URL is not declared explicitly.', 'rel="canonical" was not found', 'Add a self-referencing canonical tag.'], page) : undefined},
    {code: 'heading', dimension: 'conversion', weight: 6, outcome: page.h1Count === 1 ? 'pass' : 'fail', finding: page.h1Count !== 1 ? finding(locale, 'heading', 'important', 'conversion', ['Ana mesaj hiyerarşisi belirsiz', 'Sayfada tam olarak bir ana başlık bulunması beklenir.', `H1 sayısı: ${page.h1Count}`, 'Tek ve açıklayıcı bir ana başlık kullanın.'], ['The primary message hierarchy is unclear', 'The page should contain exactly one primary heading.', `H1 count: ${page.h1Count}`, 'Use one clear primary heading.'], page) : undefined},
    {code: 'cta', dimension: 'conversion', weight: 10, outcome: page.ctaCount > 0 ? 'pass' : 'fail', finding: page.ctaCount === 0 ? finding(locale, 'cta', requiresConversion ? 'critical' : 'important', 'conversion', ['Net bir aksiyon çağrısı bulunamadı', 'Taranan içerikte kullanıcıyı sonraki adıma taşıyan belirgin bir CTA sinyali görülmedi.', 'CTA eşleşmesi: 0', 'Sayfanın ana hedefiyle uyumlu tek birincil aksiyon tanımlayın.'], ['No clear call to action was found', 'No visible CTA signal was detected to move the visitor to a next step.', 'CTA matches: 0', 'Define one primary action aligned with the page goal.'], page) : undefined},
    {code: 'form-or-contact', dimension: 'conversion', weight: 9, outcome: page.forms > 0 || page.hasContactLink ? 'pass' : (requiresConversion ? 'fail' : 'unknown'), finding: requiresConversion && page.forms === 0 && !page.hasContactLink ? finding(locale, 'form-or-contact', 'critical', 'conversion', ['Dönüşüm yolu doğrulanamadı', 'Lead veya satış hedefi seçildi ancak form ya da iletişim geçişi bulunamadı.', 'Form: 0 · İletişim bağlantısı: yok', 'Form, rezervasyon, satın alma veya iletişim yolunu görünür hâle getirin.'], ['The conversion path could not be verified', 'Lead or sales was selected as the goal, but no form or contact path was found.', 'Forms: 0 · Contact link: none', 'Expose a form, booking, purchase or contact path.'], page) : undefined},
    {code: 'measurement', dimension: 'measurement', weight: 10, outcome: page.hasAnalytics || page.hasTagManager ? 'pass' : 'fail', finding: !page.hasAnalytics && !page.hasTagManager ? finding(locale, 'measurement', 'critical', 'measurement', ['Ölçüm altyapısı bulunamadı', 'Sayfada yaygın analytics veya tag manager sinyali tespit edilmedi.', 'GA/GTM sinyali: yok', 'Temel analytics ve dönüşüm ölçümünü kurun.'], ['Measurement infrastructure was not found', 'No common analytics or tag-manager signal was detected.', 'GA/GTM signal: none', 'Implement core analytics and conversion measurement.'], page) : undefined},
    {code: 'conversion-event', dimension: 'measurement', weight: 6, outcome: page.forms === 0 ? 'unknown' : (page.hasTagManager || page.hasAnalytics ? 'pass' : 'fail'), finding: page.forms > 0 && !page.hasTagManager && !page.hasAnalytics ? finding(locale, 'conversion-event', 'critical', 'measurement', ['Form var, ölçümü doğrulanamıyor', 'Dönüşüm formu bulundu ancak ölçüm altyapısı sinyali görülmedi.', `Form sayısı: ${page.forms}`, 'Form gönderimini açık bir dönüşüm eventiyle ölçün.'], ['A form exists but measurement is unverified', 'A conversion form was found without a measurement-infrastructure signal.', `Form count: ${page.forms}`, 'Track form submission with a defined conversion event.'], page) : undefined},
    {code: 'privacy', dimension: 'trust', weight: 5, outcome: page.hasPrivacyLink ? 'pass' : 'fail', finding: !page.hasPrivacyLink ? finding(locale, 'privacy', 'important', 'trust', ['Gizlilik bağlantısı bulunamadı', 'Kullanıcı verisi toplayan bir dijital yüzeyde gizlilik bilgilendirmesi görünür olmalı.', 'Gizlilik/KVKK bağlantısı: yok', 'Uygun gizlilik ve veri işleme sayfasına görünür bağlantı ekleyin.'], ['Privacy link was not found', 'A digital surface collecting user data should expose privacy information.', 'Privacy link: none', 'Add a visible link to the relevant privacy notice.'], page) : undefined},
    {code: 'proof', dimension: 'trust', weight: 6, outcome: page.hasProofSignal ? 'pass' : 'fail', finding: !page.hasProofSignal ? finding(locale, 'proof', 'important', 'trust', ['Kanıt ve güven sinyali zayıf', 'Referans, vaka, yorum veya doğrulanabilir sonuç sinyali bulunamadı.', 'Kanıt eşleşmesi: 0', 'Teklifin yanında doğrulanabilir referans veya sonuç gösterin.'], ['Proof and trust signals are weak', 'No reference, case, review or verifiable result signal was found.', 'Proof matches: 0', 'Show verifiable references or outcomes near the offer.'], page) : undefined},
    {code: 'structured-data', dimension: 'discoverability', weight: 4, outcome: page.hasStructuredData ? 'pass' : 'fail', finding: !page.hasStructuredData ? finding(locale, 'structured-data', 'improvement', 'discoverability', ['Yapılandırılmış veri bulunamadı', 'Arama motorlarının sayfa ve işletme bağlamını okumasını kolaylaştıran JSON-LD görülmedi.', 'application/ld+json: yok', 'Uygun Organization, Service, Product veya FAQ şeması ekleyin.'], ['Structured data was not found', 'No JSON-LD was detected to help search engines understand the page and business context.', 'application/ld+json: none', 'Add relevant Organization, Service, Product or FAQ schema.'], page) : undefined},
    {code: 'open-graph', dimension: 'trust', weight: 3, outcome: page.hasOpenGraph ? 'pass' : 'fail', finding: !page.hasOpenGraph ? finding(locale, 'open-graph', 'improvement', 'trust', ['Paylaşım önizlemesi kontrol edilmiyor', 'Open Graph etiketleri bulunmadığı için sosyal paylaşımlar tutarsız görünebilir.', 'og:* etiketi: yok', 'Başlık, açıklama ve görsel için Open Graph etiketleri ekleyin.'], ['Share previews are uncontrolled', 'Without Open Graph tags, social shares may render inconsistently.', 'og:* tags: none', 'Add Open Graph title, description and image tags.'], page) : undefined},
    {code: 'image-alt', dimension: 'technical', weight: 3, outcome: page.imageCount === 0 ? 'unknown' : (page.imagesWithoutAlt / page.imageCount <= .2 ? 'pass' : 'fail'), finding: page.imageCount > 0 && page.imagesWithoutAlt / page.imageCount > .2 ? finding(locale, 'image-alt', 'improvement', 'technical', ['Görsel açıklamalarında eksik var', 'Görsellerin önemli bir bölümünde alt metin bulunamadı.', `${page.imagesWithoutAlt}/${page.imageCount} görselde alt metin yok`, 'Anlam taşıyan görsellere açıklayıcı alt metin ekleyin.'], ['Image descriptions are incomplete', 'A material share of images does not include alt text.', `${page.imagesWithoutAlt}/${page.imageCount} images lack alt text`, 'Add descriptive alt text to meaningful images.'], page) : undefined},
  ]

  if (isLanding) {
    const distractionCount = page.internalLinks.filter((url) => !url.includes('#')).length
    rules.push({code: 'landing-focus', dimension: 'conversion', weight: 6, outcome: distractionCount <= 12 ? 'pass' : 'fail', finding: distractionCount > 12 ? finding(locale, 'landing-focus', 'important', 'conversion', ['Landing page odağı dağılıyor', 'Tek hedefli sayfada çok sayıda dahili çıkış noktası bulundu.', `Dahili bağlantı: ${distractionCount}`, 'Ana dönüşüm dışındaki navigasyon ve çıkışları azaltın.'], ['The landing page is losing focus', 'Too many internal exits were found on a single-goal page.', `Internal links: ${distractionCount}`, 'Reduce navigation and exits unrelated to the primary conversion.'], page) : undefined})
  }
  return rules
}

function socialRules(asset: ScannedAsset, locale: Locale): RuleEvaluation[] {
  const content = asset.evidenceText.trim()
  if (!content && asset.pages.length === 0) return [{
    code: 'social-unverified', dimension: 'consistency', weight: 0, outcome: 'unknown',
    finding: finding(locale, 'social-unverified', 'verification', 'consistency',
      ['Sosyal profil doğrulanamadı', 'Platform herkese açık taramayı engelledi ve manuel kanıt eklenmedi.', 'Okunabilir profil verisi: yok', 'Profil bio’sunu, bağlantısını ve son içerik özetini kanıt alanına yapıştırın.'],
      ['The social profile could not be verified', 'The platform blocked public scanning and no manual evidence was provided.', 'Readable profile data: none', 'Paste the profile bio, link and recent content summary into the evidence field.']),
  }]
  const lower = content.toLocaleLowerCase(locale === 'tr' ? 'tr-TR' : 'en-US')
  const hasUrl = /https?:\/\/|www\.|linktr\.ee|beacons\.ai|\.com\b|\.net\b/.test(lower)
  const hasContact = /@|email|e-posta|iletişim|contact|whatsapp|dm\b|mesaj/.test(lower)
  const hasCta = /incele|keşfet|başvur|kayıt|satın al|randevu|iletişime geç|learn|discover|apply|register|buy|book|contact/.test(lower)
  const enoughContext = content.length >= 80
  return [
    {code: 'social-context', dimension: 'trust', weight: 5, outcome: enoughContext ? 'pass' : 'fail', finding: !enoughContext ? finding(locale, 'social-context', 'important', 'trust', ['Profil bağlamı yetersiz', 'Okunabilen profil kanıtı markanın ne sunduğunu açıklamak için çok kısa.', `Okunabilen karakter: ${content.length}`, 'Bio, kategori ve sabitlenmiş içerik bilgisini ekleyin.'], ['Profile context is insufficient', 'The readable profile evidence is too short to explain what the brand offers.', `Readable characters: ${content.length}`, 'Include the bio, category and pinned-content information.']) : undefined},
    {code: 'social-link', dimension: 'conversion', weight: 8, outcome: hasUrl ? 'pass' : 'fail', finding: !hasUrl ? finding(locale, 'social-link', 'critical', 'conversion', ['Profilde doğrulanabilir hedef bağlantı yok', 'Sosyal profil ile markanın sahip olduğu dönüşüm yüzeyi arasında bağlantı tespit edilmedi.', 'URL eşleşmesi: 0', 'Profile ölçülebilir ve çalışan bir hedef bağlantı ekleyin.'], ['No verifiable destination link was found', 'No link was detected between the social profile and an owned conversion surface.', 'URL matches: 0', 'Add a measurable and working destination link to the profile.']) : undefined},
    {code: 'social-contact', dimension: 'conversion', weight: 5, outcome: hasContact ? 'pass' : 'fail', finding: !hasContact ? finding(locale, 'social-contact', 'important', 'conversion', ['İletişim yolu görünür değil', 'Okunabilen profil verisinde iletişim veya mesaj yönlendirmesi bulunamadı.', 'İletişim sinyali: yok', 'Hedefe uygun iletişim veya mesaj yolunu görünür kılın.'], ['The contact path is not visible', 'No contact or messaging direction was found in the readable profile data.', 'Contact signal: none', 'Expose a contact or messaging path aligned with the goal.']) : undefined},
    {code: 'social-cta', dimension: 'conversion', weight: 4, outcome: hasCta ? 'pass' : 'fail', finding: !hasCta ? finding(locale, 'social-cta', 'improvement', 'conversion', ['Profil aksiyona yönlendirmiyor', 'Bio veya paylaşılan kanıtlarda belirgin bir sonraki adım bulunamadı.', 'CTA eşleşmesi: 0', 'Bio veya sabitlenmiş içerikte tek bir ana aksiyon tanımlayın.'], ['The profile does not direct action', 'No clear next step was found in the bio or submitted evidence.', 'CTA matches: 0', 'Define one primary action in the bio or pinned content.']) : undefined},
  ]
}

function crossAssetRules(assets: ScannedAsset[], locale: Locale): RuleEvaluation[] {
  const usable = assets.filter((asset) => asset.pages.length || asset.evidenceText.trim())
  if (usable.length < 2) return [{code: 'cross-asset', dimension: 'consistency', weight: 0, outcome: 'unknown'}]
  const webPages = usable.flatMap((asset) => asset.pages)
  const emailSets = webPages.map((page) => page.emails.map((item) => item.toLowerCase())).filter((items) => items.length)
  const phoneSets = webPages.map((page) => page.phones.map((item) => item.replace(/\D/g, '').slice(-10))).filter((items) => items.length)
  const socialLinks = new Set(webPages.flatMap((page) => page.socialLinks))
  const hasSharedEmail = emailSets.length < 2 || emailSets.every((items) => items.some((item) => emailSets[0].includes(item)))
  const hasSharedPhone = phoneSets.length < 2 || phoneSets.every((items) => items.some((item) => phoneSets[0].includes(item)))
  const hasSocialConnection = assets.some((asset) => asset.kind === 'social') ? socialLinks.size > 0 : true
  return [
    {code: 'contact-consistency', dimension: 'consistency', weight: 8, outcome: hasSharedEmail && hasSharedPhone ? 'pass' : 'fail', finding: !hasSharedEmail || !hasSharedPhone ? finding(locale, 'contact-consistency', 'important', 'consistency', ['İletişim bilgileri varlıklar arasında ayrışıyor', 'Taranan sayfalarda ortak e-posta veya telefon bilgisi doğrulanamadı.', `E-posta kümeleri: ${emailSets.length} · Telefon kümeleri: ${phoneSets.length}`, 'Aktif iletişim bilgilerini tüm dijital yüzeylerde eşitleyin.'], ['Contact details differ across assets', 'A common email address or phone number could not be verified across scanned pages.', `Email sets: ${emailSets.length} · Phone sets: ${phoneSets.length}`, 'Synchronize active contact details across all digital surfaces.']) : undefined},
    {code: 'social-connection', dimension: 'consistency', weight: 6, outcome: hasSocialConnection ? 'pass' : 'fail', finding: !hasSocialConnection ? finding(locale, 'social-connection', 'important', 'consistency', ['Website ile sosyal varlık arasında bağ bulunamadı', 'Sosyal profil eklendi ancak taranan website sayfalarında sosyal bağlantı görülmedi.', 'Website sosyal bağlantısı: 0', 'Website ve sosyal profiller arasında iki yönlü, güncel bağlantı kurun.'], ['No connection was found between the website and social asset', 'A social profile was submitted, but no social link was found on the scanned website pages.', 'Website social links: 0', 'Create current, two-way links between the website and social profiles.']) : undefined},
  ]
}

function businessModelRules(assets: ScannedAsset[], businessModel: BusinessModel, locale: Locale): RuleEvaluation[] {
  const pages = assets.flatMap((asset) => asset.pages).filter((page) => !page.fetchError && page.status >= 200 && page.status < 400)
  if (!pages.length) return []
  const internalLinks = pages.flatMap((page) => page.internalLinks)
  const hasCommercePath = pages.some((page) => page.hasPricingSignal) || internalLinks.some((url) => /product|urun|ürün|shop|magaza|mağaza|cart|sepet|checkout|odeme|ödeme/i.test(url))
  const hasLeadPath = pages.some((page) => page.forms > 0 || page.hasContactLink)
  const hasProof = pages.some((page) => page.hasProofSignal)
  if (businessModel === 'ecommerce') return [{
    code: 'commerce-path', dimension: 'conversion', weight: 10, outcome: hasCommercePath ? 'pass' : 'fail',
    finding: !hasCommercePath ? finding(locale, 'commerce-path', 'critical', 'conversion',
      ['Ticari ürün yolu doğrulanamadı', 'E-ticaret modeli seçildi ancak ürün, sepet, ödeme veya fiyat yoluna dair gözlemlenebilir bir sinyal bulunamadı.', 'Ürün/fiyat/sepet bağlantısı: yok', 'Ana sayfadan ürüne ve ödeme adımına kesintisiz bir yol kurun.'],
      ['The commerce path could not be verified', 'Ecommerce was selected, but no observable product, cart, checkout or pricing path was found.', 'Product/pricing/cart link: none', 'Create an uninterrupted path from the main page to product and checkout.']) : undefined,
  }]
  if (businessModel === 'b2b' || businessModel === 'service') return [
    {code: 'model-lead-path', dimension: 'conversion', weight: 8, outcome: hasLeadPath ? 'pass' : 'fail', finding: !hasLeadPath ? finding(locale, 'model-lead-path', 'critical', 'conversion', ['Talep oluşturma yolu doğrulanamadı', 'Seçilen iş modelinde form, randevu veya doğrudan iletişim yolu beklenir.', 'Taranan varlıklarda lead yolu: yok', 'Teklif, randevu veya iletişim akışını görünür hâle getirin.'], ['The demand-generation path could not be verified', 'The selected model requires a form, booking or direct contact path.', 'Lead path across scanned assets: none', 'Expose a quote, booking or contact flow.']) : undefined},
    {code: 'model-proof', dimension: 'trust', weight: 7, outcome: hasProof ? 'pass' : 'fail', finding: !hasProof ? finding(locale, 'model-proof', 'important', 'trust', ['Karar verici için ticari kanıt bulunamadı', 'B2B ve hizmet kararlarında referans, vaka veya doğrulanmış sonuç beklenir.', 'Taranan varlıklarda kanıt sinyali: yok', 'Karar yoluna ilgili vaka ve doğrulanabilir sonuçlar ekleyin.'], ['No commercial proof was found for the buyer', 'B2B and service decisions require references, cases or verified outcomes.', 'Proof signal across scanned assets: none', 'Add relevant cases and verifiable outcomes to the decision path.']) : undefined},
  ]
  if (businessModel === 'saas') return [{
    code: 'saas-evaluation-path', dimension: 'conversion', weight: 8, outcome: hasLeadPath || hasCommercePath ? 'pass' : 'fail',
    finding: !hasLeadPath && !hasCommercePath ? finding(locale, 'saas-evaluation-path', 'critical', 'conversion', ['Ürün değerlendirme yolu bulunamadı', 'Yazılım modeli seçildi ancak demo, deneme, fiyat veya kayıt yolu doğrulanamadı.', 'Demo/deneme/fiyat/kayıt sinyali: yok', 'Ziyaretçiye ürünü deneyebileceği veya değerlendirebileceği net bir yol sunun.'], ['No product-evaluation path was found', 'Software was selected, but no demo, trial, pricing or signup path could be verified.', 'Demo/trial/pricing/signup signal: none', 'Give visitors a clear way to try or evaluate the product.']) : undefined,
  }]
  return []
}

function calculateDimensions(evaluations: RuleEvaluation[]): Record<AuditDimension, DimensionScore> {
  return Object.fromEntries(dimensions.map((dimension) => {
    const related = evaluations.filter((rule) => rule.dimension === dimension)
    const known = related.filter((rule) => rule.outcome !== 'unknown' && rule.weight > 0)
    const applicableWeight = known.reduce((sum, rule) => sum + rule.weight, 0)
    const passedWeight = known.filter((rule) => rule.outcome === 'pass').reduce((sum, rule) => sum + rule.weight, 0)
    return [dimension, {
      score: applicableWeight ? Math.round((passedWeight / applicableWeight) * 100) : null,
      passedWeight, applicableWeight, verifiedChecks: known.length, totalChecks: related.length,
    }]
  })) as Record<AuditDimension, DimensionScore>
}

function positiveFinding(locale: Locale, rule: RuleEvaluation): SurfaceFinding {
  const messages: Partial<Record<string, {tr: [string, string, string]; en: [string, string, string]}>> = {
    https: {tr: ['Güvenli bağlantı aktif', 'Taranan yüzey HTTPS üzerinden güvenli biçimde sunuluyor.', 'HTTPS otomatik olarak doğrulandı'], en: ['Secure transport is active', 'The scanned surface is served securely over HTTPS.', 'HTTPS was verified automatically']},
    indexable: {tr: ['Organik erişim açık', 'Sayfayı arama motorlarından kaldıran bir noindex sinyali görülmedi.', 'Robots meta kontrolü geçti'], en: ['Organic access is open', 'No noindex signal was found that would remove the page from search.', 'Robots meta check passed']},
    cta: {tr: ['Aksiyon yolu görünür', 'Kullanıcıyı sonraki adıma taşıyan CTA sinyalleri doğrulandı.', 'CTA metinleri sayfa içeriğinde bulundu'], en: ['The action path is visible', 'CTA signals that move visitors to a next step were verified.', 'CTA language was found in page content']},
    'form-or-contact': {tr: ['Dönüşüm yolu mevcut', 'Form veya doğrudan iletişim geçişi başarıyla doğrulandı.', 'Form/iletişim kontrolü geçti'], en: ['A conversion path exists', 'A form or direct contact route was verified successfully.', 'Form/contact check passed']},
    measurement: {tr: ['Temel ölçüm sinyali aktif', 'Analytics veya tag manager kurulumu sayfa kaynaklarında doğrulandı.', 'GA/GTM kaynak sinyali bulundu'], en: ['Core measurement signal is active', 'Analytics or tag-manager installation was verified in page sources.', 'GA/GTM source signal found']},
    privacy: {tr: ['Gizlilik bilgisi görünür', 'Gizlilik, KVKK veya veri işleme bağlantısı doğrulandı.', 'Gizlilik bağlantısı bulundu'], en: ['Privacy information is visible', 'A privacy or data-processing link was verified.', 'Privacy link found']},
    proof: {tr: ['Ticari kanıt sunuluyor', 'Referans, vaka veya doğrulanabilir sonuç sinyali bulundu.', 'Kanıt dili sayfa içeriğinde doğrulandı'], en: ['Commercial proof is present', 'A reference, case or verifiable outcome signal was found.', 'Proof language was verified in page content']},
    'structured-data': {tr: ['Yapılandırılmış veri aktif', 'Arama motorları için JSON-LD işaretlemesi doğrulandı.', 'application/ld+json bulundu'], en: ['Structured data is active', 'JSON-LD markup for search engines was verified.', 'application/ld+json found']},
    'commerce-path': {tr: ['Ticari yol bağlı', 'Ürün, fiyat, sepet veya ödeme yönlendirmesi doğrulandı.', 'E-ticaret yol sinyali bulundu'], en: ['The commerce path is connected', 'A product, pricing, cart or checkout direction was verified.', 'Commerce-path signal found']},
    'model-lead-path': {tr: ['Talep oluşturma yolu bağlı', 'İş modeline uygun form, randevu veya iletişim akışı doğrulandı.', 'Lead yolu varlıklar genelinde bulundu'], en: ['The demand path is connected', 'A form, booking or contact flow aligned with the business model was verified.', 'Lead path found across assets']},
    'model-proof': {tr: ['Karar verici kanıtı mevcut', 'B2B veya hizmet kararı için vaka ve referans sinyali doğrulandı.', 'Kanıt sinyali varlıklar genelinde bulundu'], en: ['Buyer proof is present', 'Case and reference signals for a B2B or service decision were verified.', 'Proof signal found across assets']},
    'social-link': {tr: ['Sosyal profil hedefe bağlı', 'Profil kanıtında markanın sahip olduğu bir hedef bağlantı bulundu.', 'Profil URL kontrolü geçti'], en: ['The social profile connects to a destination', 'An owned destination link was found in the profile evidence.', 'Profile URL check passed']},
  }
  const message = messages[rule.code]
  const selected = message?.[locale] || (locale === 'tr'
    ? ['Doğrulanmış güçlü sinyal', 'Bu kontrol gözlemlenebilir kanıtla başarıyla geçti.', `Başarılı kontrol: ${rule.code}`]
    : ['Verified strong signal', 'This check passed with observable evidence.', `Passed check: ${rule.code}`])
  return {code: `positive-${rule.code}`, severity: 'positive', dimension: rule.dimension, title: selected[0], detail: selected[1], evidence: selected[2]}
}

export function auditSurface(assets: ScannedAsset[], locale: Locale, businessModel: BusinessModel, primaryGoal: PrimaryGoal, requestedAssets = assets.length): SurfaceAuditResult {
  const evaluations = assets.flatMap((asset) => asset.kind === 'social'
    ? socialRules(asset, locale)
    : asset.pages.flatMap((page) => pageRules(page, asset.kind, locale, primaryGoal)))
  evaluations.push(...businessModelRules(assets, businessModel, locale))
  evaluations.push(...crossAssetRules(assets, locale))
  const dimensionsResult = calculateDimensions(evaluations)
  const scored = Object.values(dimensionsResult).filter((item) => item.score !== null && item.applicableWeight > 0)
  const totalWeight = scored.reduce((sum, item) => sum + item.applicableWeight, 0)
  const score = totalWeight ? Math.round(scored.reduce((sum, item) => sum + item.passedWeight, 0) / totalWeight * 100) : null
  const findings = evaluations.flatMap((rule) => rule.outcome === 'fail' && rule.finding ? [rule.finding] : [])
  const verificationNotes = evaluations.flatMap((rule) => rule.finding?.severity === 'verification' ? [rule.finding] : [])
  for (const asset of assets.filter((item) => item.source === 'unavailable')) {
    verificationNotes.push(finding(locale, `unavailable-${asset.id}`, 'verification', 'technical',
      ['Varlık taranamadı', 'Motor bu varlığa erişemedi; sonuç skora olumsuz yansıtılmadı.', asset.warnings.join(' · ') || asset.requestedUrl, 'URL’yi kontrol edin veya manuel kanıt ekleyin.'],
      ['The asset could not be scanned', 'The engine could not access this asset; it was not scored as a failure.', asset.warnings.join(' · ') || asset.requestedUrl, 'Review the URL or add manual evidence.']))
  }
  const strengths = evaluations
    .filter((rule) => rule.outcome === 'pass' && rule.weight >= 6)
    .filter((rule, index, all) => all.findIndex((item) => item.code === rule.code) === index)
    .slice(0, 5)
    .map((rule) => positiveFinding(locale, rule))
  const priorities = findings
    .filter((item) => item.severity === 'critical' || item.severity === 'important')
    .sort((a, b) => (a.severity === b.severity ? 0 : a.severity === 'critical' ? -1 : 1))
    .slice(0, 8)
  const verifiedChecks = Object.values(dimensionsResult).reduce((sum, item) => sum + item.verifiedChecks, 0)
  const scannedAssets = assets.filter((asset) => asset.source !== 'unavailable').length
  const coverage = requestedAssets ? scannedAssets / requestedAssets : 0
  const confidence = verifiedChecks >= 24 && coverage >= .8 ? 'high' : verifiedChecks >= 10 && coverage >= .5 ? 'medium' : 'limited'
  const criticalCount = findings.filter((item) => item.severity === 'critical').length
  const verdictKey = score === null || confidence === 'limited' ? 'review' : criticalCount >= 2 || score < 45 ? 'notReady' : criticalCount || score < 72 ? 'conditional' : 'ready'
  const verdictCopy = copy[locale].verdict[verdictKey]
  return {
    score, confidence, scannedAssets, requestedAssets,
    scannedPages: assets.reduce((sum, asset) => sum + asset.pages.length, 0), dimensions: dimensionsResult,
    findings, strengths, priorities, verificationNotes,
    verdict: {status: verdictKey === 'notReady' ? 'not-ready' : verdictKey, title: verdictCopy[0], detail: verdictCopy[1]},
  }
}
