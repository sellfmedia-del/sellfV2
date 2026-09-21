import Image from 'next/image'
import type {EngageLocale, VisualCaseScene} from '@/sanity/lib/engage'
import styles from './visual-case.module.css'

type VisualCaseStudyProps = {
  scenes: VisualCaseScene[]
  sources?: Array<{label: string; url: string}>
  disclosure?: string
  lang: EngageLocale
}

function SceneHeading({scene, dark = false}: {scene: VisualCaseScene; dark?: boolean}) {
  return (
    <div className={styles.sceneHeading}>
      {scene.eyebrow ? <span className={dark ? styles.eyebrowLight : styles.eyebrow}>{scene.eyebrow}</span> : null}
      {scene.title ? <h2 id={`scene-${scene._key}`}>{scene.title}</h2> : null}
      {scene.description ? <p>{scene.description}</p> : null}
    </div>
  )
}

function TimelineScene({scene}: {scene: VisualCaseScene}) {
  return (
    <section className={`${styles.scene} ${styles.lightScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={styles.shell}>
        <SceneHeading scene={scene} />
        <div className={styles.timeline} role="list">
          {(scene.items || []).map((item, index) => (
            <div className={styles.timelineItem} role="listitem" key={`${item.label}-${index}`}>
              <span className={styles.timelineDot} aria-hidden="true" />
              <strong>{item.label}</strong>
              {item.detail ? <small>{item.detail}</small> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LeversScene({scene}: {scene: VisualCaseScene}) {
  return (
    <section className={`${styles.scene} ${styles.darkScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={`${styles.shell} ${styles.leversLayout}`}>
        <SceneHeading scene={scene} dark />
        <div className={styles.leverGrid}>
          {(scene.items || []).map((item, index) => (
            <article className={styles.leverCard} key={`${item.title}-${index}`}>
              <span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
              {item.image ? <Image src={item.image} alt="" fill sizes="(max-width: 760px) 84vw, 20vw" className={styles.leverImage} /> : null}
              <div className={styles.leverCopy}>
                <h3>{item.title}</h3>
                {item.description ? <p>{item.description}</p> : null}
              </div>
            </article>
          ))}
        </div>
        {scene.featuredValue ? (
          <aside className={styles.featuredMetric}>
            <strong>{scene.featuredValue}</strong>
            {scene.featuredLabel ? <span>{scene.featuredLabel}</span> : null}
            {scene.featuredNote ? <p>{scene.featuredNote}</p> : null}
          </aside>
        ) : null}
      </div>
    </section>
  )
}

function MetricComparisonScene({scene}: {scene: VisualCaseScene}) {
  const metrics = [scene.leftMetric, scene.rightMetric]
  return (
    <section className={`${styles.scene} ${styles.metricScene}`} aria-label={scene.eyebrow || 'Metric comparison'}>
      {metrics.map((metric, index) => (
        <article className={index === 0 ? styles.metricPositive : styles.metricPressure} key={index}>
          {scene.eyebrow ? <span>{index === 0 ? scene.eyebrow : ''}</span> : null}
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
    <section className={`${styles.scene} ${styles.lightScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={styles.shell}>
        <SceneHeading scene={scene} />
        <div className={styles.frameworkGrid}>
          {(scene.columns || []).map((column, index) => (
            <article key={`${column.title}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
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
    <section className={`${styles.scene} ${styles.darkScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={`${styles.shell} ${styles.flowLayout}`}>
        <SceneHeading scene={scene} dark />
        <div className={styles.flow}>
          {(scene.steps || []).map((step, index) => (
            <div className={styles.flowStep} key={`${step.title}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              {step.description ? <p>{step.description}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EvidenceScene({scene}: {scene: VisualCaseScene}) {
  return (
    <section className={`${styles.scene} ${styles.lightScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={`${styles.shell} ${styles.evidenceLayout}`}>
        <SceneHeading scene={scene} />
        <div className={styles.evidenceVisual}>
          {scene.image ? <Image src={scene.image} alt="" fill sizes="(max-width: 760px) 92vw, 48vw" /> : <div className={styles.storeMap} aria-hidden="true" />}
        </div>
        <div className={styles.evidencePoints}>
          {(scene.points || []).map((point, index) => (
            <article key={`${point.title}-${index}`}>
              <span>0{index + 1}</span>
              <h3>{point.title}</h3>
              {point.description ? <p>{point.description}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ConclusionScene({scene}: {scene: VisualCaseScene}) {
  return (
    <section className={`${styles.scene} ${styles.conclusionScene}`} aria-labelledby={`scene-${scene._key}`}>
      <div className={styles.shell}>
        <SceneHeading scene={scene} dark />
        {scene.question ? <blockquote>{scene.question}</blockquote> : null}
      </div>
    </section>
  )
}

function VisualCaseSceneView({scene}: {scene: VisualCaseScene}) {
  switch (scene._type) {
    case 'visualCaseTimeline': return <TimelineScene scene={scene} />
    case 'visualCaseLevers': return <LeversScene scene={scene} />
    case 'visualCaseMetricComparison': return <MetricComparisonScene scene={scene} />
    case 'visualCaseFramework': return <FrameworkScene scene={scene} />
    case 'visualCaseFlow': return <FlowScene scene={scene} />
    case 'visualCaseEvidence': return <EvidenceScene scene={scene} />
    case 'visualCaseConclusion': return <ConclusionScene scene={scene} />
    default: return null
  }
}

export default function VisualCaseStudy({scenes, sources, disclosure, lang}: VisualCaseStudyProps) {
  return (
    <div className={styles.visualCase}>
      {scenes.map((scene) => <VisualCaseSceneView key={scene._key} scene={scene} />)}
      {(sources?.length || disclosure) ? (
        <footer className={styles.sourceFooter}>
          <div className={styles.shell}>
            {disclosure ? <p>{disclosure}</p> : null}
            {sources?.length ? (
              <div aria-label={lang === 'tr' ? 'Kaynaklar' : 'Sources'}>
                <span>{lang === 'tr' ? 'Kaynaklar' : 'Sources'}</span>
                {sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} ↗</a>)}
              </div>
            ) : null}
          </div>
        </footer>
      ) : null}
    </div>
  )
}
