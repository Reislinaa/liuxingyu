import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MindToText.css'

gsap.registerPlugin(ScrollTrigger)

const THOUGHTS = ['想法', '灵感', '思路', '片段', '一句', '一句']
const SENTENCE = '让每一次表达，都如流星般汇聚成形'

// 克制版：细线 + 小圆点 + 慢精准时序
export default function MindToText() {
  const root = useRef(null)
  const stage = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.mind-line')
      const dots = gsap.utils.toArray('.mind-dot')
      const chars = gsap.utils.toArray('.mind-char')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          end: 'top 25%',
          scrub: 0.6
        }
      })
      tl.fromTo(dots, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' }, 0)
      tl.fromTo(lines, { strokeDashoffset: 300 }, { strokeDashoffset: 0, stagger: 0.05, duration: 0.5, ease: 'power2.inOut' }, 0.5)
      tl.fromTo(chars, { opacity: 0, y: 6 }, { opacity: 1, y: 0, stagger: 0.02, duration: 0.25, ease: 'power2.out' }, 1.2)
    }, root)
    return () => ctx.revert()
  }, [])

  // 计算各圆点位置（圆形分布，中心 300,150）
  const cx0 = 300, cy0 = 150
  const rx = 130, ry = 95

  return (
    <div className="mind" ref={root}>
      <svg className="mind-svg" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet" ref={stage} aria-hidden="true">
        {/* 细线：从每个想法点汇聚到中心 */}
        {THOUGHTS.map((t, i) => {
          const angle = (i / THOUGHTS.length) * Math.PI * 2 - Math.PI / 2
          const cx = cx0 + Math.cos(angle) * rx
          const cy = cy0 + Math.sin(angle) * ry
          return (
            <line
              key={`l-${i}`}
              className="mind-line"
              x1={cx}
              y1={cy}
              x2={cx0}
              y2={cy0}
            />
          )
        })}
        {/* 中心点 */}
        <circle className="mind-core" cx={cx0} cy={cy0} r="4" />
        {/* 想法点：小圆 + 文字 */}
        {THOUGHTS.map((t, i) => {
          const angle = (i / THOUGHTS.length) * Math.PI * 2 - Math.PI / 2
          const cx = cx0 + Math.cos(angle) * rx
          const cy = cy0 + Math.sin(angle) * ry
          return (
            <g key={`d-${i}`} className="mind-dot" transform={`translate(${cx},${cy})`}>
              <circle r="22" className="mind-dot-ring" />
              <circle r="3" className="mind-dot-fill" />
              <text y="38" textAnchor="middle" className="mind-dot-text">{t}</text>
            </g>
          )
        })}
      </svg>

      <p className="mind-sentence">
        {SENTENCE.split('').map((c, i) => (
          <span key={i} className="mind-char">{c}</span>
        ))}
      </p>
    </div>
  )
}