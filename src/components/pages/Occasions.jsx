import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import ProductCard from '@/components/molecules/ProductCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { productService } from '@/services/api/productService'

const Occasions = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedOccasion, setSelectedOccasion] = useState('all')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
const data = await productService.getAll()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const occasions = [
    {
      id: 'all',
      name: 'All Occasions',
      icon: 'Star',
      color: 'from-violet-500 to-purple-600',
      description: 'Browse all our beautiful arrangements',
      count: products.length
    },
    {
      id: 'Birthday',
      name: 'Birthday',
      icon: 'Cake',
      color: 'from-pink-500 to-rose-600',
      description: 'Bright and cheerful birthday celebrations',
      count: products.filter(p => p.occasions?.includes('Birthday')).length
    },
    {
      id: 'Anniversary',
      name: 'Anniversary',
      icon: 'Heart',
      color: 'from-red-500 to-rose-600',
      description: 'Romantic arrangements for love celebrations',
      count: products.filter(p => p.occasions?.includes('Anniversary')).length
    },
    {
      id: 'Wedding',
      name: 'Wedding',
      icon: 'Crown',
      color: 'from-emerald-500 to-teal-600',
      description: 'Elegant arrangements for your special day',
      count: products.filter(p => p.occasions?.includes('Wedding')).length
    },
    {
      id: 'Graduation',
      name: 'Graduation',
      icon: 'GraduationCap',
      color: 'from-blue-500 to-indigo-600',
      description: 'Celebrate achievements and new beginnings',
      count: products.filter(p => p.occasions?.includes('Graduation')).length
    },
    {
      id: 'Get Well',
      name: 'Get Well',
      icon: 'Smile',
      color: 'from-yellow-500 to-orange-600',
      description: 'Uplifting flowers to brighten someone\'s day',
      count: products.filter(p => p.occasions?.includes('Get Well')).length
    },
    {
      id: 'Sympathy',
      name: 'Sympathy',
      icon: 'Heart',
      color: 'from-purple-500 to-indigo-600',
      description: 'Thoughtful arrangements to show you care',
      count: products.filter(p => p.occasions?.includes('Sympathy')).length
    },
    {
      id: 'Just Because',
      name: 'Just Because',
      icon: 'Gift',
      color: 'from-teal-500 to-cyan-600',
      description: 'Surprise someone special for no reason at all',
      count: products.filter(p => p.occasions?.includes('Just Because')).length
    },
    {
      id: "Valentine's Day",
      name: "Valentine's Day",
      icon: 'HeartHandshake',
      color: 'from-rose-500 to-pink-600',
      description: 'Express your love with romantic bouquets',
      count: products.filter(p => p.occasions?.includes("Valentine's Day")).length
    }
  ]

  const getFilteredProducts = () => {
    if (selectedOccasion === 'all') {
      return products
    }
    return products.filter(product => 
      product.occasions?.includes(selectedOccasion)
    )
  }

  const filteredProducts = getFilteredProducts()

  if (loading) return <Loading type="products" />
  if (error) return <Error message={error} onRetry={loadProducts} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-display font-bold gradient-text mb-6">
          Flowers for Every Occasion
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          From birthdays to weddings, sympathy to celebrations, find the perfect 
          arrangement to express your feelings and mark life's special moments.
        </p>
      </motion.div>

      {/* Occasion Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {occasions.map((occasion, index) => (
            <motion.button
              key={occasion.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedOccasion(occasion.id)}
              className={`relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 ${
                selectedOccasion === occasion.id
                  ? 'ring-2 ring-primary ring-offset-2 shadow-xl'
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${occasion.color} opacity-90`} />
              
              <div className="relative z-10 text-white">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4"
                >
                  <ApperIcon name={occasion.icon} className="w-6 h-6" />
                </motion.div>
                
                <h3 className="text-xl font-display font-bold mb-2">
                  {occasion.name}
                </h3>
                
                <p className="text-white/90 text-sm mb-3 leading-relaxed">
                  {occasion.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">
                    {occasion.count} arrangement{occasion.count !== 1 ? 's' : ''}
                  </span>
                  {selectedOccasion === occasion.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                    >
                      <ApperIcon name="Check" className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Selected Occasion Info */}
      <motion.div
        key={selectedOccasion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
          {occasions.find(o => o.id === selectedOccasion)?.name} Arrangements
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {filteredProducts.length} beautiful arrangement{filteredProducts.length !== 1 ? 's' : ''} perfect for {
            selectedOccasion === 'all' ? 'any occasion' : selectedOccasion.toLowerCase()
          }
        </p>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        key={`products-${selectedOccasion}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Search" className="w-12 h-12 text-gray-500" />
          </div>
          <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">
            No arrangements found
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We're working on adding more beautiful arrangements for this occasion. 
            Check back soon or explore other occasions.
          </p>
          <button
            onClick={() => setSelectedOccasion('all')}
            className="bg-gradient-to-r from-primary to-rose-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            View All Arrangements
          </button>
        </motion.div>
      )}

      {/* Occasion Tips */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold gradient-text mb-4">
            Choosing the Perfect Arrangement
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Not sure which arrangement to choose? Here are some helpful tips for different occasions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Romantic Occasions',
              tip: 'Red roses are classic, but consider pink peonies or white orchids for a unique touch.',
              icon: 'Heart',
              color: 'text-rose-600'
            },
            {
              title: 'Celebrations',
              tip: 'Bright, colorful arrangements with sunflowers or mixed bouquets spread joy.',
              icon: 'PartyPopper',
              color: 'text-yellow-600'
            },
            {
              title: 'Sympathy',
              tip: 'White lilies and soft pastels offer comfort and show thoughtful respect.',
              icon: 'Heart',
              color: 'text-purple-600'
            },
            {
              title: 'Corporate Events',
              tip: 'Elegant, structured arrangements in neutral tones maintain professionalism.',
              icon: 'Building',
              color: 'text-green-600'
            },
            {
              title: 'Get Well Soon',
              tip: 'Cheerful, bright flowers like daisies and tulips help lift spirits.',
              icon: 'Smile',
              color: 'text-orange-600'
            },
            {
              title: 'Just Because',
              tip: 'Follow their favorite colors or choose seasonal blooms for a personal touch.',
              icon: 'Gift',
              color: 'text-blue-600'
            }
          ].map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4 ${tip.color}`}>
                <ApperIcon name={tip.icon} className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-3">
                {tip.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tip.tip}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
          Need Help Choosing?
        </h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Our expert florists are here to help you find the perfect arrangement 
          for any occasion. Contact us for personalized recommendations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-gradient-to-r from-primary to-rose-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow inline-flex items-center justify-center gap-2"
          >
            <ApperIcon name="MessageCircle" className="w-5 h-5" />
            Chat with Florist
          </Link>
          <a
            href="tel:+15551234567"
            className="border-2 border-primary text-primary px-8 py-3 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors inline-flex items-center justify-center gap-2"
          >
            <ApperIcon name="Phone" className="w-5 h-5" />
            Call (555) 123-BLOOM
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default Occasions