import nodemailer from "nodemailer";

export function escapeHtml(value:string){return value.replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]||c))}
export function field(data:FormData,name:string,max=3000){const value=data.get(name);return typeof value==="string"?value.trim().slice(0,max):""}
export function validEmail(value:string){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)&&value.length<=320}
export function mailer(){
  if(!process.env.GMAIL_USER||!process.env.GMAIL_PASS) throw new Error("MAIL_CONFIG_MISSING");
  return nodemailer.createTransport({service:"gmail",auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_PASS}})
}
export function table(rows:Array<[string,string]>){return `<table style="width:100%;border-collapse:collapse">${rows.map(([k,v])=>`<tr><td style="padding:10px;border-bottom:1px solid #ddd;font-weight:700;vertical-align:top;width:190px">${escapeHtml(k)}</td><td style="padding:10px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)||"—"}</td></tr>`).join("")}</table>`}
