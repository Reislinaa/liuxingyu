// 用指定 base 重新构建并覆盖 dist
import { build } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { rmSync, readFileSync, writeFileSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const base = process.argv[2] || './'

// 清理旧 dist
const distPath = path.join(root, 'dist')
try { rmSync(distPath, { recursive: true, force: true }) } catch {}

process.env.VITE_BASE = base

await build({
  root,
  base,
  configFile: path.join(root, 'vite.config.js'),
  logLevel: 'warn'
})

// GitHub Pages 同域部署不需要 crossorigin，移除可避免部分浏览器/网络环境下的加载异常
const indexPath = path.join(distPath, 'index.html')
try {
  let html = readFileSync(indexPath, 'utf-8')
  html = html.replace(/ crossorigin(="")?/g, '')
  writeFileSync(indexPath, html, 'utf-8')
} catch (e) {
  console.warn('移除 crossorigin 失败:', e.message)
}

console.log('build ok, base=' + base)