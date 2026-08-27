import Reveal from './Reveal'
import LightTrails from './LightTrails'

export default function Hero({ onStartDemo, onNavigate }) {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-trails">
          <LightTrails />
        </div>
        <div className="hero-glow" aria-hidden="true" />
      </div>

      <div className="container hero-content">
        <Reveal>
          <span className="hero-tag">流星语 · AI 输入法</span>
        </Reveal>

        <Reveal delay={1} variant="scale">
          <h1 className="hero-title">
            <span className="hero-line">TYPE AT THE</span>
            <span className="hero-line hero-gradient">SPEED OF LIGHT</span>
          </h1>
        </Reveal>

        <Reveal delay={2} variant="blur">
          <p className="hero-subtitle">
            把每一次输入，都变成流星划过般的轻盈与准确 ——
            智能补全 · 语音转写 · 行业词库 · 跨端同步
          </p>
        </Reveal>

        <Reveal delay={3} variant="up" duration={0.7}>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('download')}>
              免费下载
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => onNavigate('product')}>
              看演示
            </button>
          </div>
        </Reveal>

        {/* typeless 式对比：传统输入 vs 流星语 */}
        <Reveal delay={4} variant="fade">
          <div className="hero-compare">
            <div className="compare-item">
              <span className="compare-label">传统键盘</span>
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
    </section>
  )
}
