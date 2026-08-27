export default function Footer({ onOpenLegal, onNavigate }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
              <defs>
                <linearGradient id="fglg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E85D4E"/>
                  <stop offset="100%" stopColor="#F59E0B"/>
                </linearGradient>
                <linearGradient id="fglt" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E85D4E" stopOpacity="0"/>
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9"/>
                </linearGradient>
              </defs>
              <circle cx="22" cy="10" r="3" fill="url(#fglg)"/>
              <path d="M22 10 L8 24" stroke="url(#fglt)" strokeWidth="1.6" strokeLinecap="round"/>
              <circle cx="22" cy="10" r="6" fill="url(#fglg)" opacity="0.18"/>
            </svg>
            <span>流星语</span>
          </div>
          <p className="footer-tagline">说出来，即成文</p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>产品</h4>
            <button className="footer-link-btn" onClick={() => onNavigate('features')}>功能</button>
            <button className="footer-link-btn" onClick={() => onNavigate('download')}>下载</button>
            <button className="footer-link-btn" onClick={() => onNavigate('about')}>关于我们</button>
          </div>
          <div className="footer-col">
            <h4>支持</h4>
            <button className="footer-link-btn" onClick={() => onOpenLegal('privacy')}>隐私政策</button>
            <button className="footer-link-btn" onClick={() => onOpenLegal('terms')}>服务条款</button>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 流星语. 保留所有权利.</span>
      </div>
    </footer>
  )
}