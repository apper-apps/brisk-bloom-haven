import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { productService } from '@/services/api/productService'
import { useCart } from '@/hooks/useCart'
import { toast } from 'react-toastify'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [giftMessage, setGiftMessage] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      setError(null)
const data = await productService.getById(parseInt(id))
      setProduct(data)
      if (data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0])
      }
      // Set minimum delivery date to tomorrow
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      setDeliveryDate(tomorrow.toISOString().split('T')[0])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error("This item is currently out of stock")
      return
    }

    const cartItem = {
      ...product,
      quantity,
      customization: {
        color: selectedColor,
        giftMessage,
        deliveryDate
      }
    }

    addToCart(cartItem)
    toast.success(`Added ${quantity} ${product.name} to cart! 🌸`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/checkout')
  }

  if (loading) return <Loading type="products" />
  if (error) return <Error message={error} onRetry={loadProduct} />
  if (!product) return <Error message="Product not found" />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-gray-600 mb-8"
      >
        <button onClick={() => navigate('/shop')} className="hover:text-primary transition-colors">
          Shop
        </button>
        <ApperIcon name="ChevronRight" className="w-4 h-4" />
        <span>{product.category}</span>
        <ApperIcon name="ChevronRight" className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </motion.nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {/* Main Image */}
          <div className="aspect-square bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImageIndex}
                src={product.images[selectedImageIndex]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="error" size="lg">
                  Out of Stock
                </Badge>
              </div>
            )}

            {/* Zoom Button */}
            <button className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <ApperIcon name="ZoomIn" className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">{product.category}</Badge>
              {product.inStock ? (
                <Badge variant="success">In Stock</Badge>
              ) : (
                <Badge variant="error">Out of Stock</Badge>
              )}
            </div>

            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl font-bold gradient-text">
                ${product.price}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </div>
              )}
              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <ApperIcon
                        key={i}
                        name="Star"
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-accent fill-accent'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 1 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Color Options</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: getColorHex(color) }}
                    />
                    <span className="font-medium text-gray-700">{color}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Occasions */}
          {product.occasions && product.occasions.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Perfect For</h3>
              <div className="flex flex-wrap gap-2">
                {product.occasions.map((occasion) => (
                  <Badge key={occasion} variant="gray">
                    {occasion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <ApperIcon name="Minus" className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <ApperIcon name="Plus" className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-900 mb-3">
                Delivery Date
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Gift Message */}
          <div>
            <label className="block font-semibold text-gray-900 mb-3">
              Gift Message (Optional)
            </label>
            <textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder="Add a personal touch with a special message..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                icon="ShoppingCart"
                className="flex-1"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleBuyNow}
                disabled={!product.inStock}
                icon="CreditCard"
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ApperIcon name="Truck" className="w-4 h-4 text-primary" />
                <span>Free delivery over $50</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Shield" className="w-4 h-4 text-primary" />
                <span>Fresh guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="RotateCcw" className="w-4 h-4 text-primary" />
                <span>Easy returns</span>
              </div>
            </div>
          </div>

          {/* Care Instructions */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-semibold text-gray-900 mb-4">
              <ApperIcon name="Leaf" className="w-5 h-5 text-secondary" />
              Care Instructions
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <ApperIcon name="Droplets" className="w-4 h-4 text-secondary" />
                <span>Change water every 2-3 days</span>
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Scissors" className="w-4 h-4 text-secondary" />
                <span>Trim stems at an angle under running water</span>
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Sun" className="w-4 h-4 text-secondary" />
                <span>Keep away from direct sunlight and drafts</span>
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Thermometer" className="w-4 h-4 text-secondary" />
                <span>Store in cool location (65-75°F)</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Helper function to convert color names to hex values
const getColorHex = (colorName) => {
  const colorMap = {
    red: '#EF4444',
    pink: '#EC4899',
    purple: '#A855F7',
    blue: '#3B82F6',
    yellow: '#EAB308',
    orange: '#F97316',
    white: '#FFFFFF',
    green: '#22C55E',
    mixed: '#8B5CF6'
  }
  return colorMap[colorName.toLowerCase()] || '#8B5CF6'
}

export default ProductDetail