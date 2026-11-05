import Image from 'next/image'
import Link from 'next/link'
import type {PartnerLocale} from '@/lib/partners-types'
import styles from './partners.module.css'

export default function PartnersFooter({lang}: {lang: PartnerLocale}) {
  const en = lang === 'en'
  return <footer className={styles.compactFooter}><div className={styles.wrap}>
    <div className={styles.footerBrand}><Link href={`/${lang}`} aria-label="Sellf Media"><Image src="/logo-beyaz.png" alt="Sellf Media Logo" fill sizes="35px" style={{objectFit: 'contain'}}/></Link><p>Konuk Reklam, Pazarlama ve Ticaret LTD.</p></div>
    <nav className={styles.footerLinks} aria-label={en ? 'Footer links' : 'Alt menü'}><Link href={`/${lang}/contact`}>{en ? 'Contact' : 'İletişim'}</Link><Link href={`/${lang}/privacy-policy`}>{en ? 'Privacy Policy' : 'Gizlilik Politikası'}</Link><Link href={`/${lang}/cookie-policy`}>{en ? 'Cookie Policy' : 'Çerez Politikası'}</Link><a href="https://www.linkedin.com/company/sellf-media" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.instagram.com/sellfmedia" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.youtube.com/@sellfmedia" target="_blank" rel="noopener noreferrer">YouTube</a></nav>
    <div className={styles.footerContact}><a href="mailto:team@sellfmedia.com">team@sellfmedia.com</a><p>© {new Date().getFullYear()} Sellf Media</p></div>
    <div className={styles.footerExtra}><a href="https://wa.me/905350131678" target="_blank" rel="noopener noreferrer">+90 535 013 16 78</a><a href="https://www.google.com/maps/search/?api=1&query=Bomonti%20Ada%20Eski%20Bira%20Fabrikalar%C4%B1%20No%3A42%2F1%20%C5%9Ei%C5%9Fli%20%C4%B0stanbul" target="_blank" rel="noopener noreferrer">Merkez Mah. Silahşör Cad. Bomonti Ada Eski Bira Fabrikaları No:42/1 Şişli / İstanbul</a><p>{en ? 'Proudly designed by Sellf.' : 'Bizim tarafımızdan gururla tasarlandı.'}</p></div>
  </div></footer>
}
