import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateSuggestion } from './aiService.js'
import { findUser, findUserByEmail, createUser, addLog } from './store.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(cors())
app.use(express.json())

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI 输入法 API 服务运行正常' })
})

// AI 输入补全接口
app.post('/api/ai/complete', async (req, res) => {
  const { text, mode = 'complete' } = req.body
  if (!text) {
    return res.status(400).json({ error: '缺少输入文本' })
  }
  try {
    const candidates = await generateSuggestion(text, mode)
    // 记录日志
    addLog(text, JSON.stringify(candidates), mode)
    res.json({ candidates, mode })
  } catch (err) {
    console.error('AI 处理出错:', err)
    res.status(500).json({ error: 'AI 服务处理失败，请稍后再试' })
  }
})

// 用户注册（简单版）
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    return res.status(400).json({ error: '请填写完整信息' })
  }
  if (findUser(username)) {
    return res.status(409).json({ error: '用户名已存在' })
  }
  if (findUserByEmail(email)) {
    return res.status(409).json({ error: '邮箱已存在' })
  }
  const user = createUser(username, email, password)
  res.json({ success: true, message: '注册成功', user: { id: user.id, username: user.username } })
})

// 用户登录（简单版，仅演示）
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  const user = findUser(username)
  if (!user || user.password !== password) {
    return res.status(401).json({ error: '用户名或密码错误' })
  }
  res.json({ success: true, message: '登录成功', user: { id: user.id, username: user.username } })
})

// 生产环境静态资源
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist')
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`AI 输入法后端服务已启动: http://localhost:${PORT}`)
})
