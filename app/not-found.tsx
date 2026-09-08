"use client";
import { useEffect, useState } from 'react';

export default function GlobalNotFound() {
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLang = navigator.language;
      if (userLang.toLowerCase().includes('tr')) setLang("tr");
      setIsReady(true);
    }
  }, []);

  if (!isReady) return <div style={{backgroundColor: 'black', height: '100vh'}} />;

  const t = {
    tr: {
      status: "DURUM 404",
      title1: "Aradığınız şey burada değil,",
      title2: "muhtemelen gelecekte.",
      quote: "\"Kaybolmadınız, sadece hızımıza yetişemediniz.\"",
      radar: "Biz buradayız: sellfmedia.com"
    },
    en: {
      status: "STATUS 404",
      title1: "What you seek is not here,",
      title2: "probably in the future.",
      quote: "\"You are not lost, you just couldn't keep up with our speed.\"",
      radar: "We are here: sellfmedia.com"
    }
  }[lang];

  return (
    <html lang={lang}>
      <head>
        <style>{`
          body { margin: 0; padding: 0; background: black; font-family: sans-serif; overflow: hidden; color: white; }
          .container { position: relative; height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; p: 20px; }
          video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
          .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.2); z-index: 1; }
          .bento-grid { position: relative; z-index: 10; display: grid; grid-template-columns: 1.5fr 1fr; gap: 15px; width: 100%; max-width: 1000px; padding: 20px; }
          .box { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); border: 1px solid rgba(255,255,255,0.1); border-radius: 32px; padding: 40px; display: flex; flex-direction: column; justify-content: space-between; text-decoration: none; color: white; transition: all 0.4s ease; }
          .box-large { grid-row: span 2; justify-content: flex-end; }
          .status { font-size: 12px; font-weight: 800; letter-spacing: 4px; color: #888; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
          .dot { width: 8px; height: 8px; background: #ff4d4d; border-radius: 50%; animation: pulse 1.5s infinite; }
          h1 { font-size: 56px; font-weight: 900; margin: 0; line-height: 1; letter-spacing: -2px; }
          .italic { color: #555; font-style: italic; font-weight: 500; }
          .quote { font-size: 24px; font-weight: 500; line-height: 1.3; color: #ccc; }
          .radar-box { background: rgba(255, 255, 255, 0.03); cursor: pointer; border: 1px solid rgba(255,255,255,0.05); }
          .radar-box:hover { background: white; color: black; }
          .radar-text { font-weight: 800; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; display: flex; align-items: center; gap: 12px; }
          .green-dot { width: 10px; height: 10px; background: #4fbfa0; border-radius: 50%; box-shadow: 0 0 10px #4fbfa0; }
          @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
          @media (max-width: 768px) { .bento-grid { grid-template-columns: 1fr; } h1 { font-size: 36px; } }
        `}</style>
      </head>
      <body>
        <div className="container">
          <video autoPlay loop muted playsInline poster="https://res.cloudinary.com/dimiddzif/video/upload/f_auto,q_auto/v1772712625/Horozlu_Prestijli_Adam%C4%B1n_Daveti_r7ttcx.jpg">
            <source src="https://res.cloudinary.com/dimiddzif/video/upload/f_auto,q_auto/v1772712625/Horozlu_Prestijli_Adam%C4%B1n_Daveti_r7ttcx.mp4" type="video/mp4" />
          </video>
          <div className="overlay"></div>

          <div className="bento-grid">
            <div className="box box-large">
              <div>
                <div className="status"><div className="dot"></div>{t.status}</div>
                <h1>{t.title1}<br/><span className="italic">{t.title2}</span></h1>
              </div>
            </div>

            <div className="box">
              <p className="quote">{t.quote}</p>
            </div>

            <a href="/" className="box radar-box">
              <div className="radar-text">
                <div className="green-dot"></div>
                {t.radar}
              </div>
              <span style={{fontSize: '24px'}}>→</span>
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}