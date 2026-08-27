import './InputMockup.css'

// 用真实 HTML/CSS 渲染的"输入法产品"界面 mockup
// 展示补全、联想词、语音波形 —— 这是真产品 UI，不是装饰画

const PREFIX = '今晚我想给你写一封'
const SUGGESTIONS = ['信，聊一聊', '信，讲讲', '信，关于']
const FULL = PREFIX + '信，聊一聊这一路走来的光。'

export default function InputMockup() {
  return (
    <div className="mockups">
      {/* macOS 输入条 + 联想词条 */}
      <div className="mockup-card">
        <div className="mockup-titlebar">
          <span className="dot dot-r" />
          <span className="dot dot-y" />
          <span className="dot dot-g" />
          <span className="mockup-app">流星语 · 智能补全</span>
        </div>
        <div className="mockup-body">
          <div className="mockup-input">
            <span className="typed">{PREFIX}</span>
            <span className="caret" />
            <span className="ghost">{SUGGESTIONS[0]}</span>
          </div>
          <div className="mockup-suggestions">
            {SUGGESTIONS.map((s, i) => (
              <span className={`chip ${i === 0 ? 'chip-active' : ''}`} key={s}>
                <em>{i + 1}</em>
                {s}
              </span>
            ))}
          </div>
          <div className="mockup-meta">
            <span className="kbd">⌘</span>
            <span className="kbd">↩</span>
            <span className="meta-hint">选择第 1 条</span>
          </div>
        </div>
      </div>

      {/* 语音转写：波形 + 转写文字 */}
      <div className="mockup-card mockup-card-alt">
        <div className="mockup-titlebar">
          <span className="dot dot-r" />
          <span className="dot dot-y" />
          <span className="dot dot-g" />
          <span className="mockup-app">流星语 · 语音转写</span>
        </div>
        <div className="mockup-body">
          <div className="wave" aria-hidden="true">
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} style={{ '--h': (Math.sin(i * 0.55) * 0.4 + 0.6).toFixed(2), '--d': `${(i * 0.05).toFixed(2)}s` }} />
            ))}
          </div>
          <div className="mockup-transcript">
            <p className="transcript-line">{FULL}</p>
            <p className="transcript-fade">润色 · 标点 · 节奏 — 一次成型。</p>
          </div>
        </div>
      </div>
    </div>
  )
}