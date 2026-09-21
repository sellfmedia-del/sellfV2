import type {CSSProperties} from 'react'
import type {EngageLocale, VisualCaseScene} from '@/sanity/lib/engage'
import styles from './visual-case.module.css'

type VisualCaseStudyProps = {
  scenes: VisualCaseScene[]
  sources?: Array<{label: string; url: string}>
  disclosure?: string
  lang: EngageLocale
}

function Eyebrow({children, light = false}: {children?: string; light?: boolean}) {
  return children ? <span className={light ? styles.eyebrowLight : styles.eyebrow}>{children}</span> : null
}

function TimelineScene({scene, lang}: {scene: VisualCaseScene; lang: EngageLocale}) {
  const items = scene.items || []
  const points = items.map((_, index) => {
    const x = 20 + index * (360 / Math.max(items.length - 1, 1))
    const y = 35 + Math.sin((index / Math.max(items.length - 1, 1)) * Math.PI) * 34
    return {x, y}
  })
  const path = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ')

  return (
    <section className={`${styles.scene} ${styles.timelineScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={`${styles.shell} ${styles.timelineLayout}`}>
        <div className={styles.timelineIntro}>
          <Eyebrow>{scene.eyebrow}</Eyebrow>
          <h2 id={`scene-${scene._key}`}><strong>{items.length}</strong> {lang === 'tr' ? 'ÇEYREK' : 'QUARTERS'}</h2>
          {scene.description ? <p>{scene.description}</p> : null}
        </div>
        <div className={styles.timelineChart}>
          <span>{lang === 'tr' ? 'SÜREKLİ BASKI, ARDINDAN TOPARLANMA' : 'SUSTAINED PRESSURE, THEN RECOVERY'}</span>
          <svg viewBox="0 0 400 112" role="img" aria-label={scene.title || scene.eyebrow}>
            <path d={path} />
            {points.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="4" />)}
          </svg>
          <div className={styles.timelineLabels}>
            {items.map((item, index) => <div key={`${item.label}-${index}`}><strong>{item.label}</strong><small>{item.detail}</small></div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function LeversScene({scene}: {scene: VisualCaseScene}) {
  return (
    <section className={`${styles.scene} ${styles.leversScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={`${styles.shell} ${styles.leversLayout}`}>
        <div className={styles.leversIntro}>
          <Eyebrow light>{scene.eyebrow}</Eyebrow>
          {scene.title ? <h2 id={`scene-${scene._key}`}>{scene.title}</h2> : null}
          {scene.description ? <p>{scene.description}</p> : null}
        </div>
        <div className={styles.leverGrid}>
          {(scene.items || []).map((item, index) => (
            <article className={styles.leverCard} key={`${item.title}-${index}`}>
              <span className={styles.leverIndex}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.leverGlyph} aria-hidden="true" />
              <h3>{item.title}</h3>
              {item.description ? <p>{item.description}</p> : null}
            </article>
          ))}
        </div>
        {scene.featuredValue ? <aside className={styles.featuredMetric}><strong>{scene.featuredValue}</strong><span>{scene.featuredLabel}</span>{scene.featuredNote ? <p>{scene.featuredNote}</p> : null}</aside> : null}
      </div>
    </section>
  )
}

function MetricComparisonScene({scene}: {scene: VisualCaseScene}) {
  return (
    <section className={`${styles.scene} ${styles.metricScene}`} aria-label={scene.eyebrow || 'Metric comparison'}>
      {[scene.leftMetric, scene.rightMetric].map((metric, index) => (
        <article className={index === 0 ? styles.metricPositive : styles.metricPressure} key={index}>
          <span>{index === 0 ? scene.eyebrow : ''}</span>
          <strong>{metric?.value}</strong>
          <h2>{metric?.label}</h2>
          {metric?.note ? <p>{metric.note}</p> : null}
        </article>
      ))}
    </section>
  )
}

function FrameworkScene({scene}: {scene: VisualCaseScene}) {
  return (
    <section className={`${styles.scene} ${styles.frameworkScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={styles.shell}>
        <div className={styles.frameworkHeader}><Eyebrow>{scene.eyebrow}</Eyebrow>{scene.title ? <h2 id={`scene-${scene._key}`}>{scene.title}</h2> : null}</div>
        <div className={styles.frameworkGrid}>
          {(scene.columns || []).map((column, index) => (
            <article key={`${column.title}-${index}`}>
              <span className={styles.frameworkIcon} aria-hidden="true">{index === 0 ? '▥' : index === 1 ? '◎' : '↗'}</span>
              <h3>{column.title}</h3>
              {column.statement ? <strong>{column.statement}</strong> : null}
              {column.description ? <p>{column.description}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlowScene({scene}: {scene: VisualCaseScene}) {
  return (
    <section className={`${styles.scene} ${styles.flowScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={`${styles.shell} ${styles.flowLayout}`}>
        <div className={styles.flowIntro}><Eyebrow light>{scene.eyebrow}</Eyebrow>{scene.title ? <h2 id={`scene-${scene._key}`}>{scene.title}</h2> : null}{scene.description ? <p>{scene.description}</p> : null}</div>
        <div className={styles.flow}>
          {(scene.steps || []).map((step, index) => (
            <div className={styles.flowStep} key={`${step.title}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3>{step.description ? <p>{step.description}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EvidenceScene({scene, lang}: {scene: VisualCaseScene; lang: EngageLocale}) {
  return (
    <section className={`${styles.scene} ${styles.evidenceScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={`${styles.shell} ${styles.evidenceLayout}`}>
        <div className={styles.evidenceIntro}><Eyebrow>{scene.eyebrow}</Eyebrow>{scene.title ? <h2 id={`scene-${scene._key}`}>{scene.title}</h2> : null}{scene.description ? <p>{scene.description}</p> : null}</div>
        <div className={styles.storeMap} aria-label={lang === 'tr' ? 'Mağaza ağı gösterimi' : 'Store network illustration'}>
          {[12, 22, 31, 43, 56, 68, 77, 86].map((left, index) => <i key={left} style={{'--x': `${left}%`, '--y': `${18 + (index * 19) % 64}%`} as CSSProperties} />)}
        </div>
        <div className={styles.evidencePoints}>
          {(scene.points || []).map((point, index) => <article key={`${point.title}-${index}`}><span>0{index + 1}</span><h3>{point.title}</h3>{point.description ? <p>{point.description}</p> : null}</article>)}
        </div>
      </div>
    </section>
  )
}

function ConclusionScene({scene}: {scene: VisualCaseScene}) {
  return (
    <section className={`${styles.scene} ${styles.conclusionScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={styles.shell}><Eyebrow light>{scene.eyebrow}</Eyebrow>{scene.title ? <h2 id={`scene-${scene._key}`}>{scene.title}</h2> : null}{scene.description ? <p>{scene.description}</p> : null}{scene.question ? <blockquote>{scene.question}</blockquote> : null}</div>
    </section>
  )
}

function VisualCaseSceneView({scene, lang}: {scene: VisualCaseScene; lang: EngageLocale}) {
  switch (scene._type) {
    case 'visualCaseTimeline': return <TimelineScene scene={scene} lang={lang} />
    case 'visualCaseLevers': return <LeversScene scene={scene} />
    case 'visualCaseMetricComparison': return <MetricComparisonScene scene={scene} />
    case 'visualCaseFramework': return <FrameworkScene scene={scene} />
    case 'visualCaseFlow': return <FlowScene scene={scene} />
    case 'visualCaseEvidence': return <EvidenceScene scene={scene} lang={lang} />
    case 'visualCaseConclusion': return <ConclusionScene scene={scene} />
    default: return null
  }
}

export default function VisualCaseStudy({scenes, sources, disclosure, lang}: VisualCaseStudyProps) {
  return (
    <div className={styles.visualCase}>
      {scenes.map((scene) => <VisualCaseSceneView key={scene._key} scene={scene} lang={lang} />)}
      {(sources?.length || disclosure) ? <footer className={styles.sourceFooter}><div className={styles.shell}>{disclosure ? <p>{disclosure}</p> : null}{sources?.length ? <div aria-label={lang === 'tr' ? 'Kaynaklar' : 'Sources'}><span>{lang === 'tr' ? 'Kaynaklar' : 'Sources'}</span>{sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} ↗</a>)}</div> : null}</div></footer> : null}
    </div>
  )
}
