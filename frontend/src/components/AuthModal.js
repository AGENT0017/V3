import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Shield, Zap } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export const AuthModal = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState(initialMode) // 'signin' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeToTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const { signIn, signUp, error: authError } = useAuth()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setFormError('') // Clear errors when user types
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setFormError('Email and password are required')
      return false
    }

    if (mode === 'signup') {
      if (!formData.name) {
        setFormError('Name is required')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match')
        return false
      }
      if (formData.password.length < 6) {
        setFormError('Password must be at least 6 characters')
        return false
      }
      if (!formData.agreeToTerms) {
        setFormError('You must agree to the terms and conditions')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setFormError('')

    try {
      if (mode === 'signin') {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          setFormError(error.message)
        } else {
          onClose()
        }
      } else {
        const userData = {
          name: formData.name
        }
        const { error } = await signUp(formData.email, formData.password, userData)
        if (error) {
          setFormError(error.message)
        } else {
          // Show success message or automatically sign in
          setFormError('')
          onClose()
        }
      }
    } catch (err) {
      setFormError(err.message || 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setFormError('')
    setFormData({
      email: formData.email, // Keep email when switching
      password: '',
      confirmPassword: '',
      name: '',
      agreeToTerms: false
    })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md mx-4 bg-gray-900 border-2 border-red-600 rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-900 to-black p-6 border-b border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-yellow-400">
                  {mode === 'signin' ? 'Agent Login' : 'Join the Resistance'}
                </h2>
                <p className="text-gray-300 text-sm mt-1">
                  {mode === 'signin' 
                    ? 'Access your THRIVECHAOS account' 
                    : 'Become an Agent in the fight for survival'
                  }
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field (signup only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Agent Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your agent name"
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                      required={mode === 'signup'}
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password field (signup only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                      required={mode === 'signup'}
                    />
                  </div>
                </div>
              )}

              {/* Terms checkbox (signup only) */}
              {mode === 'signup' && (
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500"
                    required
                  />
                  <label className="text-sm text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="text-red-400 hover:text-red-300">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-red-400 hover:text-red-300">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              )}

              {/* Error message */}
              {(formError || authError) && (
                <div className="p-3 bg-red-900/50 border border-red-600 rounded-lg">
                  <p className="text-red-300 text-sm">{formError || authError}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>
                      {mode === 'signin' ? 'Access System' : 'Join Resistance'}
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Mode switch */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                {mode === 'signin' 
                  ? "Don't have an account? " 
                  : "Already have an account? "
                }
                <button
                  onClick={switchMode}
                  className="text-red-400 hover:text-red-300 font-medium"
                >
                  {mode === 'signin' ? 'Join the Resistance' : 'Sign In'}
                </button>
              </p>
            </div>

            {/* Benefits (signup only) */}
            {mode === 'signup' && (
              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
                <h4 className="text-yellow-400 font-bold text-sm mb-2">Agent Benefits:</h4>
                <ul className="text-gray-300 text-xs space-y-1">
                  <li>• 200 CHAOS Points + 250 Agent17 Tokens to start</li>
                  <li>• Access to exclusive survival content</li>
                  <li>• Join global resistance network</li>
                  <li>• Earn tokens through missions and donations</li>
                  <li>• Connect with like-minded agents worldwide</li>
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default AuthModal