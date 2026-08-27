import Reveal from '../components/Reveal'

export default function ProductDetailPage({ product, onBack }) {
  if (!product) return null

  return (
    <div className="page">
      <div className="page-hero detail-hero">
        <div className="container">
          <button className="legal-back" onClick={onBack}>← 返回产品库</button>
          <div className="detail-header">
            <div className="detail-logo">{product.logo}</div>
            <div>
              <h1 className="detail-name">{product.name}</h1>
              <div className="detail-meta">
                <span className="detail-cat">{product.category}</span>
                {product.verified && <span className="detail-verified">✓ 平台认证</span>}
                {product.featured && <span className="detail-featured">精选推荐</span>}
              </div>
            </div>
          </div>
          <p className="detail-tagline">{product.tagline}</p>
        </div>
      </div>

      <div className="page-section">
        <div className="container detail-body">
          <div className="detail-main">
            <Reveal variant="up">
              <h2 className="detail-section-title">产品介绍</h2>
              <p className="detail-description">{product.description}</p>
            </Reveal>

            <Reveal delay={1} variant="blur">
              <h2 className="detail-section-title">核心功能</h2>
              <div className="detail-features">
                {product.features.map(f => (
                  <div className="detail-feature-item" key={f}>
                    <span className="detail-feature-check">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={2} variant="fade">
              <h2 className="detail-section-title">标签</h2>
              <div className="detail-tags">
                {product.tags.map(t => <span key={t}>#{t}</span>)}
              </div>
            </Reveal>
          </div>

          <div className="detail-sidebar">
            <Reveal variant="right">
              <div className="detail-side-card">
                <h3 className="detail-side-title">访问产品</h3>
                <p className="detail-side-desc">前往官网了解更多并开始使用</p>
                <a href={product.url} className="btn btn-primary detail-side-btn" target="_blank" rel="noreferrer">
                  访问官网 →
                </a>
                <div className="detail-side-note">
                  <p>通过流星语访问可获得专属推荐</p>
                </div>
              </div>
            </Reveal>

            <Reveal variant="right" delay={1}>
              <div className="detail-side-card">
                <h3 className="detail-side-title">产品信息</h3>
                <div className="detail-side-info">
                  <span>所属领域</span><span>{product.category}</span>
                  <span>平台认证</span><span>{product.verified ? '已认证' : '待认证'}</span>
                  <span>推荐状态</span><span>{product.featured ? '精选' : '普通'}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}