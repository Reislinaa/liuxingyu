import { useState } from 'react'
import Reveal from '../components/Reveal'

const benefits = [
  { icon: '✦', title: '精准引流', desc: '面向目标用户精准曝光，带来高质量流量' },
  { icon: '◈', title: '专业展示', desc: '产品详情页展示，提升品牌可信度' },
  { icon: '◍', title: '免费入驻', desc: '初创公司免费入驻，零成本获取曝光' },
  { icon: '◎', title: '持续运营', desc: '平台多场景推荐，持续获取关注' }
]

export default function JoinPage({ onNavigate }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    logo: '',
    tagline: '',
    description: '',
    url: '',
    email: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0 })
  }

  if (submitted) {
    return (
      <div className="page">
        <div className="page-hero">
          <div className="container">
            <span className="page-hero-tag">JOIN · 入驻申请</span>
            <h1 className="page-hero-title">提交成功！<em>感谢信任</em></h1>
            <p className="page-hero-sub">
              我们的团队会在 3 个工作日内审核你的申请，并通过邮箱与你联系。
            </p>
            <div className="join-success-actions">
              <button className="btn btn-primary" onClick={() => onNavigate('product')}>浏览产品库</button>
              <button className="btn btn-ghost" onClick={() => onNavigate('home')}>返回首页</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <span className="page-hero-tag">JOIN · 入驻申请</span>
          <h1 className="page-hero-title">让你的 AI 产品<em>被看见</em></h1>
          <p className="page-hero-sub">
            免费入驻流星语，获取精准用户流量与专业展示机会
          </p>
        </div>
      </div>

      <div className="page-section">
        <div className="container join-container">
          <div className="join-benefits">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) + 1} variant={['up', 'blur', 'scale', 'fade'][i % 4]}>
                <div className="join-benefit">
                  <div className="join-benefit-icon">{b.icon}</div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="right">
            <form className="join-form" onSubmit={handleSubmit}>
              <h2 className="join-form-title">产品信息</h2>

              <div className="join-field">
                <label>产品名称 *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="你的产品名称" />
              </div>

              <div className="join-field">
                <label>所属领域 *</label>
                <select name="category" value={form.category} onChange={handleChange} required>
                  <option value="">请选择领域</option>
                  <option>图像生成</option>
                  <option>语音识别</option>
                  <option>编程助手</option>
                  <option>智能客服</option>
                  <option>视频理解</option>
                  <option>文本生成</option>
                  <option>其他</option>
                </select>
              </div>

              <div className="join-field">
                <label>产品 Logo 文字/符号</label>
                <input type="text" name="logo" value={form.logo} onChange={handleChange} placeholder="例如：👁 或产品首字母" />
              </div>

              <div className="join-field">
                <label>一句话标语 *</label>
                <input type="text" name="tagline" value={form.tagline} onChange={handleChange} required placeholder="用一句话描述你的产品" />
              </div>

              <div className="join-field">
                <label>产品介绍 *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required placeholder="详细介绍你的产品功能与特点" rows={4} />
              </div>

              <div className="join-field">
                <label>官网链接 *</label>
                <input type="url" name="url" value={form.url} onChange={handleChange} required placeholder="https://你的官网.com" />
              </div>

              <div className="join-field">
                <label>联系邮箱 *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="接收审核结果" />
              </div>

              <button type="submit" className="btn btn-primary join-submit">提交入驻申请</button>
              <p className="join-form-note">提交即表示同意我们的服务条款与隐私政策</p>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  )
}