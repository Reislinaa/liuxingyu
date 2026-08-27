import Reveal from './Reveal'
import ScrollLine from './ScrollLine'

const features = [
  {
    icon: '✦',
    en: 'COMPLETE',
    title: '智能补全',
    desc: '理解上下文与语气，未写完的句子已为你续上，表达快人一步。'
  },
  {
    icon: '⌨',
    en: 'DICTATE',
    title: '语音转写',
    desc: '高精度离线可跑的语音识别，方言、术语、轻声细语都听得懂。'
  },
  {
    icon: '◎',
    en: 'DOMAIN',
    title: '行业词库',
    desc: '为法律、医疗、代码、电商等领域定制专属词库与术语表达。'
  },
  {
    icon: '↻',
    en: 'POLISH',
    title: '自动润色',
    desc: '一句口语，自动整理成得体邮件、汇报或文案，张嘴即得成品。'
  },
  {
    icon: '🛡',
    en: 'PRIVATE',
    title: '隐私优先',
    desc: '本地优先处理，敏感内容不上云，输入这件事只属于你自己。'
  },
  {
    icon: '↗',
    en: 'SYNCED',
    title: '跨端同步',
    desc: '手机、电脑、网页输入习惯与词库无缝同步，处处如一。'
  }
]

export default function Features({ onTryFeature }) {
  return (
    <section className="section features" id="features">
      <div className="container">
        <Reveal variant="fade">
          <span className="section-kicker">Works everywhere you type</span>
        </Reveal>
        <Reveal variant="blur">
          <h2 className="section-title">为表达而生的能力</h2>
        </Reveal>
        <Reveal delay={1} variant="fade">
          <p className="section-subtitle">
            把每一次输入，都变成流星划过般的轻盈与准确
          </p>
        </Reveal>
        <ScrollLine />
        <div className="features-grid">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) + 1} variant={['up', 'scale', 'left', 'right', 'blur'][i % 5]}>
              <div className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <span className="feature-en">{f.en}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
