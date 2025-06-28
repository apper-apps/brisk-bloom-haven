import React from 'react'
import { motion } from 'framer-motion'

const Badge = ({ children, variant = 'primary', size = 'sm', className = '' }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-rose-600 text-white',
    secondary: 'bg-gradient-to-r from-secondary to-green-600 text-white',
    accent: 'bg-gradient-to-r from-accent to-amber-500 text-white',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
    error: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
    gray: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
  }

  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2 text-lg'
  }

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center font-medium rounded-full shadow-sm ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.span>
  )
}

export default Badge