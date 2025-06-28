import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import ProductCard from '@/components/molecules/ProductCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { productService } from '@/services/api/productService'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const products = await productService.getAll()
      setFeaturedProducts(products.slice(0, 8))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    {
      name: 'Romantic',
      description: 'Express your love',
      icon: 'Heart',
      color: 'from-rose-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300',
      href: '/collections?category=romantic'
    },
    {
      name: 'Celebration',
      description: 'Make it memorable',
      icon: 'PartyPopper',
      color: 'from-yellow-500 to-orange-600',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300',
      href: '/collections?category=celebration'
    },
    {
      name: 'Sympathy',
      description: 'Show you care',
      icon: 'Heart',
      color: 'from-purple-500 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1574684891174-df6b02ab38d7?w=400&h=300',
      href: '/collections?category=sympathy'
    },
    {
      name: 'Corporate',
      description: 'Professional elegance',
      icon: 'Building',
      color: 'from-green-500 to-teal-600',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300',
      href: '/collections?category=corporate'
    }
  ]

  const occasions = [
    { name: 'Birthday', icon: 'Cake', count: '12+ arrangements' },
    { name: 'Anniversary', icon: 'Heart', count: '8+ bouquets' },
    { name: 'Wedding', icon: 'Crown', count: '15+ collections' },
    { name: 'Get Well', icon: 'Smile', count: '6+ arrangements' }
  ]

  if (loading) return <Loading type="hero" />
  if (error) return <Error message={error} onRetry={loadFeaturedProducts} />

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-white" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-50"
        />
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-purple-300 to-indigo-400 rounded-full opacity-70"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-display font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="gradient-text">Fresh Flowers</span>
              <br />
              <span className="text-gray-800">Delivered Daily</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Handpicked flowers from local gardens, crafted into stunning arrangements 
              that bring joy to every occasion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="xl" icon="Store" asChild>
                <Link to="/shop">Shop All Flowers</Link>
              </Button>
              <Button variant="outline" size="xl" icon="Package" asChild>
                <Link to="/collections">View Collections</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-gray-600">Flower Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">24h</div>
                <div className="text-sm text-gray-600">Fresh Guarantee</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold gradient-text mb-4">
            Shop by Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover curated arrangements perfect for every moment in life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <Link to={category.href}>
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4"
                    >
                      <ApperIcon name={category.icon} className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-2xl font-display font-bold mb-2">{category.name}</h3>
                    <p className="text-white/90 text-center">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold gradient-text mb-4">
            Featured Arrangements
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our most loved bouquets, handcrafted with the freshest seasonal flowers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" icon="ArrowRight" asChild>
            <Link to="/shop">View All Flowers</Link>
          </Button>
        </motion.div>
      </section>

      {/* Occasions Section */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold gradient-text mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From birthdays to weddings, we have the perfect arrangement for your special moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {occasions.map((occasion, index) => (
              <motion.div
                key={occasion.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow"
                >
                  <ApperIcon name={occasion.icon} className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-display font-semibold text-gray-800 mb-2">
                  {occasion.name}
                </h3>
                <p className="text-gray-600">{occasion.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary to-rose-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 4 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                className="absolute w-4 h-4 bg-white rounded-full"
                style={{
                  left: `${(i * 5.26) % 100}%`,
                  top: `${(i * 7.89) % 100}%`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <ApperIcon name="Gift" className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl font-display font-bold mb-6">
              Subscribe & Save 15%
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Get fresh flowers delivered monthly and never miss a special moment. 
              Flexible plans, premium quality, exclusive member pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button variant="white" size="lg" icon="Calendar">
                Monthly Delivery
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 mt-8 text-white/80">
              <div className="flex items-center gap-2">
                <ApperIcon name="Truck" className="w-5 h-5" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="RotateCcw" className="w-5 h-5" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Heart" className="w-5 h-5" />
                <span>Always Fresh</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home