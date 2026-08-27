import Reveal from './Reveal'

// 产品实拍截图展示区：用真实 UI 截图 + 说明文字
const base = import.meta.env.BASE_URL

const SHOTS = [
  {
    img: `${base}img/app-complete.png`,
    tag: 'SMART COMPLETE',
    title: '智能补全，边想边写',
    desc: '理解你正在输入的字句与语气，在下文尚未敲出时，给出恰到好处的续写建议。无需切换模式，流星语已在思考。'
  },
  {
    img: `${base}img/app-dictate.png`,
    tag: 'VOICE TO TEXT',
    title: '开口即得，语音转写',
    desc: '一句口语，自动整理成得体的邮件、汇报或文案。波形随声起伏，文字应声落地。'
  }
]

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
          <p className="section-subtitle">真实界面，亲身体验每一次落字的光</p>
        </Reveal>

        <div className="showcase-list">
          {SHOTS.map((s, i) => (
            <div className={`showcase-row ${i % 2 === 1 ? 'showcase-row-rev' : ''}`} key={s.title}>
              <Reveal variant={i % 2 === 0 ? 'left' : 'right'}>
                <div className="showcase-media">
                  <img src={s.img} alt={s.title} loading="lazy" />
                  <span className="showcase-frame" aria-hidden="true" />
                </div>
              </Reveal>
              <Reveal delay={1} variant={i % 2 === 0 ? 'right' : 'left'}>
                <div className="showcase-body">
                  <span className="showcase-tag">{s.tag}</span>
                  <h3 className="showcase-title">{s.title}</h3>
                  <p className="showcase-desc">{s.desc}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
