import Reveal from '../components/Reveal'

const highlights = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    title: '语音转写',
    desc: '随口说，自动整理成干净文字。去除口癖、重复与自我纠正，只保留最终表达。'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
        <path d="m15 18 6-6-6-6" />
      </svg>
    ),
    title: '智能补全',
    desc: '理解上下文与语气，未写完的句子已为你续上，表达快人一步。'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" />
      </svg>
    ),
    title: '自动润色',
    desc: '一句口语，自动整理成得体邮件、汇报或文案，张嘴即得成品。'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: '实时翻译',
    desc: '边说边译，支持多种语言即时转写，跨语言沟通不再切换应用。'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: '隐私优先',
    desc: '本地优先处理，敏感内容不上云，输入这件事只属于你自己。'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: '跨端同步',
    desc: '手机、电脑、网页输入习惯与词库无缝同步，处处如一。'
  }
]

const scenarios = [
  { title: '微信聊天', desc: '双手不方便时，按住语音键直接说，秒出文字发送。' },
  { title: '工作汇报', desc: '零散想法自动整理成结构清晰的日报、周报。' },
  { title: '会议记录', desc: '边说边记，关键内容实时转写，会后直接导出。' },
  { title: '邮件起草', desc: '口语化表达一键转为正式、得体的商务邮件。' },
  { title: '代码注释', desc: '在 IDE 中口述注释与 Commit 信息，保持心流。' },
  { title: '多语言沟通', desc: '中英文混合输入，自动识别并给出准确结果。' }
]

const steps = [
  { num: '1', title: '下载安装', desc: '选择你的平台，一键安装流星语' },
  { num: '2', title: '授权输入', desc: '在系统设置中启用流星语输入法' },
  { num: '3', title: '按住说话', desc: '在任意文本框按住语音键，开口即输入' },
  { num: '4', title: '享受表达', desc: '让每一次开口都变成可用的文字' }
]

export default function IntroPage({ onNavigate }) {
  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <span className="page-hero-tag">FEATURES · 功能</span>
          <h1 className="page-hero-title">为表达而生的<em>AI 输入法</em></h1>
          <p className="page-hero-sub">
            流星语把语音、理解与润色能力融入每一次输入，让你在任何文本框里都能快速、自然、准确地表达。
          </p>
        </div>
      </div>

      <div className="page-section">
        <div className="container">
          <Reveal variant="fade">
            <span className="section-kicker">Core capabilities</span>
          </Reveal>
          <Reveal variant="blur">
            <h2 className="page-title">核心能力</h2>
          </Reveal>
          <Reveal delay={1} variant="fade">
            <p className="page-subtitle">不只是语音识别，更是懂你的输入助手</p>
          </Reveal>

          <div className="highlights-grid">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={(i % 3) + 1} variant={['up', 'scale', 'blur'][i % 3]}>
                <div className="highlight-card">
                  <div className="highlight-icon">{h.icon}</div>
                  <h3 className="highlight-title">{h.title}</h3>
                  <p className="highlight-desc">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="page-section page-section-alt">
        <div className="container">
          <Reveal variant="fade">
            <span className="section-kicker">Use cases</span>
          </Reveal>
          <Reveal variant="blur">
            <h2 className="page-title">你在哪写，它就在哪</h2>
          </Reveal>
          <Reveal delay={1} variant="fade">
            <p className="page-subtitle">覆盖日常沟通、办公协作与内容创作的常见场景</p>
          </Reveal>

          <div className="scenario-grid">
            {scenarios.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) + 1} variant={['up', 'scale', 'blur'][i % 3]}>
                <div className="scenario-card">
                  <h3 className="scenario-title">{s.title}</h3>
                  <p className="scenario-desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="page-section">
        <div className="container">
          <Reveal variant="fade">
            <span className="section-kicker">Get started</span>
          </Reveal>
          <Reveal variant="blur">
            <h2 className="page-title">四步开始</h2>
          </Reveal>
          <Reveal delay={1} variant="fade">
            <p className="page-subtitle">零学习成本，像使用普通输入法一样简单</p>
          </Reveal>

          <div className="steps-grid">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) + 1} variant={['up', 'scale', 'blur', 'fade'][i % 4]}>
                <div className="step-card">
                  <div className="step-num">{s.num}</div>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
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
                <h2 className="cta-title">准备好开始说了吗？</h2>
                <p className="cta-desc">免费下载流星语，把开口变成文字</p>
              </div>
              <button className="btn btn-primary" onClick={() => onNavigate('download')}>立即下载</button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
