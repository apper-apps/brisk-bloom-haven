import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { useCart } from '@/hooks/useCart'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Checkout = () => {
  const { cartItems, getCartTotal, getCartCount, clearCart } = useCart()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form data
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryDate: '',
    deliveryTime: 'morning',
    specialInstructions: ''
  })

  const [recipientInfo, setRecipientInfo] = useState({
    isGift: false,
    recipientName: '',
    giftMessage: ''
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })

  const steps = [
    { id: 1, name: 'Contact', icon: 'User' },
    { id: 2, name: 'Delivery', icon: 'Truck' },
    { id: 3, name: 'Payment', icon: 'CreditCard' },
    { id: 4, name: 'Review', icon: 'Check' }
  ]

  const deliveryTimes = [
    { value: 'morning', label: '9:00 AM - 12:00 PM' },
    { value: 'afternoon', label: '12:00 PM - 5:00 PM' },
    { value: 'evening', label: '5:00 PM - 8:00 PM' }
  ]

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="ShoppingCart" className="w-12 h-12 text-gray-500" />
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some beautiful flowers to your cart before proceeding to checkout.
          </p>
          <Button onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart and show success
      clearCart()
      toast.success('Order placed successfully! 🌸')
      
      // Navigate to success page (or you could create a dedicated success page)
      navigate('/')
      
    } catch (error) {
      toast.error('Failed to process order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-6">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                value={customerInfo.firstName}
                onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                icon="User"
                required
              />
              <Input
                label="Last Name"
                value={customerInfo.lastName}
                onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                icon="Mail"
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                icon="Phone"
                required
              />
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-display font-semibold text-gray-900">
              Delivery Information
            </h3>
            
            <div className="space-y-6">
              <Input
                label="Street Address"
                value={deliveryInfo.address}
                onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                icon="MapPin"
                required
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="City"
                  value={deliveryInfo.city}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                  required
                />
                <Input
                  label="State"
                  value={deliveryInfo.state}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, state: e.target.value})}
                  required
                />
                <Input
                  label="ZIP Code"
                  value={deliveryInfo.zipCode}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, zipCode: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    value={deliveryInfo.deliveryDate}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, deliveryDate: e.target.value})}
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Time
                  </label>
                  <select
                    value={deliveryInfo.deliveryTime}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, deliveryTime: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
                  >
                    {deliveryTimes.map(time => (
                      <option key={time.value} value={time.value}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Delivery Instructions (Optional)
                </label>
                <textarea
                  value={deliveryInfo.specialInstructions}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, specialInstructions: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 resize-none"
                  placeholder="Building entrance, apartment number, gate code..."
                />
              </div>
            </div>

            {/* Gift Options */}
            <div className="bg-rose-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  id="isGift"
                  checked={recipientInfo.isGift}
                  onChange={(e) => setRecipientInfo({...recipientInfo, isGift: e.target.checked})}
                  className="w-5 h-5 text-primary rounded focus:ring-primary/20"
                />
                <label htmlFor="isGift" className="font-medium text-gray-900 flex items-center gap-2">
                  <ApperIcon name="Gift" className="w-5 h-5 text-primary" />
                  This is a gift
                </label>
              </div>

              {recipientInfo.isGift && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <Input
                    label="Recipient Name"
                    value={recipientInfo.recipientName}
                    onChange={(e) => setRecipientInfo({...recipientInfo, recipientName: e.target.value})}
                    placeholder="Who is receiving this gift?"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gift Message (Optional)
                    </label>
                    <textarea
                      value={recipientInfo.giftMessage}
                      onChange={(e) => setRecipientInfo({...recipientInfo, giftMessage: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 resize-none"
                      placeholder="Add a personal message to your gift..."
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-6">
              Payment Information
            </h3>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <ApperIcon name="Shield" className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-blue-900">Secure Payment</span>
              </div>
              <p className="text-blue-800 text-sm">
                Your payment information is encrypted and secure. We accept all major credit cards.
              </p>
            </div>

            <div className="space-y-6">
              <Input
                label="Cardholder Name"
                value={paymentInfo.cardholderName}
                onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
                icon="User"
                required
              />
              
              <Input
                label="Card Number"
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                icon="CreditCard"
                placeholder="1234 5678 9012 3456"
                required
              />
              
              <div className="grid grid-cols-2 gap-6">
                <Input
                  label="Expiry Date"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                  placeholder="MM/YY"
                  required
                />
                <Input
                  label="CVV"
                  value={paymentInfo.cvv}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-display font-semibold text-gray-900">
              Review Your Order
            </h3>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-rose-600 text-white p-6">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                  <ApperIcon name="Package" className="w-6 h-6" />
                  Order Summary
                </h4>
              </div>
              
              <div className="p-6 space-y-4">
                {cartItems.map((item, index) => (
                  <div key={`${item.Id}-${index}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">{item.name}</h5>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      {item.customization?.color && (
                        <p className="text-gray-600 text-sm">Color: {item.customization.color}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getCartCount()} items)</span>
                    <span>${getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span className="gradient-text">${getCartTotal()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-green-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ApperIcon name="Truck" className="w-5 h-5 text-secondary" />
                Delivery Details
              </h4>
              <div className="space-y-2 text-gray-700">
                <p><strong>Address:</strong> {deliveryInfo.address}, {deliveryInfo.city}, {deliveryInfo.state} {deliveryInfo.zipCode}</p>
                <p><strong>Date:</strong> {new Date(deliveryInfo.deliveryDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {deliveryTimes.find(t => t.value === deliveryInfo.deliveryTime)?.label}</p>
                {recipientInfo.isGift && (
                  <p><strong>Recipient:</strong> {recipientInfo.recipientName}</p>
                )}
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-display font-bold gradient-text mb-4">
          Checkout
        </h1>
        <p className="text-xl text-gray-600">
          Complete your order in just a few simple steps
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Progress Steps */}
        <div className="lg:col-span-2">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor: currentStep >= step.id ? '#E91E63' : '#E5E7EB',
                    color: currentStep >= step.id ? '#FFFFFF' : '#6B7280'
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-semibold"
                >
                  {currentStep > step.id ? (
                    <ApperIcon name="Check" className="w-6 h-6" />
                  ) : (
                    <ApperIcon name={step.icon} className="w-6 h-6" />
                  )}
                </motion.div>
                <span className={`ml-3 font-medium ${currentStep >= step.id ? 'text-primary' : 'text-gray-500'}`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                icon="ArrowLeft"
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  icon="ArrowRight"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  loading={loading}
                  icon="Check"
                  size="lg"
                >
                  Place Order
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <ApperIcon name="ShoppingBag" className="w-6 h-6 text-primary" />
                Your Order
              </h3>

              <div className="space-y-4 mb-6">
                {cartItems.slice(0, 3).map((item, index) => (
                  <div key={`${item.Id}-${index}`} className="flex items-center gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                {cartItems.length > 3 && (
                  <p className="text-sm text-gray-600 text-center">
                    +{cartItems.length - 3} more items
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-secondary font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="gradient-text">${getCartTotal()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="flex items-center gap-2 text-secondary font-medium mb-2">
                  <ApperIcon name="Shield" className="w-5 h-5" />
                  <span>Satisfaction Guaranteed</span>
                </div>
                <p className="text-sm text-gray-600">
                  Fresh flower guarantee or your money back
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout