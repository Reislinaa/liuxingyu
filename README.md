# AI 智能输入法 - 网站项目

一个公开的 AI 输入法网站，包含**产品介绍官网**和**在线体验区**两部分，后端对接大语言模型 API 实现智能补全、语义改写、翻译等功能。

## 功能特性

- **智能补全**：根据输入内容智能扩展补全，打字更高效
- **语义改写**：一键润色文字，表达更专业流畅
- **多语言翻译**：中英互译等
- **在线体验**：无需安装即可在浏览器体验
- **用户系统**：注册 / 登录（后端 API）
- **请求日志**：记录 AI 调用记录

## 技术栈

- **前端**：React + Vite
- **后端**：Node.js + Express
- **数据库**：SQLite（用户数据 + 请求日志）
- **AI 接入**：OpenAI 兼容接口（DeepSeek / 通义千问 / OpenAI 等）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`，并填入你的大模型 API 信息：

```env
PORT=3001
AI_API_BASE=https://api.deepseek.com/v1
AI_API_KEY=你的API密钥
AI_MODEL=deepseek-chat
```

> 未配置时自动降级为本地词库引擎，方便开发调试。

### 3. 启动开发环境

```bash
npm run dev
```

- 前端地址：http://localhost:5173
- 后端地址：http://localhost:3001

### 4. 生产构建

```bash
npm run build
npm start
```

## 项目结构

```
ai-input-method/
├── index.html              # 入口 HTML
├── vite.config.js          # Vite 配置
├── server/
│   ├── index.js            # Express 后端主入口
│   ├── aiService.js        # AI 服务（大模型对接 + 本地兜底）
│   └── data/               # SQLite 数据库
├── src/
│   ├── main.jsx            # React 入口
│   ├── App.jsx             # 主应用
│   ├── index.css           # 全局样式
│   └── components/         # 页面组件
└── public/                 # 静态资源
```

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| POST | `/api/ai/complete` | AI 补全/改写/翻译，参数 `{text, mode}` |
| POST | `/api/auth/register` | 用户注册 |
| POST | `/api/auth/login` | 用户登录 |

## 部署上线

构建完成后可将 `dist/` 目录和 `server/` 部署到任意 Node.js 服务器（如腾讯云 Lighthouse、CloudBase、EdgeOne 等），设置 `NODE_ENV=production` 即可由后端托管静态资源。
