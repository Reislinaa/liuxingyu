import Reveal from '../components/Reveal'

const values = [
  { icon: '◈', title: '表达至上', desc: '我们相信，每一个人都应该轻松、准确地表达自己。' },
  { icon: '◍', title: '技术为人', desc: 'AI 是工具，不是主人。技术服务于真实的沟通场景。' },
  { icon: '◎', title: '隐私优先', desc: '敏感内容本地处理，用户数据只属于用户。' },
  { icon: '✦', title: '持续打磨', desc: '从每一次输入体验出发，追求更快、更准、更自然。' }
]

const milestones = [
  { year: '2025', title: '流星语立项', desc: '团队成立，开始探索语音与输入法的结合。' },
  { year: '2025', title: '首个内测版', desc: '核心语音转写与润色功能完成，邀请首批用户试用。' },
  { year: '2026', title: '全平台覆盖', desc: '支持 iOS、Android、Windows、macOS 四大平台。' },
  { year: '2026', title: '持续进化', desc: '不断优化模型与体验，让更多人开口即成文。' }
]

const contactItems = [
  { icon: '✉', label: '产品反馈', value: 'feedback@liuxingyu.cn', href: 'mailto:feedback@liuxingyu.cn' },
  { icon: '◈', label: '商务合作', value: 'business@liuxingyu.cn', href: 'mailto:business@liuxingyu.cn' },
  { icon: '◎', label: '问题咨询', value: 'support@liuxingyu.cn', href: 'mailto:support@liuxingyu.cn' }
]

export default function AboutPage({ onNavigate }) {
  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <span className="page-hero-tag">ABOUT US · 关于我们</span>
          <h1 className="page-hero-title">让每一次<em>开口</em>都有价值</h1>
          <p className="page-hero-sub">
            流星语是一支专注于 AI 语音输入的团队。我们致力于打造最自然、最懂你的输入方式，
            让表达不再受限于键盘与屏幕。
          </p>
        </div>
      </div>

      <div className="page-section">
        <div className="container">
          <Reveal variant="blur">
            <h2 className="page-title">我们的价值观</h2>
          </Reveal>
          <Reveal delay={1} variant="fade">
            <p className="page-subtitle">四个信念，驱动我们前行</p>
          </Reveal>
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) + 1} variant={['up', 'blur', 'scale', 'fade'][i % 4]}>
                <div className="value-card">
                  <div className="value-icon">{v.icon}</div>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="page-section page-section-alt">
        <div className="container">
          <Reveal variant="blur">
            <h2 className="page-title">发展历程</h2>
          </Reveal>
          <Reveal delay={1} variant="fade">
            <p className="page-subtitle">一路走来，与你同行</p>
          </Reveal>
          <div className="timeline">
            {milestones.map((m, i) => (
              <Reveal key={i} delay={(i % 2) + 1} variant={['left', 'scale'][i % 2]}>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="timeline-year">{m.year}</span>
                    <h3 className="timeline-title">{m.title}</h3>
                    <p className="timeline-desc">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="page-section">
        <div className="container">
          <Reveal variant="blur">
            <h2 className="page-title">联系我们</h2>
          </Reveal>
          <Reveal delay={1} variant="fade">
            <p className="page-subtitle">任何需求，随时与我们沟通</p>
          </Reveal>
          <div className="contact-grid">
            {contactItems.map((c, i) => (
              <Reveal key={c.label} delay={(i % 2) + 1} variant={['up', 'scale', 'left', 'right'][i % 4]}>
                <a className="contact-card" href={c.href}>
                  <div className="contact-icon">{c.icon}</div>
                  <div className="contact-label">{c.label}</div>
                  <div className="contact-value">{c.value}</div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="page-section page-section-alt">
        <div className="container">
          <Reveal variant="scale">
            <div className="cta-banner">
              <div>
                <h2 className="cta-title">想先体验一下？</h2>
                <p className="cta-desc">下载流星语，开始把开口变成文字</p>
              </div>
              <button className="btn btn-primary" onClick={() => onNavigate('download')}>立即下载</button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
