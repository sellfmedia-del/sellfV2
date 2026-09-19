"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { content, goals, talentRoles, workModes, type Lang, type RouteChoice } from "./content";
import styles from "./contact.module.css";

type FormStatus = "idle" | "sending" | "success" | "error";
const Arrow = () => <span aria-hidden="true">↗</span>;

export default function ContactClient({ initialChoice = null }: { initialChoice?: RouteChoice | null }) {
  const params = useParams();
  const lang = ((params?.lang as Lang) || "tr") as Lang;
  const t = content[lang];
  const reducedMotion = useReducedMotion();
  const [choice, setChoice] = useState<RouteChoice | null>(initialChoice);
  const [hoveredChoice, setHoveredChoice] = useState<RouteChoice | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [projectStatus, setProjectStatus] = useState<FormStatus>("idle");
  const [talentStatus, setTalentStatus] = useState<FormStatus>("idle");
  const expandedRef = useRef<HTMLDivElement>(null);

  const playSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx(); const gain = ctx.createGain(); const osc = ctx.createOscillator();
      osc.type = "sine"; osc.frequency.setValueAtTime(330, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.025); gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.23);
      osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.24); osc.addEventListener("ended", () => void ctx.close());
    } catch { /* sound is only an enhancement */ }
  };

  const choose = (next: RouteChoice) => {
    playSound(); setChoice(next);
    const url = new URL(window.location.href); url.searchParams.set("path", next); window.history.replaceState({}, "", url);
    window.setTimeout(() => expandedRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" }), reducedMotion ? 0 : 360);
  };

  const handleForm = async (event: FormEvent<HTMLFormElement>, type: RouteChoice) => {
    event.preventDefault(); const form = event.currentTarget; const setStatus = type === "work" ? setProjectStatus : setTalentStatus;
    setStatus("sending");
    try {
      const response = await fetch(type === "work" ? "/api/contact/project" : "/api/contact/talent", { method: "POST", body: new FormData(form) });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success"); form.reset();
    } catch { setStatus("error"); }
  };

  return <main className={styles.page}>
    <section className={styles.hero} aria-labelledby="contact-title"><div className="sellf-container">
      <div className={styles.heroIntro}><div><p className="sellf-kicker">{t.eyebrow}</p><h1 id="contact-title" className="sellf-display">{t.heroTitle}</h1></div><div className={styles.heroSide}><p>{t.heroBody}</p><button className={styles.soundToggle} type="button" onClick={() => setSoundEnabled(v => !v)} aria-pressed={soundEnabled}><span aria-hidden="true">{soundEnabled ? "◉" : "○"}</span> {soundEnabled ? t.soundOn : t.soundOff}</button></div></div>
      <div className={`${styles.choices} ${hoveredChoice ? styles.choiceHovering : ""}`}>
        <ChoiceCard type="work" active={choice === "work"} dimmed={hoveredChoice === "careers"} image="/images/contact/work-growth.webp" {...t.workCard} onChoose={choose} onHover={setHoveredChoice} />
        <ChoiceCard type="careers" active={choice === "careers"} dimmed={hoveredChoice === "work"} image="/images/contact/join-team.webp" {...t.careersCard} onChoose={choose} onHover={setHoveredChoice} />
      </div>
    </div></section>
    <OfficeSection t={t.offices} />
    <div ref={expandedRef} className={styles.expandedAnchor} />
    <AnimatePresence mode="wait" initial={false}>
      {choice === "work" && <motion.div key="work" initial={{opacity:0,y:34}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} transition={{duration:reducedMotion?0:.55,ease:[.22,1,.36,1]}}><WorkRoute lang={lang} t={t} status={projectStatus} onSubmit={e => handleForm(e,"work")} onSwitch={() => choose("careers")} /></motion.div>}
      {choice === "careers" && <motion.div key="careers" initial={{opacity:0,y:34}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} transition={{duration:reducedMotion?0:.55,ease:[.22,1,.36,1]}}><CareersRoute lang={lang} t={t} status={talentStatus} onSubmit={e => handleForm(e,"careers")} onSwitch={() => choose("work")} /></motion.div>}
    </AnimatePresence>
  </main>;
}

function ChoiceCard({ type, active, dimmed, image, label, title, body, cta, onChoose, onHover }:{type:RouteChoice;active:boolean;dimmed:boolean;image:string;label:string;title:string;body:string;cta:string;onChoose:(v:RouteChoice)=>void;onHover:(v:RouteChoice|null)=>void}) {
  return <button type="button" className={`${styles.choiceCard} ${active?styles.choiceActive:""} ${dimmed?styles.choiceDimmed:""}`} onClick={() => onChoose(type)} onPointerEnter={() => onHover(type)} onPointerLeave={() => onHover(null)} onFocus={() => onHover(type)} onBlur={() => onHover(null)} onPointerMove={(event) => { const rect=event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--pointer-x",`${event.clientX-rect.left}px`); event.currentTarget.style.setProperty("--pointer-y",`${event.clientY-rect.top}px`); }} aria-pressed={active}>
    <Image src={image} alt="" fill priority sizes="(max-width: 900px) 100vw, 64vw" className={styles.choiceImage}/><span className={styles.choiceOverlay}/><span className={styles.choiceGlow}/><span className={styles.choiceScan}/><span className={styles.choiceContent}><span className={styles.choiceTop}><span className="sellf-kicker">{label}</span><span className={styles.choiceIndex}>{type==="work"?"01 / PROJECT":"02 / TALENT"}</span></span><span><span className={styles.choicePrompt}>{active ? "SELECTED" : "MOVE TO EXPLORE"}</span><strong>{title}</strong><span className={styles.choiceBody}>{body}</span><span className={styles.choiceCta}>{cta} <Arrow/></span></span></span>
  </button>;
}

function OfficeSection({t}:{t:(typeof content)[Lang]["offices"]}) {
  return <section className={styles.offices} aria-labelledby="offices-title"><div className="sellf-container">
    <div className={styles.sectionHeading}><p className="sellf-kicker">{t.eyebrow}</p><h2 id="offices-title" className="sellf-display">{t.title}</h2><p>{t.body}</p></div>
    <div className={styles.officeGrid}>
      <OfficeCard city="İstanbul" country="Türkiye" address="Merkez Mah. Silahşör Cad. Bomonti Ada Eski Bira Fabrikaları No:42/1, Şişli / İstanbul" image="/images/contact/bomontiada.webp" href="https://www.google.com/maps/search/?api=1&query=Bomonti%20Ada%20Eski%20Bira%20Fabrikalar%C4%B1%20No%3A42%2F1%20%C5%9Ei%C5%9Fli%20%C4%B0stanbul" label={t.main} directions={t.directions}/>
      <OfficeCard city="New York" country="United States" address="100 Church Street, Tribeca, 8th Floor, New York, NY 10007, United States" image="/images/contact/new-york-office.webp" href="https://www.google.com/maps/search/?api=1&query=100+Church+Street+New+York+NY+10007" label={t.main} directions={t.directions}/>
    </div>
    <div className={styles.officeMeta}><div><span className="sellf-kicker">{t.representatives}</span><p>Dubai · Gaziantep · Paris</p></div><div><span className="sellf-kicker">{t.contact}</span><p><a href="mailto:team@sellfmedia.com">team@sellfmedia.com</a><br/><a href="https://wa.me/905350131678" target="_blank" rel="noreferrer">+90 535 013 16 78</a></p></div></div>
  </div></section>;
}

function OfficeCard({city,country,address,image,href,label,directions}:{city:string;country:string;address:string;image:string;href:string;label:string;directions:string}) {
  return <article className={styles.officeCard}><div className={styles.officeImage}><Image src={image} alt={`${city} ${label}`} fill sizes="(max-width: 900px) 100vw, 50vw"/></div><div className={styles.officeContent}><span className="sellf-kicker">{label}</span><div><h3>{city}</h3><p className={styles.country}>{country}</p><p>{address}</p></div><a href={href} target="_blank" rel="noreferrer">{directions} <Arrow/></a></div></article>;
}

function RouteIntro({eyebrow,title,body,switchLabel,onSwitch}:{eyebrow:string;title:string;body:string;switchLabel:string;onSwitch:()=>void}) {
  return <section className={styles.routeIntro}><div className="sellf-container"><p className="sellf-kicker">{eyebrow}</p><div className={styles.routeIntroGrid}><h2 className="sellf-display">{title}</h2><div><p>{body}</p><button type="button" onClick={onSwitch}>{switchLabel} <Arrow/></button></div></div></div></section>;
}

function WorkRoute({lang,t,status,onSubmit,onSwitch}:{lang:Lang;t:(typeof content)[Lang];status:FormStatus;onSubmit:(e:FormEvent<HTMLFormElement>)=>void;onSwitch:()=>void}) {
  return <><RouteIntro eyebrow={t.work.eyebrow} title={t.work.title} body={t.work.body} switchLabel={t.work.switch} onSwitch={onSwitch}/><section className={styles.formSection}><div className="sellf-container"><FormIntro eyebrow={t.work.formEyebrow} title={t.work.formTitle} body={t.work.formBody}/><form className={styles.form} onSubmit={onSubmit}><input type="hidden" name="lang" value={lang}/><Honeypot/><Field label={t.fields.name} name="name" required/><Field label={t.fields.workEmail} name="email" type="email" required/><Field label={t.fields.phone} name="phone" type="tel"/><Field label={t.fields.company} name="company" required/><Field label={t.fields.website} name="website" type="url"/><SelectField label={t.fields.goal} name="goal" options={goals[lang]} required/><TextArea label={t.fields.brief} name="brief" required wide/><Field label={t.fields.start} name="start" required/><Field label={t.fields.budget} name="budget"/><FormFooter status={status} submit={t.work.submit} success={t.work.success} sending={t.fields.sending} error={t.fields.error}/></form></div></section></>;
}

function CareersRoute({lang,t,status,onSubmit,onSwitch}:{lang:Lang;t:(typeof content)[Lang];status:FormStatus;onSubmit:(e:FormEvent<HTMLFormElement>)=>void;onSwitch:()=>void}) {
  return <><RouteIntro eyebrow={t.careers.eyebrow} title={t.careers.title} body={t.careers.body} switchLabel={t.careers.switch} onSwitch={onSwitch}/><section className={styles.network}><div className="sellf-container"><div className={styles.networkIntro}><p className="sellf-kicker">{t.careers.networkLabel}</p><h2 className="sellf-display">{t.careers.networkTitle}</h2><p>{t.careers.networkBody}</p></div><div className={styles.expertiseGrid}>{talentRoles[lang].map((item,i)=><div key={item}><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong></div>)}</div><div className={styles.workModes}><div><h3>{t.careers.modesTitle}</h3><p>{t.careers.modesBody}</p></div><div>{workModes.map(mode=><span key={mode}>{mode}</span>)}</div></div></div></section><section className={styles.formSection}><div className="sellf-container"><FormIntro eyebrow={t.careers.formLabel} title={t.careers.formTitle} body={t.careers.formBody}/><form className={styles.form} onSubmit={onSubmit} encType="multipart/form-data"><input type="hidden" name="lang" value={lang}/><Honeypot/><Field label={t.fields.name} name="name" required/><Field label={t.fields.email} name="email" type="email" required/><Field label={t.fields.phone} name="phone" type="tel"/><Field label={t.fields.location} name="location" required/><Field label={t.fields.expertise} name="expertise" placeholder={t.fields.expertisePlaceholder} required/><Field label={t.fields.portfolio} name="portfolio" type="url" required/><Field label={t.fields.linkedin} name="linkedin" type="url"/><SelectField label={t.fields.model} name="model" options={workModes} required/><Field label={t.fields.availability} name="availability" required/><TextArea label={t.fields.intro} name="intro" required wide/><label className={`${styles.field} ${styles.wide}`}><span>{t.fields.cv}</span><input name="cv" type="file" accept=".pdf,.doc,.docx"/></label><FormFooter status={status} submit={t.careers.submit} success={t.careers.success} sending={t.fields.sending} error={t.fields.error}/></form></div></section></>;
}

function FormIntro({eyebrow,title,body}:{eyebrow:string;title:string;body:string}) { return <div className={styles.formIntro}><p className="sellf-kicker">{eyebrow}</p><h2 className="sellf-display">{title}</h2><p>{body}</p></div>; }
function Honeypot(){return <label className={styles.honeypot} aria-hidden="true">Website<input name="company_website" tabIndex={-1} autoComplete="off"/></label>}
function Field({label,name,type="text",required=false,placeholder}:{label:string;name:string;type?:string;required?:boolean;placeholder?:string}){return <label className={styles.field}><span>{label}{required&&" *"}</span><input name={name} type={type} required={required} placeholder={placeholder} maxLength={type==="email"?320:240}/></label>}
function SelectField({label,name,options,required=false}:{label:string;name:string;options:readonly string[];required?:boolean}){return <label className={styles.field}><span>{label}{required&&" *"}</span><select name={name} required={required} defaultValue=""><option value="" disabled>—</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select></label>}
function TextArea({label,name,required=false,wide=false}:{label:string;name:string;required?:boolean;wide?:boolean}){return <label className={`${styles.field} ${wide?styles.wide:""}`}><span>{label}{required&&" *"}</span><textarea name={name} required={required} maxLength={3000} rows={6}/></label>}
function FormFooter({status,submit,success,sending,error}:{status:FormStatus;submit:string;success:string;sending:string;error:string}){return <div className={`${styles.formFooter} ${styles.wide}`}><button type="submit" disabled={status==="sending"}>{status==="sending"?sending:submit} <Arrow/></button><div aria-live="polite">{status==="success"&&<p className={styles.success}>{success}</p>}{status==="error"&&<p className={styles.error}>{error}</p>}</div></div>}
