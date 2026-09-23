import type {
  AuditDimension, AuditPillar, BusinessModel, DimensionScore, Locale, PrimaryGoal, ScannedAsset, ScannedPage,
  SurfaceAuditResult, SurfaceFinding,
} from './types.ts'

type RuleOutcome = 'pass' | 'fail' | 'unknown'
type RuleEvaluation = {
  code: string
  dimension: AuditDimension
  weight: number
  outcome: RuleOutcome
  finding?: SurfaceFinding
  assetId?: string
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

function pageRules(page: ScannedPage, kind: ScannedAsset['kind'], locale: Locale, goal: PrimaryGoal, isPrimaryPage: boolean): RuleEvaluation[] {
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
  let canonicalExternal = false
  if (page.canonical) {
    try { canonicalExternal = new URL(page.canonical, page.url).origin !== new URL(page.url).origin } catch { canonicalExternal = true }
  }
  const rules: RuleEvaluation[] = [
    {code: 'https', dimension: 'technical', weight: 8, outcome: page.url.startsWith('https://') ? 'pass' : 'fail', finding: !page.url.startsWith('https://') ? finding(locale, 'https', 'critical', 'technical', ['Güvenli bağlantı kullanılmıyor', 'Sayfa HTTPS üzerinden sunulmuyor.', page.url, 'HTTPS yönlendirmesini zorunlu hâle getirin.'], ['Secure transport is missing', 'The page is not served over HTTPS.', page.url, 'Enforce HTTPS redirects.'], page) : undefined},
    {code: 'viewport', dimension: 'technical', weight: 5, outcome: page.hasViewport ? 'pass' : 'fail', finding: !page.hasViewport ? finding(locale, 'viewport', 'important', 'technical', ['Mobil viewport tanımı bulunamadı', 'Sayfanın mobil cihazlarda beklenen ölçekte görüntülenmesi doğrulanamadı.', '<meta name="viewport"> bulunamadı', 'Responsive viewport etiketi ekleyin.'], ['Mobile viewport is missing', 'Correct mobile scaling could not be verified.', '<meta name="viewport"> was not found', 'Add a responsive viewport tag.'], page) : undefined},
    {code: 'indexable', dimension: 'discoverability', weight: 10, outcome: page.hasNoIndex ? 'fail' : 'pass', finding: page.hasNoIndex ? finding(locale, 'indexable', isLanding ? 'verification' : 'critical', 'discoverability', ['Sayfa arama motorlarına kapalı', 'Noindex sinyali bulundu. Landing page için bilinçli olabilir; ana site için organik erişimi engeller.', 'robots meta: noindex', 'Bu tercihin bilinçli olduğunu doğrulayın.'], ['The page is closed to search engines', 'A noindex signal was found. This may be intentional for a landing page but blocks organic visibility on a core site.', 'robots meta: noindex', 'Confirm that this is intentional.'], page) : undefined},
    {code: 'title', dimension: 'discoverability', weight: 6, outcome: hasTitle ? 'pass' : 'fail', finding: !hasTitle ? finding(locale, 'title', 'important', 'discoverability', ['Başlık etiketi eksik veya zayıf', 'Sayfa başlığı bulunamadı ya da sağlıklı uzunluk aralığının dışında.', `Tespit edilen başlık: ${page.title || 'yok'}`, 'Her sayfa için açıklayıcı ve benzersiz bir title kullanın.'], ['The title tag is missing or weak', 'The page title is absent or outside a useful length range.', `Detected title: ${page.title || 'none'}`, 'Use a descriptive and unique title for each page.'], page) : undefined},
    {code: 'description', dimension: 'discoverability', weight: 4, outcome: hasDescription ? 'pass' : 'fail', finding: !hasDescription ? finding(locale, 'description', 'improvement', 'discoverability', ['Meta açıklama geliştirilmeli', 'Arama sonucu açıklaması bulunamadı veya sağlıklı uzunluk aralığının dışında.', `Karakter sayısı: ${page.description.length}`, 'Sayfanın teklifini ve faydasını anlatan özgün bir açıklama ekleyin.'], ['Meta description needs improvement', 'The search-result description is missing or outside a useful length range.', `Character count: ${page.description.length}`, 'Add a unique description that explains the offer and value.'], page) : undefined},
    {code: 'canonical', dimension: 'discoverability', weight: 4, outcome: page.canonical ? 'pass' : 'fail', finding: !page.canonical ? finding(locale, 'canonical', 'improvement', 'discoverability', ['Canonical sinyali bulunamadı', 'Tercih edilen sayfa adresi arama motorlarına açıkça bildirilmiyor.', 'rel="canonical" bulunamadı', 'Sayfanın kendisini işaret eden canonical etiketi ekleyin.'], ['Canonical signal is missing', 'The preferred page URL is not declared explicitly.', 'rel="canonical" was not found', 'Add a self-referencing canonical tag.'], page) : undefined},
    {code: 'canonical-origin', dimension: 'discoverability', weight: 5, outcome: !page.canonical ? 'unknown' : canonicalExternal ? 'fail' : 'pass', finding: canonicalExternal ? finding(locale, 'canonical-origin', 'important', 'discoverability', ['Canonical başka bir domaine işaret ediyor', 'Arama motorlarına tercih edilen kaynak olarak farklı bir origin bildiriliyor.', page.canonical, 'Domainler arası canonical tercihinin bilinçli olduğunu doğrulayın.'], ['The canonical points to another domain', 'A different origin is declared as the preferred source for search engines.', page.canonical, 'Confirm that the cross-domain canonical is intentional.'], page) : undefined},
    {code: 'heading', dimension: 'conversion', weight: 6, outcome: page.h1Count === 1 ? 'pass' : 'fail', finding: page.h1Count !== 1 ? finding(locale, 'heading', 'important', 'conversion', ['Ana mesaj hiyerarşisi belirsiz', 'Sayfada tam olarak bir ana başlık bulunması beklenir.', `H1 sayısı: ${page.h1Count}`, 'Tek ve açıklayıcı bir ana başlık kullanın.'], ['The primary message hierarchy is unclear', 'The page should contain exactly one primary heading.', `H1 count: ${page.h1Count}`, 'Use one clear primary heading.'], page) : undefined},
    {code: 'cta', dimension: 'conversion', weight: 10, outcome: page.ctaCount > 0 ? 'pass' : 'fail', finding: page.ctaCount === 0 ? finding(locale, 'cta', requiresConversion && (isLanding || isPrimaryPage) ? 'critical' : 'important', 'conversion', ['Net bir aksiyon çağrısı bulunamadı', 'Taranan içerikte kullanıcıyı sonraki adıma taşıyan belirgin bir CTA sinyali görülmedi.', 'CTA eşleşmesi: 0', 'Sayfanın ana hedefiyle uyumlu tek birincil aksiyon tanımlayın.'], ['No clear call to action was found', 'No visible CTA signal was detected to move the visitor to a next step.', 'CTA matches: 0', 'Define one primary action aligned with the page goal.'], page) : undefined},
    {code: 'form-or-contact', dimension: 'conversion', weight: 9, outcome: page.forms > 0 || page.hasContactLink ? 'pass' : (requiresConversion ? 'fail' : 'unknown'), finding: requiresConversion && page.forms === 0 && !page.hasContactLink ? finding(locale, 'form-or-contact', 'critical', 'conversion', ['Dönüşüm yolu doğrulanamadı', 'Lead veya satış hedefi seçildi ancak form ya da iletişim geçişi bulunamadı.', 'Form: 0 · İletişim bağlantısı: yok', 'Form, rezervasyon, satın alma veya iletişim yolunu görünür hâle getirin.'], ['The conversion path could not be verified', 'Lead or sales was selected as the goal, but no form or contact path was found.', 'Forms: 0 · Contact link: none', 'Expose a form, booking, purchase or contact path.'], page) : undefined},
    {code: 'measurement', dimension: 'measurement', weight: 10, outcome: page.hasAnalytics || page.hasTagManager ? 'pass' : 'fail', finding: !page.hasAnalytics && !page.hasTagManager ? finding(locale, 'measurement', 'critical', 'measurement', ['Ölçüm altyapısı bulunamadı', 'Sayfada yaygın analytics veya tag manager sinyali tespit edilmedi.', 'GA/GTM sinyali: yok', 'Temel analytics ve dönüşüm ölçümünü kurun.'], ['Measurement infrastructure was not found', 'No common analytics or tag-manager signal was detected.', 'GA/GTM signal: none', 'Implement core analytics and conversion measurement.'], page) : undefined},
    {code: 'conversion-event', dimension: 'measurement', weight: 6, outcome: page.forms === 0 ? 'unknown' : (page.hasTagManager || page.hasAnalytics ? 'pass' : 'fail'), finding: page.forms > 0 && !page.hasTagManager && !page.hasAnalytics ? finding(locale, 'conversion-event', 'critical', 'measurement', ['Form var, ölçümü doğrulanamıyor', 'Dönüşüm formu bulundu ancak ölçüm altyapısı sinyali görülmedi.', `Form sayısı: ${page.forms}`, 'Form gönderimini açık bir dönüşüm eventiyle ölçün.'], ['A form exists but measurement is unverified', 'A conversion form was found without a measurement-infrastructure signal.', `Form count: ${page.forms}`, 'Track form submission with a defined conversion event.'], page) : undefined},
    {code: 'privacy', dimension: 'trust', weight: 5, outcome: page.hasPrivacyLink ? 'pass' : 'fail', finding: !page.hasPrivacyLink ? finding(locale, 'privacy', 'important', 'trust', ['Gizlilik bağlantısı bulunamadı', 'Kullanıcı verisi toplayan bir dijital yüzeyde gizlilik bilgilendirmesi görünür olmalı.', 'Gizlilik/KVKK bağlantısı: yok', 'Uygun gizlilik ve veri işleme sayfasına görünür bağlantı ekleyin.'], ['Privacy link was not found', 'A digital surface collecting user data should expose privacy information.', 'Privacy link: none', 'Add a visible link to the relevant privacy notice.'], page) : undefined},
    {code: 'proof', dimension: 'trust', weight: 6, outcome: page.hasProofSignal ? 'pass' : 'fail', finding: !page.hasProofSignal ? finding(locale, 'proof', 'important', 'trust', ['Kanıt ve güven sinyali zayıf', 'Referans, vaka, yorum veya doğrulanabilir sonuç sinyali bulunamadı.', 'Kanıt eşleşmesi: 0', 'Teklifin yanında doğrulanabilir referans veya sonuç gösterin.'], ['Proof and trust signals are weak', 'No reference, case, review or verifiable result signal was found.', 'Proof matches: 0', 'Show verifiable references or outcomes near the offer.'], page) : undefined},
    {code: 'structured-data', dimension: 'discoverability', weight: 4, outcome: page.hasStructuredData ? 'pass' : 'fail', finding: !page.hasStructuredData ? finding(locale, 'structured-data', 'improvement', 'discoverability', ['Yapılandırılmış veri bulunamadı', 'Arama motorlarının sayfa ve işletme bağlamını okumasını kolaylaştıran JSON-LD görülmedi.', 'application/ld+json: yok', 'Uygun Organization, Service, Product veya FAQ şeması ekleyin.'], ['Structured data was not found', 'No JSON-LD was detected to help search engines understand the page and business context.', 'application/ld+json: none', 'Add relevant Organization, Service, Product or FAQ schema.'], page) : undefined},
    {code: 'open-graph', dimension: 'trust', weight: 3, outcome: page.hasOpenGraph ? 'pass' : 'fail', finding: !page.hasOpenGraph ? finding(locale, 'open-graph', 'improvement', 'trust', ['Paylaşım önizlemesi kontrol edilmiyor', 'Open Graph etiketleri bulunmadığı için sosyal paylaşımlar tutarsız görünebilir.', 'og:* etiketi: yok', 'Başlık, açıklama ve görsel için Open Graph etiketleri ekleyin.'], ['Share previews are uncontrolled', 'Without Open Graph tags, social shares may render inconsistently.', 'og:* tags: none', 'Add Open Graph title, description and image tags.'], page) : undefined},
    {code: 'image-alt', dimension: 'technical', weight: 3, outcome: page.imageCount === 0 ? 'unknown' : (page.imagesWithoutAlt / page.imageCount <= .2 ? 'pass' : 'fail'), finding: page.imageCount > 0 && page.imagesWithoutAlt / page.imageCount > .2 ? finding(locale, 'image-alt', 'improvement', 'technical', ['Görsel açıklamalarında eksik var', 'Görsellerin önemli bir bölümünde alt metin bulunamadı.', `${page.imagesWithoutAlt}/${page.imageCount} görselde alt metin yok`, 'Anlam taşıyan görsellere açıklayıcı alt metin ekleyin.'], ['Image descriptions are incomplete', 'A material share of images does not include alt text.', `${page.imagesWithoutAlt}/${page.imageCount} images lack alt text`, 'Add descriptive alt text to meaningful images.'], page) : undefined},
    {code: 'html-syntax', dimension: 'technical', weight: 4, outcome: (page.htmlIssues?.length || 0) === 0 ? 'pass' : 'fail', finding: page.htmlIssues?.length ? finding(locale, 'html-syntax', 'important', 'technical', ['HTML yapısında syntax sorunları bulundu', 'Tarayıcının otomatik düzeltmesine bırakılan geçersiz HTML yapıları tespit edildi.', page.htmlIssues.join(' · '), 'Kaynak HTML’i standartlara uygun hâle getirip tekrar doğrulayın.'], ['HTML syntax issues were found', 'Invalid HTML structures that rely on browser recovery were detected.', page.htmlIssues.join(' · '), 'Correct the source HTML and validate it again.'], page) : undefined},
    {code: 'duplicate-ids', dimension: 'technical', weight: 3, outcome: (page.duplicateIds || 0) === 0 ? 'pass' : 'fail', finding: page.duplicateIds ? finding(locale, 'duplicate-ids', 'important', 'technical', ['Tekrarlanan HTML ID değerleri bulundu', 'Aynı ID’nin birden fazla öğede kullanılması erişilebilirlik ve script davranışlarını bozabilir.', `Tekrarlanan ID: ${page.duplicateIds}`, 'Her ID değerini sayfa içinde benzersiz yapın.'], ['Duplicate HTML IDs were found', 'Reusing an ID can break accessibility relationships and script behavior.', `Duplicate IDs: ${page.duplicateIds}`, 'Make every ID unique within the document.'], page) : undefined},
    {code: 'form-labels', dimension: 'technical', weight: 4, outcome: page.formFields === 0 ? 'unknown' : (page.unlabeledFields || 0) === 0 ? 'pass' : 'fail', finding: page.unlabeledFields ? finding(locale, 'form-labels', 'important', 'technical', ['Form alanlarının etiketi eksik', 'Bazı alanlar label veya erişilebilir isimle ilişkilendirilemedi.', `Etiketsiz alan: ${page.unlabeledFields}`, 'Her form alanını görünür label veya erişilebilir adla eşleştirin.'], ['Form-field labels are missing', 'Some fields could not be associated with a label or accessible name.', `Unlabelled fields: ${page.unlabeledFields}`, 'Associate every field with a visible label or accessible name.'], page) : undefined},
    {code: 'interactive-names', dimension: 'technical', weight: 2, outcome: (page.unnamedButtons || 0) + (page.emptyLinks || 0) === 0 ? 'pass' : 'fail', finding: (page.unnamedButtons || 0) + (page.emptyLinks || 0) > 0 ? finding(locale, 'interactive-names', 'improvement', 'technical', ['Boş veya isimsiz etkileşim öğeleri var', 'Bazı link ve butonların amacı kod üzerinden anlaşılmıyor.', `Link: ${page.emptyLinks || 0} · Buton: ${page.unnamedButtons || 0}`, 'Boş hedefleri kaldırın; ikon butonlara erişilebilir isim ekleyin.'], ['Empty or unnamed interactive elements exist', 'The purpose of some links and buttons cannot be determined from the markup.', `Links: ${page.emptyLinks || 0} · Buttons: ${page.unnamedButtons || 0}`, 'Remove empty targets and add accessible names to icon buttons.'], page) : undefined},
    {code: 'heading-sequence', dimension: 'technical', weight: 2, outcome: (page.headingSkips || 0) === 0 ? 'pass' : 'fail', finding: page.headingSkips ? finding(locale, 'heading-sequence', 'improvement', 'technical', ['Başlık seviyeleri atlanıyor', 'İçerik hiyerarşisinde bir veya daha fazla heading seviyesi atlanmış.', `Seviye atlaması: ${page.headingSkips}`, 'Başlıkları sıralı ve anlamlı bir hiyerarşide düzenleyin.'], ['Heading levels are skipped', 'One or more levels are skipped in the content hierarchy.', `Level skips: ${page.headingSkips}`, 'Use a sequential and meaningful heading hierarchy.'], page) : undefined},
    {code: 'jsonld-validity', dimension: 'discoverability', weight: 4, outcome: !page.hasStructuredData ? 'unknown' : (page.invalidJsonLd || 0) === 0 ? 'pass' : 'fail', finding: page.invalidJsonLd ? finding(locale, 'jsonld-validity', 'important', 'discoverability', ['JSON-LD syntax hatası bulundu', 'Yapılandırılmış veri etiketi mevcut ancak JSON olarak okunamıyor.', `Geçersiz blok: ${page.invalidJsonLd}`, 'JSON-LD syntax’ını düzeltip schema doğrulaması yapın.'], ['JSON-LD syntax is invalid', 'Structured-data markup exists but cannot be parsed as JSON.', `Invalid blocks: ${page.invalidJsonLd}`, 'Correct the JSON-LD syntax and validate the schema.'], page) : undefined},
    {code: 'mixed-content', dimension: 'technical', weight: 6, outcome: (page.mixedContentCount || 0) === 0 ? 'pass' : 'fail', finding: page.mixedContentCount ? finding(locale, 'mixed-content', 'critical', 'technical', ['Güvensiz içerik çağrıları bulundu', 'HTTPS sayfa içinde HTTP kaynakları çağrılıyor.', `HTTP kaynak: ${page.mixedContentCount}`, 'Tüm kaynak ve bağlantıları HTTPS üzerinden yükleyin.'], ['Mixed-content requests were found', 'The HTTPS page references resources over plain HTTP.', `HTTP resources: ${page.mixedContentCount}`, 'Load every resource and destination over HTTPS.'], page) : undefined},
    {code: 'security-headers', dimension: 'technical', weight: 3, outcome: !isPrimaryPage || !page.securityHeaders ? 'unknown' : Object.values(page.securityHeaders).filter(Boolean).length >= 2 ? 'pass' : 'fail', finding: isPrimaryPage && page.securityHeaders && Object.values(page.securityHeaders).filter(Boolean).length < 2 ? finding(locale, 'security-headers', 'improvement', 'technical', ['Temel güvenlik başlıkları zayıf', 'Yanıtta yaygın tarayıcı güvenlik başlıklarının çoğu bulunamadı.', `Aktif başlık: ${Object.values(page.securityHeaders).filter(Boolean).length}/4`, 'CSP, HSTS, nosniff ve Referrer-Policy başlıklarını değerlendirin.'], ['Core security headers are weak', 'Most common browser security headers were not present in the response.', `Active headers: ${Object.values(page.securityHeaders).filter(Boolean).length}/4`, 'Review CSP, HSTS, nosniff and Referrer-Policy headers.'], page) : undefined},
    {code: 'redirect-depth', dimension: 'technical', weight: 2, outcome: (page.redirectCount || 0) <= 2 ? 'pass' : 'fail', finding: (page.redirectCount || 0) > 2 ? finding(locale, 'redirect-depth', 'improvement', 'technical', ['Yönlendirme zinciri gereğinden uzun', 'Sayfaya ulaşmadan önce birden fazla yönlendirme izleniyor.', `Yönlendirme: ${page.redirectCount}`, 'Bağlantıları doğrudan son URL’ye yönlendirin.'], ['The redirect chain is unnecessarily long', 'Multiple redirects are followed before reaching the page.', `Redirects: ${page.redirectCount}`, 'Point links directly to the final URL.'], page) : undefined},
    {code: 'broken-internal-links', dimension: 'technical', weight: 6, outcome: !page.brokenInternalLinks ? 'unknown' : page.brokenInternalLinks.length === 0 ? 'pass' : 'fail', finding: page.brokenInternalLinks?.length ? finding(locale, 'broken-internal-links', 'important', 'technical', ['Bozuk dahili bağlantılar bulundu', 'Kontrol edilen dahili hedeflerden bazıları başarılı yanıt vermedi.', page.brokenInternalLinks.slice(0, 4).map((item) => `${item.status || 'ERR'} ${item.url}`).join(' · '), 'Bozuk hedefleri düzeltin veya çalışan nihai URL’ye yönlendirin.'], ['Broken internal links were found', 'Some checked internal destinations did not return a successful response.', page.brokenInternalLinks.slice(0, 4).map((item) => `${item.status || 'ERR'} ${item.url}`).join(' · '), 'Fix the broken destinations or redirect them to a working final URL.'], page) : undefined},
  ]

  if (isLanding) {
    const distractionCount = page.internalLinks.filter((url) => !url.includes('#')).length
    rules.push({code: 'landing-focus', dimension: 'conversion', weight: 6, outcome: distractionCount <= 12 ? 'pass' : 'fail', finding: distractionCount > 12 ? finding(locale, 'landing-focus', 'important', 'conversion', ['Landing page odağı dağılıyor', 'Tek hedefli sayfada çok sayıda dahili çıkış noktası bulundu.', `Dahili bağlantı: ${distractionCount}`, 'Ana dönüşüm dışındaki navigasyon ve çıkışları azaltın.'], ['The landing page is losing focus', 'Too many internal exits were found on a single-goal page.', `Internal links: ${distractionCount}`, 'Reduce navigation and exits unrelated to the primary conversion.'], page) : undefined})
  }
  return rules
}

function infrastructureRules(asset: ScannedAsset, locale: Locale): RuleEvaluation[] {
  if (asset.kind !== 'website' && asset.kind !== 'landing') return []
  const rules: RuleEvaluation[] = []
  if (asset.robots) {
    const robots = asset.robots
    rules.push(
      {code: 'robots-syntax', dimension: 'technical', weight: 3, outcome: !robots.exists ? 'unknown' : robots.syntaxIssues.length ? 'fail' : 'pass', finding: robots.syntaxIssues.length ? finding(locale, 'robots-syntax', 'important', 'technical', ['robots.txt syntax sorunları içeriyor', 'Arama motoru yönergelerinin bir bölümü güvenilir biçimde yorumlanamayabilir.', robots.syntaxIssues.join(' · '), 'Dosyadaki yönergeleri satır bazında düzeltin.'], ['robots.txt contains syntax issues', 'Some crawler directives may not be interpreted reliably.', robots.syntaxIssues.join(' · '), 'Correct the affected directives line by line.']) : undefined},
      {code: 'robots-block-all', dimension: 'discoverability', weight: 12, outcome: robots.blocksAll ? 'fail' : 'pass', finding: robots.blocksAll ? finding(locale, 'robots-block-all', 'critical', 'discoverability', ['robots.txt tüm siteyi engelliyor', 'Genel kullanıcı ajanı için kök dizin taramaya kapatılmış.', 'User-agent: * · Disallow: /', 'Bu engel bilinçli değilse kök Disallow kuralını kaldırın.'], ['robots.txt blocks the entire site', 'The root path is disallowed for the general user agent.', 'User-agent: * · Disallow: /', 'Remove the root Disallow rule unless this is intentional.']) : undefined},
    )
  }
  if (asset.kind === 'website' && asset.sitemap) {
    const sitemap = asset.sitemap
    rules.push(
      {code: 'sitemap-present', dimension: 'discoverability', weight: 4, outcome: sitemap.exists ? 'pass' : 'fail', finding: !sitemap.exists ? finding(locale, 'sitemap-present', 'improvement', 'discoverability', ['Sitemap bulunamadı', 'robots.txt bildirimi veya standart sitemap.xml adresi doğrulanamadı.', sitemap.url, 'Güncel XML sitemap yayınlayıp robots.txt içinde bildirin.'], ['A sitemap was not found', 'Neither a robots.txt declaration nor the standard sitemap.xml location could be verified.', sitemap.url, 'Publish an up-to-date XML sitemap and declare it in robots.txt.']) : undefined},
      {code: 'sitemap-valid', dimension: 'discoverability', weight: 4, outcome: !sitemap.exists ? 'unknown' : sitemap.validXml ? 'pass' : 'fail', finding: sitemap.exists && !sitemap.validXml ? finding(locale, 'sitemap-valid', 'important', 'discoverability', ['Sitemap XML olarak geçerli değil', 'Dosya sitemap yapısı veya URL kayıtları olarak okunamadı.', sitemap.errors.join(' · ') || sitemap.url, 'XML yapısını ve loc kayıtlarını düzeltin.'], ['The sitemap is not valid XML', 'The file could not be read as a sitemap structure with URL records.', sitemap.errors.join(' · ') || sitemap.url, 'Correct the XML structure and loc records.']) : undefined},
      {code: 'sitemap-origin', dimension: 'discoverability', weight: 2, outcome: !sitemap.validXml ? 'unknown' : sitemap.foreignUrlCount === 0 ? 'pass' : 'fail', finding: sitemap.foreignUrlCount ? finding(locale, 'sitemap-origin', 'important', 'discoverability', ['Sitemap başka domaine ait URL’ler içeriyor', 'Sitemap içinde taranan website origin’i dışındaki adresler bulundu.', `Farklı origin: ${sitemap.foreignUrlCount}`, 'Her site için yalnızca kendi canonical URL’lerini yayınlayın.'], ['The sitemap contains URLs from another domain', 'Addresses outside the scanned website origin were found.', `Foreign origins: ${sitemap.foreignUrlCount}`, 'Publish only canonical URLs belonging to this site.']) : undefined},
    )
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

function youtubeRules(asset: ScannedAsset, locale: Locale): RuleEvaluation[] {
  const content = asset.evidenceText.trim()
  if (!content && !asset.pages.length) return [{code: 'youtube-unverified', dimension: 'trust', weight: 0, outcome: 'unknown', finding: finding(locale, 'youtube-unverified', 'verification', 'trust', ['YouTube kanalı doğrulanamadı', 'Herkese açık kanal verisi okunamadı ve manuel kanıt eklenmedi.', 'Okunabilir kanal verisi: yok', 'Kanal açıklaması, bağlantıları, playlist ve son yayın tarihlerini ekleyin.'], ['The YouTube channel could not be verified', 'Public channel data was unreadable and no manual evidence was added.', 'Readable channel data: none', 'Add the channel description, links, playlists and recent publish dates.'])}]
  const lower = content.toLowerCase()
  const hasDestination = /https?:\/\/|www\.|\.com\b|\.net\b/.test(lower)
  const hasDescription = content.length >= 120
  const hasOrganization = /playlist|oynatma listesi|series|seri\b|podcast|webinar/.test(lower)
  const hasPublishingEvidence = /(?:20\d{2}[-/.]\d{1,2}[-/.]\d{1,2})|(?:\d+\s*(?:day|week|month|gün|hafta|ay)\s*(?:ago|önce))/.test(lower)
  return [
    {code: 'youtube-description', dimension: 'trust', weight: 6, outcome: hasDescription ? 'pass' : 'fail', finding: !hasDescription ? finding(locale, 'youtube-description', 'important', 'trust', ['Kanal açıklaması markayı yeterince anlatmıyor', 'Okunabilen açıklama teklif, hedef kitle ve uzmanlığı açıklamak için kısa.', `Okunabilen karakter: ${content.length}`, 'Kanal açıklamasına net konumlandırma ve izleyici faydası ekleyin.'], ['The channel description does not explain the brand', 'The readable description is too short to explain the offer, audience and expertise.', `Readable characters: ${content.length}`, 'Add clear positioning and viewer value to the channel description.']) : undefined},
    {code: 'youtube-link', dimension: 'conversion', weight: 8, outcome: hasDestination ? 'pass' : 'fail', finding: !hasDestination ? finding(locale, 'youtube-link', 'critical', 'conversion', ['Kanal sahip olunan bir hedefe bağlanmıyor', 'Website veya dönüşüm yüzeyine giden doğrulanabilir bağlantı bulunamadı.', 'Harici hedef bağlantısı: yok', 'Kanal profiline ölçülebilir website veya landing page bağlantısı ekleyin.'], ['The channel does not connect to an owned destination', 'No verifiable website or conversion-surface link was found.', 'External destination: none', 'Add a measurable website or landing-page link to the channel.']) : undefined},
    {code: 'youtube-organization', dimension: 'trust', weight: 4, outcome: hasOrganization ? 'pass' : 'fail', finding: !hasOrganization ? finding(locale, 'youtube-organization', 'improvement', 'trust', ['İçerik serileri doğrulanamadı', 'Playlist, seri veya format organizasyonuna dair sinyal görülmedi.', 'Playlist/seri sinyali: yok', 'İçerikleri konu ve karar aşamasına göre playlist’lerde gruplayın.'], ['Content series could not be verified', 'No playlist, series or format-organization signal was found.', 'Playlist/series signal: none', 'Group content into playlists by topic and decision stage.']) : undefined},
    {code: 'youtube-recency', dimension: 'consistency', weight: 4, outcome: hasPublishingEvidence ? 'pass' : 'unknown', finding: !hasPublishingEvidence ? finding(locale, 'youtube-recency', 'verification', 'consistency', ['Yayın güncelliği doğrulanamadı', 'Okunabilen veride son yayın tarihleri bulunamadı; skor etkilenmedi.', 'Yayın tarihi sinyali: yok', 'Son üç videonun tarihlerini kanıt alanına ekleyin.'], ['Publishing recency could not be verified', 'No recent publish dates were found in readable data; the score was not reduced.', 'Publish-date signal: none', 'Add the dates of the latest three videos to the evidence field.']) : undefined},
  ]
}

function googleBusinessRules(asset: ScannedAsset, locale: Locale): RuleEvaluation[] {
  const content = asset.evidenceText.trim()
  if (!content && !asset.pages.length) return [{code: 'gmb-unverified', dimension: 'trust', weight: 0, outcome: 'unknown', finding: finding(locale, 'gmb-unverified', 'verification', 'trust', ['Google işletme profili doğrulanamadı', 'Google görünür profil verisi sunmadı ve manuel kanıt eklenmedi.', 'Okunabilir profil verisi: yok', 'Kategori, adres, telefon, website, çalışma saatleri ve yorum özetini ekleyin.'], ['The Google Business Profile could not be verified', 'Google did not expose readable profile data and no manual evidence was added.', 'Readable profile data: none', 'Add category, address, phone, website, hours and review summary.'])}]
  const lower = content.toLowerCase()
  const hasWebsite = /https?:\/\/|www\.|\.com\b|\.net\b/.test(lower)
  const hasPhone = /(?:\+?\d[\d\s().-]{8,}\d)/.test(content)
  const hasHours = /açık|kapalı|çalışma saat|opening hours|open|closed|monday|pazartesi/.test(lower)
  const hasReview = /\b[1-5][.,]\d\b|yorum|değerlendirme|review|rating/.test(lower)
  const hasCategory = /kategori|category|ajans|agency|consult|danışman|store|mağaza|restaurant|service|hizmet/.test(lower)
  return [
    {code: 'gmb-website', dimension: 'conversion', weight: 8, outcome: hasWebsite ? 'pass' : 'fail', finding: !hasWebsite ? finding(locale, 'gmb-website', 'critical', 'conversion', ['İşletme profili website’e bağlanmıyor', 'Sahip olunan dijital yüzeye giden doğrulanabilir bağlantı bulunamadı.', 'Website sinyali: yok', 'Doğru ve ölçülebilir website bağlantısını profile ekleyin.'], ['The business profile does not link to a website', 'No verifiable link to an owned digital surface was found.', 'Website signal: none', 'Add the correct measurable website link to the profile.']) : undefined},
    {code: 'gmb-phone', dimension: 'conversion', weight: 6, outcome: hasPhone ? 'pass' : 'fail', finding: !hasPhone ? finding(locale, 'gmb-phone', 'important', 'conversion', ['Telefon bilgisi doğrulanamadı', 'Okunabilen işletme verisinde aranabilir telefon numarası bulunamadı.', 'Telefon sinyali: yok', 'Aktif telefon numarasını görünür ve güncel tutun.'], ['The phone number could not be verified', 'No callable phone number was found in the readable business data.', 'Phone signal: none', 'Keep an active phone number visible and current.']) : undefined},
    {code: 'gmb-hours', dimension: 'trust', weight: 4, outcome: hasHours ? 'pass' : 'fail', finding: !hasHours ? finding(locale, 'gmb-hours', 'important', 'trust', ['Çalışma saatleri doğrulanamadı', 'Profil kanıtında güncel çalışma saati bilgisi görülmedi.', 'Çalışma saati sinyali: yok', 'Normal ve özel gün saatlerini güncel tutun.'], ['Opening hours could not be verified', 'No current opening-hours information was found in the profile evidence.', 'Hours signal: none', 'Keep regular and holiday hours current.']) : undefined},
    {code: 'gmb-reviews', dimension: 'trust', weight: 6, outcome: hasReview ? 'pass' : 'fail', finding: !hasReview ? finding(locale, 'gmb-reviews', 'important', 'trust', ['Yorum ve puan kanıtı bulunamadı', 'İşletme kararını destekleyecek puan veya yorum sinyali doğrulanamadı.', 'Yorum/puan sinyali: yok', 'Yorum hacmi, puan ve son yorum tarihini kanıt alanına ekleyin.'], ['Review and rating evidence was not found', 'No rating or review signal could be verified to support the business decision.', 'Review/rating signal: none', 'Add review volume, rating and latest-review date to the evidence field.']) : undefined},
    {code: 'gmb-category', dimension: 'discoverability', weight: 5, outcome: hasCategory ? 'pass' : 'fail', finding: !hasCategory ? finding(locale, 'gmb-category', 'important', 'discoverability', ['İşletme kategorisi doğrulanamadı', 'Profilin hangi arama niyetinde görünmesi gerektiğini açıklayan kategori bulunamadı.', 'Kategori sinyali: yok', 'Birincil ve ikincil işletme kategorilerini kanıt alanına ekleyin.'], ['The business category could not be verified', 'No category was found to explain which search intent the profile should serve.', 'Category signal: none', 'Add primary and secondary business categories to the evidence field.']) : undefined},
  ]
}

function emailRules(asset: ScannedAsset, locale: Locale): RuleEvaluation[] {
  const page = asset.pages[0]
  if (!page) return [{code: 'email-unverified', dimension: 'technical', weight: 0, outcome: 'unknown', finding: finding(locale, 'email-unverified', 'verification', 'technical', ['E-posta HTML’i eklenmedi', 'E-posta denetimi için kaynak HTML gereklidir.', 'HTML içeriği: yok', 'Gönderim aracındaki kaynak HTML’i kanıt alanına yapıştırın.'], ['Email HTML was not provided', 'Source HTML is required for the email audit.', 'HTML content: none', 'Paste the source HTML from the sending platform into the evidence field.'])}]
  const html = asset.evidenceText
  const lower = html.toLowerCase()
  const hasUnsubscribe = /unsubscribe|abonelikten çık|abonelikten ayrıl|list-unsubscribe/.test(lower)
  const hasResponsive = /@media\b|max-width\s*:|width\s*:\s*100%/.test(lower)
  const hasTracking = /utm_(?:source|medium|campaign)=|[?&](?:mc_cid|vero_id)=/.test(lower)
  const hasCta = page.ctaCount > 0 || /<a\b[^>]*(?:button|cta)/i.test(html)
  return [
    {code: 'email-html', dimension: 'technical', weight: 5, outcome: (page.htmlIssues?.length || 0) === 0 ? 'pass' : 'fail', finding: page.htmlIssues?.length ? finding(locale, 'email-html', 'important', 'technical', ['E-posta HTML yapısı sorunlu', 'Parser tarafından geçersiz veya riskli HTML yapıları bulundu.', page.htmlIssues.join(' · '), 'Şablon HTML’ini e-posta uyumlu geçerli yapıya dönüştürün.'], ['The email HTML structure is problematic', 'Invalid or risky HTML structures were found by the parser.', page.htmlIssues.join(' · '), 'Convert the template to valid email-compatible HTML.']) : undefined},
    {code: 'email-responsive', dimension: 'technical', weight: 6, outcome: hasResponsive ? 'pass' : 'fail', finding: !hasResponsive ? finding(locale, 'email-responsive', 'critical', 'technical', ['Mobil e-posta yapısı doğrulanamadı', 'Responsive davranış sağlayan media query veya akışkan genişlik sinyali bulunamadı.', 'Responsive CSS sinyali: yok', 'Mobil kırılımlar ve akışkan tablo/görsel kuralları ekleyin.'], ['A mobile email layout could not be verified', 'No media query or fluid-width signal was found for responsive behavior.', 'Responsive CSS signal: none', 'Add mobile breakpoints and fluid table/image rules.']) : undefined},
    {code: 'email-unsubscribe', dimension: 'trust', weight: 8, outcome: hasUnsubscribe ? 'pass' : 'fail', finding: !hasUnsubscribe ? finding(locale, 'email-unsubscribe', 'critical', 'trust', ['Abonelikten çıkış bağlantısı bulunamadı', 'Pazarlama e-postasında görünür unsubscribe sinyali tespit edilmedi.', 'Unsubscribe eşleşmesi: 0', 'Çalışan ve görünür abonelikten çıkış bağlantısı ekleyin.'], ['An unsubscribe link was not found', 'No visible unsubscribe signal was detected in the marketing email.', 'Unsubscribe matches: 0', 'Add a working and visible unsubscribe link.']) : undefined},
    {code: 'email-links', dimension: 'conversion', weight: 5, outcome: (page.emptyLinks || 0) === 0 ? 'pass' : 'fail', finding: page.emptyLinks ? finding(locale, 'email-links', 'important', 'conversion', ['Boş veya isimsiz e-posta bağlantıları var', 'Bazı bağlantıların hedefi veya erişilebilir adı eksik.', `Sorunlu bağlantı: ${page.emptyLinks}`, 'Her bağlantıya geçerli hedef ve anlaşılır metin ekleyin.'], ['Empty or unnamed email links exist', 'Some links are missing a destination or accessible name.', `Problem links: ${page.emptyLinks}`, 'Give every link a valid destination and meaningful text.']) : undefined},
    {code: 'email-alt', dimension: 'technical', weight: 3, outcome: page.imageCount === 0 ? 'unknown' : page.imagesWithoutAlt === 0 ? 'pass' : 'fail', finding: page.imagesWithoutAlt ? finding(locale, 'email-alt', 'important', 'technical', ['E-posta görsellerinde alt metin eksik', 'Görseller kapalıyken mesajın bir bölümü kaybolabilir.', `${page.imagesWithoutAlt}/${page.imageCount} görsel`, 'İçerik taşıyan tüm görsellere kısa alt metin ekleyin.'], ['Email image alt text is incomplete', 'Part of the message may disappear when images are blocked.', `${page.imagesWithoutAlt}/${page.imageCount} images`, 'Add concise alt text to every meaningful image.']) : undefined},
    {code: 'email-cta', dimension: 'conversion', weight: 8, outcome: hasCta ? 'pass' : 'fail', finding: !hasCta ? finding(locale, 'email-cta', 'critical', 'conversion', ['Belirgin e-posta CTA’sı bulunamadı', 'Okuyucuyu bir sonraki adıma taşıyan açık aksiyon sinyali görülmedi.', 'CTA eşleşmesi: 0', 'Tek birincil aksiyonu görünür buton veya bağlantıyla sunun.'], ['No clear email CTA was found', 'No explicit action signal was found to move the reader forward.', 'CTA matches: 0', 'Present one primary action as a visible button or link.']) : undefined},
    {code: 'email-tracking', dimension: 'measurement', weight: 5, outcome: hasTracking ? 'pass' : 'fail', finding: !hasTracking ? finding(locale, 'email-tracking', 'important', 'measurement', ['Kampanya bağlantı ölçümü doğrulanamadı', 'Bağlantılarda UTM veya yaygın kampanya parametresi bulunamadı.', 'Takip parametresi: yok', 'Hedef bağlantılara tutarlı UTM parametreleri ekleyin.'], ['Campaign-link measurement could not be verified', 'No UTM or common campaign parameter was found in links.', 'Tracking parameter: none', 'Add consistent UTM parameters to destination links.']) : undefined},
  ]
}

function crossAssetRules(assets: ScannedAsset[], locale: Locale): RuleEvaluation[] {
  const usable = assets.filter((asset) => asset.pages.length || asset.evidenceText.trim())
  if (usable.length < 2) return [{code: 'cross-asset', dimension: 'consistency', weight: 0, outcome: 'unknown'}]
  const webPages = usable.filter((asset) => asset.kind === 'website' || asset.kind === 'landing').flatMap((asset) => asset.pages)
  const emailSets = webPages.map((page) => page.emails.map((item) => item.toLowerCase())).filter((items) => items.length)
  const phoneSets = webPages.map((page) => page.phones.map((item) => item.replace(/\D/g, '').slice(-10))).filter((items) => items.length)
  const socialLinks = new Set(webPages.flatMap((page) => page.socialLinks))
  const hasSharedEmail = emailSets.length < 2 || emailSets.every((items) => items.some((item) => emailSets[0].includes(item)))
  const hasSharedPhone = phoneSets.length < 2 || phoneSets.every((items) => items.some((item) => phoneSets[0].includes(item)))
  const hasProfileAsset = assets.some((asset) => asset.kind === 'social' || asset.kind === 'youtube' || asset.kind === 'google-business')
  const hasSocialConnection = hasProfileAsset ? socialLinks.size > 0 : true
  return [
    {code: 'contact-consistency', dimension: 'consistency', weight: 8, outcome: hasSharedEmail && hasSharedPhone ? 'pass' : 'fail', finding: !hasSharedEmail || !hasSharedPhone ? finding(locale, 'contact-consistency', 'important', 'consistency', ['İletişim bilgileri varlıklar arasında ayrışıyor', 'Taranan sayfalarda ortak e-posta veya telefon bilgisi doğrulanamadı.', `E-posta kümeleri: ${emailSets.length} · Telefon kümeleri: ${phoneSets.length}`, 'Aktif iletişim bilgilerini tüm dijital yüzeylerde eşitleyin.'], ['Contact details differ across assets', 'A common email address or phone number could not be verified across scanned pages.', `Email sets: ${emailSets.length} · Phone sets: ${phoneSets.length}`, 'Synchronize active contact details across all digital surfaces.']) : undefined},
    {code: 'social-connection', dimension: 'consistency', weight: 6, outcome: hasSocialConnection ? 'pass' : 'fail', finding: !hasSocialConnection ? finding(locale, 'social-connection', 'important', 'consistency', ['Website ile sosyal varlık arasında bağ bulunamadı', 'Sosyal profil eklendi ancak taranan website sayfalarında sosyal bağlantı görülmedi.', 'Website sosyal bağlantısı: 0', 'Website ve sosyal profiller arasında iki yönlü, güncel bağlantı kurun.'], ['No connection was found between the website and social asset', 'A social profile was submitted, but no social link was found on the scanned website pages.', 'Website social links: 0', 'Create current, two-way links between the website and social profiles.']) : undefined},
  ]
}

function businessModelRules(assets: ScannedAsset[], businessModel: BusinessModel, locale: Locale): RuleEvaluation[] {
  const pages = assets.filter((asset) => asset.kind === 'website' || asset.kind === 'landing').flatMap((asset) => asset.pages).filter((page) => !page.fetchError && page.status >= 200 && page.status < 400)
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

function calculateScore(evaluations: RuleEvaluation[]): DimensionScore {
  const known = evaluations.filter((rule) => rule.outcome !== 'unknown' && rule.weight > 0)
  const applicableWeight = known.reduce((sum, rule) => sum + rule.weight, 0)
  const passedWeight = known.filter((rule) => rule.outcome === 'pass').reduce((sum, rule) => sum + rule.weight, 0)
  return {score: applicableWeight ? Math.round(passedWeight / applicableWeight * 100) : null, passedWeight, applicableWeight, verifiedChecks: known.length, totalChecks: evaluations.length}
}

function calculatePillars(evaluations: RuleEvaluation[]): Record<AuditPillar, DimensionScore> {
  const byDimensions = (selected: AuditDimension[]) => calculateScore(evaluations.filter((rule) => selected.includes(rule.dimension)))
  return {
    assetHealth: calculateScore(evaluations.filter((rule) => Boolean(rule.assetId))),
    technicalHealth: byDimensions(['technical', 'discoverability']),
    journeyConnectivity: byDimensions(['conversion', 'measurement']),
    brandConsistency: byDimensions(['trust', 'consistency']),
  }
}

function rulesForAsset(asset: ScannedAsset, locale: Locale, goal: PrimaryGoal): RuleEvaluation[] {
  let rules: RuleEvaluation[]
  if (asset.kind === 'social') rules = socialRules(asset, locale)
  else if (asset.kind === 'youtube') rules = youtubeRules(asset, locale)
  else if (asset.kind === 'google-business') rules = googleBusinessRules(asset, locale)
  else if (asset.kind === 'email') rules = emailRules(asset, locale)
  else rules = [
    ...asset.pages.flatMap((page, index) => pageRules(page, asset.kind, locale, goal, index === 0)),
    ...infrastructureRules(asset, locale),
  ]
  return rules.map((rule) => ({...rule, assetId: asset.id}))
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
  const evaluations = assets.flatMap((asset) => rulesForAsset(asset, locale, primaryGoal))
  evaluations.push(...businessModelRules(assets, businessModel, locale))
  evaluations.push(...crossAssetRules(assets, locale))
  const dimensionsResult = calculateDimensions(evaluations)
  const pillars = calculatePillars(evaluations)
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
  const criticalCount = new Set(findings.filter((item) => item.severity === 'critical').map((item) => item.code)).size
  const verdictKey = score === null || confidence === 'limited' ? 'review' : criticalCount >= 2 || score < 45 ? 'notReady' : criticalCount || score < 72 ? 'conditional' : 'ready'
  const verdictCopy = copy[locale].verdict[verdictKey]
  const assetScores = assets.map((asset) => {
    const related = evaluations.filter((rule) => rule.assetId === asset.id)
    const calculated = calculateScore(related)
    return {assetId: asset.id, kind: asset.kind, score: calculated.score, verifiedChecks: calculated.verifiedChecks, findings: related.filter((rule) => rule.outcome === 'fail').length}
  })
  return {
    score, confidence, scannedAssets, requestedAssets,
    scannedPages: assets.reduce((sum, asset) => sum + asset.pages.length, 0), dimensions: dimensionsResult, pillars, assetScores,
    findings, strengths, priorities, verificationNotes,
    verdict: {status: verdictKey === 'notReady' ? 'not-ready' : verdictKey, title: verdictCopy[0], detail: verdictCopy[1]},
  }
}
