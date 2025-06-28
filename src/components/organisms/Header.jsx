import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import CartDrawer from "@/components/molecules/CartDrawer";
import SearchBar from "@/components/molecules/SearchBar";
import { useCart } from "@/hooks/useCart";
const Header = () => {
const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { getCartCount } = useCart()
  const { logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)

  const navigation = [
    { name: 'Home', href: '/', icon: 'Home' },
    { name: 'Shop', href: '/shop', icon: 'Store' },
    { name: 'Collections', href: '/collections', icon: 'Package' },
    { name: 'Occasions', href: '/occasions', icon: 'Calendar' },
    { name: 'About', href: '/about', icon: 'Info' }
  ]

  const searchSuggestions = [
    'Red Roses', 'Pink Tulips', 'White Lilies', 'Sunflowers',
    'Wedding Bouquets', 'Birthday Flowers', 'Anniversary Arrangements'
  ]

  const handleSearch = (query) => {
    console.log('Searching for:', query)
    // Implement search functionality
  }

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ApperIcon name="Flower2" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold gradient-text">
                    Bloom Haven
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Fresh Flowers</p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Search */}
            <div className="hidden md:block">
              <SearchBar
                onSearch={handleSearch}
                suggestions={searchSuggestions}
                placeholder="Search flowers..."
              />
            </div>
{/* Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <ApperIcon name="Search" className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <ApperIcon name="ShoppingBag" className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-rose-600 text-white text-xs rounded-full flex items-center justify-center font-medium"
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </motion.button>

              {/* User Menu & Logout */}
              {isAuthenticated && user && (
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.firstName || user.name || 'User'}!
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    <ApperIcon name="LogOut" className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </motion.button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <ApperIcon name={isMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
</button>
            </div>
          </div>

          {/* Mobile Search */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden py-4 border-t border-gray-200"
              >
                <SearchBar
                  onSearch={handleSearch}
                  suggestions={searchSuggestions}
                  placeholder="Search flowers..."
                />
              </motion.div>
)}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        isActive(item.href)
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <ApperIcon name={item.icon} className="w-5 h-5" />
{item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Logout */}
                {isAuthenticated && user && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigation.length * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        logout()
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all w-full"
                    >
                      <ApperIcon name="LogOut" className="w-5 h-5" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </nav>
            </motion.div>
)}
        </AnimatePresence>
      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating Petals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="petal" />
        ))}
      </div>
    </>
  )
}

export default Header