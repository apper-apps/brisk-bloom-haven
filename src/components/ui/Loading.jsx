import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ type = 'products' }) => {
  const renderProductSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="aspect-square bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl mb-4 animate-pulse" />
          <div className="space-y-3">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-8 bg-gradient-to-r from-rose-100 to-rose-200 rounded-lg animate-pulse w-1/2" />
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderHeroSkeleton = () => (
    <div className="relative h-[600px] bg-gradient-to-br from-rose-50 to-rose-100 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="h-16 bg-gradient-to-r from-rose-200 to-rose-300 rounded-2xl w-96 mx-auto animate-pulse" />
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-80 mx-auto animate-pulse" />
          <div className="h-12 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl w-48 mx-auto animate-pulse" />
        </div>
      </div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-rose-200 rounded-full animate-pulse animate-float" />
      <div className="absolute top-20 right-20 w-16 h-16 bg-rose-300 rounded-full animate-pulse animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-rose-200 rounded-full animate-pulse animate-float" style={{ animationDelay: '2s' }} />
    </div>
  )

  if (type === 'hero') return renderHeroSkeleton()
  return renderProductSkeleton()
}

export default Loading