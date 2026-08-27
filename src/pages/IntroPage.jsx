import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '../components/Reveal'

gsap.registerPlugin(ScrollTrigger)

const scenarios = [
  {
    title: '微信聊天',
    desc: '双手不方便时，按住语音键直接说，秒出文字发送。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    title: '工作汇报',
    desc: '零散想法自动整理成结构清晰的日报、周报。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    )
  },
  {
    title: '会议记录',
    desc: '边说边记，关键内容实时转写，会后直接导出。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    )
  },
  {
    title: '邮件起草',
    desc: '口语化表达一键转为正式、得体的商务邮件。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  },
  {
    title: '代码注释',
    desc: '在 IDE 中口述注释与 Commit 信息，保持心流。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  {
    title: '多语言沟通',
    desc: '中英文混合输入，自动识别并给出准确结果。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  }
]

const steps = [
  { num: '1', title: '下载安装', desc: '选择你的平台，一键安装流星语' },
  { num: '2', title: '授权输入', desc: '在系统设置中启用流星语输入法' },
  { num: '3', title: '按住说话', desc: '在任意文本框按住语音键，开口即输入' },
  { num: '4', title: '享受表达', desc: '让每一次开口都变成可用的文字' }
]

export default function IntroPage({ onNavigate }) {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const triggersRef = useRef([])

  useEffect(() => {
    const line = lineRef.current
    if (!line) return
    const length = line.getTotalLength()
    line.style.strokeDasharray = length
    line.style.strokeDashoffset = length

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 1,
        onUpdate: (self) => {
          line.style.strokeDashoffset = length * (1 - self.progress)
        }
      })
      triggersRef.current.push(st)
    }, sectionRef)

    return () => {
      triggersRef.current.forEach((st) => st.kill())
      triggersRef.current = []
      ctx.revert()
    }
  }, [])

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
                  <div className="scenario-icon">{s.icon}</div>
                  <h3 className="scenario-title">{s.title}</h3>
                  <p className="scenario-desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="page-section page-section-alt" ref={sectionRef}>
        <div className="container">
          <svg className="scenario-timeline" viewBox="0 0 2 600" preserveAspectRatio="none">
            <line ref={lineRef} x1="1" y1="0" x2="1" y2="600" />
          </svg>

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

      <div className="page-section">
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
