import Reveal from '../components/Reveal'

const platforms = [
  {
    platform: 'iOS',
    name: 'App Store',
    desc: 'iPhone / iPad 用户',
    version: '2.1.0',
    btn: '从 App Store 下载',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.8 8.3c-.1-1.7 1.1-3.1 2.6-3.8-.7-1-1.8-1.6-3-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.8-.8-3-.8-1.6 0-3.1 1-3.9 2.5-1.7 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 2.9 2.3 1.2-.1 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.1 2.9-2.3.6-.9.9-1.8 1-1.9-.1 0-1.9-.7-1.9-2.9-.1-1.8 1.5-2.7 1.6-2.8-.9-1.3-2.2-1.4-2.7-1.5-1.3-.1-2.4.7-3 .7zM15.4 4.6c.7-.8 1.1-1.9.9-3-1 .1-2.1.6-2.8 1.5-.6.7-1.1 1.8-.9 2.9 1.1.1 2.1-.5 2.8-1.4z" />
      </svg>
    )
  },
  {
    platform: 'Android',
    name: '应用商店',
    desc: 'Android 手机用户',
    version: '2.1.0',
    btn: '下载 Android 版',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.6 9.2c0-.5-.1-1-.2-1.4l2.5-2.1c.2-.2.2-.5 0-.7l-.2-.3c-.2-.2-.5-.2-.7 0l-2.6 2.2c-.9-.7-2.1-1.1-3.4-1.1s-2.5.4-3.4 1.1L7 4.7c-.2-.2-.5-.2-.7 0l-.2.3c-.2.2-.2.5 0 .7l2.5 2.1c-.1.5-.2 1-.2 1.4 0 2.6 1.7 4.8 4 5.6v3.2H9.5c-.3 0-.5.2-.5.5v.5c0 .3.2.5.5.5h5c.3 0 .5-.2.5-.5v-.5c0-.3-.2-.5-.5-.5H13.6v-3.2c2.3-.8 4-3 4-5.6zM8.8 11c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm6.4 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
      </svg>
    )
  },
  {
    platform: 'Windows',
    name: '桌面版',
    desc: 'Windows 10 / 11',
    version: '2.1.0',
    btn: '下载 Windows 版',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 4.5l8.5-1.1V11H2V4.5zM11.5 3.3L22 2v8.8h-10.5V3.3zM2 12.5h8.5v7.6L2 19V12.5zM11.5 12.5H22V22l-10.5-1.1V12.5z" />
      </svg>
    )
  },
  {
    platform: 'macOS',
    name: '桌面版',
    desc: 'macOS 12 及以上',
    version: '2.1.0',
    btn: '下载 macOS 版',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.8 8.3c-.1-1.7 1.1-3.1 2.6-3.8-.7-1-1.8-1.6-3-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.8-.8-3-.8-1.6 0-3.1 1-3.9 2.5-1.7 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 2.9 2.3 1.2-.1 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.1 2.9-2.3.6-.9.9-1.8 1-1.9-.1 0-1.9-.7-1.9-2.9-.1-1.8 1.5-2.7 1.6-2.8-.9-1.3-2.2-1.4-2.7-1.5-1.3-.1-2.4.7-3 .7zM15.4 4.6c.7-.8 1.1-1.9.9-3-1 .1-2.1.6-2.8 1.5-.6.7-1.1 1.8-.9 2.9 1.1.1 2.1-.5 2.8-1.4z" />
      </svg>
    )
  }
]

const questions = [
  { q: '下载需要付费吗？', a: '基础功能完全免费，你可以放心下载使用。' },
  { q: '支持哪些设备？', a: '支持 iOS、Android、Windows、macOS 四大平台。' },
  { q: '如何更新到最新版？', a: '在应用内设置中检查更新即可，会第一时间推送。' },
  { q: '下载遇到问题怎么办？', a: '可以联系我们的客服邮箱 support@liuxingyu.cn。' }
]

export default function DownloadPage() {
  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <span className="page-hero-tag">DOWNLOAD · 下载</span>
          <h1 className="page-hero-title">下载<em>流星语</em></h1>
          <p className="page-hero-sub">
            全平台支持，选择你的设备，开始智能输入之旅
          </p>
        </div>
      </div>

      <div className="page-section">
        <div className="container">
          <Reveal variant="blur">
            <h2 className="page-title">选择平台下载</h2>
          </Reveal>
          <Reveal delay={1} variant="fade">
            <p className="page-subtitle">覆盖 iOS、Android、Windows、macOS</p>
          </Reveal>

          <div className="download-platform-grid">
            {platforms.map((app, i) => (
              <Reveal key={app.platform} delay={(i % 2) + 1} variant={['up', 'scale', 'left', 'right'][i % 4]}>
                <div className="download-platform-card">
                  <div className="download-platform-icon">
                    {app.icon}
                  </div>
                  <div className="download-platform-info">
                    <h3>{app.platform}</h3>
                    <span>{app.name}</span>
                    <p>{app.desc}</p>
                    <span className="download-platform-version">版本 {app.version}</span>
                  </div>
                  <button className="btn btn-primary download-platform-btn">{app.btn}</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="page-section page-section-alt">
        <div className="container">
          <Reveal variant="scale">
            <h2 className="page-title">常见问题</h2>
          </Reveal>
          <Reveal delay={1} variant="fade">
            <p className="page-subtitle">关于下载与使用，你可能想知道</p>
          </Reveal>
          <div className="faq-list">
            {questions.map((item, i) => (
              <Reveal key={i} delay={(i % 2) + 1} variant={['up', 'blur'][i % 2]}>
                <div className="faq-item">
                  <div className="faq-q">
                    <span className="faq-icon">Q</span>
                    <span>{item.q}</span>
                  </div>
                  <div className="faq-a">
                    <span className="faq-icon">A</span>
                    <span>{item.a}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
