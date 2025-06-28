import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { useCart } from "@/hooks/useCart";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
    toast.success("Added to cart! 🌸", {
      position: "top-right",
      autoClose: 2000,
    })
  }

  const handleCardClick = () => {
    navigate(`/product/${product.Id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
    >
      {/* Floating petals effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-rose-300 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>

      {/* Stock status badge */}
      {!product.inStock && (
        <Badge variant="error" className="absolute top-4 left-4 z-10">
          Out of Stock
        </Badge>
      )}

      {/* Main product image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-rose-50 to-rose-100">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Quick view overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-3"
          >
            <ApperIcon name="Eye" className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>

        {/* Color options indicator */}
        {product.colors && product.colors.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: getColorHex(color) }}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-white shadow-sm flex items-center justify-center">
                <span className="text-[8px] text-gray-600 font-bold">+{product.colors.length - 3}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Occasions tags */}
        {product.occasions && product.occasions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.occasions.slice(0, 2).map((occasion) => (
              <Badge key={occasion} variant="gray" size="xs">
                {occasion}
              </Badge>
            ))}
          </div>
        )}

        {/* Price and actions */}
        <div className="flex items-center justify-between pt-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col"
          >
            <span className="text-2xl font-bold gradient-text">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
</span>
            )}
          </motion.div>

          <Button
            variant="primary"
            size="sm"
            icon="ShoppingCart"
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="group-hover:scale-105 transition-transform"
          >
            Add
          </Button>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 pt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <ApperIcon
                  key={i}
                  name="Star"
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-accent fill-accent'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviewCount || 0})
            </span>
          </div>
        )}
      </div>
    </motion.div>
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

export default ProductCard