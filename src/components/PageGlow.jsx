import { useEffect, useRef } from 'react'
import './PageGlow.css'

// 全局鼠标光效：首页整页跟随光标，用 screen 混合"点亮"经过的内容
export default function PageGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      el.style.setProperty('--mx', `${e.clientX}px`)
      el.style.setProperty('--my', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return <div className="page-glow" ref={ref} aria-hidden="true" />
}
