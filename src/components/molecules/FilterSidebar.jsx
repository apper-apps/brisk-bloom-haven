import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const FilterSidebar = ({ filters, onFiltersChange, isOpen, onClose }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 200])
  const [selectedCategories, setSelectedCategories] = useState(filters.categories || [])
  const [selectedColors, setSelectedColors] = useState(filters.colors || [])
  const [selectedOccasions, setSelectedOccasions] = useState(filters.occasions || [])
  const [inStockOnly, setInStockOnly] = useState(filters.inStockOnly || false)

  const categories = ['Roses', 'Tulips', 'Lilies', 'Sunflowers', 'Mixed Bouquets', 'Orchids', 'Carnations', 'Peonies']
  const colors = ['Red', 'Pink', 'White', 'Yellow', 'Purple', 'Orange', 'Blue', 'Mixed']
  const occasions = ['Birthday', 'Anniversary', 'Wedding', 'Graduation', 'Get Well', 'Sympathy', 'Just Because', 'Valentine\'s Day']

  const handleApplyFilters = () => {
    const newFilters = {
      priceRange,
      categories: selectedCategories,
      colors: selectedColors,
      occasions: selectedOccasions,
      inStockOnly
    }
    onFiltersChange(newFilters)
    onClose()
  }

  const handleClearFilters = () => {
    setPriceRange([0, 200])
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedOccasions([])
    setInStockOnly(false)
    onFiltersChange({})
  }

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleColorToggle = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const handleOccasionToggle = (occasion) => {
    setSelectedOccasions(prev =>
      prev.includes(occasion)
        ? prev.filter(o => o !== occasion)
        : [...prev, occasion]
    )
  }

  const FilterSection = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(true)

    return (
      <div className="border-b border-gray-200 pb-6 mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left font-medium text-gray-800 mb-4"
        >
          {title}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ApperIcon name="ChevronDown" className="w-5 h-5" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 lg:relative lg:shadow-none lg:z-auto flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-display font-semibold flex items-center gap-2">
                <ApperIcon name="Filter" className="w-5 h-5 text-primary" />
                Filters
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors lg:hidden"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Price Range */}
              <FilterSection title="Price Range">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </FilterSection>

              {/* Categories */}
              <FilterSection title="Flower Types">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.label
                      key={category}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="w-5 h-5 text-primary rounded focus:ring-primary/20"
                      />
                      <span className="text-gray-700">{category}</span>
                    </motion.label>
                  ))}
                </div>
              </FilterSection>

              {/* Colors */}
              <FilterSection title="Colors">
                <div className="grid grid-cols-2 gap-2">
                  {colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleColorToggle(color)}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        selectedColors.includes(color)
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: getColorHex(color) }}
                      />
                      <span className="text-sm text-gray-700">{color}</span>
                    </motion.button>
                  ))}
                </div>
              </FilterSection>

              {/* Occasions */}
              <FilterSection title="Occasions">
                <div className="space-y-2">
                  {occasions.map((occasion) => (
                    <motion.label
                      key={occasion}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOccasions.includes(occasion)}
                        onChange={() => handleOccasionToggle(occasion)}
                        className="w-5 h-5 text-primary rounded focus:ring-primary/20"
                      />
                      <span className="text-gray-700">{occasion}</span>
                    </motion.label>
                  ))}
                </div>
              </FilterSection>

              {/* Stock Status */}
              <FilterSection title="Availability">
                <motion.label
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-5 h-5 text-primary rounded focus:ring-primary/20"
                  />
                  <span className="text-gray-700">In Stock Only</span>
                </motion.label>
              </FilterSection>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 space-y-3">
              <Button
                onClick={handleApplyFilters}
                className="w-full"
                icon="Check"
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full"
                icon="RotateCcw"
              >
                Clear All
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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

export default FilterSidebar