import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "relative overflow-hidden font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-primary/20"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-rose-600 text-white shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-primary",
    secondary: "bg-gradient-to-r from-secondary to-green-600 text-white shadow-lg hover:shadow-xl hover:from-green-600 hover:to-secondary",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white bg-white",
    ghost: "text-primary hover:bg-primary/10",
    white: "bg-white text-gray-800 shadow-md hover:shadow-lg border border-gray-200"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <ApperIcon name="Loader2" className="w-4 h-4" />
        </motion.div>
      )}
      
      {!loading && icon && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
      
      {!loading && children}
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}

export default Button