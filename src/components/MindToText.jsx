import { useEffect, useRef, useId } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MindToText.css'

gsap.registerPlugin(ScrollTrigger)

const THOUGHTS = ['创意', '计划', '沟通']
const SENTENCE = '让每一次表达，都如流星般汇聚成形'

export default function MindToText() {
  const root = useRef(null)
  const lineRef = useRef(null)
  const gradId = useId()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dots = gsap.utils.toArray('.mind-dot')
      const lines = gsap.utils.toArray('.mind-line')
      const chars = gsap.utils.toArray('.mind-char')
      const centerDot = gsap.utils.toArray('.mind-center-dot')
      const vline = lineRef.current

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      })

      tl.fromTo(dots,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' }, 0)

      tl.fromTo(lines,
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, stagger: 0.06, duration: 0.5, ease: 'power2.inOut' }, 0.4)

      tl.fromTo(centerDot,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, 0.8)

      if (vline) {
        const len = vline.getTotalLength()
        vline.style.strokeDasharray = len
        vline.style.strokeDashoffset = len
        tl.fromTo(vline,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1, ease: 'none' }, 1.0)
      }

      tl.fromTo(chars,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, stagger: 0.03, duration: 0.3, ease: 'power2.out' }, 1.5)
    }, root)
    return () => ctx.revert()
  }, [])

  const cx0 = 300, cy0 = 120
  const rx = 110, ry = 80

  return (
    <div className="mind" ref={root}>
      <div className="mind-extend-line" aria-hidden="true" />
      <svg className="mind-svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {THOUGHTS.map((label, i) => {
          const angle = -Math.PI / 2 + (i - 1) * (Math.PI / 3)
          const x = cx0 + rx * Math.cos(angle)
          const y = cy0 + ry * Math.sin(angle)
          return (
            <line key={i} className="mind-line"
              x1={x} y1={y} x2={cx0} y2={cy0}
              stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" opacity="0.6"
              strokeDasharray="300" strokeDashoffset="300"
            />
          )
        })}

        {THOUGHTS.map((label, i) => {
          const angle = -Math.PI / 2 + (i - 1) * (Math.PI / 3)
          const x = cx0 + rx * Math.cos(angle)
          const y = cy0 + ry * Math.sin(angle)
          return (
            <g key={i} className="mind-dot" style={{ opacity: 0 }}>
              <circle cx={x} cy={y} r="28" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.6" />
              <circle cx={x} cy={y} r="5" fill="var(--primary)" />
              <text x={x} y={y + 48} textAnchor="middle" className="mind-dot-text">{label}</text>
            </g>
          )
        })}

        <circle className="mind-center-dot" cx={cx0} cy={cy0} r="6" fill="var(--primary)" style={{ opacity: 0 }} />

        <line ref={lineRef}
          x1={cx0} y1={cy0} x2={cx0} y2={580}
          stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" opacity="0.3"
        />
      </svg>

      <p className="mind-sentence">
        {SENTENCE.split('').map((ch, i) => (
          <span key={i} className="mind-char" style={{ opacity: 0, display: 'inline-block' }}>{ch}</span>
        ))}
      </p>
    </div>
  )
}
