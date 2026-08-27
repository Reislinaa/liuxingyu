import Reveal from '../components/Reveal'

export default function IntroPage({ onNavigate }) {
  const milestones = [
    { year: '2025', title: '流星语诞生', desc: '团队成立，启动 AI 产品推荐平台项目' },
    { year: '2025', title: '首个版本上线', desc: '发布 AI 产品发现平台首个公开版本' },
    { year: '2026', title: '全领域覆盖', desc: '产品库覆盖八大 AI 领域' },
    { year: '2026', title: '用户突破 10 万', desc: '获得越来越多用户的认可与喜爱' }
  ]

  const values = [
    { icon: '✦', title: '连接创新', desc: '为优秀 AI 产品与用户之间搭建桥梁。' },
    { icon: '◈', title: '真实推荐', desc: '坚持客观真实，让每一个推荐都值得信赖。' },
    { icon: '◍', title: '助力成长', desc: '帮助初创 AI 公司被更多人看见和认可。' },
    { icon: '◎', title: '共同进步', desc: '与 AI 生态里的每一位参与者共同前行。' }
  ]

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <span className="page-hero-tag">ABOUT · 认识流星语</span>
          <h1 className="page-hero-title">让好 AI 产品<em>被看见</em></h1>
          <p className="page-hero-sub">
            流星语是一个专注于 AI 产品推广与发现的平台，我们致力于连接优质的初创 AI 公司与
            真正需要它们的用户。
          </p>
        </div>
      </div>

      <div className="page-section">
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

      <div className="page-section page-section-alt">
        <div className="container">
          <Reveal variant="scale">
            <h2 className="page-title">我们的价值观</h2>
          </Reveal>
          <Reveal delay={1} variant="up">
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

      <div className="page-section">
        <div className="container">
          <Reveal variant="scale">
            <div className="cta-banner">
              <div>
                <h2 className="cta-title">想了解我们的产品？</h2>
                <p className="cta-desc">查看产品服务，发现更多 AI 好工具</p>
              </div>
              <button className="btn btn-primary" onClick={() => onNavigate('product')}>查看产品服务</button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}