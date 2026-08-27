// 用指定 base 重新构建并覆盖 dist
import { build } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { rmSync } from 'fs'

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

console.log('build ok, base=' + base)