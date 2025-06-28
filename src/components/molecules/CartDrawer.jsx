import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { useCart } from '@/hooks/useCart'
import { useNavigate } from 'react-router-dom'

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <ApperIcon name="ShoppingBag" className="w-6 h-6 text-primary" />
                </motion.div>
                <h2 className="text-xl font-display font-semibold">
                  Your Bouquet ({getCartCount()})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence>
                {cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ApperIcon name="ShoppingCart" className="w-10 h-10 text-rose-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-6">Add some beautiful flowers to get started!</p>
                    <Button onClick={onClose}>
                      Continue Shopping
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={`${item.Id}-${index}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold text-primary">${item.price}</span>
                            <div className="flex items-center gap-2">
                              <button
onClick={() => updateQuantity(item.Id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <ApperIcon name="Minus" className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
onClick={() => updateQuantity(item.Id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <ApperIcon name="Plus" className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <button
onClick={() => removeFromCart(item.Id)}
                          className="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center transition-colors text-red-500"
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-gray-200 p-6 space-y-4"
              >
                <div className="flex items-center justify-between text-xl font-semibold">
                  <span>Total:</span>
                  <span className="gradient-text">${getCartTotal()}</span>
                </div>
                <Button
                  size="lg"
                  onClick={handleCheckout}
                  className="w-full"
                  icon="CreditCard"
                >
                  Checkout
                </Button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer