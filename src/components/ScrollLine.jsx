import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollLine.css'

gsap.registerPlugin(ScrollTrigger)

// Apple 广告式线条：滚动时渐变线从左向右被"画"出，亮点沿线条流动
export default function ScrollLine() {
  const root = useRef(null)
  const fillRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fill = fillRef.current
      const dot = dotRef.current
      const cfg = {
        trigger: root.current,
        start: 'top 88%',
        end: 'top 42%',
        scrub: 0.5
      }
      gsap.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: cfg })
      const w = root.current.offsetWidth
      gsap.fromTo(dot, { x: 0 }, { x: Math.max(w - 10, 0), ease: 'none', scrollTrigger: cfg })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="scroll-line" ref={root} aria-hidden="true">
      <span className="scroll-line-fill" ref={fillRef} />
      <span className="scroll-line-dot" ref={dotRef} />
    </div>
  )
}
