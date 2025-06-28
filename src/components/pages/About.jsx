import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const About = () => {
  const values = [
    {
      icon: 'Heart',
      title: 'Passion for Beauty',
      description: 'Every arrangement is crafted with love and attention to detail, ensuring each bouquet tells a unique story.'
    },
    {
      icon: 'Leaf',
      title: 'Sustainability',
      description: 'We partner with local growers and use eco-friendly practices to minimize our environmental impact.'
    },
    {
      icon: 'Users',
      title: 'Community First',
      description: 'Supporting local farmers and giving back to our community is at the heart of everything we do.'
    },
    {
      icon: 'Award',
      title: 'Quality Promise',
      description: 'We guarantee the freshest flowers and stand behind every arrangement with our quality promise.'
    }
  ]

  const team = [
    {
      name: 'Emily Rodriguez',
      role: 'Master Florist & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300',
      description: 'With 15+ years in floral design, Emily brings artistic vision and technical expertise to every arrangement.',
      specialties: ['Wedding Design', 'Luxury Arrangements', 'Seasonal Collections']
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300',
      description: 'Michael ensures every order is perfectly executed and delivered with care and precision.',
      specialties: ['Logistics', 'Quality Control', 'Customer Service']
    },
    {
      name: 'Sarah Johnson',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300',
      description: 'Sarah develops our seasonal collections and brings fresh creative concepts to life.',
      specialties: ['Color Theory', 'Seasonal Design', 'Corporate Events']
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '50+', label: 'Local Partnerships' },
    { number: '15', label: 'Years Experience' },
    { number: '99%', label: 'Satisfaction Rate' }
  ]

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-white" />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-50"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-br from-primary to-rose-600 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <ApperIcon name="Flower2" className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Founded in 2009, Bloom Haven began as a small neighborhood flower shop with a 
              big dream: to bring the beauty and joy of fresh flowers to every doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900">
              From Garden to Doorstep
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                What started as Emily's passion project in a small storefront has grown into 
                a beloved local institution. Our journey began with a simple belief: everyone 
                deserves to experience the joy that fresh flowers bring.
              </p>
              <p>
                Over the years, we've built strong relationships with local growers, expanded 
                our team of talented florists, and embraced technology to serve our customers 
                better. But our core mission remains unchanged – creating beautiful, meaningful 
                arrangements that celebrate life's special moments.
              </p>
              <p>
                Today, we're proud to be the premier flower delivery service in our community, 
                known for our exceptional quality, creative designs, and personalized service. 
                Every arrangement tells a story, and we're honored to be part of yours.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300"
                alt="Flower arrangement"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl overflow-hidden mt-8"
            >
              <img
                src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=300&h=300"
                alt="Florist at work"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl overflow-hidden -mt-8"
            >
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300"
                alt="Fresh flowers"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300"
                alt="Seasonal bouquet"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold gradient-text mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do, from selecting the finest flowers 
              to delivering exceptional customer experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <ApperIcon name={value.icon} className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary to-rose-600 rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-display font-bold mb-12">
            Blooming Together
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold gradient-text mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our passionate team of florists and specialists work together to create 
            exceptional experiences for every customer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-primary/20"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-primary font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 leading-relaxed mb-6">
                {member.description}
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Specialties:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 8 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="absolute w-8 h-8 bg-secondary rounded-full"
                style={{
                  left: `${(i * 8.33) % 100}%`,
                  top: `${(i * 10) % 100}%`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 bg-gradient-to-br from-secondary to-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <ApperIcon name="MapPin" className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Visit Our Studio
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience our flowers in person! Visit our beautiful studio to see our latest 
              arrangements, meet our team, and get personalized recommendations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <ApperIcon name="MapPin" className="w-5 h-5 text-secondary" />
                  Address
                </h3>
                <p className="text-gray-600">
                  123 Flower Street<br />
                  Garden City, GC 12345
                </p>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <ApperIcon name="Clock" className="w-5 h-5 text-secondary" />
                  Hours
                </h3>
                <p className="text-gray-600">
                  Mon-Fri: 9am-7pm<br />
                  Sat-Sun: 10am-6pm
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-secondary to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ApperIcon name="Navigation" className="w-5 h-5" />
                Get Directions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ApperIcon name="Phone" className="w-5 h-5" />
                Call (555) 123-BLOOM
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default About