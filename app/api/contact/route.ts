import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, contact } = await req.json();

    // Google Workspace SMTP Ayarları
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Senin mail adresin
        pass: process.env.GMAIL_PASS, // Uygulama şifresi (Aşağıda anlattım)
      },
    });

    // Mailin İçeriği ve Gönderimi
    await transporter.sendMail({
      from: `"SellfMedia Radar" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Kendine gönderiyorsun
      subject: `🔥 Yeni Büyüme Talebi: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border-radius: 10px; background-color: #f4f4f4;">
          <h2 style="color: #000;">Yeni İletişim Talebi</h2>
          <p><strong>İsim:</strong> ${name}</p>
          <p><strong>İletişim Bilgisi:</strong> ${contact}</p>
          <hr style="border: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">Bu mesaj Sellf Media "Hızlı İletişim" butonu üzerinden gönderilmiştir.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Başarılı' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Mail gönderilemedi' }, { status: 500 });
  }
}