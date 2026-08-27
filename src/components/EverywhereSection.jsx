import { useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import Reveal from './Reveal'
import { APP_ICONS } from '../data/app-icons'
import './EverywhereSection.css'

/* 品牌图标沿双层圆环反向缓慢旋转。
   圆心位于容器底部正中，仅露出上半弧（overflow hidden）。
   外环顺时针 40s/圈，内环逆时针 50s/圈。 */

const OUTER = APP_ICONS.filter((_, i) => i % 4 === 0)
const INNER = APP_ICONS.filter((_, i) => i % 4 === 1)
const N_OUTER = OUTER.length
const N_INNER = INNER.length
const STEP_OUTER = (2 * Math.PI) / N_OUTER
const STEP_INNER = (2 * Math.PI) / N_INNER

const SPEED_OUTER = (2 * Math.PI) / 40000
const SPEED_INNER = (2 * Math.PI) / 50000

const brandColor = (hex) => '#' + String(hex || '1A1A1A').replace(/^#/, '')

export default function EverywhereSection() {
  const containerRef = useRef(null)
  const outerRefs = useRef([])
  const innerRefs = useRef([])
  const angleRef = useRef({ outer: 0, inner: 0 })
  const dimsRef = useRef({ Router: 393, Rinner: 220, cx: 562, cy: 393 })
  const rafRef = useRef(0)

  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const w = el.offsetWidth
    const h = el.offsetHeight
    dimsRef.current = {
      Router: w * 0.38,
      Rinner: w * 0.22,
      cx: w / 2,
      cy: h,
    }
  }, [])

  const place = useCallback(() => {
    const { Router, Rinner, cx, cy } = dimsRef.current
    const { outer, inner } = angleRef.current
    for (let i = 0; i < N_OUTER; i++) {
      const el = outerRefs.current[i]
      if (!el) continue
      const a = outer + i * STEP_OUTER
      const x = cx + Router * Math.cos(a)
      const y = cy + Router * Math.sin(a)
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }
    for (let i = 0; i < N_INNER; i++) {
      const el = innerRefs.current[i]
      if (!el) continue
      const a = inner + i * STEP_INNER
      const x = cx + Rinner * Math.cos(a)
      const y = cy + Rinner * Math.sin(a)
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }
  }, [])

  useLayoutEffect(() => {
    measure()
    place()
  }, [measure, place])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    let last = performance.now()
    const tick = (now) => {
      const dt = now - last
      last = now
      angleRef.current.outer += SPEED_OUTER * dt
      angleRef.current.inner -= SPEED_INNER * dt
      place()
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [place])

  useEffect(() => {
    const onResize = () => {
      measure()
      place()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [measure, place])

  return (
    <section className="section everywhere" id="everywhere">
      <div className="container">
        <Reveal variant="fade">
          <span className="section-kicker">Works Everywhere</span>
        </Reveal>
        <Reveal variant="blur">
          <h2 className="section-title">全场景通用</h2>
        </Reveal>
        <Reveal delay={1} variant="fade">
          <p className="section-subtitle">
            在微信、飞书、邮件、笔记、代码编辑器甚至浏览器表单中都能使用，不挑应用。
          </p>
        </Reveal>

        <div className="everywhere-rings" ref={containerRef} aria-hidden="true">
          <div className="ev-ring ev-ring-outer">
            {OUTER.map((icon, i) => (
              <div
                className="ev-icon"
                key={`${icon.name}-${i}`}
                ref={(el) => {
                  outerRefs.current[i] = el
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d={icon.path} fill={brandColor(icon.hex)} />
                </svg>
              </div>
            ))}
          </div>
          <div className="ev-ring ev-ring-inner">
            {INNER.map((icon, i) => (
              <div
                className="ev-icon ev-icon--inner"
                key={`${icon.name}-${i}`}
                ref={(el) => {
                  innerRefs.current[i] = el
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d={icon.path} fill={brandColor(icon.hex)} />
                </svg>
              </div>
            ))}
          </div>
          <div className="ev-fade ev-fade-left" aria-hidden="true" />
          <div className="ev-fade ev-fade-right" aria-hidden="true" />
          <div className="ev-fade ev-fade-top" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
