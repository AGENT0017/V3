import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Plus, 
  Info, 
  Search, 
  Bell, 
  User, 
  Coins, 
  Gift, 
  Star, 
  Share2, 
  Calendar, 
  Target, 
  Award, 
  Lock,
  Heart,
  Volume2,
  BookOpen,
  Gamepad2,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  Shield,
  Zap,
  Users,
  Radio,
  MapPin,
  Flame,
  Skull,
  Compass,
  Wrench,
  Brain,
  Eye,
  MessageSquare,
  AlertTriangle,
  Headphones,
  Video,
  Mic,
  Globe,
  Crown,
  CreditCard,
  Trophy
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
export const Header = ({ userPoints, setUserPoints, setCurrentView, setShowTasks, crisisMode }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmergencyMenu, setShowEmergencyMenu] = useState(false);

  return (
    <header className={`fixed top-0 w-full backdrop-blur-md z-50 border-b ${
      crisisMode 
        ? 'bg-red-900 bg-opacity-90 border-red-700' 
        : 'bg-black bg-opacity-95 border-gray-800'
    }`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentView('home')}
            whileHover={{ scale: 1.05 }}
          >
            <Skull className="w-8 h-8 text-white" />
            <div className="text-2xl font-bold text-white">#THRIVECHAOS</div>
            {crisisMode && (
              <motion.div 
                className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                CRISIS MODE
              </motion.div>
            )}
          </motion.div>
          
          <nav className="hidden md:flex space-x-6">
            {[
              { name: 'Home', view: 'home', icon: Flame },
              { name: 'Survival', view: 'survival', icon: Shield },
              { name: 'Resistance', view: 'resistance', icon: Zap },
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
                  onClick={() => setCurrentView(item.view)}
                  whileHover={{ scale: 1.05 }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div 
            className={`flex items-center space-x-2 px-4 py-2 rounded-full cursor-pointer ${
              crisisMode 
                ? 'bg-red-800 border border-red-600' 
                : 'bg-gray-900'
            }`}
            onClick={() => setShowTasks(true)}
            whileHover={{ scale: 1.05 }}
          >
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">{userPoints}</span>
            <span className="text-gray-300 text-sm">CHAOS</span>
          </motion.div>

          <motion.button
            className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            onClick={() => setShowTasks(true)}
            whileHover={{ scale: 1.05 }}
          >
            Earn Chaos
          </motion.button>

          <motion.button
            className="text-white hover:text-gray-300"
            onClick={() => setShowSearch(!showSearch)}
            whileHover={{ scale: 1.1 }}
          >
            <Search className="w-6 h-6" />
          </motion.button>

          <motion.button
            className="text-white hover:text-gray-300"
            whileHover={{ scale: 1.1 }}
          >
            <User className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 pb-4"
          >
            <input
              type="text"
              placeholder="Search survival skills, streams, resistance tactics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Apocalypse Hero Component
export const ApocalypseHero = ({ userPoints, crisisMode }) => {
  const [currentAlert, setCurrentAlert] = useState(0);
  const alerts = [
    "⚡ INFRASTRUCTURE FAILING - Learn essential survival skills NOW",
    "🔥 LIVE: Community leaders sharing real-time crisis updates", 
    "🛡️ NEW: Anonymous resistance tactics just uploaded",
    "📡 EMERGENCY: Secure communication networks established"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % alerts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [alerts.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=1200)`,
            filter: crisisMode ? 'hue-rotate(0deg) saturate(1.2)' : 'hue-rotate(20deg)'
          }}
        />
        <div className={`absolute inset-0 ${
          crisisMode 
            ? 'bg-red-900 bg-opacity-60' 
            : 'bg-black bg-opacity-50'
        }`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </motion.div>

      <div className={`absolute top-24 left-0 right-0 z-20 ${
        crisisMode ? 'bg-red-600' : 'bg-orange-600'
      } text-white py-2 px-6`}>
        <motion.div
          key={currentAlert}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="text-center font-semibold"
        >
          {alerts[currentAlert]}
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center h-full px-6 md:px-12">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            THRIVE IN THE
            <br />
            <span className="text-red-400">CHAOS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl"
          >
            When systems collapse, rebels rise. Learn survival skills, connect with your tribe, 
            and keep your sanity with apocalypse-ready entertainment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.button
              className="flex items-center space-x-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-lg transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-6 h-6" />
              <span>Start Surviving</span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-2 px-8 py-4 bg-gray-700 bg-opacity-80 text-white rounded-lg font-semibold hover:bg-opacity-100 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Radio className="w-6 h-6" />
              <span>Join Live Stream</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
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

// Marketplace Component
export const Marketplace = ({ userPoints, setUserPoints }) => {
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