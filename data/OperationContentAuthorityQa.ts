import type {
  OperationCard,
  OperationContent,
  OperationFaq,
  OperationLocalizedText,
} from "@/data/OperationContentTypes";

const l = (tr: string, en: string): OperationLocalizedText => ({ tr, en });
const c = (trTitle: string, enTitle: string, trBody: string, enBody: string): OperationCard => ({
  title: l(trTitle, enTitle),
  body: l(trBody, enBody),
});
const q = (trQuestion: string, enQuestion: string, trAnswer: string, enAnswer: string): OperationFaq => ({
  question: l(trQuestion, enQuestion),
  answer: l(trAnswer, enAnswer),
});

function replaceCard(items: OperationCard[], enTitle: string, next: OperationCard): OperationCard[] {
  return items.map((item) => (item.title.en === enTitle ? next : item));
}

function replaceFaq(items: OperationFaq[], enQuestion: string, next: OperationFaq): OperationFaq[] {
  return items.map((item) => (item.question.en === enQuestion ? next : item));
}

export function applyOperationAuthorityQa(content: OperationContent): OperationContent {
  switch (content.slug) {
    case "email-marketing":
      return {
        ...content,
        queryThemes: [
          l("e-posta pazarlaması", "email marketing"),
          l("email marketing ajansı", "email marketing agency"),
          l("e-posta deliverability", "email deliverability"),
          l("lifecycle email marketing", "lifecycle email marketing"),
        ],
        snapshot: {
          ...content.snapshot,
          manages: l(
            "List hygiene, segmentasyon, sender authentication, deliverability, template/content, lifecycle akışları, suppression, test, CRM senkronizasyonu ve revenue reporting kapsamın parçası olabilir.",
            "Scope can include list hygiene, segmentation, sender authentication, deliverability, templates/content, lifecycle flows, suppression, testing, CRM synchronization and revenue reporting.",
          ),
        },
        scope: replaceCard(
          content.scope,
          "Deliverability & List Health",
          c(
            "Deliverability & Liste Sağlığı",
            "Deliverability & List Health",
            "Gönderim hacmi ve alıcı ekosistemine göre SPF/DKIM doğrulaması, toplu gönderimde DMARC, TLS, list hygiene, bounce/complaint sinyalleri, suppression ve gerektiğinde one-click unsubscribe gereklilikleri kontrol edilir.",
            "According to sending volume and recipient ecosystem, we review SPF/DKIM authentication, DMARC for bulk sending, TLS, list hygiene, bounce/complaint signals, suppression and one-click unsubscribe requirements where applicable.",
          ),
        ),
        faq: replaceFaq(
          content.faq,
          "Do you review deliverability issues?",
          q(
            "Deliverability sorunlarını inceliyor musunuz?",
            "Do you review deliverability issues?",
            "Evet. Gmail'in güncel gönderen gerekliliklerini de dikkate alırız: tüm gönderenlerde SPF veya DKIM ve TLS gibi temel kontrolleri; kişisel Gmail hesaplarına günde 5.000'den fazla ileti gönderenlerde SPF + DKIM + DMARC, alignment ve pazarlama/abonelik iletilerinde one-click unsubscribe gerekliliklerini kontrol ederiz. Spam/complaint, bounce, list hygiene ve gönderim paterni de teşhisin parçasıdır.",
            "Yes. We account for current Gmail sender requirements: foundational checks such as SPF or DKIM and TLS for all senders, and for senders exceeding 5,000 messages per day to personal Gmail accounts, SPF + DKIM + DMARC, alignment, plus one-click unsubscribe for marketing/subscribed mail. Spam/complaint signals, bounces, list hygiene and sending patterns are also part of diagnosis.",
          ),
        ),
      };

    case "linkedin-ads-management":
      return {
        ...content,
        queryThemes: [
          l("LinkedIn Ads yönetimi", "LinkedIn Ads management"),
          l("B2B LinkedIn reklamları", "B2B LinkedIn advertising"),
          l("LinkedIn qualified lead optimizasyonu", "LinkedIn qualified lead optimization"),
          l("LinkedIn ABM reklamları", "LinkedIn ABM ads"),
        ],
        snapshot: {
          ...content.snapshot,
          manages: l(
            "ICP/audience, Matched Audiences, Lead Gen Forms veya website flow, creative, budget, Insight Tag, Conversions API veya CRM Sync, qualified lead sinyalleri, routing ve pipeline/revenue reporting kapsamın parçası olabilir.",
            "Scope can include ICP/audiences, Matched Audiences, Lead Gen Forms or website flows, creative, budgets, Insight Tag, Conversions API or CRM Sync, qualified-lead signals, routing and pipeline/revenue reporting.",
          ),
        },
        scope: replaceCard(
          content.scope,
          "CRM & Pipeline Measurement",
          c(
            "CRM & Pipeline Ölçümü",
            "CRM & Pipeline Measurement",
            "Qualified lead sinyalleri uygun yapıda Conversions API veya CRM Sync üzerinden LinkedIn'e geri beslenebilir; qualification, opportunity, pipeline ve revenue sonuçları campaign/account seviyesinde okunur ve uygun hesaplarda Revenue Attribution Report ile desteklenir.",
            "Qualified-lead signals can be fed back to LinkedIn through Conversions API or CRM Sync where appropriate; qualification, opportunity, pipeline and revenue outcomes are read at campaign/account level and can be supported by Revenue Attribution Report where available.",
          ),
        ),
        faq: replaceFaq(
          content.faq,
          "Which KPIs do you use for LinkedIn Ads?",
          q(
            "LinkedIn Ads'i hangi KPI'larla ölçüyorsunuz?",
            "Which KPIs do you use for LinkedIn Ads?",
            "Delivery, CTR ve CPL yalnızca diagnostic katmandır. Qualified lead, cost per qualified lead, opportunity rate, pipeline value, win rate ve revenue gibi downstream metrikleri mümkün olduğunda CRM/CAPI verisiyle bağlarız; medya optimizasyonunu yalnız form hacmine göre yapmayız.",
            "Delivery, CTR and CPL are diagnostic. Where data allows, we connect qualified leads, cost per qualified lead, opportunity rate, pipeline value, win rate and revenue through CRM/CAPI signals rather than optimizing media on form volume alone.",
          ),
        ),
      };

    case "tiktok-ads-management":
      return {
        ...content,
        queryThemes: [
          l("TikTok Ads yönetimi", "TikTok Ads management"),
          l("TikTok reklam ajansı", "TikTok ads agency"),
          l("TikTok Smart+ kampanyaları", "TikTok Smart+ campaigns"),
          l("TikTok Spark Ads", "TikTok Spark Ads"),
        ],
        snapshot: {
          ...content.snapshot,
          manages: l(
            "Manual veya Smart+ campaign architecture, native/Spark creative, audience ve placement kontrolleri, Pixel/Events API, event mapping, catalog/shop use-case'leri, budget/bidding, attribution ve reporting kapsamın parçası olabilir.",
            "Scope can include manual or Smart+ campaign architecture, native/Spark creative, audience and placement controls, Pixel/Events API, event mapping, catalog/shop use cases, budgets/bidding, attribution and reporting.",
          ),
        },
        decisions: [
          ...content.decisions,
          q(
            "Smart+ mı manuel kampanya mı kullanmalıyız?",
            "Should we use Smart+ or manual campaigns?",
            "Tek bir doğru yoktur. TikTok'un güncel Smart+ deneyimi full automation, partial automation ve manual control arasında daha esnek seçenekler sunuyor. Seçimi objective, conversion data, creative supply, catalog ve ihtiyaç duyulan kontrol seviyesine göre yaparız; otomasyonu sırf mevcut diye zorlamayız.",
            "There is no universal winner. TikTok's current Smart+ experience provides more flexibility across full automation, partial automation and manual control. We choose according to objective, conversion data, creative supply, catalog and required control rather than forcing automation simply because it is available.",
          ),
        ],
      };

    case "google-performance-max-management":
      return {
        ...content,
        queryThemes: [
          l("Performance Max yönetimi", "Performance Max management"),
          l("PMax optimizasyonu", "PMax optimization"),
          l("PMax search themes", "Performance Max search themes"),
          l("PMax negatif anahtar kelimeler", "Performance Max negative keywords"),
        ],
        scope: replaceCard(
          content.scope,
          "Brand & URL Controls",
          c(
            "Brand, Query & URL Kontrolleri",
            "Brand, Query & URL Controls",
            "Brand exclusions, negative keywords, Search Themes, Final URL expansion, URL exclusions ve gerektiğinde page feed gibi kontroller campaign'in hangi talebe ve hangi landing page'lere erişeceğini business objective'e göre sınırlar veya yönlendirir.",
            "Brand exclusions, negative keywords, Search Themes, Final URL expansion, URL exclusions and, where useful, page feeds are governed according to the business objective to guide which demand and landing pages the campaign can reach.",
          ),
        ),
        faq: replaceFaq(
          content.faq,
          "Do you manage brand controls in PMax?",
          q(
            "PMax'te brand, query ve URL kontrolü yapıyor musunuz?",
            "Do you manage brand, query and URL controls in PMax?",
            "Evet. Hesap hedeflerine göre brand exclusions ve negative keywords ile istenmeyen sorgular kontrol edilir; Search Themes doğru intent'i yönlendirmek için kullanılır. Final URL expansion açık olduğunda URL exclusions ile istenmeyen sayfalar engellenebilir; tek veya kontrollü landing-page seti gerektiğinde Final URL expansion ve page-feed yaklaşımı ayrıca değerlendirilir.",
            "Yes. Depending on account goals, brand exclusions and negative keywords help control unwanted queries while Search Themes guide high-value intent. When Final URL expansion is enabled, URL exclusions can prevent traffic to unwanted pages; if a tightly controlled landing-page set is required, Final URL expansion and page-feed strategy are evaluated accordingly.",
          ),
        ),
      };

    case "meta-ads-management":
      return {
        ...content,
        queryThemes: [
          l("Meta Ads yönetimi", "Meta Ads management"),
          l("Facebook Instagram reklam ajansı", "Facebook Instagram ads agency"),
          l("Meta Advantage+", "Meta Advantage+ advertising"),
          l("Meta Conversions API", "Meta Conversions API"),
        ],
        snapshot: {
          ...content.snapshot,
          manages: l(
            "Account/campaign architecture, Advantage+ veya manual placement/creative kontrolleri, Pixel & Conversions API, audience/first-party sinyalleri, creative testing, catalog use-case'leri, budget ve attribution/reporting kapsamın parçası olabilir.",
            "Scope can include account/campaign architecture, Advantage+ or manual placement/creative controls, Pixel & Conversions API, audience/first-party signals, creative testing, catalog use cases, budgets and attribution/reporting.",
          ),
        },
      };

    case "amazon-marketplace-management":
      return {
        ...content,
        queryThemes: [
          l("Amazon marketplace yönetimi", "Amazon marketplace management"),
          l("Amazon Seller Central yönetimi", "Amazon Seller Central management"),
          l("Amazon satış danışmanlığı", "Amazon seller consulting"),
          l("Amazon FBA yönetimi", "Amazon FBA management"),
        ],
        problems: replaceCard(
          content.problems,
          "Featured Offer loss reduces sales",
          c(
            "Featured Offer kaybı satış düşürüyor",
            "Featured Offer loss reduces sales",
            "Amazon 2026'da ayrı seller-eligibility adımını kaldırırken Featured Offer seçimini sürdürüyor. Competitive pricing, delivery speed ve seller performance gibi customer-relevant sinyaller offer selection/competitiveness üzerinde rol oynayabilir; değerlendirilmek Featured Offer garantisi değildir.",
            "Amazon is removing the separate seller-eligibility step in 2026 while retaining Featured Offer selection. Customer-relevant signals such as competitive pricing, delivery speed and seller performance can influence selection and competitiveness; being considered does not guarantee the Featured Offer.",
          ),
        ),
        decisions: replaceFaq(
          content.decisions,
          "Is the lowest price required for the Featured Offer?",
          q(
            "Featured Offer için en düşük fiyat şart mı?",
            "Is the lowest price required for the Featured Offer?",
            "Hayır. Amazon, Featured Offer seçiminde competitive pricing yanında delivery speed ve performance gibi müşteri açısından önemli faktörleri değerlendirdiğini belirtiyor. Kesin ağırlıklar veya kazanma garantisi varsaymayız; fiyatı margin guardrail'larını bozacak şekilde tek başına optimize etmeyiz.",
            "No. Amazon states that Featured Offer selection considers customer-important factors such as competitive pricing, delivery speed and performance. We do not assume fixed weights or a guarantee of selection, and we do not optimize price in isolation from margin guardrails.",
          ),
        ),
      };

    case "ai-search-generative-engine-optimization":
      return {
        ...content,
        decisions: replaceFaq(
          content.decisions,
          "Is llms.txt required for GEO?",
          q(
            "GEO için llms.txt şart mı?",
            "Is llms.txt required for GEO?",
            "Hayır. Google Search'in güncel resmi rehberi llms.txt dosyalarını generative AI görünürlüğü veya ranking için kullanmadığını ve bu dosyaların Google Search'e ne fayda ne zarar sağladığını açıkça belirtiyor. Başka servisler bu dosyaları kullanabilir; ancak Google için crawl/index, kaliteli people-first içerik ve sağlam SEO temeli önceliklidir.",
            "No. Google's current official guidance says Google Search does not use llms.txt for generative-AI visibility or ranking, and that maintaining one neither helps nor hurts Google Search. Other services may use such files, but for Google the priorities remain crawl/index accessibility, valuable people-first content and strong SEO foundations.",
          ),
        ),
        faq: replaceFaq(
          content.faq,
          "Can visibility in ChatGPT and AI search be improved?",
          q(
            "ChatGPT ve AI aramalarında görünürlük artırılabilir mi?",
            "Can visibility in ChatGPT and AI search be improved?",
            "Teknik erişilebilirlik, entity clarity, original expertise, kaynaklanabilir bilgi ve doğrudan cevaplanan içerik sistematik olarak iyileştirilebilir. ChatGPT Search tarafında OpenAI, içeriklerin summaries/snippets içinde keşfedilip kaynaklanabilmesi için OAI-SearchBot'un robots.txt veya ağ katmanında engellenmemesini öneriyor. Buna rağmen belirli bir prompt, sıra veya citation sonucu garanti edilemez.",
            "Technical accessibility, entity clarity, original expertise, sourceable information and directly answerable content can be improved systematically. For ChatGPT Search, OpenAI recommends not blocking OAI-SearchBot in robots.txt or at the network layer if you want content to be discoverable and eligible for summaries/snippets and citations. Even then, no specific prompt, position or citation outcome can be guaranteed.",
          ),
        ),
      };

    case "technical-seo":
      return {
        ...content,
        queryThemes: [
          l("teknik SEO", "technical SEO"),
          l("technical SEO audit", "technical SEO audit"),
          l("Core Web Vitals", "Core Web Vitals"),
          l("JavaScript SEO", "JavaScript SEO"),
        ],
        decisions: replaceFaq(
          content.decisions,
          "Are Core Web Vitals the decisive ranking factor?",
          q(
            "Core Web Vitals ranking için tek başına belirleyici mi?",
            "Are Core Web Vitals the decisive ranking factor?",
            "Hayır. LCP, INP ve CLS kullanıcı deneyimini ölçen önemli performans sinyalleridir; tek başına ranking sonucu belirlemez. İçerik relevance/quality, crawl-index sağlığı ve diğer sinyallerle birlikte değerlendirilir. Yine de ciddi performans sorunlarını kullanıcı deneyimi ve rendering maliyeti nedeniyle önceliklendiririz.",
            "No. LCP, INP and CLS are important user-experience performance signals, but they do not determine rankings by themselves. They are considered alongside content relevance/quality, crawl-index health and other signals. Severe performance problems still deserve priority because they affect users and rendering cost.",
          ),
        ),
      };

    case "ui-ux-design":
      return {
        ...content,
        faq: replaceFaq(
          content.faq,
          "Is accessibility considered?",
          q(
            "Accessibility dikkate alınıyor mu?",
            "Is accessibility considered?",
            "Evet. Scope'a göre WCAG 2.2 kriterleri referans alınarak semantic hierarchy, contrast, keyboard/focus davranışı, focus'un görünür ve obscured olmaması, touch target'lar, error/validation ve component states tasarım-handoff sürecine dahil edilir. Bu yaklaşım otomatik olarak resmi accessibility sertifikasyonu iddiası değildir; hedef ve test kapsamı proje başında netleştirilir.",
            "Yes. Depending on scope, WCAG 2.2 is used as a reference for semantic hierarchy, contrast, keyboard/focus behavior, keeping focus visible and unobscured, touch targets, errors/validation and component states during design and handoff. This does not automatically imply formal accessibility certification; the target and testing scope are defined for the project.",
          ),
        ),
      };

    case "corporate-website-development":
      return {
        ...content,
        scope: replaceCard(
          content.scope,
          "SEO, Performance & Accessibility",
          c(
            "SEO, Performance & Accessibility",
            "SEO, Performance & Accessibility",
            "Server/render output, metadata, canonical/hreflang, structured data ve crawl davranışı; Core Web Vitals ve WCAG 2.2 odaklı semantic, keyboard/focus ve interaction kontrolleriyle birlikte release öncesi QA edilir.",
            "Server/render output, metadata, canonicals/hreflang, structured data and crawl behavior are QA'd before release alongside Core Web Vitals and WCAG 2.2-oriented semantic, keyboard/focus and interaction checks.",
          ),
        ),
      };

    default:
      return content;
  }
}
