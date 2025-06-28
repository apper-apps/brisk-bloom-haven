import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Input = ({
  label,
  type = 'text',
  icon,
  error,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <ApperIcon name={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
        
        <motion.input
          whileFocus={{ scale: 1.01 }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          type={type}
          className={`
            w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
            ${icon ? 'pl-12' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
              : focused 
                ? 'border-primary focus:border-primary focus:ring-primary/20' 
                : 'border-gray-200 hover:border-gray-300'
            }
            focus:outline-none focus:ring-4
            bg-white shadow-sm hover:shadow-md focus:shadow-lg
          `}
          {...props}
        />
        
        {focused && (
          <motion.div
            layoutId="input-focus"
            className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600 flex items-center gap-1"
        >
          <ApperIcon name="AlertCircle" className="w-4 h-4" />
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default Input