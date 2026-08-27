import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './AdapterCarousel.css'

const PLATFORMS = [
  {
    name: 'macOS', tag: '原生适配', desc: '支持 macOS 12+，触控板与快捷键深度集成。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 2c-1.2 1-3 1.6-4.5 1.4-1.5 0-2.8-.8-4-.8-2 0-4 1-5 3-2 4-1 9 1 12 1.2 1.8 2.4 3.4 4 3.4 1.6 0 2-1 4-1s2.4 1 4 1c1.6 0 2.6-1.5 3.6-3 .7-1 1.2-2 1.4-3-3-1-4.5-5-1.5-7-.8-1.2-2.4-2-3-2z" />
        <path d="M12 6c-.5-1 0-2.5 1-3" />
      </svg>
    )
  },
  {
    name: 'Windows', tag: '原生适配', desc: 'Windows 10/11，办公、编码场景流畅切换。',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 4l9.5-1.2V11H2V4zm10.5-1.3L22 2v8.9H12.5V2.7zM2 12.1h9.5v8.1L2 19.1V12.1zm10.5.1H22V22l-9.5-.9v-8.9z" />
      </svg>
    )
  },
  {
    name: 'iOS', tag: '移动端', desc: 'iPhone / iPad，语音转写与滑动输入兼得。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M11 18h2" />
      </svg>
    )
  },
  {
    name: 'Android', tag: '移动端', desc: '主流安卓机型，九宫格与全键盘自适应。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 8h14v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8z" />
        <path d="M3 11h2M19 11h2M9 5l-1.5-2M15 5l1.5-2" />
        <circle cx="9" cy="14" r=".6" fill="currentColor" />
        <circle cx="15" cy="14" r=".6" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'Web', tag: '浏览器插件', desc: 'Chrome / Edge 插件，网页里也能随时补全。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    )
  },
  {
    name: 'Linux', tag: '开源支持', desc: '面向开发者的 Linux 版本，持续维护。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 7c-1.5 0-2.5 1-2.5 2.5C5.5 11 7 12 7 13c0 1.5-1.5 2-1.5 4 0 1.5 1 3 2.5 4h8c1.5-1 2.5-2.5 2.5-4 0-2-1.5-2.5-1.5-4 0-1 1.5-2 1.5-3.5C18.5 8 17.5 7 16 7H8" />
        <circle cx="10" cy="11" r=".6" fill="currentColor" />
        <circle cx="14" cy="11" r=".6" fill="currentColor" />
      </svg>
    )
  }
]

export default function AdapterCarousel() {
  const wheelRef = useRef(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const items = wheelRef.current?.querySelectorAll('.adapter-item')
    if (!items || items.length === 0) return

    const N = items.length
    const radius = 200

    const position = (idx) => {
      const angle = (idx / N) * Math.PI * 2 - Math.PI / 2
      items.forEach((el, i) => {
        const a = angle + (i / N) * Math.PI * 2
        const x = Math.cos(a) * radius
        const y = Math.sin(a) * radius
        const isActive = i === idx % N
        gsap.set(el, {
          x,
          y,
          scale: isActive ? 1.15 : 0.82,
          opacity: isActive ? 1 : 0.55,
          zIndex: isActive ? 10 : 1
        })
      })
    }

    position(activeRef.current)

    const spin = (dir) => {
      activeRef.current = (activeRef.current + dir + N) % N
      position(activeRef.current)
      setActive(activeRef.current)
    }

    // 自动旋转
    const timer = setInterval(() => spin(1), 2600)

    const onPrev = () => spin(-1)
    const onNext = () => spin(1)

    const prevBtn = wheelRef.current.parentElement.querySelector('.adapter-prev')
    const nextBtn = wheelRef.current.parentElement.querySelector('.adapter-next')
    prevBtn?.addEventListener('click', onPrev)
    nextBtn?.addEventListener('click', onNext)

    return () => {
      clearInterval(timer)
      prevBtn?.removeEventListener('click', onPrev)
      nextBtn?.removeEventListener('click', onNext)
    }
  }, [])

  const cur = PLATFORMS[active]

  return (
    <div className="adapter">
      <div className="adapter-wheel-wrap">
        <div className="adapter-wheel" ref={wheelRef}>
          {PLATFORMS.map((p) => (
            <div className="adapter-item" key={p.name}>
              <span className="adapter-item-icon">{p.icon}</span>
            </div>
          ))}
        </div>
        <div className="adapter-center">
          <span className="adapter-center-label">{cur.name}</span>
        </div>
      </div>

      <div className="adapter-controls">
        <button className="adapter-nav adapter-prev" aria-label="上一个平台">←</button>
        <div className="adapter-info">
          <div className="adapter-info-tag">{cur.tag}</div>
          <p className="adapter-info-desc">{cur.desc}</p>
        </div>
        <button className="adapter-nav adapter-next" aria-label="下一个平台">→</button>
      </div>
    </div>
  )
}
