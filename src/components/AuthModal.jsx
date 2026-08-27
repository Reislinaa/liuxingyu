import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ open, onClose }) {
  const { login } = useAuth()
  const [tab, setTab] = useState('login') // login | register
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!open) return null

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const url = tab === 'login' ? '/api/auth/login' : '/api/auth/register'
      const body = tab === 'login'
        ? { username: form.username, password: form.password }
        : form
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '操作失败')
      if (tab === 'login') {
        login(data.user)
        setSuccess('登录成功！')
        setTimeout(onClose, 800)
      } else {
        setSuccess('注册成功，请登录！')
        setTab('login')
        setForm({ username: '', email: '', password: '' })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="关闭">×</button>
        <h3 className="auth-title">{tab === 'login' ? '欢迎回来' : '创建账号'}</h3>
        <p className="auth-subtitle">
          {tab === 'login' ? '登录后解锁更多 AI 能力' : '加入 AI 智能输入法社区'}
        </p>

        <div className="auth-tabs">
          <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setError('') }}>
            登录
          </button>
          <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setError('') }}>
            注册
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>用户名</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleInput}
              placeholder="请输入用户名"
              required
            />
          </div>

          {tab === 'register' && (
            <div className="auth-field">
              <label>邮箱</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInput}
                placeholder="请输入邮箱"
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label>密码</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInput}
              placeholder={tab === 'register' ? '至少 6 位密码' : '请输入密码'}
              minLength={tab === 'register' ? 6 : undefined}
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? '请稍候…' : tab === 'login' ? '登 录' : '注 册'}
          </button>
        </form>
      </div>
    </div>
  )
}
