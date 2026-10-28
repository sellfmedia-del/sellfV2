import type {Metadata} from 'next'
import {getAdminWebinars, getWebinarRegistrations, type WebinarRegistration} from '@/lib/engage-admin'
import styles from './webinars.module.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Webinar Katılımcıları | Sellf Engage Admin',
  robots: {index: false, follow: false},
}

function dateTime(value?: string) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('tr-TR', {
    timeZone: 'Europe/Istanbul',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function registrationsByWebinar(rows: WebinarRegistration[]) {
  return rows.reduce<Record<string, WebinarRegistration[]>>((groups, row) => {
    ;(groups[row.content_id] ??= []).push(row)
    return groups
  }, {})
}

export default async function EngageAdminWebinarsPage() {
  const [webinars, registrations] = await Promise.all([
    getAdminWebinars(),
    getWebinarRegistrations(),
  ])

  const grouped = registrationsByWebinar(registrations)
  const activeTotal = registrations.filter((row) => row.status === 'registered').length

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div>
          <span className={styles.brand}>SELLF</span>
          <span className={styles.product}>ENGAGE ADMIN</span>
        </div>
        <nav>
          <a className={styles.active} href="/engage/admin/webinars">Webinars</a>
        </nav>
        <p>İçerik Sanity Studio'da, katılımcı verileri Supabase'de tutulur.</p>
      </aside>

      <section className={styles.content}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>ENGAGE / ADMIN / WEBINARS</span>
            <h1>Webinar katılımcıları</h1>
            <p>Her webinarın kayıtlarını tek ekrandan görüntüleyin.</p>
          </div>
          <div className={styles.totalCard}>
            <span>TOPLAM AKTİF KAYIT</span>
            <strong>{activeTotal}</strong>
          </div>
        </header>

        <div className={styles.webinarList}>
          {webinars.map((webinar, index) => {
            const rows = grouped[webinar._id] ?? []
            const activeRows = rows.filter((row) => row.status === 'registered')
            const cancelled = rows.length - activeRows.length

            return (
              <details className={styles.webinarCard} key={webinar._id} open={index === 0}>
                <summary>
                  <div className={styles.webinarMeta}>
                    <span>{webinar.startAt && new Date(webinar.startAt).getTime() >= Date.now() ? 'YAKLAŞAN' : 'GEÇMİŞ'}</span>
                    <h2>{webinar.title}</h2>
                    <p>{dateTime(webinar.startAt)} · /{webinar.slug}</p>
                  </div>
                  <div className={styles.countGroup}>
                    <div>
                      <strong>{activeRows.length}</strong>
                      <span>Katılımcı</span>
                    </div>
                    {webinar.capacity ? <small>Kontenjan {activeRows.length}/{webinar.capacity}</small> : null}
                    {cancelled > 0 ? <small>{cancelled} iptal</small> : null}
                  </div>
                </summary>

                <div className={styles.tableWrap}>
                  {rows.length === 0 ? (
                    <div className={styles.empty}>Bu webinar için henüz kayıt yok.</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Ad Soyad</th>
                          <th>E-posta</th>
                          <th>Dil</th>
                          <th>Kayıt Tarihi</th>
                          <th>Durum</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row) => (
                          <tr key={row.id}>
                            <td>{row.full_name}</td>
                            <td><a href={`mailto:${row.email}`}>{row.email}</a></td>
                            <td>{row.language.toUpperCase()}</td>
                            <td>{dateTime(row.registered_at)}</td>
                            <td>
                              <span className={row.status === 'registered' ? styles.registered : styles.cancelled}>
                                {row.status === 'registered' ? 'Kayıtlı' : 'İptal'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </details>
            )
          })}

          {webinars.length === 0 ? (
            <div className={styles.emptyState}>Sanity'de yayınlanmış webinar bulunamadı.</div>
          ) : null}
        </div>
      </section>
    </main>
  )
}
