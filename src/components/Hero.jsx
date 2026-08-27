import Reveal from './Reveal'
import InputMockup from './InputMockup'

export default function Hero({ onStartDemo, onNavigate }) {
  return (
    <section className="hero" id="home">
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content">
        {/* Left column: copy + actions + compare */}
        <div className="hero-col hero-col-left">
          <Reveal>
            <span className="hero-tag">流星语 · AI 语音输入</span>
          </Reveal>

          <Reveal delay={1} variant="scale">
            <h1 className="hero-title">
              <span className="hero-line">说出来</span>
              <span className="hero-line hero-gradient">即成文</span>
            </h1>
          </Reveal>

          <Reveal delay={2} variant="blur">
            <p className="hero-subtitle">
              把每一次开口，都变成准确、自然、可直接使用的文字。
              智能补全 · 语音转写 · 自动润色 · 跨端同步
            </p>
          </Reveal>

          <Reveal delay={3} variant="up" duration={0.7}>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => onNavigate('download')}>
                免费下载
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => onNavigate('product')}>
                了解更多
              </button>
            </div>
          </Reveal>

          {/* speed comparison sits below the buttons in the LEFT column */}
          <Reveal delay={5} variant="up">
            <div className="hero-compare">
              <div className="compare-item">
                <span className="compare-label">传统打字</span>
                <div className="compare-value">
                  <span className="compare-num">45</span>
                  <span className="compare-unit">wpm</span>
                </div>
                <div className="compare-bar compare-bar-slow"><span /></div>
              </div>
              <div className="compare-arrow">→</div>
              <div className="compare-item">
                <span className="compare-label">流星语</span>
                <div className="compare-value">
                  <span className="compare-num compare-num-fast">220</span>
                  <span className="compare-unit">wpm</span>
                </div>
                <div className="compare-bar compare-bar-fast"><span /></div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right column: phone / chat mockup */}
        <div className="hero-col hero-col-right">
          <Reveal delay={4} variant="fade">
            <InputMockup />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
