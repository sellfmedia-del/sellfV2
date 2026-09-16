import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] || character);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const contact = typeof body?.contact === 'string' ? body.contact.trim() : '';

    if (!name || !contact || name.length > 120 || contact.length > 320) {
      return NextResponse.json({ error: 'Geçerli isim ve iletişim bilgisi gerekli' }, { status: 400 });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('Contact API: GMAIL_USER veya GMAIL_PASS tanımlı değil');
      return NextResponse.json({ error: 'İletişim servisi geçici olarak kullanılamıyor' }, { status: 503 });
    }

    const safeName = escapeHtml(name);
    const safeContact = escapeHtml(contact);

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
      subject: `🔥 Yeni Büyüme Talebi: ${name.replace(/[\r\n]/g, ' ')}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border-radius: 10px; background-color: #f4f4f4;">
          <h2 style="color: #000;">Yeni İletişim Talebi</h2>
          <p><strong>İsim:</strong> ${safeName}</p>
          <p><strong>İletişim Bilgisi:</strong> ${safeContact}</p>
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
