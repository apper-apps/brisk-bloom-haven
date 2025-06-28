import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ onSearch, suggestions = [], placeholder = "Search beautiful flowers..." }) => {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery)
    onSearch(searchQuery)
    setShowSuggestions(false)
  }

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5)

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <motion.div
          animate={{ scale: focused ? 1.02 : 1 }}
          className="relative"
        >
          <ApperIcon 
            name="Search" 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
              onSearch(e.target.value)
            }}
            onFocus={() => {
              setFocused(true)
              setShowSuggestions(true)
            }}
            onBlur={() => {
              setFocused(false)
              setTimeout(() => setShowSuggestions(false), 200)
            }}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
          />
        </motion.div>

        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: '#FFF5F7' }}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-rose-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                >
                  <ApperIcon name="Flower" className="w-4 h-4 text-primary" />
                  <span className="text-gray-700">{suggestion}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SearchBar