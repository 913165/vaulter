'use client'
import { motion } from 'framer-motion'
import { Shield, Key, Clock, Users } from 'lucide-react'

export default function AboutPage() {
  const features = [
    { icon: <Shield className="w-6 h-6" />, text: "Secure storage of sensitive data" },
    { icon: <Key className="w-6 h-6" />, text: "Easy-to-use interface" },
    { icon: <Users className="w-6 h-6" />, text: "Role-based access control" },
    { icon: <Clock className="w-6 h-6" />, text: "Audit logging" },
  ]

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-8"
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
      >
        Welcome to Vaulter
      </motion.h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12"
        >
          Vaulter is a secure secret management solution that helps you store and manage sensitive information 
          like API keys, passwords, and other credentials.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * (index + 3) }}
                className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mr-4 text-purple-600 dark:text-purple-400">
                  {feature.icon}
                </div>
                <span className="text-gray-700 dark:text-gray-200">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Security</h2>
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
            <p className="text-gray-700 dark:text-gray-200">
              All data is encrypted at rest and in transit. We use industry standard encryption protocols 
              to ensure your secrets remain secure.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}