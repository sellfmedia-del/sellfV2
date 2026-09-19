import {NextResponse} from "next/server";
import {field,mailer,table,validEmail} from "@/lib/contact-mail";

const allowed=new Set(["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
export async function POST(req:Request){
  try{
    const data=await req.formData(); if(field(data,"company_website")) return NextResponse.json({ok:true});
    const name=field(data,"name",120),email=field(data,"email",320),location=field(data,"location",180),expertise=field(data,"expertise",180),portfolio=field(data,"portfolio",500),intro=field(data,"intro");
    if(!name||!validEmail(email)||!location||!expertise||!portfolio||!intro||!field(data,"model",180)||!field(data,"availability",180)) return NextResponse.json({error:"Invalid fields"},{status:400});
    const upload=data.get("cv"); const attachments=[] as Array<{filename:string;content:Buffer;contentType:string}>;
    if(upload instanceof File&&upload.size){if(upload.size>5*1024*1024||!allowed.has(upload.type)) return NextResponse.json({error:"Invalid file"},{status:400});attachments.push({filename:upload.name.replace(/[^a-zA-Z0-9._-]/g,"_"),content:Buffer.from(await upload.arrayBuffer()),contentType:upload.type})}
    await mailer().sendMail({from:`"Sellf Talent Network" <${process.env.GMAIL_USER}>`,to:process.env.GMAIL_USER,replyTo:email,subject:`Talent Network Başvurusu — ${name.replace(/[\r\n]/g," ")}`,attachments,html:`<div style="font-family:Arial,sans-serif;padding:24px;background:#f4f3ef"><h2>Yeni Talent Network Profili</h2>${table([["Ad Soyad",name],["E-posta",email],["Telefon",field(data,"phone",80)],["Şehir / Ülke",location],["Uzmanlık",expertise],["Portfolyo",portfolio],["LinkedIn",field(data,"linkedin",500)],["Çalışma Modeli",field(data,"model",180)],["Uygunluk",field(data,"availability",180)],["Tanıtım",intro],["Dil",field(data,"lang",10)]])}</div>`});
    return NextResponse.json({ok:true});
  }catch(error){console.error("Talent contact form",error);return NextResponse.json({error:"Send failed"},{status:500})}
}
