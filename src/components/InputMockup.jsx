import './InputMockup.css'

// 首页聊天框 mockup：展示语音输入变成文字消息
export default function InputMockup() {
  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <div className="chatbox-avatar">A</div>
        <div className="chatbox-name">阿明</div>
      </div>
      <div className="chatbox-body">
        <div className="chat-msg chat-msg-them">
          晚上吃饭吗？
        </div>
        <div className="chat-msg chat-msg-me chat-msg-voice">
          <div className="chat-voice-wave" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                style={{
                  '--h': (Math.sin(i * 0.55) * 0.4 + 0.6).toFixed(2),
                  '--d': `${(i * 0.05).toFixed(2)}s`
                }}
              />
            ))}
          </div>
          <span className="chat-voice-time">0:03</span>
        </div>
        <div className="chat-msg chat-msg-me">
          好啊，想去那家新开的日料，七点可以吗？
        </div>
      </div>
      <div className="chatbox-footer">
        <div className="chatbox-input">
          <span className="chatbox-input-text">按住说话</span>
          <span className="chatbox-input-mic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
