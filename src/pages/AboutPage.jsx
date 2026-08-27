import Reveal from '../components/Reveal'

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: '表达至上',
    desc: '我们相信，每一个人都应该轻松、准确地表达自己。'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    title: '技术为人',
    desc: 'AI 是工具，不是主人。技术服务于真实的沟通场景。'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: '隐私优先',
    desc: '敏感内容本地处理，用户数据只属于用户。'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: '持续打磨',
    desc: '从每一次输入体验出发，追求更快、更准、更自然。'
  }
]

const milestones = [
  { year: '2025', title: '流星语立项', desc: '团队成立，开始探索语音与输入法的结合。' },
  { year: '2025', title: '首个内测版', desc: '核心语音转写与润色功能完成，邀请首批用户试用。' },
  { year: '2026', title: '全平台覆盖', desc: '支持 iOS、Android、Windows、macOS 四大平台。' },
  { year: '2026', title: '持续进化', desc: '不断优化模型与体验，让更多人开口即成文。' }
]

const contactItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: '产品反馈',
    value: 'feedback@liuxingyu.cn',
    href: 'mailto:feedback@liuxingyu.cn'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    label: '商务合作',
    value: 'business@liuxingyu.cn',
    href: 'mailto:business@liuxingyu.cn'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    label: '问题咨询',
    value: 'support@liuxingyu.cn',
    href: 'mailto:support@liuxingyu.cn'
  }
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
