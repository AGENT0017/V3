import { useState, useEffect, createContext, useContext } from 'react'
import { auth, db } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { user: authUser } = await auth.getCurrentUser()
        if (authUser) {
          await loadUserProfile(authUser)
        }
      } catch (err) {
        console.error('Error getting initial session:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const loadUserProfile = async (authUser) => {
    try {
      setUser(authUser)
      
      // Try to get existing user profile
      const { data: existingProfile, error: fetchError } = await db.getUserByAuthId(authUser.id)
      
      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw fetchError
      }

      if (existingProfile) {
        setUserProfile(existingProfile)
      } else {
        // Create new user profile
        const newUserData = {
          auth_user_id: authUser.id,
          email: authUser.email,
          name: authUser.user_metadata?.name || 'Rebel Agent',
          chaos_points: 200, // Starting points
          agent17_tokens: 250, // Starting tokens
          trust_score: 50,
          level: 'Recruit',
          skills: ['Crisis Management'],
          bio: 'New agent ready to join the resistance'
        }

        const { data: newProfile, error: createError } = await db.createUser(newUserData)
        
        if (createError) {
          throw createError
        }

        setUserProfile(newProfile)
      }
    } catch (err) {
      console.error('Error loading user profile:', err)
      setError(err.message)
    }
  }

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await auth.signUp(email, password, userData)
      
      if (error) {
        throw error
      }

      return { data, error: null }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await auth.signIn(email, password)
      
      if (error) {
        throw error
      }

      return { data, error: null }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await auth.signOut()
      
      if (error) {
        throw error
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      if (!userProfile) return { error: 'No user profile found' }

      const { data, error } = await db.updateUser(userProfile.id, {
        ...updates,
        updated_at: new Date().toISOString()
      })

      if (error) {
        throw error
      }

      setUserProfile(data)
      return { data, error: null }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err }
    }
  }

  const addTokens = async (amount, tokenType = 'chaos_points', source = 'manual', description = '') => {
    try {
      if (!userProfile) return { error: 'No user profile found' }

      // Create token transaction
      const transactionData = {
        user_id: userProfile.id,
        transaction_type: 'earned',
        amount,
        token_type: tokenType,
        source,
        description
      }

      const { error: transactionError } = await db.createTokenTransaction(transactionData)
      
      if (transactionError) {
        throw transactionError
      }

      // Update user profile
      const updates = {}
      if (tokenType === 'chaos_points') {
        updates.chaos_points = userProfile.chaos_points + amount
      } else if (tokenType === 'agent17_tokens') {
        updates.agent17_tokens = userProfile.agent17_tokens + amount
      }

      const { data, error } = await updateProfile(updates)
      
      return { data, error }
    } catch (err) {
      setError(err.message)
      return { data: null, error: err }
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
    addTokens,
    isAuthenticated: !!user,
    isProfileComplete: !!userProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default useAuth