// about.tsx
'use client'
import { motion } from 'framer-motion'
import { Shield, Key, Lock, Users, Mail, Github } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  const features = [
    { 
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Military-grade encryption for all your sensitive data"
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "API Integration",
      description: "Seamlessly integrate with your existing tools and workflows"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Access Control",
      description: "Granular permissions and role-based access management"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Secure Your Secrets
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Vaulter is the modern solution for managing sensitive information in your organization.
            Built with security-first principles and enterprise scalability in mind.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: