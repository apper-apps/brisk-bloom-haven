import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No flowers found",
  message = "Try adjusting your search or browse our beautiful collections",
  actionText = "Browse Collections",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full flex items-center justify-center">
          <ApperIcon name="Flower2" className="w-16 h-16 text-rose-400" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent to-amber-500 rounded-full flex items-center justify-center"
        >
          <ApperIcon name="Sparkles" className="w-4 h-4 text-white" />
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-display font-semibold gradient-text mb-4"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 text-center mb-8 max-w-md leading-relaxed"
      >
        {message}
      </motion.p>

      {onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="bg-gradient-to-r from-primary to-rose-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
        >
          <ApperIcon name="Search" className="w-5 h-5" />
          {actionText}
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex gap-4"
      >
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            className="w-4 h-4 bg-gradient-to-br from-rose-300 to-rose-400 rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Empty