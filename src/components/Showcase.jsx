import Reveal from './Reveal'
import InputMockup from './InputMockup'

// 产品展示区：用真实 HTML/CSS 渲染的产品界面（不是装饰图）
export default function Showcase() {
  return (
    <section className="section showcase" id="showcase">
      <div className="container">
        <Reveal variant="fade">
          <span className="section-kicker">See it in action</span>
        </Reveal>
        <Reveal variant="blur">
          <h2 className="section-title">让输入，变成一种享受</h2>
        </Reveal>
        <Reveal delay={1} variant="fade">
          <p className="section-subtitle">这是流星语真实的产品界面 —— 边写边想，开口即成</p>
        </Reveal>

        <Reveal delay={2} variant="up">
          <InputMockup />
        </Reveal>
      </div>
    </section>
  )
}
