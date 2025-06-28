import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' }
    ],
    shop: [
      { name: 'All Flowers', href: '/shop' },
      { name: 'Collections', href: '/collections' },
      { name: 'Occasions', href: '/occasions' },
      { name: 'Gift Cards', href: '/gift-cards' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' },
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'Pinterest', icon: 'PinIcon', href: '#' }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Mail" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-display font-bold mb-4">
              Stay in Bloom
            </h3>
            <p className="text-gray-300 mb-8">
              Get fresh flower tips, seasonal arrangements, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button variant="primary" icon="Send">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ApperIcon name="Flower2" className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold">Bloom Haven</h2>
                  <p className="text-gray-400 text-sm">Fresh Flowers Delivered</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Bringing nature's beauty to your doorstep with the freshest flowers, 
                handcrafted arrangements, and personalized service that makes every 
                moment special.
              </p>

              <div className="flex items-center gap-2 text-gray-300">
                <ApperIcon name="MapPin" className="w-5 h-5 text-primary" />
                <span>123 Flower Street, Garden City, GC 12345</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <ApperIcon name="Phone" className="w-5 h-5 text-primary" />
                <span>(555) 123-BLOOM</span>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <ApperIcon name="Mail" className="w-5 h-5 text-primary" />
                <span>hello@bloomhaven.com</span>
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ApperIcon name="ChevronRight" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ApperIcon name="ChevronRight" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ApperIcon name="ChevronRight" className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <ApperIcon name={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2024 Bloom Haven. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer