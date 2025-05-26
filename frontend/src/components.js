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
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const glitchTimer = setInterval(() => setGlitchActive(prev => !prev), 3000);
    return () => {
      clearInterval(timer);
      clearInterval(glitchTimer);
    };
  }, []);

  const crisisEscalationDays = Math.floor((new Date('2025-12-31') - currentTime) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Glitch Background */}
      <div className="fixed inset-0 opacity-5 bg-gradient-to-b from-red-900 to-black pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/20 to-black"></div>
        
        {/* Live Metrics Bar */}
        <div className="absolute top-24 left-0 right-0 z-20">
          <div className="bg-red-600/90 text-white text-center py-2">
            <div className="flex justify-center space-x-8 text-sm font-bold">
              <span>🔥 12,847 REBELS ACTIVE</span>
              <span>📍 89 COUNTRIES</span>
              <span>⚡ SYSTEM STABILITY: 67%</span>
            </div>
          </div>
        </div>

        {/* Crisis Countdown */}
        <div className="absolute top-32 left-0 right-0 z-20">
          <div className="text-center py-4">
            <div className="text-red-400 text-xl font-bold animate-pulse">
              CRISIS ESCALATION: {crisisEscalationDays} DAYS
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Glitch Logo */}
          <motion.div
            className={`mb-8 ${glitchActive ? 'animate-pulse' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl md:text-9xl font-black text-white mb-4 leading-none font-anton">
              THRIVE
              <span className="text-red-500 relative">
                CHAOS
                {glitchActive && (
                  <span className="absolute inset-0 text-yellow-400 animate-ping">CHAOS</span>
                )}
              </span>
            </h1>
            <div className="text-2xl md:text-4xl font-mono text-red-400 mb-6">
              From $20 to a revolution
            </div>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-6">
              Your call to action
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Join the rebellion against collapse. When systems fail, we rise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <button className="bg-red-600 hover:bg-red-700 text-white px-16 py-6 rounded-lg text-2xl font-bold transition-all transform hover:scale-105 shadow-2xl">
                Join the Rebellion
              </button>
              <button className="border-3 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-16 py-6 rounded-lg text-2xl font-bold transition-all transform hover:scale-105">
                See Battle Map
              </button>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: "🎯",
                title: "AGENT17 Token",
                desc: "Revolutionary crisis currency",
                cta: "Get Tokens"
              },
              {
                icon: "📱",
                title: "NFC Agent Cards",
                desc: "Physical rebellion network",
                cta: "Pre-order Card"
              },
              {
                icon: "🗺️",
                title: "Crisis Command Map",
                desc: "Real-time crisis coordination",
                cta: "View Map"
              },
              {
                icon: "💪",
                title: "Mind & Body Arsenal",
                desc: "Survival fitness protocol",
                cta: "Start Training"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black/60 border border-red-600/50 p-6 rounded-lg backdrop-blur-sm hover:border-yellow-400 transition-all"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.desc}</p>
                <button className="bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-bold transition-colors">
                  {feature.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-red-400" />
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-b from-black to-red-900/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-white mb-12">
            THRIVECHAOS: The Awakening
          </h2>
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-2 border-red-600">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
              title="THRIVECHAOS: The Awakening" 
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Crowdfund Storymaking Section */}
      <section className="py-20 bg-gradient-to-b from-red-900/20 to-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-8">
            Crowdfund <span className="text-yellow-400">Storymaking</span>
          </h2>
          <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            Help create the resistance narrative. Fund real stories of survival, rebellion, and hope.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Survival Chronicles", funded: "87%", amount: "$43,500" },
              { title: "Resistance Stories", funded: "92%", amount: "$76,200" },
              { title: "Hope Archives", funded: "34%", amount: "$12,800" }
            ].map((project, index) => (
              <div key={index} className="bg-black/60 border border-yellow-400/50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">{project.title}</h3>
                <div className="text-3xl font-bold text-white mb-2">{project.amount}</div>
                <div className="text-lg text-green-400 mb-4">Funded: {project.funded}</div>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded font-bold transition-colors">
                  Fund This Story
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-t from-red-900 to-black">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-6xl font-bold text-white mb-8">
            Ready to <span className="text-red-400">Survive?</span>
          </h2>
          <p className="text-2xl text-gray-300 mb-12">
            The collapse is coming. Will you thrive or just survive?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-20 py-8 rounded-lg text-3xl font-bold transition-all transform hover:scale-105 shadow-2xl">
              Start Surviving (200 Free CHAOS Points)
            </button>
            <button className="border-3 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-20 py-8 rounded-lg text-3xl font-bold transition-all transform hover:scale-105">
              View Crisis Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer Status */}
      <div className="bg-red-900/90 text-white p-4 text-center">
        <div className="flex justify-center space-x-8 text-lg font-bold">
          <span>🚨 CRISIS LEVEL: MODERATE</span>
          <span>⏰ {currentTime.toLocaleTimeString()}</span>
          <span>🌍 GLOBAL STATUS: UNSTABLE</span>
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
            <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            <span className="text-white font-semibold text-sm sm:text-base">{user.points}</span>
            <span className="text-gray-300 text-xs sm:text-sm hidden sm:inline">CHAOS</span>
          </motion.div>

          {/* Earn Points Button - Hidden on mobile, replaced with + icon */}
          <motion.button
            className="hidden sm:flex bg-white text-black px-3 sm:px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
          >
            Earn Chaos
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
