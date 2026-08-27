// 轻量 JSON 文件存储（无需原生编译，易于部署）
// 数据保存在 server/data/ 目录下的 JSON 文件中

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')

const ensureDir = () => {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

const readJSON = (file, fallback = []) => {
  ensureDir()
  const filePath = path.join(DATA_DIR, file)
  if (!fs.existsSync(filePath)) return fallback
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return fallback
  }
}

const writeJSON = (file, data) => {
  ensureDir()
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf-8')
}

// 用户相关
export const findUser = (username) => {
  const users = readJSON('users.json')
  return users.find(u => u.username === username) || null
}

export const findUserByEmail = (email) => {
  const users = readJSON('users.json')
  return users.find(u => u.email === email) || null
}

export const createUser = (username, email, password) => {
  const users = readJSON('users.json')
  const user = {
    id: Date.now(),
    username,
    email,
    password,
    created_at: new Date().toISOString()
  }
  users.push(user)
  writeJSON('users.json', users)
  return user
}

// AI 请求日志
export const addLog = (input, output, mode) => {
  const logs = readJSON('logs.json')
  logs.push({
    id: Date.now(),
    input,
    output,
    mode,
    created_at: new Date().toISOString()
  })
  // 只保留最近 500 条
  if (logs.length > 500) logs.splice(0, logs.length - 500)
  writeJSON('logs.json', logs)
}
