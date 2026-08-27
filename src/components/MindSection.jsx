import Reveal from './Reveal'
import MindToText from './MindToText'

export default function MindSection() {
  return (
    <section className="section mind-section" id="mind">
      <div className="container">
        <Reveal variant="fade">
          <span className="section-kicker">Ideas to words</span>
        </Reveal>
        <Reveal variant="blur">
          <h2 className="section-title">想法，在这里汇聚成形</h2>
        </Reveal>
        <Reveal delay={1} variant="fade">
          <p className="section-subtitle">
            碎片化的念头，经过 AI 整理，变成连贯、得体的表达
          </p>
        </Reveal>
        <MindToText />
      </div>
    </section>
  )
}
