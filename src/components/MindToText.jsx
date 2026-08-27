import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MindToText.css'

gsap.registerPlugin(ScrollTrigger)

// 想法片段：随滚动，多个"思想点"通过线条汇聚成一句话
const THOUGHTS = ['想法', '灵感', '思路', '片段', '点子', '心得']
const SENTENCE = '让每一次表达，都如流星般汇聚成形'

export default function MindToText() {
  const root = useRef(null)
  const dotsRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dots = gsap.utils.toArray('.mind-dot')
      const lines = gsap.utils.toArray('.mind-line')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.6
        }
      })

      // 想法点依次浮现
      tl.fromTo(dots, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.12, ease: 'back.out(2)', duration: 0.5 }, 0)
      // 线条从各点画到中心
      tl.fromTo(lines, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' }, 0.6)
      // 文字逐字浮现
      tl.fromTo('.mind-char', { opacity: 0, y: 12, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.04, duration: 0.3, ease: 'power2.out' }, 1.1)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="mind" ref={root}>
      <div className="mind-stage">
        <svg className="mind-svg" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {/* 汇聚线条 */}
          <g ref={dotsRef}>
            {THOUGHTS.map((_, i) => {
              const angle = (i / THOUGHTS.length) * Math.PI * 2
              const cx = 300 + Math.cos(angle) * 118
              const cy = 150 + Math.sin(angle) * 92
              return (
                <line
                  key={i}
                  className="mind-line"
                  x1={cx}
                  y1={cy}
                  x2="300"
                  y2="150"
                />
              )
            })}
          </g>
          {/* 想法点 */}
          {THOUGHTS.map((t, i) => {
            const angle = (i / THOUGHTS.length) * Math.PI * 2
            const cx = 300 + Math.cos(angle) * 118
            const cy = 150 + Math.sin(angle) * 92
            return (
              <g key={t} className="mind-dot" transform={`translate(${cx},${cy})`}>
                <circle r="24" className="mind-dot-halo" />
                <text textAnchor="middle" dominantBaseline="central" className="mind-dot-text">{t}</text>
              </g>
            )
          })}
        </svg>
      </div>

      <p className="mind-sentence">
        {SENTENCE.split('').map((c, i) => (
          <span key={i} className="mind-char">{c}</span>
        ))}
      </p>
    </div>
  )
}
