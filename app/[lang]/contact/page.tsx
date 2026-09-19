import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
  const {lang}=await params; const en=lang==="en";
  const title=en?"Contact Sellf | Projects and Career Opportunities":"Sellf ile İletişim | İş Birliği ve Kariyer Fırsatları";
  const description=en?"Discuss a growth project with Sellf or introduce yourself to the Sellf Talent Network. Find our Istanbul and New York offices and contact details.":"Sellf ile yeni bir büyüme projesini konuşun veya Sellf Talent Network’e katılmak için kendinizi tanıtın. İstanbul ve New York ofislerimize ulaşın.";
  return {title,description,alternates:{canonical:`https://www.sellfmedia.com/${lang}/contact`,languages:{tr:"https://www.sellfmedia.com/tr/contact",en:"https://www.sellfmedia.com/en/contact"}},openGraph:{title,description,url:`https://www.sellfmedia.com/${lang}/contact`,type:"website",images:[{url:"/images/contact/join-team.webp",width:1800,height:1013,alt:"Sellf Media team"}]}};
}

export default async function ContactPage({searchParams}:{searchParams:Promise<{path?:string}>}){
  const {path}=await searchParams;
  const initialChoice=path==="work"||path==="careers"?path:null;
  const jsonLd={"@context":"https://schema.org","@type":"ContactPage","@id":"https://www.sellfmedia.com/contact#contact-page",about:{"@id":"https://www.sellfmedia.com/#organization"},mainEntity:{"@id":"https://www.sellfmedia.com/#organization"}};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/><ContactClient initialChoice={initialChoice}/></>;
}
