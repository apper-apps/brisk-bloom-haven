import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import ProductCard from '@/components/molecules/ProductCard'
import SearchBar from '@/components/molecules/SearchBar'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { productService } from '@/services/api/productService'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({})
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    applyFiltersAndSearch()
  }, [products, searchQuery, filters, sortBy])

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

  const applyFiltersAndSearch = () => {
    let filtered = [...products]

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply filters
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      )
    }

    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors && product.colors.some(color =>
          filters.colors.includes(color)
        )
      )
    }

    if (filters.occasions && filters.occasions.length > 0) {
      filtered = filtered.filter(product =>
        product.occasions && product.occasions.some(occasion =>
          filters.occasions.includes(occasion)
        )
      )
    }

    if (filters.priceRange) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      )
    }

    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.inStock)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }

  const searchSuggestions = [
    'Red Roses', 'Pink Tulips', 'White Lilies', 'Sunflowers',
    'Wedding Bouquets', 'Birthday Flowers', 'Anniversary Arrangements'
  ]

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ]

  if (loading) return <Loading type="products" />
  if (error) return <Error message={error} onRetry={loadProducts} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-display font-bold gradient-text mb-4">
          Fresh Flower Shop
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our complete collection of handcrafted arrangements and seasonal bouquets
        </p>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <SearchBar
            onSearch={setSearchQuery}
            suggestions={searchSuggestions}
            placeholder="Search flowers, colors, occasions..."
          />
          
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-primary transition-colors"
          >
            <ApperIcon name="Filter" className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ApperIcon name="BarChart3" className="w-5 h-5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-primary focus:outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>
      </motion.div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={true}
              onClose={() => {}}
            />
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <Empty
              title="No flowers found"
              message="Try adjusting your search terms or filters to discover more beautiful arrangements"
              actionText="Clear Filters"
              onAction={() => {
                setSearchQuery('')
                setFilters({})
              }}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
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
          )}
        </div>
      </div>
    </div>
  )
}

export default Shop