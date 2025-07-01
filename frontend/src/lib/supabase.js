import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helpers
export const db = {
  // Users
  getUser: async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  getUserByAuthId: async (authUserId) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', authUserId)
      .single()
    return { data, error }
  },

  createUser: async (userData) => {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()
    return { data, error }
  },

  updateUser: async (userId, updates) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  // Status Checks
  createStatusCheck: async (statusData) => {
    const { data, error } = await supabase
      .from('status_checks')
      .insert([statusData])
      .select()
      .single()
    return { data, error }
  },

  getStatusChecks: async (userId) => {
    const { data, error } = await supabase
      .from('status_checks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  // Blood Donations
  createBloodDonation: async (donationData) => {
    const { data, error } = await supabase
      .from('blood_donations')
      .insert([donationData])
      .select()
      .single()
    return { data, error }
  },

  getBloodDonations: async (userId) => {
    const { data, error } = await supabase
      .from('blood_donations')
      .select('*')
      .eq('user_id', userId)
      .order('donation_date', { ascending: false })
    return { data, error }
  },

  // Missions
  getMissions: async (filters = {}) => {
    let query = supabase
      .from('missions')
      .select('*')
      .eq('is_active', true)

    if (filters.category) {
      query = query.eq('category', filters.category)
    }
    if (filters.difficulty) {
      query = query.eq('difficulty', filters.difficulty)
    }

    query = query.order('priority', { ascending: false })
      .order('created_at', { ascending: false })

    const { data, error } = await query
    return { data, error }
  },

  getUserMissions: async (userId) => {
    const { data, error } = await supabase
      .from('user_missions')
      .select(`
        *,
        missions (*)
      `)
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
    return { data, error }
  },

  assignMission: async (userId, missionId) => {
    const { data, error } = await supabase
      .from('user_missions')
      .insert([{
        user_id: userId,
        mission_id: missionId,
        status: 'assigned'
      }])
      .select()
      .single()
    return { data, error }
  },

  updateMissionStatus: async (userMissionId, status, tokensEarned = 0) => {
    const updates = { 
      status,
      ...(status === 'completed' && { 
        completed_at: new Date().toISOString(),
        tokens_earned: tokensEarned
      })
    }

    const { data, error } = await supabase
      .from('user_missions')
      .update(updates)
      .eq('id', userMissionId)
      .select()
      .single()
    return { data, error }
  },

  // Matches (Tinder of Doers)
  getMatches: async (userId) => {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        user1:users!matches_user1_id_fkey(*),
        user2:users!matches_user2_id_fkey(*)
      `)
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .eq('status', 'matched')
      .order('matched_at', { ascending: false })
    return { data, error }
  },

  createMatch: async (user1Id, user2Id, matchType, compatibilityScore) => {
    const { data, error } = await supabase
      .from('matches')
      .insert([{
        user1_id: user1Id,
        user2_id: user2Id,
        match_type: matchType,
        compatibility_score: compatibilityScore,
        status: 'matched',
        matched_at: new Date().toISOString()
      }])
      .select()
      .single()
    return { data, error }
  },

  // Community Posts
  getCommunityPosts: async (category = null, limit = 20) => {
    let query = supabase
      .from('community_posts')
      .select(`
        *,
        users (name, agent_id, avatar_url, level),
        post_likes (count)
      `)

    if (category) {
      query = query.eq('category', category)
    }

    query = query
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit)

    const { data, error } = await query
    return { data, error }
  },

  createCommunityPost: async (postData) => {
    const { data, error } = await supabase
      .from('community_posts')
      .insert([postData])
      .select(`
        *,
        users (name, agent_id, avatar_url, level)
      `)
      .single()
    return { data, error }
  },

  // Marketplace
  getMarketplaceItems: async (filters = {}) => {
    let query = supabase
      .from('marketplace_items')
      .select(`
        *,
        seller:users (name, agent_id, trust_score)
      `)
      .eq('is_available', true)

    if (filters.category) {
      query = query.eq('category', filters.category)
    }
    if (filters.maxPrice) {
      query = query.lte('price_chaos_points', filters.maxPrice)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error } = await query
    return { data, error }
  },

  createMarketplaceItem: async (itemData) => {
    const { data, error } = await supabase
      .from('marketplace_items')
      .insert([itemData])
      .select()
      .single()
    return { data, error }
  },

  // Live Streams
  getLiveStreams: async () => {
    const { data, error } = await supabase
      .from('live_streams')
      .select(`
        *,
        streamer:users (name, agent_id, avatar_url)
      `)
      .eq('is_live', true)
      .order('viewer_count', { ascending: false })
    return { data, error }
  },

  // Token Transactions
  createTokenTransaction: async (transactionData) => {
    const { data, error } = await supabase
      .from('user_tokens')
      .insert([transactionData])
      .select()
      .single()
    return { data, error }
  },

  getUserTokenHistory: async (userId, limit = 50) => {
    const { data, error } = await supabase
      .from('user_tokens')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return { data, error }
  },

  // Crisis Data
  getCrisisData: async () => {
    const { data, error } = await supabase
      .from('crisis_data')
      .select('*')
      .order('updated_at', { ascending: false })
    return { data, error }
  },

  updateCrisisMetric: async (metricName, value) => {
    const { data, error } = await supabase
      .from('crisis_data')
      .upsert([{
        metric_name: metricName,
        metric_value: value,
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    return { data, error }
  }
}

// Real-time subscriptions
export const subscriptions = {
  subscribeToCrisisData: (callback) => {
    return supabase
      .channel('crisis_data_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'crisis_data' },
        callback
      )
      .subscribe()
  },

  subscribeToUserTokens: (userId, callback) => {
    return supabase
      .channel(`user_tokens_${userId}`)
      .on('postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'user_tokens',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  subscribeToCommunityPosts: (callback) => {
    return supabase
      .channel('community_posts_changes')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'community_posts' },
        callback
      )
      .subscribe()
  }
}

export default supabase