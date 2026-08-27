import { useEffect, useRef } from 'react'

// ============================================================
// 流星 Canvas 引擎 v4
//   - 普通流星：快速掠过，浅淡，频率更高
//   - 火流星：明亮，尾迹是一条渐隐线（头部亮、尾部淡至消失）
//   - 流星雨：从辐射点迸发
//   - 极光已移除；改为飘动的云（半遮盖）
//   - 地面场景：建筑/人/徒步者/风景，全为黑色剪影（平时不可见）
//   - 窗户常亮；只有流星附近的地面才被照亮，越大照得越远
//   - 首屏 1 秒内必出现大流星
// ============================================================

const rand = (min, max) => min + Math.random() * (max - min)
// 指数式随机间隔：让事件"偶尔密集、偶尔稀疏"，更自然
const expInterval = (avg) => -Math.log(1 - Math.random()) * avg

const RADIANT = { x: 0.72, y: 0.16 }

export default function MeteorCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = 0
    let H = 0
    let rafId = null
    let lastTime = 0
    let running = true
    let elapsed = 0

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    // ---- 状态 ----
    let meteors = []
    let sparks = []
    let stars = []
    let ground = null
    let mouseX = -9999
    let mouseY = -9999
    let mouseOn = false
    let nextMeteorAt = 0
    let nextFireballAt = 0
    let nextShowerAt = 0
    let firstPaint = true

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // ---- 初始化星空 ----
    const initStars = () => {
      stars = []
      const count = Math.floor((W * H) / 9000)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H * 0.85,
          r: rand(0.4, 1.4),
          a: rand(0.15, 0.75),
          tw: rand(0, Math.PI * 2),
          sp: rand(0.4, 2)
        })
      }
    }

    // ---- 构建地面场景（建筑/人/徒步者/风景，全黑剪影 + 常亮窗户） ----
    const buildGround = () => {
      const gy = Math.round(H * 0.82)
      const buildings = []
      let x = -30
      while (x < W + 30) {
        const bw = rand(46, 100)
        const bh = rand(50, 175) * (0.7 + Math.random() * 0.6)
        const top = gy - bh
        const cols = Math.max(2, Math.floor(bw / 13))
        const rows = Math.max(2, Math.floor(bh / 17))
        const windows = []
        const padX = 7, padY = 9
        const cw = (bw - padX * 2) / cols
        const ch = (bh - padY * 2) / rows
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (Math.random() < 0.4) {
              windows.push({
                x: x + padX + c * cw + cw * 0.2,
                y: top + padY + r * ch + ch * 0.2,
                w: Math.max(cw * 0.55, 2),
                h: Math.max(ch * 0.55, 2.5)
              })
            }
          }
        }
        buildings.push({ x, w: bw, top, windows })
        x += bw + rand(4, 16)
      }
      const figures = []
      const fn = Math.floor(rand(4, 8))
      for (let i = 0; i < fn; i++) {
        figures.push({
          x: rand(0, W),
          y: gy + rand(-2, 6),
          s: rand(0.7, 1.25),
          hiker: Math.random() < 0.5
        })
      }
      // 远景山丘形状（预先生成，避免每帧抖动）
      const hills = []
      let hx = 0
      while (hx < W) {
        hx += rand(40, 90)
        hills.push({ x: hx, h: rand(10, 46) })
      }
      ground = { y: gy, buildings, figures, hills }
    }

    // ---- 生成流星（五类，速度 / 光亮明显区分） ----
    //  speed 单位 px/s；大流星明显更慢、更亮、照亮更远
    const spawnMeteor = (opts = {}) => {
      const type = opts.type || 'normal'
      const SPEED = {
        faint: rand(700, 950),     // 暗弱流星：快、极淡
        normal: rand(560, 820),    // 普通流星
        bright: rand(420, 600),    // 明亮流星
        slow: rand(300, 430),      // 慢流星
        fireball: rand(150, 240)    // 火流星：最慢、最大、最亮
      }
      // 速度略随机抖动
      const speedJitter = (s) => s * rand(0.9, 1.1)
      const angle = opts.angle ?? rand(0.28, 0.62)
      const isFire = type === 'fireball'
      const speed = speedJitter(SPEED[type] || SPEED.normal)
      // 从天空上方进入，避免"半空突然出现"
      const x0 = rand(-W * 0.2, W * 0.3)
      const y0 = rand(-H * 0.28, H * 0.05)
      const lightR = (isFire ? rand(0.36, 0.52) : type === 'slow' ? rand(0.18, 0.26)
        : type === 'bright' ? rand(0.14, 0.2) : type === 'faint' ? rand(0.06, 0.1) : rand(0.1, 0.16)) * Math.max(W, H)

      // maxLife 必须足够覆盖从天空飞出屏幕的路程——慢流星速度小，需更长
      const cfg = {
        faint: { size: rand(0.7, 1.1), bright: rand(0.28, 0.45), maxLife: rand(2.0, 3.2), maxTrail: Math.floor(rand(6, 10)), spark: 0, hue: rand(195, 230) },
        normal: { size: rand(1.1, 1.9), bright: rand(0.5, 0.8), maxLife: rand(3.0, 4.5), maxTrail: Math.floor(rand(10, 16)), spark: 0, hue: rand(205, 255) },
        bright: { size: rand(2.0, 2.8), bright: rand(0.85, 1), maxLife: rand(5.0, 7.0), maxTrail: Math.floor(rand(26, 38)), spark: 0, hue: rand(190, 235) },
        slow: { size: rand(2.2, 3.0), bright: rand(0.8, 1), maxLife: rand(9.0, 14.0), maxTrail: Math.floor(rand(40, 56)), spark: 0, hue: rand(200, 245) },
        fireball: { size: rand(3.0, 4.2), bright: 1, maxLife: rand(10.0, 16.0), maxTrail: Math.floor(rand(56, 78)), spark: rand(0.12, 0.24), hue: rand(30, 45) }
      }[type] || { size: rand(1.1, 1.9), bright: rand(0.5, 0.8), maxLife: rand(3.0, 4.5), maxTrail: Math.floor(rand(10, 16)), spark: 0, hue: rand(205, 255) }

      meteors.push({
        type,
        x: x0,
        y: y0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: cfg.maxLife,
        size: cfg.size,
        bright: cfg.bright,
        trail: [],
        maxTrail: cfg.maxTrail,
        sparkTimer: 0,
        sparkFreq: cfg.spark,
        lightR,
        hue: cfg.hue
      })
    }

    const spawnShower = () => {
      const n = Math.floor(rand(5, 12))
      const baseAngle = rand(0.45, 0.95)
      for (let i = 0; i < n; i++) {
        const jitter = rand(-0.2, 0.2)
        const speed = rand(650, 1100)
        meteors.push({
          type: 'shower',
          x: RADIANT.x * W + rand(-20, 20),
          y: RADIANT.y * H + rand(-10, 10),
          vx: Math.cos(baseAngle + jitter) * speed,
          vy: Math.sin(baseAngle + jitter) * speed,
          life: 0,
          maxLife: rand(1.4, 2.8),
          size: rand(0.8, 1.7),
          bright: rand(0.4, 0.75),
          trail: [],
          maxTrail: Math.floor(rand(7, 13)),
          sparkTimer: 0,
          sparkFreq: 0,
          lightR: rand(0.1, 0.16) * Math.max(W, H),
          hue: rand(200, 270)
        })
      }
    }

    // ---- 更新 ----
    const update = (dt) => {
      elapsed += dt
      const now = elapsed

      if (!reducedMotion) {
        // 流星：五类随机（暗弱/普通最多，慢/亮/火稀少），频率略降
        if (now >= nextMeteorAt) {
          const types = ['faint', 'faint', 'normal', 'normal', 'normal', 'bright', 'slow', 'fireball']
          const burst = Math.random() < 0.5 ? Math.floor(rand(2, 5)) : 1
          for (let i = 0; i < burst; i++) {
            spawnMeteor({ type: types[Math.floor(Math.random() * types.length)] })
          }
          nextMeteorAt = now + expInterval(2.6)
        }
        // 大流星：首屏 1 秒内出现
        if (now >= nextFireballAt) {
          spawnMeteor({ type: 'fireball' })
          for (let i = 0; i < 6; i++) {
            sparks.push({
              x: rand(-W * 0.1, W * 0.4),
              y: rand(-H * 0.1, H * 0.2),
              vx: rand(-50, 50),
              vy: rand(-40, 40),
              life: 0,
              maxLife: rand(0.4, 1),
              size: rand(1.5, 3),
              a: 1
            })
          }
          nextFireballAt = now + rand(13, 30)
        }
        // 流星雨
        if (now >= nextShowerAt) {
          spawnShower()
          nextShowerAt = now + rand(28, 65)
        }
      } else if (firstPaint) {
        spawnMeteor({ type: 'fireball', angle: 0.4 })
        nextFireballAt = now + 9999
        nextShowerAt = now + 9999
        firstPaint = false
      }

      // 更新流星
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.life += dt
        m.x += m.vx * dt
        m.y += m.vy * dt
        m.trail.push({ x: m.x, y: m.y })
        if (m.trail.length > m.maxTrail) m.trail.shift()

        // 火流星：碎裂闪光
        if (m.type === 'fireball' && m.life > 0.4) {
          m.sparkTimer -= dt
          if (m.sparkTimer <= 0) {
            m.sparkTimer = m.sparkFreq
            const n = Math.floor(rand(1, 3))
            for (let k = 0; k < n; k++) {
              const a = rand(0, Math.PI * 2)
              const s = rand(80, 240)
              sparks.push({
                x: m.x, y: m.y,
                vx: Math.cos(a) * s,
                vy: Math.sin(a) * s - 20,
                life: 0, maxLife: rand(0.3, 0.8),
                size: rand(0.8, 2.2), a: 1
              })
            }
          }
        }

        const out = m.x > W + 120 || m.y > H + 120
        if (m.life > m.maxLife || out) meteors.splice(i, 1)
      }

      // 碎闪
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i]
        sp.life += dt
        sp.x += sp.vx * dt
        sp.y += sp.vy * dt
        sp.vx *= 0.98
        sp.vy = sp.vy * 0.98 + 60 * dt
        sp.a = 1 - sp.life / sp.maxLife
        if (sp.life > sp.maxLife) sparks.splice(i, 1)
      }
    }

    // ---- 绘制：人物剪影 ----
    const drawFigure = (f) => {
      ctx.save()
      ctx.translate(f.x, f.y)
      ctx.scale(f.s, f.s)
      ctx.fillStyle = '#000008'
      ctx.fillRect(-3, -10, 2.4, 10)
      ctx.fillRect(1, -10, 2.4, 10)
      ctx.beginPath()
      ctx.moveTo(-4, -10); ctx.lineTo(4, -10); ctx.lineTo(3, -22); ctx.lineTo(-3, -22)
      ctx.closePath(); ctx.fill()
      ctx.beginPath(); ctx.arc(0, -26, 3.4, 0, Math.PI * 2); ctx.fill()
      if (f.hiker) ctx.fillRect(5, -28, 1.4, 28)
      ctx.restore()
    }

    // ---- 绘制：地面场景 ----
    const drawGround = () => {
      if (!ground) return
      const gy = ground.y
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, gy, W, H - gy)
      ctx.clip()

      // 地面底色（极暗）
      ctx.fillStyle = '#010103'
      ctx.fillRect(0, gy, W, H - gy)

      // 远景山丘（近黑剪影，略亮于底色，静态可见天际线）
      ctx.fillStyle = '#06060e'
      ctx.beginPath()
      ctx.moveTo(0, gy)
      ctx.lineTo(0, gy - 28)
      for (const hp of ground.hills) {
        ctx.lineTo(hp.x, gy - hp.h)
      }
      ctx.lineTo(W, gy)
      ctx.closePath()
      ctx.fill()

      // 建筑（近黑剪影）
      ctx.fillStyle = '#08080f'
      for (const b of ground.buildings) {
        ctx.fillRect(b.x, b.top, b.w, gy - b.top)
      }

      // 人物（近黑剪影）
      for (const f of ground.figures) drawFigure(f)

      // 窗户：常亮（不受流星影响）
      for (const b of ground.buildings) {
        for (const w of b.windows) {
          ctx.fillStyle = 'rgba(255, 196, 120, 0.9)'
          ctx.fillRect(w.x, w.y, w.w, w.h)
        }
      }

      // ===== 光照层（关键修复）：先画剪影，再用 lighter 把光打在剪影上 =====
      // 这样流星/鼠标经过时，建筑与人物轮廓才会被"照亮显形"
      ctx.globalCompositeOperation = 'lighter'

      // 1) 流星照亮（局部，越大照得越远；大流星飞远时地面光随之淡出）
      for (const m of meteors) {
        const big = m.type === 'fireball' || m.type === 'slow'
        const flyFade = big ? Math.pow(Math.max(0, 1 - m.life / m.maxLife), 0.5) : 1
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.lightR)
        const inten = m.bright * (m.type === 'fireball' ? 1 : 0.7) * flyFade
        g.addColorStop(0, `rgba(150, 170, 255, ${0.22 * inten})`)
        g.addColorStop(0.45, `rgba(120, 150, 240, ${0.10 * inten})`)
        g.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.lightR, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2) 鼠标手电筒：光标在画布上移动时，照亮附近地面物品
      if (mouseOn) {
        const mr = Math.max(W, H) * 0.22
        const mg = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, mr)
        mg.addColorStop(0, 'rgba(150, 170, 255, 0.20)')
        mg.addColorStop(0.4, 'rgba(120, 150, 240, 0.09)')
        mg.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = mg
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, mr, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      ctx.restore()
    }

    // ---- 绘制：流星 ----
    const drawMeteors = () => {
      for (const m of meteors) {
        const tl = m.trail.length
        const isFire = m.type === 'fireball'
        // 大流星（慢/火）：随飞行渐隐，营造"慢慢飞远、光慢慢消失"
        const big = m.type === 'fireball' || m.type === 'slow'
        const flyFade = big ? Math.pow(Math.max(0, 1 - m.life / m.maxLife), 0.5) : 1

        if (isFire) {
          // 火流星尾迹：一条线，越靠头部越亮越粗，越靠尾部越淡直至消失
          for (let i = 0; i < tl - 1; i++) {
            const t = i / Math.max(tl - 1, 1) // 0=尾 1=头
            const p = m.trail[i]
            const q = m.trail[i + 1]
            ctx.globalAlpha = Math.pow(t, 1.6) * 0.85
            ctx.strokeStyle = `hsla(${m.hue}, 90%, 86%, 1)`
            ctx.lineWidth = Math.max(m.size * (0.4 + 1.4 * t), 0.5)
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        } else {
          // 普通流星：细光迹，从头部向尾渐隐
          for (let i = 0; i < tl - 1; i++) {
            const t = i / Math.max(tl - 1, 1)
            const p = m.trail[i]
            const q = m.trail[i + 1]
            const alpha = t * t * m.bright * 0.55
            if (alpha < 0.01) continue
            ctx.globalAlpha = alpha
            ctx.strokeStyle = `hsla(${m.hue}, 50%, 92%, 1)`
            ctx.lineWidth = Math.max(m.size * (0.2 + 0.35 * t), 0.3)
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }

        // 头部光晕
        const headGlow = isFire ? 8 : 4
        ctx.globalAlpha = m.bright * flyFade
        const hg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.size * headGlow)
        if (isFire) {
          hg.addColorStop(0, `hsla(${m.hue}, 95%, 92%, 0.9)`)
          hg.addColorStop(0.3, `hsla(${m.hue}, 90%, 70%, 0.45)`)
        } else {
          hg.addColorStop(0, `hsla(${m.hue}, 60%, 95%, 0.85)`)
          hg.addColorStop(0.3, `hsla(${m.hue}, 50%, 75%, 0.3)`)
        }
        hg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = hg
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.size * headGlow, 0, Math.PI * 2)
        ctx.fill()

        // 核心亮点
        ctx.globalAlpha = flyFade
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.size * 0.75, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // ---- 主绘制 ----
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const now = performance.now() / 1000

      // 星空
      for (const s of stars) {
        const tw = s.a * (0.6 + 0.4 * Math.sin(now * s.sp + s.tw))
        ctx.globalAlpha = tw
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // 流星
      drawMeteors()

      // 碎闪光点
      for (const sp of sparks) {
        ctx.globalAlpha = Math.max(sp.a, 0) * 0.9
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, sp.size * sp.a + 0.4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // 地面场景
      drawGround()
    }

    // ---- 主循环 ----
    const loop = (time) => {
      if (!running) return
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time
      update(dt)
      draw()
      rafId = requestAnimationFrame(loop)
    }

    // ---- 尺寸 ----
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = W * DPR
      canvas.height = H * DPR
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      initStars()
      buildGround()
    }

    const onResize = () => resize()

    // 鼠标手电筒：记录光标在画布内的坐标（用 window 监听，绕过 canvas 的 pointer-events:none）
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseX = x
        mouseY = y
        mouseOn = true
      } else {
        mouseOn = false
      }
    }

    // ---- 启动 ----
    resize()
    nextMeteorAt = rand(0.3, 0.8)
    nextFireballAt = rand(0.3, 0.9)   // 首屏 1 秒内出现大流星
    nextShowerAt = rand(14, 25)
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove)
    lastTime = performance.now()
    rafId = requestAnimationFrame(loop)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="meteor-canvas" aria-hidden="true" />
}
