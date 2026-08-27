import { siApple, siIos, siAndroid, siGooglechrome, siLinux } from 'simple-icons'
import './AdapterCarousel.css'

// simple-icons 移除了 Windows 官方图标（v16 商标下架），因此这里保留 Windows
// 官方四格旗的规范路径，与下方其他来自 simple-icons 的真实品牌图标保持一致。
const windowsIcon = {
  title: 'Windows',
  path: 'M2 4.5l8.5-1.1V11H2V4.5zM11.5 3.3L22 2v8.8h-10.5V3.3zM2 12.5h8.5v7.6L2 19V12.5zM11.5 12.5H22V22l-10.5-1.1V12.5z'
}

const PLATFORMS = [
  {
    name: 'macOS', tag: '原生适配', desc: '支持 macOS 12+，触控板与快捷键深度集成。',
    icon: siApple
  },
  {
    name: 'Windows', tag: '原生适配', desc: 'Windows 10/11，办公、编码场景流畅切换。',
    icon: windowsIcon
  },
  {
    name: 'iOS', tag: '移动端', desc: 'iPhone / iPad，语音转写与滑动输入兼得。',
    icon: siIos
  },
  {
    name: 'Android', tag: '移动端', desc: '主流安卓机型，九宫格与全键盘自适应。',
    icon: siAndroid
  },
  {
    name: 'Web', tag: '浏览器插件', desc: 'Chrome / Edge 插件，网页里也能随时补全。',
    icon: siGooglechrome
  },
  {
    name: 'Linux', tag: '开源支持', desc: '面向开发者的 Linux 版本，持续维护。',
    icon: siLinux
  }
]

// 使用 simple-icons 的真实品牌 path，fill 用 currentColor 以沿用站点统一的
// 珊瑚流星主色（--primary），避免多色品牌色破坏温暖极简的设计系统。
function PlatformIcon({ icon }) {
  if (!icon) return null
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d={icon.path} />
    </svg>
  )
}

export default function AdapterCarousel() {
  return (
    <div className="adapter">
      <div className="adapter-grid">
        {PLATFORMS.map((p) => (
          <div className="adapter-card" key={p.name}>
            <div className="adapter-card-icon"><PlatformIcon icon={p.icon} /></div>
            <div className="adapter-card-name">{p.name}</div>
            <div className="adapter-card-tag">{p.tag}</div>
          </div>
        ))}
      </div>

      <div className="adapter-descriptions">
        {PLATFORMS.map((p) => (
          <div className="adapter-desc-item" key={p.name}>
            <span className="adapter-desc-name">{p.name}</span>
            <span className="adapter-desc-text">{p.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
