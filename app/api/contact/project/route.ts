import {NextResponse} from "next/server";
import {field,mailer,table,validEmail} from "@/lib/contact-mail";

export async function POST(req:Request){
  try{
    const data=await req.formData(); if(field(data,"company_website")) return NextResponse.json({ok:true});
    const name=field(data,"name",120),email=field(data,"email",320),company=field(data,"company",180),goal=field(data,"goal",180),brief=field(data,"brief");
    if(!name||!validEmail(email)||!company||!goal||!brief||!field(data,"start",180)) return NextResponse.json({error:"Invalid fields"},{status:400});
    await mailer().sendMail({from:`"Sellf Project Form" <${process.env.GMAIL_USER}>`,to:process.env.GMAIL_USER,replyTo:email,subject:`Yeni Proje Talebi — ${name.replace(/[\r\n]/g," ")}`,html:`<div style="font-family:Arial,sans-serif;padding:24px;background:#f4f3ef"><h2>Yeni Proje Talebi</h2>${table([["Ad Soyad",name],["İş E-postası",email],["Telefon",field(data,"phone",80)],["Şirket / Marka",company],["Website",field(data,"website",300)],["Hedef",goal],["Proje",brief],["Başlangıç",field(data,"start",180)],["Bütçe",field(data,"budget",180)],["Dil",field(data,"lang",10)]])}</div>`});
    return NextResponse.json({ok:true});
  }catch(error){console.error("Project contact form",error);return NextResponse.json({error:"Send failed"},{status:500})}
}
