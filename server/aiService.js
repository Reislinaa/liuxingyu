// AI 服务模块
// 当配置了 AI_API_BASE / AI_API_KEY 时调用真实大模型 API（OpenAI 兼容接口）
// 未配置时使用本地词库规则引擎兜底，方便开发调试

const WORD_LIBRARY = {
  '你好': [
    '，很高兴认识你！有什么可以帮你的吗？',
    '呀，欢迎来到 AI 智能输入法，来体验一下智能补全吧！',
    '，久等了，今天想聊点什么？'
  ],
  '请问': [
    '一下，根据我了解的信息是这样的：',
    '一下，您是想了解某个功能吗？',
    '您是不是想了解最新动态？'
  ],
  '谢谢': [
    '你的帮助，真的非常感谢！',
    '你的支持，是我们前进的最大动力！',
    '，期待你的下次使用！'
  ],
  '天气': [
    '今天天气晴朗，适合外出活动。',
    '今天多云转晴，气温 22~28℃，适合出行。',
    '今天有雷阵雨，出门记得带伞哦。'
  ],
  '会议': [
    '安排在明天上午 10 点，会议室 301。',
    '已更新到本周日程，请查收会议邀请。',
    '需要我帮你整理一份会议纪要模板吗？'
  ],
  '代码': [
    '请稍等，我正在查看相关代码逻辑。',
    '这个功能建议用异步方案实现，性能会更好。',
    '我写了一段示例代码，你可以参考一下。'
  ],
  'ai': [
    '人工智能（Artificial Intelligence）正在改变世界。',
    '技术正在深度融入我们的日常工作与生活。',
    '输入法借助大模型，让打字这件事变得更聪明。'
  ],
  '输入': [
    '法的智能补全功能可以让打字更高效。',
    '体验区支持智能补全、改写和翻译三种模式。',
    '法会根据上下文预测你接下来的意图。'
  ]
}

// 本地词库规则引擎（兜底方案）
function localComplete(text, mode) {
  const trimmed = text.trim()
  if (!trimmed) return []

  switch (mode) {
    case 'complete': {
      for (const [key, value] of Object.entries(WORD_LIBRARY)) {
        if (trimmed.includes(key)) return value
      }
      return [
        `，这是根据「${trimmed}」为您智能补全的内容。`,
        `关于「${trimmed}」，我可以为你提供更多详细信息。`,
        `「${trimmed}」是个不错的主题，你可以从以下角度展开。`
      ]
    }
    case 'polish':
      return [
        `润色后：${trimmed.replace(/\s+/g, ' ').replace(/[。！？]?$/, '。')}表达更加清晰流畅、专业得体。`,
        `优化建议：${trimmed.replace(/\s+/g, ' ').replace(/[。！？]?$/, '，')}整体语气更自然，逻辑更清晰。`,
        `改写版本：${trimmed.replace(/\s+/g, ' ').replace(/[。！？]?$/, '。')}这版更符合正式场合的表达。`
      ]
    case 'translate':
      return [
        `英文：${trimmed}`,
        `英文翻译：${trimmed} (English translation)`,
        `EN: ${trimmed}`
      ]
    default:
      return []
  }
}

// 调用真实大模型 API
async function callAIModel(text, mode) {
  const apiBase = process.env.AI_API_BASE
  const apiKey = process.env.AI_API_KEY
  const model = process.env.AI_MODEL

  const modePrompt = {
    complete: '你是一个 AI 输入法的智能补全助手。请根据用户的输入，给出 3 个不同的自然补全候选，每个候选用换行分隔，不要编号，不要任何解释。',
    polish: '你是一个专业的文字润色助手。请将用户的文字改写为 3 个不同风格的版本，每个版本用换行分隔，不要编号，不要任何解释。',
    translate: '你是一个翻译助手。请将用户的内容翻译成英文，给出 3 种不同的翻译表达，每个用换行分隔，不要编号，不要任何解释。'
  }

  const system = modePrompt[mode] || modePrompt.complete

  const response = await fetch(`${apiBase}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: text }
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`AI 服务调用失败: ${response.status} ${errText}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('AI 服务返回为空')
  // 将多行输出拆分为候选列表
  return content.split('\n').map(s => s.replace(/^[\d\s\.、\-]+/, '').trim()).filter(Boolean)
}

// 统一入口：返回候选词数组
export async function generateSuggestion(text, mode) {
  const hasAIConfig = process.env.AI_API_BASE && process.env.AI_API_KEY && process.env.AI_MODEL
  if (hasAIConfig) {
    try {
      return await callAIModel(text, mode)
    } catch (err) {
      // 大模型调用失败时降级到本地词库
      console.warn('大模型调用失败，降级为本地引擎:', err.message)
      return localComplete(text, mode)
    }
  }
  return localComplete(text, mode)
}
