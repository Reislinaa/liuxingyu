import Reveal from '../components/Reveal'

const platforms = [
  {
    platform: 'iOS',
    name: 'App Store',
    desc: 'iPhone / iPad 用户',
    version: '2.1.0',
    btn: '从 App Store 下载'
  },
  {
    platform: 'Android',
    name: '应用商店',
    desc: 'Android 手机用户',
    version: '2.1.0',
    btn: '下载 Android 版'
  },
  {
    platform: 'Windows',
    name: '桌面版',
    desc: 'Windows 10 / 11',
    version: '2.1.0',
    btn: '下载 Windows 版'
  },
  {
    platform: 'macOS',
    name: '桌面版',
    desc: 'macOS 12 及以上',
    version: '2.1.0',
    btn: '下载 macOS 版'
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
                    <span>{app.platform[0]}</span>
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
