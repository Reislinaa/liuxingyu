import Reveal from './Reveal'
import MindToText from './MindToText'

// 思想汇聚区块：线条动画表现"想法汇聚成一句话"
export default function MindSection() {
  return (
    <section className="section mind-section" id="mind">
      <div className="container">
        <Reveal variant="fade">
          <span className="section-kicker">Ideas flow into words</span>
        </Reveal>
        <Reveal variant="blur">
          <h2 className="section-title">想法，在这里汇聚成形</h2>
        </Reveal>
        <MindToText />
      </div>
    </section>
  )
}
