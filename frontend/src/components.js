import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Skull,
  Heart,
  Play,
  Star,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Search,
  Bell,
  Menu,
  Shield,
  Zap,
  MapPin,
  Users,
  User,
  Radio,
  Globe,
  Headphones,
  Settings,
  Plus,
  Minus,
  Calendar,
  Award,
  Target,
  Check,
  Shield as ShieldIcon,
  Zap as ZapIcon,
  Users as UsersIcon,
  Radio as RadioIcon,
  MapPin as MapPinIcon,
  Globe as GlobeIcon,
  Share2,
  Wrench,
  Flame,
  Coins,
  Crown,
  CreditCard,
  MessageSquare,
  Gamepad2,
  Dumbbell,
  Book,
  Compass,
  Smartphone,
  Map,
  Trophy,
  AlertTriangle
} from 'lucide-react';

// Enhanced User Classification System
const userTypes = {
  SURVIVALIST: {
    name: "Survivalist",
    icon: "🛡️",
    color: "text-green-400",
    bgColor: "bg-green-900",
    description: "Masters of survival skills and off-grid living",
    specialties: ["Water purification", "Food production", "Shelter building"],
    marketplaceAccess: ["survival-gear", "bio-seeds", "tools"]
  },
  TECH_REBEL: {
    name: "Tech Rebel", 
    icon: "⚡",
    color: "text-blue-400",
    bgColor: "bg-blue-900",
    description: "Digital freedom fighters and privacy experts",
    specialties: ["Encryption", "Network security", "Alternative tech"],
    marketplaceAccess: ["tech-gear", "crypto", "digital-services"]
  },
  COMMUNITY_BUILDER: {
    name: "Community Builder",
    icon: "👥",
    color: "text-purple-400", 
    bgColor: "bg-purple-900",
    description: "Leaders who organize and unite communities",
    specialties: ["Leadership", "Resource coordination", "Conflict resolution"],
    marketplaceAccess: ["community-resources", "event-planning", "leadership-tools"]
  },
  CONTENT_CREATOR: {
    name: "Content Creator",
    icon: "🎨",
    color: "text-pink-400",
    bgColor: "bg-pink-900", 
    description: "Artists, streamers, and cultural rebels",
    specialties: ["Content creation", "Entertainment", "Art & culture"],
    marketplaceAccess: ["creative-tools", "streaming-gear", "art-supplies"]
  },
  TRADER: {
    name: "Chaos Trader",
    icon: "💰",
    color: "text-yellow-400",
    bgColor: "bg-yellow-900",
    description: "Masters of alternative economies and bartering",
    specialties: ["Trading", "Economics", "Resource management"],
    marketplaceAccess: ["all-categories", "crypto-trading", "rare-items"]
  },
  MEDIC: {
    name: "Field Medic",
    icon: "🏥", 
    color: "text-red-400",
    bgColor: "bg-red-900",
    description: "Medical experts for crisis situations",
    specialties: ["Emergency medicine", "Herbal remedies", "Mental health"],
    marketplaceAccess: ["medical-supplies", "herbs", "healing-tools"]
  }
};

// Mock User Profiles
const mockUserProfiles = [
  {
    id: "user_001",
    username: "DesertWolf47",
    type: "SURVIVALIST",
    level: 28,
    chaosPoints: 15420,
    memecoin: {
      name: "WOLF",
      symbol: "WOLF",
      value: 0.00047,
      supply: 100000,
      holders: 234
    },
    profile: {
      displayName: "Desert Wolf",
      bio: "Off-grid survival expert | 15 years in wilderness | Teaching self-sufficiency",
      location: "Southwest Desert, USA",
      introVideo: "dQw4w9WgXcQ",
      avatar: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=200",
      socialLinks: {
        twitter: "@desertwolf47",
        youtube: "/c/desertwolf",
        telegram: "@wolf_survival"
      },
      skills: ["Water procurement", "Desert navigation", "Solar power systems"],
      reputation: 4.9,
      totalTrades: 147,
      verified: true
    },
    marketplace: {
      activeListings: 12,
      totalSales: 89,
      revenue: 8940,
      topCategories: ["bio-seeds", "survival-gear", "water-purification"]
    }
  },
  {
    id: "user_002", 
    username: "CryptoPhoenix",
    type: "TECH_REBEL",
    level: 31,
    chaosPoints: 22100,
    memecoin: {
      name: "PHOENIX",
      symbol: "PHX",
      value: 0.00089,
      supply: 50000,
      holders: 456
    },
    profile: {
      displayName: "Crypto Phoenix",
      bio: "Privacy advocate | Mesh network builder | Decentralization evangelist",
      location: "Mobile/Anonymous",
      introVideo: "dQw4w9WgXcQ",
      avatar: "https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=200",
      socialLinks: {
        twitter: "@cryptophoenix",
        github: "/cryptophoenix",
        signal: "+encrypted"
      },
      skills: ["Mesh networking", "Cryptocurrency", "Digital anonymity"],
      reputation: 4.8,
      totalTrades: 203,
      verified: true
    },
    marketplace: {
      activeListings: 8,
      totalSales: 156,
      revenue: 12340,
      topCategories: ["tech-gear", "crypto", "digital-services"]
    }
  }
];

// Marketplace Categories
const marketplaceCategories = {
  "bio-seeds": {
    name: "Bio Seeds & Plants",
    icon: "🌱",
    description: "Heirloom seeds, sprouting supplies, medicinal plants"
  },
  "survival-gear": {
    name: "Survival Gear", 
    icon: "🎒",
    description: "Tools, equipment, and gear for off-grid living"
  },
  "tech-gear": {
    name: "Tech & Electronics",
    icon: "📱", 
    description: "Privacy tools, communication devices, alternative tech"
  },
  "furniture": {
    name: "Furniture & Supplies",
    icon: "🪑",
    description: "Handmade furniture, household items, decor"
  },
  "medical-supplies": {
    name: "Medical Supplies",
    icon: "🏥",
    description: "First aid, herbal medicines, health tools"
  },
  "crypto": {
    name: "Crypto & Memecoins",
    icon: "💰",
    description: "User memecoins, trading, digital assets"
  }
};

const mockMarketplaceItems = [
  {
    id: "item_001",
    title: "Heirloom Tomato Seeds (50 varieties)",
    description: "Rare collection of heirloom tomato seeds. Resistant strains perfect for off-grid growing.",
    price: 45,
    currency: "CHAOS",
    seller: "DesertWolf47", 
    sellerType: "SURVIVALIST",
    category: "bio-seeds",
    images: ["https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=400"],
    stock: 8,
    rating: 4.9,
    reviews: 23,
    tags: ["organic", "heirloom", "drought-resistant"],
    location: "Southwest USA",
    shipping: "P2P meetup preferred"
  },
  {
    id: "item_002", 
    title: "Encrypted Mesh Radio Kit",
    description: "Long-range encrypted communication device. Works without internet infrastructure.",
    price: 120,
    currency: "CHAOS", 
    seller: "CryptoPhoenix",
    sellerType: "TECH_REBEL",
    category: "tech-gear",
    images: ["https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=400"],
    stock: 3,
    rating: 5.0,
    reviews: 12,
    tags: ["encrypted", "mesh", "off-grid"],
    location: "Mobile/Ship anywhere",
    shipping: "Anonymous shipping available"
  }
];

// Apocalypse Content
const apocalypseContent = {
  survival: [
    {
      id: 1001,
      title: "Urban Survival: When Cities Fall",
      description: "Essential skills for surviving when infrastructure collapses.",
      poster: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=300",
      cost: 0,
      type: "survival",
      urgency: "critical",
      youtube_id: "dQw4w9WgXcQ",
      skills: ["Water purification", "Food scavenging", "Shelter building"]
    },
    {
      id: 1002,
      title: "Off-Grid Power Systems",
      description: "Generate electricity when the grid goes down.",
      poster: "https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=300",
      cost: 25,
      type: "survival",
      urgency: "high",
      youtube_id: "dQw4w9WgXcQ",
      skills: ["Solar power", "Wind generation", "Battery storage"]
    }
  ],
  resistance: [
    {
      id: 2001,
      title: "Digital Anonymity Masterclass",
      description: "Stay invisible in a surveillance state.",
      poster: "https://images.pexels.com/photos/7533332/pexels-photo-7533332.jpeg?w=300",
      cost: 50,
      type: "resistance",
      urgency: "high",
      youtube_id: "dQw4w9WgXcQ",
      skills: ["VPN setup", "Encrypted messaging", "Anonymous browsing"]
    }
  ],
  entertainment: [
    {
      id: 3001,
      title: "Chaos Cinema: Mad Max Fury Road",
      description: "Classic apocalypse entertainment for morale.",
      poster: "https://images.unsplash.com/photo-1717548379141-3060abccd58d?w=300",
      cost: 20,
      type: "movie",
      genre: "apocalypse",
      youtube_id: "dQw4w9WgXcQ",
      mood: "adrenaline"
    }
  ]
};

const mockLiveStreams = [
  {
    id: 501,
    title: "Crisis Update: Real-Time Intel",
    description: "Live updates on system stability and resistance activities",
    thumbnail: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=300",
    streamer: "RebelLeader47",
    viewers: 2847,
    category: "intel",
    isLive: true
  }
];

const apocalypseTasks = [
  {
    id: 101,
    title: "Share Survival Knowledge",
    description: "Upload or share a survival tip with the community",
    reward: 100,
    icon: Share2,
    completed: false,
    type: "community",
    urgency: "high"
  },
  {
    id: 102,
    title: "Master a Crisis Skill",
    description: "Complete any survival course and practice the skill",
    reward: 150,
    icon: Wrench,
    completed: false,
    type: "survival",
    urgency: "critical"
  }
];

// Header Component
// Revolutionary Landing Page for THRIVECHAOS
export const ApocalypseHero = ({ userPoints, crisisMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReward, setShowReward] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const glitchTimer = setInterval(() => setGlitchActive(prev => !prev), 3000);
    
    // Dopamine micro-dose - show reward animation on load
    setTimeout(() => setShowReward(true), 2000);
    setTimeout(() => setShowReward(false), 4000);
    
    return () => {
      clearInterval(timer);
      clearInterval(glitchTimer);
    };
  }, []);

  const crisisEscalationDays = Math.floor((new Date('2025-12-31') - currentTime) / (1000 * 60 * 60 * 24));

  const handleVideoPlay = () => {
    setIsPlaying(true);
    // Micro dopamine hit for engagement
    setShowReward(true);
    setTimeout(() => setShowReward(false), 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* PREMIUM GRADIENT FOUNDATION */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-black to-emerald-900 pointer-events-none"></div>
      
      {/* BILLION-DOLLAR GLASSMORPHISM LAYER */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5 backdrop-blur-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* PREMIUM CAMOUFLAGE BACKGROUND - REFINED */}
      <div className="fixed inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(26, 77, 26, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(45, 74, 45, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(15, 47, 15, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 60% 80%, rgba(26, 51, 26, 0.3) 0%, transparent 50%)
          `,
          backgroundSize: '400px 400px, 600px 600px, 300px 300px, 500px 500px'
        }}></div>
      </div>

      {/* ENTERPRISE-GRADE NEURAL NETWORK PATTERN */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1920 1080">
          <defs>
            <pattern id="neural-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="rgba(34, 197, 94, 0.3)"/>
              <line x1="50" y1="50" x2="100" y2="50" stroke="rgba(34, 197, 94, 0.1)" strokeWidth="0.5"/>
              <line x1="50" y1="50" x2="50" y2="100" stroke="rgba(34, 197, 94, 0.1)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="premium-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.2)"/>
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)"/>
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.2)"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)"/>
          <rect width="100%" height="100%" fill="url(#premium-glow)"/>
        </svg>
      </div>

      {/* PREMIUM FLOATING ORBS */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${
                ['rgba(34, 197, 94, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(168, 85, 247, 0.3)', 'rgba(245, 158, 11, 0.3)'][i % 4]
              } 0%, transparent 70%)`,
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
              filter: 'blur(40px)'
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
      </div>

      {/* BILLION-DOLLAR TACTICAL CORNERS */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[
          { pos: 'top-6 left-6', corners: 'border-l-2 border-t-2', label: 'ENTERPRISE', color: 'emerald' },
          { pos: 'top-6 right-6', corners: 'border-r-2 border-t-2', label: 'SECURE', color: 'blue' },
          { pos: 'bottom-6 left-6', corners: 'border-l-2 border-b-2', label: 'GLOBAL', color: 'purple' },
          { pos: 'bottom-6 right-6', corners: 'border-r-2 border-b-2', label: 'PREMIUM', color: 'amber' }
        ].map((corner, i) => (
          <div key={i} className={`absolute ${corner.pos}`}>
            <motion.div 
              className={`w-16 h-16 ${corner.corners} border-${corner.color}-400/60 bg-black/20 backdrop-blur-sm rounded-sm`}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              <div className="absolute inset-1 border border-white/10 rounded-sm"></div>
            </motion.div>
            <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-${corner.color}-400/80 font-mono bg-black/60 backdrop-blur-sm px-2 py-1 rounded`}>
              {corner.label}
            </div>
          </div>
        ))}
      </div>

      {/* MATRIX-STYLE ADAPTIVE STATUS - MOBILE OPTIMIZED */}
      <motion.div 
        className="fixed z-20 transition-all duration-500"
        style={{
          top: typeof window !== 'undefined' && window.innerWidth < 768 ? '20px' : '50%',
          left: typeof window !== 'undefined' && window.innerWidth < 768 ? '8px' : '24px',
          transform: typeof window !== 'undefined' && window.innerWidth < 768 ? 'none' : 'translateY(-50%)',
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        whileHover={{ 
          scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 1.02 : 1.05, 
          x: typeof window !== 'undefined' && window.innerWidth < 768 ? -5 : -10 
        }}
      >
        <motion.div 
          className="bg-black/70 backdrop-blur-xl border border-emerald-400/60 rounded-xl shadow-2xl transition-all duration-300"
          style={{
            padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '8px' : '16px',
            fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '10px' : '12px'
          }}
          animate={{
            borderColor: ['rgba(34, 197, 94, 0.6)', 'rgba(34, 197, 94, 0.8)', 'rgba(34, 197, 94, 0.6)'],
            boxShadow: [
              '0 0 15px rgba(34, 197, 94, 0.3)',
              '0 0 25px rgba(34, 197, 94, 0.5)',
              '0 0 15px rgba(34, 197, 94, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="bg-gradient-to-r from-emerald-400/30 to-blue-400/30 rounded-lg p-2 mb-2">
            <div className="text-emerald-400 font-bold flex items-center font-mono" style={{fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '9px' : '12px'}}>
              <motion.div 
                className="bg-emerald-400 rounded-full mr-1"
                style={{
                  width: typeof window !== 'undefined' && window.innerWidth < 768 ? '6px' : '8px',
                  height: typeof window !== 'undefined' && window.innerWidth < 768 ? '6px' : '8px'
                }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {typeof window !== 'undefined' && window.innerWidth < 768 ? 'STATUS' : 'MATRIX STATUS'}
            </div>
            <div className="space-y-1 font-mono" style={{fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '8px' : '10px'}}>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">{typeof window !== 'undefined' && window.innerWidth < 768 ? 'HEROES:' : 'HEROES_NET:'}</span>
                <div className="flex items-center">
                  <div className="bg-emerald-400/30 rounded-full mr-1 overflow-hidden" style={{
                    width: typeof window !== 'undefined' && window.innerWidth < 768 ? '24px' : '48px',
                    height: '4px'
                  }}>
                    <motion.div 
                      className="h-full bg-emerald-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '83%' }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  </div>
                  <span className="text-emerald-400 font-bold">97%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">{typeof window !== 'undefined' && window.innerWidth < 768 ? 'MATRIX:' : 'MATRIX_INTEG:'}</span>
                <div className="flex items-center">
                  <div className="bg-red-400/30 rounded-full mr-1 overflow-hidden" style={{
                    width: typeof window !== 'undefined' && window.innerWidth < 768 ? '24px' : '48px',
                    height: '4px'
                  }}>
                    <motion.div 
                      className="h-full bg-red-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '33%' }}
                      transition={{ duration: 2, delay: 1.2 }}
                    />
                  </div>
                  <span className="text-red-400 font-bold">33%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">{typeof window !== 'undefined' && window.innerWidth < 768 ? 'LIBRT:' : 'LIBERATION:'}</span>
                <div className="flex items-center">
                  <div className="bg-blue-400/30 rounded-full mr-1 overflow-hidden" style={{
                    width: typeof window !== 'undefined' && window.innerWidth < 768 ? '24px' : '48px',
                    height: '4px'
                  }}>
                    <motion.div 
                      className="h-full bg-blue-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '78%' }}
                      transition={{ duration: 2, delay: 1.4 }}
                    />
                  </div>
                  <span className="text-blue-400 font-bold">78%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-gray-400 text-center font-mono" style={{fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '7px' : '10px'}}>
            <motion.span 
              className="text-emerald-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ●
            </motion.span> {typeof window !== 'undefined' && window.innerWidth < 768 ? 'MATRIX' : 'ENTERPRISE.MATRIX'}
          </div>
        </motion.div>
      </motion.div>

      {/* MATRIX-STYLE ADAPTIVE RADAR - MOBILE OPTIMIZED */}
      <motion.div 
        className="fixed z-20 transition-all duration-500"
        style={{
          top: typeof window !== 'undefined' && window.innerWidth < 768 ? '20px' : '50%',
          right: typeof window !== 'undefined' && window.innerWidth < 768 ? '8px' : '24px',
          transform: typeof window !== 'undefined' && window.innerWidth < 768 ? 'none' : 'translateY(-50%)',
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        whileHover={{ 
          scale: typeof window !== 'undefined' && window.innerWidth < 768 ? 1.02 : 1.05, 
          x: typeof window !== 'undefined' && window.innerWidth < 768 ? 5 : 10 
        }}
      >
        <motion.div 
          className="bg-black/70 backdrop-blur-xl border border-blue-400/60 rounded-xl shadow-2xl"
          style={{
            padding: typeof window !== 'undefined' && window.innerWidth < 768 ? '8px' : '16px'
          }}
          animate={{
            borderColor: ['rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.8)', 'rgba(59, 130, 246, 0.6)'],
            boxShadow: [
              '0 0 15px rgba(59, 130, 246, 0.3)',
              '0 0 25px rgba(59, 130, 246, 0.5)',
              '0 0 15px rgba(59, 130, 246, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <div className="relative mx-auto mb-2" style={{
            width: typeof window !== 'undefined' && window.innerWidth < 768 ? '48px' : '96px',
            height: typeof window !== 'undefined' && window.innerWidth < 768 ? '48px' : '96px'
          }}>
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-blue-400/60"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
                  'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="absolute inset-1 rounded-full border border-blue-400/40"></div>
            <div className="absolute inset-2 rounded-full border border-blue-400/20"></div>
            <motion.div 
              className="absolute rounded-full bg-blue-400/30"
              style={{
                inset: typeof window !== 'undefined' && window.innerWidth < 768 ? '12px' : '24px'
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: typeof window !== 'undefined' && window.innerWidth < 768 ? '20px' : '40px',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(59, 130, 246, 1) 0%, rgba(59, 130, 246, 0.5) 50%, transparent 100%)'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            {/* Mobile-Optimized Radar Blips */}
            <motion.div 
              className="absolute bg-emerald-400 rounded-full"
              style={{
                top: typeof window !== 'undefined' && window.innerWidth < 768 ? '4px' : '8px',
                right: typeof window !== 'undefined' && window.innerWidth < 768 ? '6px' : '12px',
                width: typeof window !== 'undefined' && window.innerWidth < 768 ? '3px' : '4px',
                height: typeof window !== 'undefined' && window.innerWidth < 768 ? '3px' : '4px'
              }}
              animate={{ 
                scale: [1, 2, 1], 
                opacity: [1, 0, 1],
                boxShadow: ['0 0 3px rgba(34, 197, 94, 0.5)', '0 0 8px rgba(34, 197, 94, 1)', '0 0 3px rgba(34, 197, 94, 0.5)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bg-yellow-400 rounded-full"
              style={{
                bottom: typeof window !== 'undefined' && window.innerWidth < 768 ? '8px' : '16px',
                left: typeof window !== 'undefined' && window.innerWidth < 768 ? '8px' : '16px',
                width: typeof window !== 'undefined' && window.innerWidth < 768 ? '3px' : '4px',
                height: typeof window !== 'undefined' && window.innerWidth < 768 ? '3px' : '4px'
              }}
              animate={{ 
                scale: [1, 2, 1], 
                opacity: [1, 0, 1],
                boxShadow: ['0 0 3px rgba(245, 158, 11, 0.5)', '0 0 8px rgba(245, 158, 11, 1)', '0 0 3px rgba(245, 158, 11, 0.5)']
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
            />
            <motion.div 
              className="absolute bg-red-400 rounded-full"
              style={{
                top: typeof window !== 'undefined' && window.innerWidth < 768 ? '12px' : '24px',
                left: typeof window !== 'undefined' && window.innerWidth < 768 ? '4px' : '8px',
                width: typeof window !== 'undefined' && window.innerWidth < 768 ? '3px' : '4px',
                height: typeof window !== 'undefined' && window.innerWidth < 768 ? '3px' : '4px'
              }}
              animate={{ 
                scale: [1, 2, 1], 
                opacity: [1, 0, 1],
                boxShadow: ['0 0 3px rgba(239, 68, 68, 0.5)', '0 0 8px rgba(239, 68, 68, 1)', '0 0 3px rgba(239, 68, 68, 0.5)']
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
            />
          </div>
          <div className="text-center font-mono" style={{fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? '8px' : '10px'}}>
            <div className="text-blue-400 font-bold mb-1">{typeof window !== 'undefined' && window.innerWidth < 768 ? 'RADAR' : 'MATRIX.RADAR'}</div>
            <motion.div 
              className="text-gray-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {typeof window !== 'undefined' && window.innerWidth < 768 ? '12.8K' : '12.8K NODES_TRACKED'}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* PREMIUM DATA STREAM - BOTTOM CENTER */}
      <motion.div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="bg-black/30 backdrop-blur-2xl border border-white/20 rounded-2xl px-8 py-3 shadow-2xl">
          <div className="flex items-center space-x-8 font-mono text-sm">
            <motion.div 
              className="flex items-center text-emerald-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              <span>HEROES: 12,847 ACTIVE</span>
            </motion.div>
            <motion.div 
              className="flex items-center text-blue-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              <span>MATRIX BREACH: ONGOING</span>
            </motion.div>
            <motion.div 
              className="flex items-center text-purple-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
              <span>LIBERATION: ACTIVE</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* PREMIUM NEURAL PARTICLES */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b'][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px ${['#22c55e', '#3b82f6', '#a855f7', '#f59e0b'][i % 4]}`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Dopamine Reward Animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div className="text-6xl text-yellow-400 animate-bounce">⚡ +50 A17 ⚡</div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hero Section - MILITARY COMMAND CENTER */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/20 to-black"></div>
        
        {/* HOLOGRAPHIC OVERLAY EFFECTS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse"></div>
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          <div className="absolute top-2/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
        </div>

        {/* TACTICAL GRID BACKGROUND */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border border-green-400/20 relative">
                {i % 20 === 0 && (
                  <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-400 animate-ping"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* BILLION-DOLLAR PREMIUM LOGO WITH ENTERPRISE EFFECTS */}
          <motion.div
            className="mb-8 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* PREMIUM HOLOGRAPHIC FRAME */}
            <div className="absolute -top-12 -left-12 -right-12 -bottom-12 border-2 border-gradient-to-r from-emerald-400/30 via-blue-400/30 to-purple-400/30 rounded-xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 rounded-xl"></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-emerald-400 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-blue-400 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-purple-400 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-amber-400 rounded-br-lg"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none font-anton relative">
              {/* PREMIUM THRIVE with Enterprise Glow */}
              <motion.span 
                className="text-white relative inline-block"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.2)',
                    '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(34, 197, 94, 0.5), 0 0 90px rgba(34, 197, 94, 0.3)',
                    '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.2)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                #THRIVE
                {/* Premium Particle Effects */}
                <div className="absolute -top-2 -left-2 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              </motion.span>
              
              {/* PREMIUM CHAOS with Dynamic Effects */}
              <motion.span 
                className="text-red-500 relative ml-2 inline-block"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3), 0 0 60px rgba(239, 68, 68, 0.2)',
                    '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.5), 0 0 90px rgba(239, 68, 68, 0.3)',
                    '0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3), 0 0 60px rgba(239, 68, 68, 0.2)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                CHAOS
                {glitchActive && (
                  <motion.span 
                    className="absolute inset-0 text-yellow-400"
                    animate={{
                      opacity: [1, 0, 1],
                      x: [0, 2, -2, 0],
                      textShadow: '0 0 20px rgba(245, 158, 11, 1), 0 0 40px rgba(245, 158, 11, 0.8)'
                    }}
                    transition={{ duration: 0.3, repeat: 3 }}
                  >
                    CHAOS
                  </motion.span>
                )}
                {/* Premium Chaos Particles */}
                <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                <div className="absolute -top-1 left-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              </motion.span>
              
              {/* ENTERPRISE HOLOGRAPHIC SCAN LINES */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
              </motion.div>
            </h1>
            
            {/* PREMIUM MISSION STATEMENT */}
            <motion.div 
              className="text-xl md:text-2xl font-mono mb-6 font-bold relative"
              animate={{
                backgroundImage: [
                  'linear-gradient(45deg, #fbbf24, #34d399, #60a5fa)',
                  'linear-gradient(45deg, #34d399, #60a5fa, #a78bfa)',
                  'linear-gradient(45deg, #60a5fa, #a78bfa, #fbbf24)',
                  'linear-gradient(45deg, #a78bfa, #fbbf24, #34d399)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              BREAK THE MATRIX • BUILD HEROES • RESIST THE SYSTEM
              
              {/* PREMIUM DATA INDICATORS */}
              <div className="absolute -left-6 top-1/2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
              <div className="absolute -right-6 top-1/2 w-3 h-3 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/50" style={{animationDelay: '0.5s'}}></div>
            </motion.div>
            
            {/* ENTERPRISE COMMAND LINE */}
            <motion.div 
              className="text-lg md:text-xl font-mono text-emerald-400 mb-8 relative bg-black/20 backdrop-blur-sm border border-emerald-400/30 rounded-lg px-4 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span className="text-emerald-400/60">&gt;</span> TACTICAL COMMAND FOR HUMAN LIBERATION 
              <motion.span 
                className="text-white animate-pulse ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
              
              {/* Enterprise Status Indicators */}
              <div className="absolute -top-2 -right-2 flex space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              </div>
            </motion.div>
          </motion.div>

          {/* STRATEGIC MILITARY HERO COMMAND CENTER */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-6">
              HEROES WANTED
            </h2>
            
            {/* Interactive Video Container */}
            <div className="relative max-w-4xl mx-auto mb-8">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-yellow-400 shadow-2xl shadow-yellow-400/50 overflow-hidden group">
                {!isPlaying ? (
                  <motion.button
                    onClick={handleVideoPlay}
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900/80 to-black/80 hover:from-red-800/90 hover:to-black/90 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg shadow-yellow-400/50 animate-pulse">
                        <Play className="w-12 h-12 text-black ml-1" />
                      </div>
                      <h3 className="text-2xl font-bold text-yellow-400 mb-2">TACTICAL BRIEFING</h3>
                      <p className="text-gray-300">Deploy Hero Protocols • Engage Anti-Matrix Operations</p>
                      <div className="mt-4 text-yellow-400 font-bold animate-bounce">⚡ +25 A17 HERO TOKENS ⚡</div>
                    </div>
                  </motion.button>
                ) : (
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1"
                    className="w-full h-full"
                    allowFullScreen
                    title="THRIVECHAOS: HERO TACTICAL BRIEFING"
                    onLoad={() => setVideoLoaded(true)}
                  />
                )}
              </div>
              
              {/* Hero Stats */}
              {isPlaying && (
                <motion.div
                  className="mt-4 flex justify-center space-x-8 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="text-green-400">👁️ 847,392 heroes activated</span>
                  <span className="text-yellow-400">⚡ +25 A17 earned</span>
                  <span className="text-blue-400">🚀 Hero protocols initiated</span>
                </motion.div>
              )}
            </div>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              The matrix enslaves humanity. We build heroes who break free and liberate others.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <motion.button 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-16 py-6 rounded-lg text-2xl font-bold transition-all transform hover:scale-105 shadow-2xl shadow-red-600/50"
                whileHover={{ boxShadow: "0 0 40px rgba(255,0,0,0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                ⚔️ ENLIST AS HERO ⚔️
              </motion.button>
              <motion.button 
                className="border-3 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-16 py-6 rounded-lg text-2xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-yellow-400/30"
                whileHover={{ boxShadow: "0 0 40px rgba(255,215,0,0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                🗺️ VIEW BATTLE MAP 🗺️
              </motion.button>
            </div>
          </motion.div>

          {/* STRATEGIC MILITARY HERO ARSENAL */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: "🎯",
                title: "HERO TOKEN A17",
                desc: "Resistance currency for liberation ops",
                cta: "Earn Hero Tokens",
                reward: "+100 A17"
              },
              {
                icon: "🛡️",
                title: "MATRIX BREAKER CARDS",
                desc: "Physical ops network for heroes",
                cta: "Deploy Matrix Breaker",
                reward: "+250 A17"
              },
              {
                icon: "🗺️",
                title: "TACTICAL COMMAND MAP",
                desc: "Real-time hero coordination",
                cta: "Access Command Center",
                reward: "+75 A17"
              },
              {
                icon: "💪",
                title: "HERO TRAINING ARSENAL",
                desc: "Complete hero development program",
                cta: "Begin Hero Training",
                reward: "+150 A17"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black/80 border-2 border-yellow-600/50 p-6 rounded-lg backdrop-blur-sm hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-400/30 transition-all group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,215,0,0.4)" }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.desc}</p>
                <div className="text-green-400 text-sm font-bold mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {feature.reward}
                </div>
                <motion.button 
                  className="bg-gradient-to-r from-red-600/80 to-yellow-600/80 hover:from-red-600 hover:to-yellow-600 text-white px-4 py-2 rounded text-sm font-bold transition-all w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
        </motion.div>
      </section>

      {/* STRATEGIC MILITARY COMMAND BAR - "HEROES BREAK THE MATRIX" */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-yellow-600 py-4">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* HERO COMMAND SCROLLING TEXT */}
        <div className="relative z-10">
          <motion.div
            className="flex items-center whitespace-nowrap text-white font-bold text-lg"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
          >
            <span className="mr-16">⚔️ HEROES BREAK THE MATRIX ⚔️</span>
            <span className="mr-16">🛡️ 12,847 HEROES ACTIVE</span>
            <span className="mr-16">🌍 89 LIBERATION ZONES</span>
            <span className="mr-16">⚡ MATRIX INTEGRITY: 33% DEGRADED</span>
            <span className="mr-16">🔥 ANTI-MATRIX OPERATIONS RISING</span>
            <span className="mr-16">⚔️ HEROES BREAK THE MATRIX ⚔️</span>
            <span className="mr-16">💪 HERO NETWORK OPERATIONAL</span>
            <span className="mr-16">🎯 TACTICAL COMMAND ACTIVE</span>
            <span className="mr-16">🚨 LIBERATION PROTOCOLS READY</span>
            <span className="mr-16">⚡ A17 HERO NETWORK SECURE</span>
          </motion.div>
        </div>
        
        {/* MILITARY COMMAND STATUS */}
        <div className="relative z-10 mt-2">
          <div className="flex justify-center space-x-8 text-white text-sm font-bold">
            <span>⚔️ 12,847 HEROES ACTIVE</span>
            <span>🌍 89 LIBERATION ZONES</span>
            <span>⚡ MATRIX INTEGRITY: 33% DEGRADED</span>
          </div>
        </div>
      </section>

      {/* Enhanced Video Section */}
      <section className="py-20 bg-gradient-to-b from-black to-red-900/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 
            className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            #THRIVECHAOS: The Awakening
          </motion.h2>
          <motion.div 
            className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-yellow-600 shadow-2xl shadow-yellow-600/50"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=0&controls=1" 
              title="THRIVECHAOS: The Awakening" 
              allowFullScreen
            />
            <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded-full text-yellow-400 font-bold">
              ⚡ +50 A17 for watching
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Crowdfund Section */}
      <section className="py-20 bg-gradient-to-b from-red-900/20 to-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Crowdfund <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Storymaking</span>
          </motion.h2>
          <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Help create the resistance narrative. Fund real stories of survival, rebellion, and hope.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Survival Chronicles", funded: "87%", amount: "$43,500", reward: "+500 A17" },
              { title: "Resistance Stories", funded: "92%", amount: "$76,200", reward: "+750 A17" },
              { title: "Hope Archives", funded: "34%", amount: "$12,800", reward: "+300 A17" }
            ].map((project, index) => (
              <motion.div 
                key={index} 
                className="bg-black/60 border border-yellow-400/50 p-6 rounded-lg hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/30 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">{project.title}</h3>
                <div className="text-3xl font-bold text-white mb-2">{project.amount}</div>
                <div className="text-lg text-green-400 mb-4">Funded: {project.funded}</div>
                <div className="text-yellow-400 font-bold mb-4">{project.reward}</div>
                <motion.button 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black px-6 py-3 rounded font-bold transition-all w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ⚔️ Fund This Story
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA */}
      <section className="py-20 bg-gradient-to-t from-red-900 to-black">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2 
            className="text-6xl font-bold text-white mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400">Survive?</span>
          </motion.h2>
          <p className="text-2xl text-gray-300 mb-12">
            The collapse is coming. Will you thrive or just survive?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button 
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-20 py-8 rounded-lg text-3xl font-bold transition-all transform hover:scale-105 shadow-2xl shadow-red-600/50"
              whileHover={{ boxShadow: "0 0 50px rgba(255,0,0,0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              ⚔️ Start Surviving (200 Free A17 Tokens)
            </motion.button>
            <motion.button 
              className="border-3 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-20 py-8 rounded-lg text-3xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-yellow-400/50"
              whileHover={{ boxShadow: "0 0 50px rgba(255,215,0,0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              🗺️ View Crisis Dashboard
            </motion.button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer Status */}
      <div className="bg-gradient-to-r from-red-900/90 to-yellow-900/90 text-white p-4 text-center border-t border-yellow-400/50">
        <div className="flex justify-center space-x-8 text-lg font-bold">
          <span>🚨 CRISIS LEVEL: MODERATE</span>
          <span>⏰ {currentTime.toLocaleTimeString()}</span>
          <span>🌍 GLOBAL STATUS: UNSTABLE</span>
          <span className="text-yellow-400">⚡ A17 NETWORK: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export const Header = ({ user, globalData, currentView, onNavigate, crisisMode }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'film', label: 'Interactive Film', icon: '🎬' },
    { id: 'academy', label: 'Survival Academy', icon: '🎯' },
    { id: 'agent17', label: 'Agent17', icon: '🤖' },
    { id: 'tinder', label: 'Tinder of Doers', icon: '💝' },
    { id: 'blood', label: 'Blood Donations', icon: '🩸' },
    { id: 'marketplace', label: 'Marketplace', icon: '🛒' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'data', label: 'Live Data', icon: '📊' },
    { id: 'token', label: 'Token & DAO', icon: '🪙' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'crisis', label: 'Crisis Command', icon: '🚨' }
  ];

  return (
    <header className={`fixed top-0 w-full backdrop-blur-md z-50 border-b ${
      crisisMode 
        ? 'bg-red-900 bg-opacity-95 border-red-700' 
        : 'bg-black bg-opacity-95 border-gray-800'
    }`}>
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
          >
            <Skull className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <div className="text-lg sm:text-2xl font-bold text-white">#THRIVECHAOS</div>
            {crisisMode && (
              <motion.div 
                className="bg-red-500 text-white px-1 sm:px-2 py-1 rounded text-xs font-bold hidden sm:block"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                CRISIS MODE
              </motion.div>
            )}
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {[
              { name: 'Home', view: 'home', icon: Flame },
              { name: 'Survival', view: 'survival', icon: Shield },
              { name: 'Resistance', view: 'resistance', icon: Zap },
              { name: 'Wellness', view: 'wellness', icon: Heart },
              { name: 'Stream', view: 'streaming', icon: Radio },
              { name: 'Community', view: 'community', icon: Users },
              { name: 'Marketplace', view: 'marketplace', icon: Globe },
              { name: 'Business', view: 'business', icon: Crown },
              { name: 'Subscriptions', view: 'subscriptions', icon: CreditCard },
              { name: 'MLM', view: 'mlm', icon: Trophy }
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.button
                  key={item.name}
                  className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
                  onClick={() => onNavigate(item.view)}
                  whileHover={{ scale: 1.05 }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Points Display */}
          <motion.div 
            className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 rounded-full cursor-pointer ${
              crisisMode 
                ? 'bg-red-800 border border-red-600' 
                : 'bg-gray-900'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {/* Agent17 Tokens */}
            <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            <span className="text-white font-semibold text-sm sm:text-base">{user.agent17Tokens}</span>
            <span className="text-gray-300 text-xs sm:text-sm hidden sm:inline">A17</span>
          </motion.div>

          {/* Earn Points Button - Hidden on mobile, replaced with + icon */}
          <motion.button
            className="hidden sm:flex bg-white text-black px-3 sm:px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
          >
            Earn A17
          </motion.button>

          {/* Mobile Earn Points (Plus icon) */}
          <motion.button
            className="sm:hidden bg-white text-black p-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Plus className="w-4 h-4" />
          </motion.button>

          {/* Search - Hidden on small mobile */}
          <motion.button
            className="hidden sm:block text-white hover:text-gray-300"
            onClick={() => setShowSearch(!showSearch)}
            whileHover={{ scale: 1.1 }}
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Mobile Menu Button - Only visible on mobile */}
          <motion.button
            className="lg:hidden text-white hover:text-gray-300 p-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            whileHover={{ scale: 1.1 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>

          {/* User Icon - Hidden on smallest mobile */}
          <motion.button
            className="hidden md:block text-white hover:text-gray-300"
            whileHover={{ scale: 1.1 }}
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black bg-opacity-95 border-t border-gray-700"
          >
            <div className="px-4 py-4 space-y-3">
              {[
                { name: 'Home', view: 'home', icon: Flame },
                { name: 'Survival', view: 'survival', icon: Shield },
                { name: 'Resistance', view: 'resistance', icon: Zap },
                { name: 'Wellness', view: 'wellness', icon: Heart },
                { name: 'Stream', view: 'streaming', icon: Radio },
                { name: 'Community', view: 'community', icon: Users },
                { name: 'Marketplace', view: 'marketplace', icon: Globe },
                { name: 'Business', view: 'business', icon: Crown },
                { name: 'Subscriptions', view: 'subscriptions', icon: CreditCard },
                { name: 'MLM', view: 'mlm', icon: Trophy }
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.name}
                    className="w-full flex items-center space-x-3 text-white hover:text-gray-300 transition-colors py-3 px-4 hover:bg-gray-800 rounded-lg"
                    onClick={() => {
                      onNavigate(item.view);
                      setShowMobileMenu(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-lg">{item.name}</span>
                  </motion.button>
                );
              })}
              
              {/* Mobile Search */}
              <motion.button
                className="w-full flex items-center space-x-3 text-white hover:text-gray-300 transition-colors py-3 px-4 hover:bg-gray-800 rounded-lg"
                onClick={() => {
                  setShowSearch(!showSearch);
                  setShowMobileMenu(false);
                }}
                whileHover={{ scale: 1.02 }}
              >
                <Search className="w-5 h-5" />
                <span className="text-lg">Search</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-4 sm:px-6 pb-4"
          >
            <input
              type="text"
              placeholder="Search survival skills, streams, resistance tactics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Enhanced Landing Page Component
export const LandingPage = ({ userPoints, setCurrentView }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="min-h-screen bg-black" style={{
      backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
      backgroundRepeat: 'repeat'
    }}>
      {/* Glitch Logo */}
      <div className="pt-24 pb-8">
        <h1 className="font-black text-5xl md:text-7xl text-center text-yellow-400 tracking-wider uppercase"
            style={{
              fontFamily: 'Anton, sans-serif',
              textShadow: `
                1px 1px 0 #d8a600,
                2px 2px 0 #a06c00,
                3px 3px 0 #700,
                2px 0 #ff0000,
                -2px 0 #00ffff
              `,
              animation: 'glitch 1.5s infinite'
            }}>
          THRIVECHAOS
        </h1>
      </div>

      {/* Hero Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto"
               style={{
                 clipPath: 'polygon(0 5%, 100% 0%, 100% 95%, 0% 100%)',
                 background: '#111',
                 boxShadow: 'inset 0 0 40px #ff000040',
                 marginBottom: '60px'
               }}>
        <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 text-yellow-400 text-center font-black tracking-wide">
          From $20 to a revolution — this is your call to action. <br />
          The <strong>THRIVECHAOS</strong> movement ignites a rebellion for a new world order.
        </p>
        <div className="text-center space-x-4">
          <motion.button
            className="bg-yellow-400 text-black px-8 py-4 rounded font-black text-lg tracking-wider uppercase border-3 border-yellow-600 hover:bg-yellow-300 transition-all"
            style={{
              fontFamily: 'Anton, sans-serif',
              boxShadow: '0 0 12px #ffd600cc',
              textShadow: 'none'
            }}
            onClick={() => setCurrentView('home')}
            whileHover={{ scale: 1.05 }}
          >
            Join the Rebellion
          </motion.button>
          <motion.button
            className="bg-transparent text-red-500 px-8 py-4 rounded font-black text-lg tracking-wider uppercase border-3 border-red-500 hover:bg-red-500 hover:text-white transition-all"
            style={{
              fontFamily: 'Anton, sans-serif',
              boxShadow: '0 0 10px #ff3b3f88'
            }}
            onClick={() => setCurrentView('survival')}
            whileHover={{ scale: 1.05 }}
          >
            See the Battle Map
          </motion.button>
        </div>
      </section>

      {/* Interactive Film Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto"
               style={{
                 clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0% 95%)',
                 background: '#220000',
                 boxShadow: 'inset 0 0 40px #ff3b3f80',
                 marginBottom: '60px'
               }}>
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-6 tracking-wider uppercase"
            style={{ textShadow: '1px 1px 3px #7a0000' }}>
          🎬 The Film That Sparked the Uprising
        </h2>
        <p className="text-lg text-gray-300 text-center mb-8 max-w-3xl mx-auto">
          Experience the cinematic pulse that fuses fiction with raw reality — a manifesto in motion.
        </p>
        
        {!showVideo ? (
          <div className="text-center">
            <motion.button
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all"
              onClick={() => setShowVideo(true)}
              whileHover={{ scale: 1.05 }}
            >
              🎬 Watch the Manifesto
            </motion.button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <iframe
              className="w-full h-64 md:h-96 rounded-xl border-4 border-red-500"
              style={{
                boxShadow: '0 0 15px #ff3b3faa, inset 0 0 40px #ff0000cc'
              }}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="THRIVECHAOS: The Awakening"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </section>

      {/* NFC Cards Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto"
               style={{
                 clipPath: 'polygon(0 5%, 100% 0%, 100% 95%, 0% 100%)',
                 background: '#111',
                 boxShadow: 'inset 0 0 40px #ff000040',
                 marginBottom: '60px'
               }}>
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-6 tracking-wider uppercase"
            style={{ textShadow: '1px 1px 3px #7a0000' }}>
          📲 AGENT17 NFC Cards — Your Key to the Resistance
        </h2>
        <p className="text-lg text-gray-300 text-center mb-8 max-w-3xl mx-auto">
          Your digital identity, weaponized for instant crisis response, exclusive access, and community networking.
        </p>
        <div className="text-center">
          <motion.button
            className="bg-yellow-400 text-black px-8 py-4 rounded font-black text-lg tracking-wider uppercase border-3 border-yellow-600 hover:bg-yellow-300 transition-all"
            style={{
              fontFamily: 'Anton, sans-serif',
              boxShadow: '0 0 12px #ffd600cc'
            }}
            onClick={() => setCurrentView('community')}
            whileHover={{ scale: 1.05 }}
          >
            Pre-order Your Agent17 Card
          </motion.button>
        </div>
      </section>

      {/* Token Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto"
               style={{
                 clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0% 95%)',
                 background: '#220000',
                 boxShadow: 'inset 0 0 40px #ff3b3f80',
                 marginBottom: '60px'
               }}>
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-6 tracking-wider uppercase"
            style={{ textShadow: '1px 1px 3px #7a0000' }}>
          🚀 AGENT17 Token — The Pulse of Power
        </h2>
        <p className="text-lg text-gray-300 text-center mb-8 max-w-3xl mx-auto">
          Governance, rewards, and power in your hands. Control the future, claim your place in the chaos.
        </p>
        <div className="text-center">
          <motion.button
            className="bg-transparent text-red-500 px-8 py-4 rounded font-black text-lg tracking-wider uppercase border-3 border-red-500 hover:bg-red-500 hover:text-white transition-all"
            style={{
              fontFamily: 'Anton, sans-serif',
              boxShadow: '0 0 10px #ff3b3f88'
            }}
            onClick={() => setCurrentView('subscriptions')}
            whileHover={{ scale: 1.05 }}
          >
            Read the Manifesto
          </motion.button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "🌍",
              title: "Crisis Command Map",
              description: "Geo-synced collaboration platform linking volunteers, NGOs, military, and emergency teams worldwide.",
              view: "survival"
            },
            {
              icon: "📢",
              title: "Walkie-Talkie + AI Transcription",
              description: "Instant voice comms with AI-powered transcript logs for seamless, real-time strategy & coordination.",
              view: "streaming"
            },
            {
              icon: "🧠",
              title: "Mind & Body Arsenal",
              description: "Access alternative health, breathwork, cold therapy, and spiritual resilience programs.",
              view: "wellness"
            },
            {
              icon: "🎥",
              title: "Crowdfund Storymaking",
              description: "Join forces to create and fund documentaries, films, and live events with full DAO voting power.",
              view: "business"
            },
            {
              icon: "🚁",
              title: "IOT & Drone Logistics",
              description: "Automate deliveries and aid with smart drones synced through Web3 and blockchain logistics.",
              view: "marketplace"
            },
            {
              icon: "📡",
              title: "Global Response Dashboard",
              description: "Real-time crisis monitoring, resource allocation, and emergency response coordination worldwide.",
              view: "mlm"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-red-950 border-2 border-red-500 rounded-xl p-6 cursor-pointer transition-all"
              style={{
                boxShadow: '0 0 15px #ff3b3f99, inset 0 0 25px #aa000050'
              }}
              onClick={() => setCurrentView(feature.view)}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 0 25px #ff3b3fff, inset 0 0 40px #ff0000aa'
              }}
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-3 tracking-wide uppercase">
                {feature.icon} {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Stats Bar */}
      <div className="bg-red-600 text-white py-3 text-center font-bold">
        <div className="flex justify-center space-x-8 text-sm md:text-base">
          <span>🔥 12,847 REBELS ACTIVE</span>
          <span>📍 89 COUNTRIES</span>
          <span>⚡ SYSTEM STABILITY: 67%</span>
        </div>
      </div>

      {/* CSS for glitch animation */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Roboto+Mono:wght@700&display=swap');
        
        @keyframes glitch {
          0% { text-shadow: 2px 0 #ff0000, -2px 0 #00ffff; }
          20% { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff; }
          40% { text-shadow: 2px 0 #ff0000, -2px 0 #00ffff; }
          60% { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff; }
          80% { text-shadow: 2px 0 #ff0000, -2px 0 #00ffff; }
          100% { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff; }
        }
      `}</style>
    </div>
  );
};

// Content Card Component
export const ApocalypseContentCard = ({ item, userPoints, onPlay, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canAccess = userPoints >= item.cost;

  const getTypeIcon = () => {
    switch (item.type) {
      case 'survival': return <Shield className="w-4 h-4" />;
      case 'resistance': return <Zap className="w-4 h-4" />;
      case 'streaming': return <Radio className="w-4 h-4" />;
      case 'movie': return <Play className="w-4 h-4" />;
      default: return <Flame className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      className={`relative group cursor-pointer ${featured ? 'scale-110' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: featured ? 1.15 : 1.05, zIndex: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={item.poster || item.cover}
          alt={item.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {!canAccess && item.cost > 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold">{item.cost} CHAOS</div>
            </div>
          </div>
        )}

        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded-full flex items-center space-x-1">
          {getTypeIcon()}
          <Coins className="w-4 h-4 text-yellow-400" />
          <span className="text-white text-sm">{item.cost || 'FREE'}</span>
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 p-4 rounded-b-lg border-t border-red-600"
          >
            <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {item.description || item.overview}
            </p>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => canAccess && onPlay(item)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  canAccess
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}
                disabled={!canAccess}
              >
                {canAccess ? getTypeIcon() : <Lock className="w-4 h-4" />}
                <span>{canAccess ? 'Access' : 'Locked'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Content Row Component
export const ApocalypseContentRow = ({ title, content, userPoints, onPlay, urgent = false }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = Math.max(0, content.length * 300 - (window?.innerWidth || 1920) + 100);

  const scroll = (direction) => {
    const scrollAmount = 600;
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(maxScroll, scrollPosition + scrollAmount);
    setScrollPosition(newPosition);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6 px-6">
        <h2 className={`text-3xl font-bold flex items-center space-x-3 ${
          urgent ? 'text-red-400' : 'text-white'
        }`}>
          {urgent && <AlertTriangle className="w-8 h-8 text-red-400" />}
          <span>{title}</span>
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
            disabled={scrollPosition === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
            disabled={scrollPosition >= maxScroll}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex space-x-4 px-6"
          animate={{ x: -scrollPosition }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {content.map((item, index) => (
            <div key={item.id} className="flex-shrink-0 w-72">
              <ApocalypseContentCard 
                item={item} 
                userPoints={userPoints} 
                onPlay={onPlay}
                featured={index === 0 && urgent}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Tasks Modal Component
export const ApocalypseTasksModal = ({ isOpen, onClose, userPoints, setUserPoints }) => {
  const [tasks, setTasks] = useState(apocalypseTasks);

  const completeTask = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId && !task.completed) {
        setUserPoints(prev => prev + task.reward);
        return { ...task, completed: true };
      }
      return task;
    }));
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 border border-red-600 rounded-xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white flex items-center space-x-3">
              <Skull className="w-10 h-10 text-red-500" />
              <span>CHAOS MISSIONS</span>
            </h2>
            <p className="text-gray-400 mt-2">Complete missions to earn CHAOS points and help the resistance</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => {
            const IconComponent = task.icon;
            return (
              <motion.div
                key={task.id}
                className={`p-6 rounded-xl border-2 transition-all ${
                  task.completed
                    ? 'border-green-500 bg-green-500 bg-opacity-10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full ${
                      task.completed ? 'bg-green-500' : 'bg-gray-700'
                    }`}>
                      {task.completed ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <IconComponent className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{task.title}</h3>
                      <p className="text-gray-400">{task.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-bold">+{task.reward}</span>
                  </div>
                </div>

                {!task.completed && (
                  <button
                    onClick={() => completeTask(task.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Complete Mission
                  </button>
                )}

                {task.completed && (
                  <div className="text-center text-green-400 font-semibold">
                    ✓ Mission Accomplished
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Live Stream Grid Component
export const LiveStreamGrid = ({ streams, userPoints, onJoinStream }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="bg-gray-900 border border-red-600 rounded-lg overflow-hidden"
          whileHover={{ scale: 1.03 }}
        >
          <div className="relative">
            <img 
              src={stream.thumbnail} 
              alt={stream.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 left-2 flex items-center space-x-1 bg-red-600 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-xs font-bold">LIVE</span>
            </div>
            <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded">
              {stream.viewers} watching
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-white font-bold text-lg mb-2">{stream.title}</h3>
            <p className="text-gray-400 text-sm mb-3">{stream.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 text-sm">{stream.streamer}</span>
              </div>
              
              <button
                onClick={() => onJoinStream(stream)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Join Stream
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Video Player Component
export const VideoPlayer = ({ content, isOpen, onClose }) => {
  if (!isOpen || !content) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="w-full h-full flex items-center justify-center">
        {content.isLive || content.category ? (
          <div className="text-center p-8 max-w-4xl">
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center justify-center space-x-3">
              <Radio className="w-10 h-10 text-red-500" />
              <span>{content.title}</span>
              {content.isLive && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-lg animate-pulse">
                  LIVE
                </span>
              )}
            </h2>
            <p className="text-gray-400 mb-8 text-xl">{content.description}</p>
            <div className="bg-gray-900 border border-red-600 p-8 rounded-lg">
              <div className="text-white mb-6 text-2xl">📡 LIVE STREAM ACTIVE</div>
              <div className="text-gray-300 mb-6">
                Streamer: {content.streamer} | {content.viewers} watching
              </div>
            </div>
          </div>
        ) : (
          <iframe
            width="80%"
            height="80%"
            src={`https://www.youtube.com/embed/${content.youtube_id}?autoplay=1`}
            title={content.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        )}
      </div>
    </motion.div>
  );
};

// Legacy Marketplace Component (replaced by MarketplaceGear)
export const LegacyMarketplace = ({ userPoints, setUserPoints }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemDetail, setShowItemDetail] = useState(false);

  const filteredItems = selectedCategory === 'all' 
    ? mockMarketplaceItems 
    : mockMarketplaceItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (item) => {
    if (userPoints >= item.price) {
      setUserPoints(prev => prev - item.price);
      alert(`Successfully purchased ${item.title} for ${item.price} CHAOS points!`);
      setShowItemDetail(false);
    } else {
      alert(`Insufficient CHAOS points. You need ${item.price - userPoints} more points.`);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4 flex items-center space-x-3">
          <span>🏪</span>
          <span>CHAOS MARKETPLACE</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8">P2P trading for rebels • Bio seeds • Furniture • Tech gear • Memecoins</p>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Items
          </button>
          {Object.entries(marketplaceCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
                selectedCategory === key
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-red-600 transition-colors cursor-pointer"
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                setSelectedItem(item);
                setShowItemDetail(true);
              }}
            >
              <img 
                src={item.images[0]} 
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-bold text-xl">{item.price}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300 text-sm">{item.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">@{item.seller}</span>
                  <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    {item.stock} left
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Community Profiles Component
export const CommunityProfiles = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-black pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4 flex items-center space-x-3">
          <span>👥</span>
          <span>REBEL COMMUNITY</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8">Connect with fellow rebels • Trade skills • Build networks</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockUserProfiles.map((user) => {
            const userTypeInfo = userTypes[user.type];
            return (
              <motion.div
                key={user.id}
                className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-red-600 transition-colors cursor-pointer"
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  setSelectedUser(user);
                  setShowProfile(true);
                }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={user.profile.avatar} 
                    alt={user.profile.displayName}
                    className="w-16 h-16 rounded-full border-2 border-red-600"
                  />
                  <div>
                    <h3 className="text-white font-bold text-xl">{user.profile.displayName}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`${userTypeInfo.color} font-semibold text-sm`}>
                        {userTypeInfo.icon} {userTypeInfo.name}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{user.profile.bio}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold">{user.chaosPoints.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs">CHAOS Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold">{user.profile.reputation}/5</div>
                    <div className="text-gray-400 text-xs">Reputation</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// New comprehensive platform components are included above

// Placeholder components for features coming soon
export const MarketplaceGear = ({ user, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">🛒 Marketplace & Gear</h1>
      <p className="text-gray-300 mb-8">Rugged tech, survival clothes, and community partnerships</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">🔌 Rugged Tech</h3>
          <p className="text-gray-400">Solar panels, emergency radios, satellite communicators</p>
        </div>
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">👕 THRIVECHAOS Apparel</h3>
          <p className="text-gray-400">Tactical clothing, survival gear, branded merchandise</p>
        </div>
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">🤝 Brand Partnerships</h3>
          <p className="text-gray-400">Curated survival products from trusted partners</p>
        </div>
      </div>
    </div>
  </div>
);

export const EventBookingSystem = ({ user, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">📅 Event Booking System</h1>
      <p className="text-gray-300 mb-8">Airbnb-like booking for venues, photographers, caterers</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">🏛️ Venues</h3>
          <p className="text-gray-400">Community spaces, emergency shelters, meeting locations</p>
        </div>
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">📸 Photographers</h3>
          <p className="text-gray-400">Document your events and community moments</p>
        </div>
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-2">🍽️ Catering</h3>
          <p className="text-gray-400">Local food providers for community gatherings</p>
        </div>
      </div>
    </div>
  </div>
);

export const LiveDataFeeds = ({ globalData, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">📊 Live Data Feeds</h1>
      <p className="text-gray-300 mb-8">Real-time collapsology updates and humanitarian intelligence</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-red-900/30 border border-red-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-400 mb-2">🌍 Global Stability</h3>
          <div className="text-3xl font-bold text-white">{globalData.systemStability}%</div>
          <p className="text-gray-400">System stability index</p>
        </div>
        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-400 mb-2">👥 Active Agents</h3>
          <div className="text-3xl font-bold text-white">{globalData.rebelsActive.toLocaleString()}</div>
          <p className="text-gray-400">Agents worldwide</p>
        </div>
        <div className="bg-orange-900/30 border border-orange-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-orange-400 mb-2">🚨 Active Crises</h3>
          <div className="text-3xl font-bold text-white">{globalData.activeCrises}</div>
          <p className="text-gray-400">Current emergencies</p>
        </div>
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-400 mb-2">🌐 Countries</h3>
          <div className="text-3xl font-bold text-white">{globalData.countriesActive}</div>
          <p className="text-gray-400">Network coverage</p>
        </div>
      </div>
    </div>
  </div>
);

export const TokenDAO = ({ user, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">🪙 Token & DAO Integration</h1>
      <p className="text-gray-300 mb-8">Governance, rewards, donations, and access management</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">Your Agent17 Tokens</h3>
          <div className="text-4xl font-bold text-white mb-4">{user.agent17Tokens}</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">From Donations</span>
              <span className="text-white">150 A17</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">From Missions</span>
              <span className="text-white">75 A17</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">From Community</span>
              <span className="text-white">25 A17</span>
            </div>
          </div>
        </div>
        <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">DAO Governance</h3>
          <p className="text-gray-300 mb-4">Participate in platform decisions and proposals</p>
          <div className="space-y-3">
            <div className="bg-black/40 rounded p-3">
              <div className="text-white font-bold">Proposal #001</div>
              <div className="text-gray-400 text-sm">Emergency fund allocation</div>
            </div>
            <div className="bg-black/40 rounded p-3">
              <div className="text-white font-bold">Proposal #002</div>
              <div className="text-gray-400 text-sm">New crisis response protocols</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const CommunityHub = ({ user, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">👥 Community Hub</h1>
      <p className="text-gray-300 mb-8">Advanced community building and collaboration tools</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-400 mb-2">🏘️ Local Cells</h3>
          <p className="text-gray-400">Connect with agents in your area for local action</p>
        </div>
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-400 mb-2">🤝 Skill Sharing</h3>
          <p className="text-gray-400">Teach and learn essential survival skills</p>
        </div>
        <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-6">
          <h3 className="text-xl font-bold text-purple-400 mb-2">📋 Group Projects</h3>
          <p className="text-gray-400">Collaborate on community resilience initiatives</p>
        </div>
      </div>
    </div>
  </div>
);

export const CrisisCommand = ({ user, globalData, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">🚨 Crisis Command Center</h1>
      <p className="text-gray-300 mb-8">Real-time crisis coordination and emergency response</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-red-900/30 border border-red-600 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-400 mb-2">🌪️ Active Emergencies</h3>
          <div className="text-3xl font-bold text-white">{globalData.activeCrises}</div>
          <p className="text-gray-400 text-sm">Requiring immediate response</p>
        </div>
        <div className="bg-orange-900/30 border border-orange-600 rounded-lg p-6">
          <h3 className="text-lg font-bold text-orange-400 mb-2">👨‍🚒 Response Teams</h3>
          <div className="text-3xl font-bold text-white">12</div>
          <p className="text-gray-400 text-sm">Teams deployed globally</p>
        </div>
        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📡 Communication</h3>
          <div className="text-3xl font-bold text-white">98%</div>
          <p className="text-gray-400 text-sm">Network uptime</p>
        </div>
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-400 mb-2">🎯 Your Missions</h3>
          <div className="text-3xl font-bold text-white">{user.missionsCompleted}</div>
          <p className="text-gray-400 text-sm">Completed successfully</p>
        </div>
      </div>
    </div>
  </div>
);
