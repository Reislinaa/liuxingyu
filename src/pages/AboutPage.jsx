import Reveal from '../components/Reveal'

const values = [
  { icon: '✦', title: '连接创新', desc: '为优秀 AI 产品与用户之间搭建桥梁。' },
  { icon: '◈', title: '真实推荐', desc: '坚持客观真实，让每一个推荐都值得信赖。' },
  { icon: '◍', title: '助力成长', desc: '帮助初创 AI 公司被更多人看见和认可。' },
  { icon: '◎', title: '共同进步', desc: '与 AI 生态里的每一位参与者共同前行。' }
]

const contactItems = [
  { icon: '✉', label: '入驻申请', value: 'join@liuxingyu.cn', href: 'mailto:join@liuxingyu.cn' },
  { icon: '◈', label: '商务合作', value: 'business@liuxingyu.cn', href: 'mailto:business@liuxingyu.cn' },
  { icon: '◎', label: '产品反馈', value: 'feedback@liuxingyu.cn', href: 'mailto:feedback@liuxingyu.cn' },
  { icon: '◍', label: '问题咨询', value: 'support@liuxingyu.cn', href: 'mailto:support@liuxingyu.cn' }
]

export default function AboutPage({ onNavigate }) {
  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <span className="page-hero-tag">ABOUT US · 关于我们</span>
          <h1 className="page-hero-title">让好 AI 产品<em>被看见</em></h1>
          <p className="page-hero-sub">
            流星语是一个专注于 AI 产品推广与发现平台，我们致力于连接优质的初创 AI 公司与
            真正需要它们的用户。
          </p>
        </div>
      </div>

      <div className="page-section">
        <div className="container">
          <Reveal variant="scale">
            <h2 className="page-title">我们的价值观</h2>
          </Reveal>
          <Reveal delay={1} variant="up">
            <p className="page-subtitle">四个信念，驱动我们前行</p>
          </Reveal>
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) + 1} variant={['up', 'blur', 'left', 'scale'][i % 4]}>
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

      <div className="page-section">
        <div className="container">
          <Reveal variant="scale">
            <div className="cta-banner">
              <div>
                <h2 className="cta-title">想要入驻流星语？</h2>
                <p className="cta-desc">提交申请，让产品获得专业展示</p>
              </div>
              <button className="btn btn-primary" onClick={() => onNavigate('join')}>立即入驻</button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}