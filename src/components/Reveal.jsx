import { useEffect, useRef, useMemo } from 'react'

// 滚动渐入动画组件（多样变体，避免千篇一律）
// 用法:
//   <Reveal variant="up">   // 上移浮现（默认）
//   <Reveal variant="left"> // 左侧滑入
//   <Reveal variant="right">// 右侧滑入
//   <Reveal variant="scale">// 缩放浮现
//   <Reveal variant="blur"> // 模糊聚焦
//   <Reveal variant="fade"> // 纯淡入
//   <Reveal variant="random">// 随机一种（不传 variant 时默认 random）
//   <Reveal delay={1} duration={0.7}> // 延迟 + 时长控制

// 动画变体表：每种变体对应一组初始状态 + 时长
const VARIANTS = {
  up: {
    cls: 'rv-up',
    duration: 0.9
  },
  left: {
    cls: 'rv-left',
    duration: 0.8
  },
  right: {
    cls: 'rv-right',
    duration: 0.8
  },
  scale: {
    cls: 'rv-scale',
    duration: 0.9
  },
  blur: {
    cls: 'rv-blur',
    duration: 0.95
  },
  fade: {
    cls: 'rv-fade',
    duration: 0.7
  }
}

const ALL = Object.keys(VARIANTS)
const pickRandom = () => ALL[Math.floor(Math.random() * ALL.length)]

export default function Reveal({
  children,
  delay = 0,
  duration,
  variant,
  className = '',
  as: Tag = 'div'
}) {
  const ref = useRef(null)

  // 若未指定 variant，随机一种（useMemo 保证一次渲染内稳定）
  const effVariant = useMemo(() => variant || pickRandom(), [variant])
  const v = VARIANTS[effVariant] || VARIANTS.up
  const effDuration = duration || v.duration

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : ''

  return (
    <Tag
      ref={ref}
      className={`reveal ${v.cls} ${delayClass} ${className}`}
      style={{ '--rv-duration': `${effDuration}s` }}
    >
      {children}
    </Tag>
  )
}
