import { useState } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import LegalPage from './components/LegalPage'
import PageGlow from './components/PageGlow'
import IntroPage from './pages/IntroPage'
import ProductPage from './pages/ProductPage'
import DownloadPage from './pages/DownloadPage'
import AboutPage from './pages/AboutPage'
import ProductDetailPage from './pages/ProductDetailPage'
import JoinPage from './pages/JoinPage'

function Home({ onStartDemo }) {
  return (
    <>
      <PageGlow />
      <Hero onStartDemo={onStartDemo} />
      <Features onTryFeature={onStartDemo} />
    </>
  )
}

function App() {
  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)

  const handleNavigate = (target) => {
    setPage(target)
    window.scrollTo({ top: 0 })
  }

  const handleOpenProduct = (product) => {
    setSelectedProduct(product)
    setPage('product-detail')
    window.scrollTo({ top: 0 })
  }

  // 首页引导按钮点击：跳转到对应独立页面
  const handleStartDemo = (target) => {
    handleNavigate(target || 'home')
  }

  const handleOpenLegal = (type) => setPage(type)

  // 渲染内容区：每个导航项都是独立整页
  const renderContent = () => {
    switch (page) {
      case 'intro':
        return <IntroPage onNavigate={handleNavigate} />
      case 'product':
        return <ProductPage onNavigate={handleNavigate} onOpenProduct={handleOpenProduct} />
      case 'product-detail':
        return <ProductDetailPage product={selectedProduct} onBack={() => setPage('product')} />
      case 'download':
        return <DownloadPage />
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />
      case 'join':
        return <JoinPage onNavigate={handleNavigate} />
      case 'privacy':
      case 'terms':
        return <LegalPage type={page} onBack={() => setPage('home')} />
      default:
        return <Home onStartDemo={handleStartDemo} />
    }
  }

  return (
    <AuthProvider>
      <div className="app">
        <Navbar
          onStartDemo={handleStartDemo}
          onOpenAuth={() => setAuthOpen(true)}
          currentPage={page}
          onNavigate={handleNavigate}
        />
        <main key={page} className="page-transition">{renderContent()}</main>
        {page !== 'privacy' && page !== 'terms' && (
          <Footer onOpenLegal={handleOpenLegal} onNavigate={handleNavigate} />
        )}
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </AuthProvider>
  )
}

export default App