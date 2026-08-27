import { useState } from 'react'
import { aiProducts } from '../data/aiProducts'

const categories = ['全部', '图像生成', '语音识别', '编程助手', '智能客服', '视频理解', '文本生成']

export default function ProductsPage({ onNavigate, onOpenProduct }) {
  const [activeCat, setActiveCat] = useState('全部')
  const [keyword, setKeyword] = useState('')

  const filtered = aiProducts.filter(p => {
    const matchCat = activeCat === '全部' || p.category === activeCat
    const matchKw = !keyword || p.name.includes(keyword) || p.tagline.includes(keyword)
    return matchCat && matchKw
  })

  return (
    <div className="page">
      <div className="page-hero">
        <div className="container">
          <span className="page-hero-tag">PRODUCTS · AI 产品库</span>
          <h1 className="page-hero-title">精选 AI 产品，尽在<em>流星语</em></h1>
          <p className="page-hero-sub">
            覆盖八大 AI 领域的优质产品，助力初创 AI 公司被更多人看见
          </p>
        </div>
      </div>

      <div className="page-section">
        <div className="container">
          {/* 搜索栏 */}
          <div className="product-search-bar">
            <input
              type="text"
              className="product-search-input"
              placeholder="搜索产品名称或简介…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-primary product-search-btn">搜索</button>
          </div>

          {/* 分类筛选 */}
          <div className="product-categories">
            {categories.map(cat => (
              <button
                key={cat}
                className={`product-cat ${activeCat === cat ? 'active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 产品卡片网格 */}
          {filtered.length === 0 ? (
            <div className="product-empty">暂无符合条件的 AI 产品</div>
          ) : (
            <div className="product-catalog">
              {filtered.map(p => (
                <div
                  className={`product-catalog-card ${p.featured ? 'featured' : ''}`}
                  key={p.id}
                  onClick={() => onOpenProduct(p)}
                >
                  {p.featured && <div className="product-featured-badge">精选</div>}
                  <div className="product-catalog-head">
                    <div className="product-catalog-logo">{p.logo}</div>
                    <div className="product-catalog-info">
                      <h3>{p.name}</h3>
                      <span className="product-catalog-cat">{p.category}</span>
                    </div>
                    {p.verified && <span className="product-verified">✓ 认证</span>}
                  </div>
                  <p className="product-catalog-tagline">{p.tagline}</p>
                  <p className="product-catalog-desc">{p.description}</p>
                  <div className="product-catalog-tags">
                    {p.tags.map(t => <span key={t}>#{t}</span>)}
                  </div>
                  <div className="product-catalog-action">
                    <span className="product-catalog-view">查看详情 →</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 入驻引导 */}
          <div className="join-prompt">
            <div>
              <h3>你的 AI 产品想被更多人看到？</h3>
              <p>免费申请入驻，获取精准用户流量</p>
            </div>
            <button className="btn btn-primary" onClick={() => onNavigate('join')}>立即入驻</button>
          </div>
        </div>
      </div>
    </div>
  )
}