import { useEffect, useRef, useState } from 'react'
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
    mockup: 'phone'
  },
  {
    id: 'correct',
    label: '02',
    en: 'Self-Correction',
    title: '自我纠正识别',
    desc: '嘴瓢、重复、自我纠正都会被智能过滤。你说"不对，改成..."，它只保留最终想表达的意思。',
    mockup: 'cleanup'
  },
  {
    id: 'format',
    label: '03',
    en: 'Auto Format',
    title: '自动格式化',
    desc: '口述的清单、步骤、要点会被自动整理成结构化文本。告别手动排版，开口就是成品。',
    mockup: 'format'
  },
  {
    id: 'edit',
    label: '04',
    en: 'Speak to Edit',
    title: '语音编辑',
    desc: '不用手动选字删改，直接说"把最后一句改正式一点"，文字就会按你的指令变化。',
    mockup: 'edit'
  },
  {
    id: 'tone',
    label: '05',
    en: 'Personal Tone',
    title: '个性化文风',
    desc: '学习你的语气、习惯和表达偏好。给朋友轻松，给客户正式，让输出始终像你自己写的。',
    mockup: 'tone'
  },
  {
    id: 'vocab',
    label: '06',
    en: 'Custom Vocabulary',
    title: '个人词库',
    desc: '添加专业名词、品牌名、缩写或生僻词，越用越准，避免反复纠正同一个人名或术语。',
    mockup: 'vocab'
  },
  {
    id: 'everywhere',
    label: '07',
    en: 'Works Everywhere',
    title: '全场景通用',
    desc: '在微信、飞书、邮件、笔记、代码编辑器甚至浏览器表单中都能使用，不挑应用。',
    mockup: 'everywhere'
  },
  {
    id: 'privacy',
    label: '08',
    en: 'Privacy First',
    title: '隐私优先',
    desc: '语音与文本优先在本地处理，敏感内容无需上传云端，你的表达只属于你。',
    mockup: 'privacy'
  }
]

function PhoneMockup() {
  return (
    <div className="mockup-phone mockup-phone-demo">
      <div className="mockup-phone-notch" />
      <div className="mockup-phone-screen">
        <div className="mockup-chat-header">
          <div className="mockup-avatar">A</div>
          <div>
            <div className="mockup-chat-name">阿明</div>
            <div className="mockup-chat-status">在线</div>
          </div>
        </div>
        <div className="mockup-chat-body">
          <div className="mockup-bubble mockup-bubble-them mockup-bubble-1">
            晚上吃饭吗？
          </div>
          <div className="mockup-bubble mockup-bubble-me mockup-bubble-voice mockup-bubble-2">
            <div className="mockup-voice-wave">
              {[...Array(12)].map((_, i) => (
                <span key={i} className="mockup-wave-bar" style={{ '--i': i }} />
              ))}
            </div>
            <span className="mockup-voice-time">0:08</span>
          </div>
          <div className="mockup-bubble mockup-bubble-me mockup-bubble-3">
            <span className="mockup-typewriter">好啊，想去那家新开的日料，七点可以吗？</span>
          </div>
        </div>
        <div className="mockup-chat-input">
          <div className="mockup-input-orb">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            </svg>
          </div>
          <div className="mockup-input-text">按住说话</div>
        </div>
      </div>

      <div className="mockup-speed-compare">
        <div className="mockup-speed-item">
          <span>打字输入</span>
          <strong>~12s</strong>
          <small>逐字敲出</small>
        </div>
        <div className="mockup-speed-vs">VS</div>
        <div className="mockup-speed-item mockup-speed-fast">
          <span>语音输入</span>
          <strong>~3s</strong>
          <small>说完即成</small>
        </div>
      </div>

      <div className="mockup-hover-hint">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        悬停体验
      </div>
    </div>
  )
}

function CleanupMockup() {
  return (
    <div className="mockup-text-editor">
      <div className="mockup-editor-header">
        <div className="mockup-editor-dot" />
        <div className="mockup-editor-dot" />
        <div className="mockup-editor-dot" />
      </div>
      <div className="mockup-editor-body">
        <p className="mockup-line mockup-line-strike">我们那个嗯明天的会议改成下午两点吧，不对，改成三点。</p>
        <p className="mockup-line mockup-line-final">明天的会议改成下午三点。</p>
        <div className="mockup-cleanup-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          已清理 6 个冗余词
        </div>
      </div>
    </div>
  )
}

function FormatMockup() {
  return (
    <div className="mockup-email">
      <div className="mockup-email-header">
        <div className="mockup-email-avatar">李</div>
        <div>
          <div className="mockup-email-from">李经理</div>
          <div className="mockup-email-subj">下周工作计划</div>
        </div>
      </div>
      <div className="mockup-email-body">
        <p className="mockup-email-p">已完成本周复盘，下周重点：</p>
        <div className="mockup-list">
          <div className="mockup-list-item"><span className="mockup-bullet" />完成产品需求评审</div>
          <div className="mockup-list-item"><span className="mockup-bullet" />输出 UI 设计稿</div>
          <div className="mockup-list-item"><span className="mockup-bullet" />召开技术对齐会</div>
        </div>
      </div>
    </div>
  )
}

function EditMockup() {
  return (
    <div className="mockup-editor-card">
      <div className="mockup-editor-toolbar">
        <span>B</span>
        <span>I</span>
        <span>U</span>
        <span className="mockup-toolbar-divider" />
        <span>⋯</span>
      </div>
      <div className="mockup-editor-content">
        <p className="mockup-edit-old">这个方案我觉得还可以，再改改吧。</p>
        <p className="mockup-edit-new">该方案具备可行性，建议进一步完善后推进。</p>
      </div>
      <div className="mockup-command-chip">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        </svg>
        "改正式一点"
      </div>
    </div>
  )
}

const TONE_PRESETS = [
  {
    key: 'casual',
    label: '轻松',
    text: '嘿，方案我看了，感觉不错，咱们再细化一下？'
  },
  {
    key: 'formal',
    label: '正式',
    text: '该方案整体可行，建议进一步细化后推进实施。'
  },
  {
    key: 'warm',
    label: '亲切',
    text: '这个方案我觉得挺好的，咱们一起再打磨打磨，让它更完善～'
  }
]

function ToneMockup() {
  const [active, setActive] = useState('formal')
  const current = TONE_PRESETS.find((t) => t.key === active)

  return (
    <div className="mockup-tone">
      <div className="mockup-tone-tabs">
        {TONE_PRESETS.map((t) => (
          <button
            key={t.key}
            className={`mockup-tone-tab ${active === t.key ? 'mockup-tone-active' : ''}`}
            onClick={() => setActive(t.key)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mockup-tone-chat">
        <div className="mockup-tone-bubble mockup-tone-bubble-them">
          <span className="mockup-tone-label">原始表达</span>
          <p className="mockup-tone-text">方案我看了，还可以，再改改吧。</p>
        </div>
        <div className="mockup-tone-bubble mockup-tone-bubble-me">
          <span className="mockup-tone-label">{current.label}版</span>
          <p className="mockup-tone-text" key={active}>{current.text}</p>
        </div>
      </div>
    </div>
  )
}

const VOCAB_WORDS = ['流星语', 'Typeless', 'LLM', '多模态']

function VocabMockup() {
  return (
    <div className="mockup-vocab">
      <div className="mockup-vocab-chat">
        <div className="mockup-vocab-header">
          <div className="mockup-vocab-title">个人词库</div>
          <div className="mockup-vocab-count">{VOCAB_WORDS.length} 个词条</div>
        </div>

        <div className="mockup-vocab-bubble">
          <span className="mockup-vocab-label">语音转写</span>
          <p className="mockup-vocab-text">
            这次{' '}
            <span className="mockup-vocab-highlight">流星语</span>{' '}
            接入了{' '}
            <span className="mockup-vocab-highlight">LLM</span>{' '}
            多模态能力，{' '}
            <span className="mockup-vocab-highlight">Typeless</span>{' '}
            团队正在做最后测试。
          </p>
        </div>

        <div className="mockup-vocab-words">
          {VOCAB_WORDS.map((word) => (
            <span key={word} className="mockup-vocab-chip">
              {word}
            </span>
          ))}
          <span className="mockup-vocab-chip mockup-vocab-chip-add">+ 添加</span>
        </div>
      </div>
    </div>
  )
}

function EverywhereMockup() {
  return (
    <div className="mockup-devices">
      <div className="mockup-device mockup-device-phone">
        <div className="mockup-device-screen">
          <div className="mockup-device-app">聊</div>
        </div>
      </div>
      <div className="mockup-device mockup-device-laptop">
        <div className="mockup-device-screen-lg">
          <div className="mockup-device-row">
            <div className="mockup-device-app">邮</div>
            <div className="mockup-device-app">记</div>
            <div className="mockup-device-app">码</div>
          </div>
        </div>
      </div>
      <div className="mockup-device mockup-device-tablet">
        <div className="mockup-device-screen">
          <div className="mockup-device-app">表</div>
        </div>
      </div>
    </div>
  )
}

function PrivacyMockup() {
  return (
    <div className="mockup-privacy">
      <div className="mockup-shield">
        <svg viewBox="0 0 80 90" fill="none">
          <path d="M40 5 L70 20 V45 Q70 70 40 85 Q10 70 10 45 V20 Z" />
          <rect x="32" y="40" width="16" height="18" rx="2" />
          <path d="M32 40 V34 Q32 26 40 26 Q48 26 48 34 V40" />
        </svg>
        <div className="mockup-shield-badge">本地</div>
      </div>
      <div className="mockup-privacy-flow">
        <div className="mockup-privacy-node">
          <div className="mockup-privacy-icon mockup-privacy-mic">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            </svg>
          </div>
          <span>语音输入</span>
        </div>
        <div className="mockup-privacy-arrow">
          <svg viewBox="0 0 40 8" fill="none">
            <path d="M0 4 H36 M32 1 L36 4 L32 7" />
          </svg>
        </div>
        <div className="mockup-privacy-node">
          <div className="mockup-privacy-icon mockup-privacy-device">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <line x1="12" y1="18" x2="12" y2="18.01" />
            </svg>
          </div>
          <span>本地处理</span>
        </div>
        <div className="mockup-privacy-arrow">
          <svg viewBox="0 0 40 8" fill="none">
            <path d="M0 4 H36 M32 1 L36 4 L32 7" />
          </svg>
        </div>
        <div className="mockup-privacy-node">
          <div className="mockup-privacy-icon mockup-privacy-done">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <span>输出文字</span>
        </div>
      </div>
    </div>
  )
}

const mockups = {
  phone: PhoneMockup,
  cleanup: CleanupMockup,
  format: FormatMockup,
  edit: EditMockup,
  tone: ToneMockup,
  vocab: VocabMockup,
  everywhere: EverywhereMockup,
  privacy: PrivacyMockup
}

export default function FeatureShowcase() {
  const sectionRef = useRef(null)
  const bandsRef = useRef([])
  const triggersRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      bandsRef.current.forEach((band, i) => {
        if (!band) return
        const visual = band.querySelector('.feature-mockup')
        const texts = band.querySelectorAll('.feature-text-line')
        const bubbles = band.querySelectorAll('.mockup-bubble, .mockup-list-item, .mockup-vocab-item, .mockup-device, .mockup-tone-card, .mockup-privacy-node')
        const strikeWords = band.querySelectorAll('.mockup-line-strike')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: band,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
          }
        })

        tl.fromTo(
          visual,
          { opacity: 0, y: 50, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }
        )
          .fromTo(
            texts,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
            '-=0.7'
          )

        if (bubbles.length) {
          tl.fromTo(
            bubbles,
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)' },
            '-=0.4'
          )
        }

        if (strikeWords.length) {
          tl.fromTo(
            strikeWords,
            { opacity: 1 },
            { opacity: 0.25, duration: 0.8, ease: 'power2.out' },
            '-=0.2'
          )
        }

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
      <div className="feature-showcase-header">
        <div className="container-wide">
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
      </div>

      <div className="feature-bands">
        {features.map((f, i) => {
          const Mockup = mockups[f.mockup]
          const isEven = i % 2 === 0
          return (
            <div
              key={f.id}
              className={`feature-band ${isEven ? 'feature-band-left' : 'feature-band-right'}`}
              ref={(el) => (bandsRef.current[i] = el)}
            >
              <div className="feature-band-inner">
                <div className="feature-band-content">
                  <span className="feature-text-line feature-label">{f.label}</span>
                  <span className="feature-text-line feature-en">{f.en}</span>
                  <h3 className="feature-text-line feature-title">{f.title}</h3>
                  <p className="feature-text-line feature-desc">{f.desc}</p>
                </div>
                <div className="feature-mockup">
                  <div className="feature-mockup-frame">
                    <Mockup />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
