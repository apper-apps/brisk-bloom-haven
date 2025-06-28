import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import Home from '@/components/pages/Home'
import Shop from '@/components/pages/Shop'
import ProductDetail from '@/components/pages/ProductDetail'
import Collections from '@/components/pages/Collections'
import Occasions from '@/components/pages/Occasions'
import About from '@/components/pages/About'
import Checkout from '@/components/pages/Checkout'
import { CartProvider } from '@/hooks/useCart'

const Layout = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-rose-50/50 to-white flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/occasions" element={<Occasions />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default Layout