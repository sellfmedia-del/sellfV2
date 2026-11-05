'use client'

import {useParams} from 'next/navigation'
import styles from '@/components/partners/partners.module.css'

export default function PartnersError({reset}: {reset: () => void}) {
  const {lang} = useParams()
  const en = lang === 'en'
  return <section className={`${styles.page} ${styles.unavailable}`}><h1>{en ? 'Please try again shortly.' : 'Lütfen kısa bir süre sonra tekrar deneyin.'}</h1><p>{en ? 'We could not load the partner network right now.' : 'Partner ağı şu anda yüklenemedi.'}</p><button type="button" onClick={reset} className={styles.button}>{en ? 'Try again' : 'Tekrar dene'} →</button></section>
}
