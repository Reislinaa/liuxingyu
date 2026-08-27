import './InputMockup.css'

// 产品界面 mockup：展示语音输入如何变成干净文字
const RAW = '呃... 就是那个，本周的周报我想写一下，嗯，关于新功能上线的部分，啊，你懂的。'
const POLISHED = '本周周报：新功能已正式上线，整体运行稳定，用户反馈积极。'

export default function InputMockup() {
  return (
    <div className="mockups">
      <div className="mockup-card">
        <div className="mockup-titlebar">
          <div className="mockup-dots">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
          </div>
          <span className="mockup-app">流星语 · 语音输入</span>
        </div>
        <div className="mockup-body">
          <div className="mockup-wave" aria-hidden="true">
            {Array.from({ length: 48 }).map((_, i) => (
              <span
                key={i}
                style={{
                  '--h': (Math.sin(i * 0.45) * 0.45 + 0.55).toFixed(2),
                  '--d': `${(i * 0.04).toFixed(2)}s`
                }}
              />
            ))}
          </div>

          <div className="mockup-transcript">
            <div className="transcript-label">原始语音</div>
            <p className="transcript-raw">{RAW}</p>
          </div>

          <div className="mockup-arrow" aria-hidden="true">↓</div>

          <div className="mockup-transcript">
            <div className="transcript-label transcript-label-clean">整理后</div>
            <p className="transcript-clean">{POLISHED}</p>
          </div>

          <div className="mockup-meta">
            <span className="kbd">⌘</span>
            <span className="kbd">V</span>
            <span className="meta-hint">按住说话，松手即成文</span>
          </div>
        </div>
      </div>
    </div>
  )
}
