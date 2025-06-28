import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import ProductCard from '@/components/molecules/ProductCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { productService } from '@/services/api/productService'

const Collections = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const collections = [
    {
      id: 'romantic',
      name: 'Romantic Collection',
      description: 'Express your deepest feelings with our romantic arrangements',
      icon: 'Heart',
      color: 'from-rose-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=400',
      products: products.filter(p => p.occasions?.includes('Anniversary') || p.occasions?.includes("Valentine's Day"))
    },
    {
      id: 'celebration',
      name: 'Celebration Collection',
      description: 'Make every milestone memorable with vibrant celebratory bouquets',
      icon: 'PartyPopper',
      color: 'from-yellow-500 to-orange-600',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400',
      products: products.filter(p => p.occasions?.includes('Birthday') || p.occasions?.includes('Graduation'))
    },
    {
      id: 'sympathy',
      name: 'Sympathy Collection',
      description: 'Show your support with elegant and thoughtful arrangements',
      icon: 'Heart',
      color: 'from-purple-500 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1574684891174-df6b02ab38d7?w=600&h=400',
      products: products.filter(p => p.occasions?.includes('Sympathy'))
    },
    {
      id: 'wedding',
      name: 'Wedding Collection',
      description: 'Perfect arrangements for your special day',
      icon: 'Crown',
      color: 'from-green-500 to-teal-600',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=400',
      products: products.filter(p => p.occasions?.includes('Wedding'))
    },
    {
      id: 'seasonal',
      name: 'Seasonal Specials',
      description: 'Fresh seasonal arrangements featuring the best of each season',
      icon: 'Leaf',
      color: 'from-amber-500 to-orange-600',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=400',
      products: products.filter(p => p.name.toLowerCase().includes('seasonal') || p.category === 'Seasonal')
    },
    {
      id: 'luxury',
      name: 'Luxury Collection',
      description: 'Premium arrangements with the finest flowers and elegant presentation',
      icon: 'Crown',
      color: 'from-violet-500 to-purple-600',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400',
      products: products.filter(p => p.price > 80)
    }
  ]

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
          Curated Collections
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover our thoughtfully curated collections, each designed to capture 
          the perfect sentiment for life's most meaningful moments.
        </p>
      </motion.div>

      {/* Collections Grid */}
      <div className="space-y-20">
        {collections.map((collection, index) => (
          <motion.section
            key={collection.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="space-y-8"
          >
            {/* Collection Header */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl aspect-[4/3] lg:aspect-[3/2]"
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-80`} />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6"
                    >
                      <ApperIcon name={collection.icon} className="w-10 h-10" />
                    </motion.div>
                    <h2 className="text-3xl font-display font-bold mb-4 text-center">
                      {collection.name}
                    </h2>
                    <p className="text-white/90 text-center text-lg leading-relaxed">
                      {collection.description}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="lg:w-1/2 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-bold text-gray-900">
                    {collection.name}
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {collection.description}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Package" className="w-5 h-5 text-primary" />
                    <span>{collection.products.length} arrangements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Truck" className="w-5 h-5 text-primary" />
                    <span>Same-day delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Heart" className="w-5 h-5 text-primary" />
                    <span>Hand-crafted</span>
                  </div>
                </div>

                <Link
                  to={`/shop?collection=${collection.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  View All Products
                  <ApperIcon name="ArrowRight" className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Collection Products */}
            {collection.products.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {collection.products.slice(0, 4).map((product, productIndex) => (
                  <motion.div
                    key={product.Id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: productIndex * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}

            {collection.products.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Package" className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Coming Soon
                </h3>
                <p className="text-gray-600">
                  We're preparing beautiful arrangements for this collection.
                </p>
              </div>
            )}
          </motion.section>
        ))}
      </div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 bg-gradient-to-br from-primary to-rose-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 6 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4
              }}
              className="absolute w-6 h-6 bg-white rounded-full"
              style={{
                left: `${(i * 6.67) % 100}%`,
                top: `${(i * 8.33) % 100}%`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <ApperIcon name="Sparkles" className="w-12 h-12 text-white" />
          </motion.div>

          <h2 className="text-4xl font-display font-bold mb-6">
            Custom Collections Available
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Looking for something unique? Our expert florists can create custom 
            collections tailored to your specific needs and preferences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <ApperIcon name="MessageCircle" className="w-5 h-5" />
              Contact Our Florists
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              <ApperIcon name="Phone" className="w-5 h-5" />
              Call (555) 123-BLOOM
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Collections