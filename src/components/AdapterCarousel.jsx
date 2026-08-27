import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './AdapterCarousel.css'

const PLATFORMS = [
  {
    name: 'macOS', tag: '原生适配', desc: '支持 macOS 12+，触控板与快捷键深度集成。',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.8 8.3c-.1-1.7 1.1-3.1 2.6-3.8-.7-1-1.8-1.6-3-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.8-.8-3-.8-1.6 0-3.1 1-3.9 2.5-1.7 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 2.9 2.3 1.2-.1 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.1 2.9-2.3.6-.9.9-1.8 1-1.9-.1 0-1.9-.7-1.9-2.9-.1-1.8 1.5-2.7 1.6-2.8-.9-1.3-2.2-1.4-2.7-1.5-1.3-.1-2.4.7-3 .7zM15.4 4.6c.7-.8 1.1-1.9.9-3-1 .1-2.1.6-2.8 1.5-.6.7-1.1 1.8-.9 2.9 1.1.1 2.1-.5 2.8-1.4z" />
      </svg>
    )
  },
  {
    name: 'Windows', tag: '原生适配', desc: 'Windows 10/11，办公、编码场景流畅切换。',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 4.5l8.5-1.1V11H2V4.5zM11.5 3.3L22 2v8.8h-10.5V3.3zM2 12.5h8.5v7.6L2 19V12.5zM11.5 12.5H22V22l-10.5-1.1V12.5z" />
      </svg>
    )
  },
  {
    name: 'iOS', tag: '移动端', desc: 'iPhone / iPad，语音转写与滑动输入兼得。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    )
  },
  {
    name: 'Android', tag: '移动端', desc: '主流安卓机型，九宫格与全键盘自适应。',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 9.2c0-.5-.1-1-.2-1.4l2.5-2.1c.2-.2.2-.5 0-.7l-.2-.3c-.2-.2-.5-.2-.7 0l-2.6 2.2c-.9-.7-2.1-1.1-3.4-1.1s-2.5.4-3.4 1.1L7 4.7c-.2-.2-.5-.2-.7 0l-.2.3c-.2.2-.2.5 0 .7l2.5 2.1c-.1.5-.2 1-.2 1.4 0 2.6 1.7 4.8 4 5.6v3.2H9.5c-.3 0-.5.2-.5.5v.5c0 .3.2.5.5.5h5c.3 0 .5-.2.5-.5v-.5c0-.3-.2-.5-.5-.5H13.6v-3.2c2.3-.8 4-3 4-5.6zM8.8 11c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm6.4 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
      </svg>
    )
  },
  {
    name: 'Web', tag: '浏览器插件', desc: 'Chrome / Edge 插件，网页里也能随时补全。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="3" ry="9" />
        <path d="M3 12h18" />
      </svg>
    )
  },
  {
    name: 'Linux', tag: '开源支持', desc: '面向开发者的 Linux 版本，持续维护。',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-1.5 0-2.7 1.2-2.7 2.7 0 .6.2 1.1.5 1.5-.8.4-1.4 1.1-1.8 2-.4.8-.6 1.8-.6 2.8 0 .8.1 1.6.4 2.3.2.6.6 1.1 1 1.5.4.4.9.7 1.4.9-.2.3-.3.7-.3 1.1 0 .9.7 1.6 1.6 1.6h.6c.4 0 .8-.2 1.1-.5.3.3.7.5 1.1.5h.6c.9 0 1.6-.7 1.6-1.6 0-.4-.1-.8-.3-1.1.5-.2 1-.5 1.4-.9.4-.4.8-.9 1-1.5.3-.7.4-1.5.4-2.3 0-1-.2-2-.6-2.8-.4-.9-1-1.6-1.8-2 .3-.4.5-.9.5-1.5 0-1.5-1.2-2.7-2.7-2.7z" />
        <circle cx="10" cy="10" r=".8" fill="currentColor" />
        <circle cx="14" cy="10" r=".8" fill="currentColor" />
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
    const radius = 120

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
