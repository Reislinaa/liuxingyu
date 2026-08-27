import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal'
import './FeatureShowcase.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 'voice',
    label: '01',
    en: 'Voice to Text',
    title: 'AI 语音转写',
    desc: '自然说话即可生成准确文字。无论是长句还是专业术语，都能被清晰识别并转写成可直接发送的内容。',
    visual: 'waveform'
  },
  {
    id: 'correct',
    label: '02',
    en: 'Self-Correction',
    title: '自我纠正识别',
    desc: '嘴瓢、重复、自我纠正都会被智能过滤。你说"不对，改成..."，它只保留最终想表达的意思。',
    visual: 'cleanup'
  },
  {
    id: 'format',
    label: '03',
    en: 'Auto Format',
    title: '自动格式化',
    desc: '口述的清单、步骤、要点会被自动整理成结构化文本。告别手动排版，开口就是成品。',
    visual: 'format'
  },
  {
    id: 'edit',
    label: '04',
    en: 'Speak to Edit',
    title: '语音编辑',
    desc: '不用手动选字删改，直接说"把最后一句改正式一点"，文字就会按你的指令变化。',
    visual: 'edit'
  },
  {
    id: 'tone',
    label: '05',
    en: 'Personal Tone',
    title: '个性化文风',
    desc: '学习你的语气、习惯和表达偏好。给朋友轻松，给客户正式，让输出始终像你自己写的。',
    visual: 'tone'
  },
  {
    id: 'vocab',
    label: '06',
    en: 'Custom Vocabulary',
    title: '个人词库',
    desc: '添加专业名词、品牌名、缩写或生僻词，越用越准，避免反复纠正同一个人名或术语。',
    visual: 'vocab'
  },
  {
    id: 'everywhere',
    label: '07',
    en: 'Works Everywhere',
    title: '全场景通用',
    desc: '在微信、飞书、邮件、笔记、代码编辑器甚至浏览器表单中都能使用，不挑应用。',
    visual: 'everywhere'
  },
  {
    id: 'privacy',
    label: '08',
    en: 'Privacy First',
    title: '隐私优先',
    desc: '语音与文本优先在本地处理，敏感内容无需上传云端，你的表达只属于你。',
    visual: 'privacy'
  }
]

function WaveformVisual() {
  return (
    <svg className="feature-visual-svg" viewBox="0 0 320 220" fill="none">
      <g className="visual-line-group">
        <path className="visual-line visual-line-1" d="M40 110 Q90 60 140 110 T240 110" />
        <path className="visual-line visual-line-2" d="M60 110 L120 110" />
        <path className="visual-line visual-line-3" d="M140 110 L260 110" />
      </g>
      <g className="visual-bars">
        {[40, 70, 100, 130, 160, 190, 220, 250, 280].map((x, i) => (
          <rect key={i} className={`visual-bar visual-bar-${i + 1}`} x={x} y={90} width={12} height={40} rx="6" />
        ))}
      </g>
      <text className="visual-text" x="160" y="185" textAnchor="middle">"说出来，即成文"</text>
    </svg>
  )
}

function CleanupVisual() {
  return (
    <svg className="feature-visual-svg" viewBox="0 0 320 220" fill="none">
      <g className="visual-line-group">
        <path className="visual-line visual-line-1" d="M50 70 L270 70" />
        <path className="visual-line visual-line-2" d="M50 100 L200 100" />
        <path className="visual-line visual-line-3" d="M50 130 L240 130" />
      </g>
      <g className="visual-crosses">
        <path className="visual-cross" d="M60 62 L90 78 M90 62 L60 78" />
        <path className="visual-cross" d="M60 92 L180 108 M180 92 L60 108" />
      </g>
      <g className="visual-check">
        <circle className="visual-check-circle" cx="250" cy="160" r="22" />
        <path className="visual-check-mark" d="M238 160 L248 170 L265 150" />
      </g>
      <text className="visual-text visual-text-clean" x="160" y="170" textAnchor="middle">只保留最终表达</text>
    </svg>
  )
}

function FormatVisual() {
  return (
    <svg className="feature-visual-svg" viewBox="0 0 320 220" fill="none">
      <g className="visual-line-group">
        <path className="visual-line visual-line-1" d="M50 60 Q160 40 270 60" />
        <path className="visual-line visual-line-2" d="M50 150 L270 150" />
      </g>
      <g className="visual-list">
        <circle className="visual-dot" cx="70" cy="100" r="4" />
        <path className="visual-list-line" d="M90 100 L250 100" />
        <circle className="visual-dot" cx="70" cy="130" r="4" />
        <path className="visual-list-line" d="M90 130 L220 130" />
        <circle className="visual-dot" cx="70" cy="160" r="4" />
        <path className="visual-list-line" d="M90 160 L240 160" />
      </g>
      <text className="visual-text" x="160" y="205" textAnchor="middle">自动整理成列表</text>
    </svg>
  )
}

function EditVisual() {
  return (
    <svg className="feature-visual-svg" viewBox="0 0 320 220" fill="none">
      <g className="visual-line-group">
        <path className="visual-line visual-line-1" d="M50 120 L270 120" />
        <path className="visual-line visual-line-2" d="M190 120 L230 80" />
        <path className="visual-line visual-line-3" d="M230 80 L270 80" />
      </g>
      <g className="visual-cursor">
        <rect className="visual-cursor-rect" x="140" y="90" width="2" height="60" />
        <path className="visual-cursor-line" d="M130 150 L150 150" />
      </g>
      <g className="visual-mic">
        <rect className="visual-mic-body" x="235" y="55" width="20" height="34" rx="10" />
        <path className="visual-mic-stand" d="M245 89 L245 105" />
        <path className="visual-mic-arc" d="M228 78 Q228 100 245 100 Q262 100 262 78" />
      </g>
      <text className="visual-text" x="160" y="185" textAnchor="middle">"改正式一点"</text>
    </svg>
  )
}

function ToneVisual() {
  return (
    <svg className="feature-visual-svg" viewBox="0 0 320 220" fill="none">
      <g className="visual-line-group">
        <path className="visual-line visual-line-1" d="M50 110 Q110 70 160 110 Q210 150 270 110" />
        <path className="visual-line visual-line-2" d="M50 140 L270 140" />
      </g>
      <g className="visual-sliders">
        <rect className="visual-slider-bg" x="60" y="70" width="200" height="6" rx="3" />
        <circle className="visual-slider-knob" cx="90" cy="73" r="8" />
        <rect className="visual-slider-bg" x="60" y="170" width="200" height="6" rx="3" />
        <circle className="visual-slider-knob" cx="220" cy="173" r="8" />
      </g>
      <text className="visual-text visual-text-left" x="90" y="60" textAnchor="middle">轻松</text>
      <text className="visual-text visual-text-right" x="220" y="200" textAnchor="middle">正式</text>
    </svg>
  )
}

function VocabVisual() {
  return (
    <svg className="feature-visual-svg" viewBox="0 0 320 220" fill="none">
      <g className="visual-line-group">
        <path className="visual-line visual-line-1" d="M60 110 Q110 70 160 110" />
        <path className="visual-line visual-line-2" d="M160 110 Q210 150 260 110" />
        <path className="visual-line visual-line-3" d="M160 60 L160 160" />
      </g>
      <g className="visual-words">
        <rect className="visual-word" x="70" y="50" width="60" height="28" rx="6" />
        <text className="visual-word-text" x="100" y="69" textAnchor="middle">词库</text>
        <rect className="visual-word" x="190" y="50" width="60" height="28" rx="6" />
        <text className="visual-word-text" x="220" y="69" textAnchor="middle">术语</text>
        <rect className="visual-word" x="130" y="150" width="60" height="28" rx="6" />
        <text className="visual-word-text" x="160" y="169" textAnchor="middle">人名</text>
      </g>
      <circle className="visual-center" cx="160" cy="110" r="18" />
      <text className="visual-center-text" x="160" y="115" textAnchor="middle">+</text>
    </svg>
  )
}

function EverywhereVisual() {
  return (
    <svg className="feature-visual-svg" viewBox="0 0 320 220" fill="none">
      <g className="visual-line-group">
        <path className="visual-line visual-line-1" d="M160 110 L160 50" />
        <path className="visual-line visual-line-2" d="M160 110 L220 140" />
        <path className="visual-line visual-line-3" d="M160 110 L100 140" />
        <path className="visual-line visual-line-4" d="M160 110 L160 180" />
      </g>
      <g className="visual-apps">
        <rect className="visual-app" x="140" y="30" width="40" height="40" rx="10" />
        <text className="visual-app-text" x="160" y="56" textAnchor="middle">聊</text>
        <rect className="visual-app" x="230" y="120" width="40" height="40" rx="10" />
        <text className="visual-app-text" x="250" y="146" textAnchor="middle">邮</text>
        <rect className="visual-app" x="50" y="120" width="40" height="40" rx="10" />
        <text className="visual-app-text" x="70" y="146" textAnchor="middle">记</text>
        <rect className="visual-app" x="140" y="170" width="40" height="40" rx="10" />
        <text className="visual-app-text" x="160" y="196" textAnchor="middle">码</text>
      </g>
      <circle className="visual-keyboard" cx="160" cy="110" r="24" />
      <text className="visual-keyboard-text" x="160" y="115" textAnchor="middle">⌨</text>
    </svg>
  )
}

function PrivacyVisual() {
  return (
    <svg className="feature-visual-svg" viewBox="0 0 320 220" fill="none">
      <g className="visual-line-group">
        <path className="visual-line visual-line-1" d="M80 140 L160 90 L240 140" />
        <path className="visual-line visual-line-2" d="M160 90 L160 190" />
      </g>
      <g className="visual-shield">
        <path className="visual-shield-shape" d="M160 50 L220 80 V130 Q220 170 160 190 Q100 170 100 130 V80 Z" />
        <path className="visual-lock-body" d="M145 120 H175 V150 H145 Z" />
        <path className="visual-lock-arc" d="M150 120 V110 Q150 95 160 95 Q170 95 170 110 V120" />
      </g>
      <text className="visual-text" x="160" y="210" textAnchor="middle">本地处理</text>
    </svg>
  )
}

const visuals = {
  waveform: WaveformVisual,
  cleanup: CleanupVisual,
  format: FormatVisual,
  edit: EditVisual,
  tone: ToneVisual,
  vocab: VocabVisual,
  everywhere: EverywhereVisual,
  privacy: PrivacyVisual
}

export default function FeatureShowcase() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const itemsRef = useRef([])
  const triggersRef = useRef([])

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    const length = line.getTotalLength()
    line.style.strokeDasharray = length
    line.style.strokeDashoffset = length

    const ctx = gsap.context(() => {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 1
        }
      })

      itemsRef.current.forEach((item, i) => {
        if (!item) return
        const visual = item.querySelector('.feature-visual')
        const texts = item.querySelectorAll('.feature-text-line')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 40%',
            toggleActions: 'play none none reverse'
          }
        })

        tl.fromTo(
          visual,
          { opacity: 0, x: i % 2 === 0 ? 60 : -60, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
        )
          .fromTo(
            texts,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
            '-=0.6'
          )
          .fromTo(
            item.querySelectorAll('.visual-line, .visual-bar, .visual-dot, .visual-cross, .visual-check, .visual-word, .visual-app, .visual-shield'),
            { opacity: 0, scaleY: 0, scaleX: 0 },
            { opacity: 1, scaleY: 1, scaleX: 1, duration: 0.5, stagger: 0.04, ease: 'back.out(1.7)' },
            '-=0.5'
          )

        triggersRef.current.push(tl.scrollTrigger)
      })
    }, sectionRef)

    return () => {
      triggersRef.current.forEach((st) => st?.kill())
      triggersRef.current = []
      ctx.revert()
    }
  }, [])

  return (
    <section className="feature-showcase" id="features" ref={sectionRef}>
      <div className="container">
        <div className="feature-showcase-header">
          <Reveal variant="fade">
            <span className="section-kicker">Capabilities</span>
          </Reveal>
          <Reveal variant="blur">
            <h2 className="section-title">不只是语音输入</h2>
          </Reveal>
          <Reveal delay={1} variant="fade">
            <p className="section-subtitle">
              从识别到润色，从格式到隐私，每一步都为"说出来即成文"而设计
            </p>
          </Reveal>
        </div>

        <svg className="feature-timeline" viewBox="0 0 2 1600" preserveAspectRatio="none">
          <line ref={lineRef} x1="1" y1="0" x2="1" y2="1600" />
        </svg>

        <div className="feature-items">
          {features.map((f, i) => {
            const Visual = visuals[f.visual]
            return (
              <div
                key={f.id}
                className={`feature-item ${i % 2 === 0 ? 'feature-item-left' : 'feature-item-right'}`}
                ref={(el) => (itemsRef.current[i] = el)}
              >
                <div className="feature-content">
                  <span className="feature-text-line feature-label">{f.label}</span>
                  <span className="feature-text-line feature-en">{f.en}</span>
                  <h3 className="feature-text-line feature-title">{f.title}</h3>
                  <p className="feature-text-line feature-desc">{f.desc}</p>
                </div>
                <div className="feature-visual">
                  <div className="feature-visual-frame">
                    <Visual />
                  </div>
                  <div className="feature-connector" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
