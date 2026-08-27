import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './AdapterCarousel.css'

const PLATFORMS = [
  { name: 'macOS', icon: '●', tag: '原生适配', desc: '支持 macOS 12+，触控板与快捷键深度集成。' },
  { name: 'Windows', icon: '▣', tag: '原生适配', desc: 'Windows 10/11，办公、编码场景流畅切换。' },
  { name: 'iOS', icon: '◉', tag: '移动端', desc: 'iPhone / iPad，语音转写与滑动输入兼得。' },
  { name: 'Android', icon: '⬢', tag: '移动端', desc: '主流安卓机型，九宫格与全键盘自适应。' },
  { name: 'Web', icon: '◐', tag: '浏览器插件', desc: 'Chrome / Edge 插件，网页里也能随时补全。' },
  { name: 'Linux', icon: '◆', tag: '开源支持', desc: '面向开发者的 Linux 版本，持续维护。' }
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
