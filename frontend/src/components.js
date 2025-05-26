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
  Globe
} from 'lucide-react';

// Enhanced Business Ecosystem Data for ThriveChaos
const businessFeatures = {
  // Community Creation Tools
  communityTemplates: [
    {
      id: "survival_academy",
      name: "Survival Academy",
      description: "Teach essential survival skills to rebels",
      category: "Education",
      price: 0, // Free template
      features: ["Live streaming", "Course modules", "Certification system"],
      theme: "survival",
      color: "green"
    },
    {
      id: "crypto_rebels",
      name: "Crypto Rebels Hub",
      description: "Build a community around cryptocurrency and financial freedom",
      category: "Finance",
      price: 50,
      features: ["Trading signals", "Portfolio tracking", "Private channels"],
      theme: "tech",
      color: "blue"
    },
    {
      id: "wellness_warriors",
      name: "Wellness Warriors",
      description: "Health and wellness coaching community",
      category: "Health",
      price: 30,
      features: ["Fitness tracking", "Nutrition plans", "Group challenges"],
      theme: "health",
      color: "purple"
    }
  ],

  // Subscription Plans
  subscriptionTiers: [
    {
      id: "basic",
      name: "Rebel Starter",
      price: 29,
      interval: "monthly",
      features: [
        "Create 1 community",
        "Up to 100 members",
        "Basic analytics",
        "Standard support"
      ],
      chaosBonus: 500
    },
    {
      id: "pro",
      name: "Chaos Commander",
      price: 79,
      interval: "monthly", 
      features: [
        "Create 5 communities",
        "Up to 1000 members",
        "Advanced analytics",
        "MLM tracking",
        "Priority support",
        "Custom branding"
      ],
      chaosBonus: 1500,
      popular: true
    },
    {
      id: "empire",
      name: "Revolution Leader",
      price: 199,
      interval: "monthly",
      features: [
        "Unlimited communities",
        "Unlimited members",
        "Full analytics suite",
        "Complete MLM system",
        "White-label options",
        "Dedicated support"
      ],
      chaosBonus: 5000
    }
  ],

  // MLM Structure (8 Levels)
  mlmStructure: {
    levels: [
      { level: 1, commission: 10, name: "Direct Recruit" },
      { level: 2, commission: 8, name: "Second Line" },
      { level: 3, commission: 6, name: "Third Line" },
      { level: 4, commission: 4, name: "Fourth Line" },
      { level: 5, commission: 3, name: "Fifth Line" },
      { level: 6, commission: 2, name: "Sixth Line" },
      { level: 7, commission: 1.5, name: "Seventh Line" },
      { level: 8, commission: 1, name: "Eighth Line" }
    ],
    bonuses: {
      rankAdvancement: [100, 250, 500, 1000, 2500, 5000, 10000, 25000],
      monthlyVolume: [50, 100, 200, 400, 800, 1600, 3200, 6400]
    }
  }
};
// Mock Coach/Entrepreneur Profiles
const mockCoaches = [
  {
    id: "coach_001",
    name: "Sarah Revolution",
    title: "Survival Skills Master",
    communities: ["Urban Survival Academy", "Off-Grid Living Pro"],
    subscribers: 2847,
    monthlyRevenue: 8940,
    mlmLevel: 5,
    downlineCount: 147,
    totalCommissions: 3240,
    avatar: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=200",
    bio: "Former military survival instructor teaching urban and wilderness survival",
    specialties: ["Urban survival", "Water procurement", "Shelter building"],
    subscriptionPlan: "pro",
    joinDate: "2023-08-15",
    badge: "verified"
  },
  {
    id: "coach_002", 
    name: "Marcus CryptoSage",
    title: "Financial Freedom Coach",
    communities: ["Crypto Rebels Elite", "DeFi Masters", "Investment Sanctuary"],
    subscribers: 5623,
    monthlyRevenue: 18760,
    mlmLevel: 7,
    downlineCount: 312,
    totalCommissions: 7890,
    avatar: "https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=200",
    bio: "Helping rebels achieve financial independence through crypto and DeFi",
    specialties: ["Cryptocurrency", "DeFi protocols", "Investment strategies"],
    subscriptionPlan: "empire",
    joinDate: "2023-06-10",
    badge: "elite"
  }
];

// Mock Subscription Data
const mockSubscriptions = [
  {
    id: "sub_001",
    userId: "coach_001",
    plan: "pro",
    status: "active",
    currentPeriodStart: "2024-01-01",
    currentPeriodEnd: "2024-02-01",
    amount: 79,
    currency: "USD",
    nextBilling: "2024-02-01"
  }
];

// Mock MLM Network Data
const mockMLMNetwork = {
  userId: "coach_001",
  totalDownline: 147,
  activeDownline: 89,
  levels: [
    { level: 1, count: 12, commission: 89.40 },
    { level: 2, count: 24, commission: 127.20 },
    { level: 3, count: 31, commission: 98.60 },
    { level: 4, count: 28, commission: 56.80 },
    { level: 5, count: 22, commission: 34.50 },
    { level: 6, count: 18, commission: 18.90 },
    { level: 7, count: 8, commission: 6.75 },
    { level: 8, count: 4, commission: 2.40 }
  ],
  monthlyCommissions: 435.55,
  totalCommissions: 3240.00,
  rank: "Chaos Commander"
};
  {
    id: "coach_001",
    name: "Sarah Revolution",
    title: "Survival Skills Master",
    communities: ["Urban Survival Academy", "Off-Grid Living Pro"],
    subscribers: 2847,
    monthlyRevenue: 8940,
    mlmLevel: 5,
    downlineCount: 147,
    totalCommissions: 3240,
    avatar: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=200",
    bio: "Former military survival instructor teaching urban and wilderness survival",
    specialties: ["Urban survival", "Water procurement", "Shelter building"],
    subscriptionPlan: "pro",
    joinDate: "2023-08-15",
    badge: "verified"
  },
  {
    id: "coach_002", 
    name: "Marcus CryptoSage",
    title: "Financial Freedom Coach",
    communities: ["Crypto Rebels Elite", "DeFi Masters", "Investment Sanctuary"],
    subscribers: 5623,
    monthlyRevenue: 18760,
    mlmLevel: 7,
    downlineCount: 312,
    totalCommissions: 7890,
    avatar: "https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=200",
    bio: "Helping rebels achieve financial independence through crypto and DeFi",
    specialties: ["Cryptocurrency", "DeFi protocols", "Investment strategies"],
    subscriptionPlan: "empire",
    joinDate: "2023-06-10",
    badge: "elite"
  }
];

// Mock Subscription Data
const mockSubscriptions = [
  {
    id: "sub_001",
    userId: "coach_001",
    plan: "pro",
    status: "active",
    currentPeriodStart: "2024-01-01",
    currentPeriodEnd: "2024-02-01",
    amount: 79,
    currency: "USD",
    nextBilling: "2024-02-01"
  }
];

// Mock MLM Network Data
const mockMLMNetwork = {
  userId: "coach_001",
  totalDownline: 147,
  activeDownline: 89,
  levels: [
    { level: 1, count: 12, commission: 89.40 },
    { level: 2, count: 24, commission: 127.20 },
    { level: 3, count: 31, commission: 98.60 },
    { level: 4, count: 28, commission: 56.80 },
    { level: 5, count: 22, commission: 34.50 },
    { level: 6, count: 18, commission: 18.90 },
    { level: 7, count: 8, commission: 6.75 },
    { level: 8, commission: 4, commission: 2.40 }
  ],
  monthlyCommissions: 435.55,
  totalCommissions: 3240.00,
  rank: "Chaos Commander"
};
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
      value: 0.00047, // in CHAOS points
      supply: 100000,
      holders: 234
    },
    profile: {
      displayName: "Desert Wolf",
      bio: "Off-grid survival expert | 15 years in wilderness | Teaching self-sufficiency",
      location: "Southwest Desert, USA",
      introVideo: "dQw4w9WgXcQ", // YouTube ID
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
      revenue: 8940, // in CHAOS points
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

// Marketplace Categories and Items
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
    price: 45, // CHAOS points
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
  },
  {
    id: "item_003",
    title: "WOLF Memecoin (1000 tokens)", 
    description: "Desert Wolf's personal memecoin. Backed by survival training and gear access.",
    price: 47, // 1000 * 0.00047
    currency: "CHAOS",
    seller: "DesertWolf47",
    sellerType: "SURVIVALIST", 
    category: "crypto",
    images: ["https://images.unsplash.com/photo-1642810814997-31c017df06a8?w=400"],
    stock: 50, // batches of 1000
    rating: 4.7,
    reviews: 89,
    tags: ["memecoin", "utility", "survival-access"],
    location: "Digital",
    shipping: "Instant transfer"
  },
  {
    id: "item_004",
    title: "Handcrafted Apocalypse Table",
    description: "Sturdy wooden table made from reclaimed materials. Perfect for off-grid living.",
    price: 200,
    currency: "CHAOS",
    seller: "WoodCraftRebel", 
    sellerType: "COMMUNITY_BUILDER",
    category: "furniture",
    images: ["https://images.pexels.com/photos/7533332/pexels-photo-7533332.jpeg?w=400"],
    stock: 1,
    rating: 4.8,
    reviews: 5,
    tags: ["handmade", "reclaimed", "durable"],
    location: "Pacific Northwest",
    shipping: "Local pickup or rebel network"
  },
  {
    id: "item_005",
    title: "Emergency Medical Kit Pro",
    description: "Comprehensive medical kit with prescription alternatives and herbal remedies.",
    price: 180,
    currency: "CHAOS",
    seller: "DocChaos", 
    sellerType: "MEDIC",
    category: "medical-supplies", 
    images: ["https://images.unsplash.com/photo-1717548379141-3060abccd58d?w=400"],
    stock: 6,
    rating: 4.9,
    reviews: 34,
    tags: ["emergency", "herbal", "complete"],
    location: "East Coast",
    shipping: "Secure shipping only"
  }
];
const apocalypseContent = {
  survival: [
    {
      id: 1001,
      title: "Urban Survival: When Cities Fall",
      description: "Essential skills for surviving when infrastructure collapses.",
      poster: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=300",
      cost: 0, // Free during crisis
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
    },
    {
      id: 1003,
      title: "Medical Skills for Chaos",
      description: "Life-saving medical knowledge when hospitals aren't available.",
      poster: "https://images.unsplash.com/photo-1642810814997-31c017df06a8?w=300",
      cost: 40,
      type: "survival",
      urgency: "critical",
      youtube_id: "dQw4w9WgXcQ",
      skills: ["First aid", "Herbal medicine", "Field surgery"]
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
    },
    {
      id: 2002,
      title: "Alternative Economy Basics",
      description: "Trade and survive without traditional currency.",
      poster: "https://images.unsplash.com/photo-1717548381519-10ee59c67150?w=300",
      cost: 30,
      type: "resistance",
      urgency: "medium",
      youtube_id: "dQw4w9WgXcQ",
      skills: ["Bartering", "Cryptocurrency", "Resource sharing"]
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
    },
    {
      id: 3002,
      title: "Underground Comedy Hour",
      description: "Keep your sanity with rebel humor.",
      poster: "https://images.unsplash.com/photo-1717548384641-2bc48d1ad0e5?w=300",
      cost: 15,
      type: "comedy",
      genre: "streaming",
      isLive: true,
      mood: "hope"
    }
  ],
  community: [
    {
      id: 4001,
      title: "Regional Survival Networks",
      description: "Connect with local preppers and rebels.",
      poster: "https://images.pexels.com/photos/3820514/pexels-photo-3820514.jpeg?w=300",
      cost: 0,
      type: "community",
      members: 1247,
      location: "Global"
    }
  ]
};

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
  },
  {
    id: 103,
    title: "Build Local Network",
    description: "Connect with 3 rebels in your geographic area",
    reward: 200,
    icon: Users,
    completed: false,
    type: "networking",
    urgency: "high"
  },
  {
    id: 104,
    title: "Stream Chaos Content",
    description: "Host a live stream about survival, resistance, or chaos",
    reward: 250,
    icon: Video,
    completed: false,
    type: "streaming",
    urgency: "medium"
  },
  {
    id: 105,
    title: "Emergency Drill Complete",
    description: "Practice a real emergency scenario (bug-out bag, communication)",
    reward: 300,
    icon: AlertTriangle,
    completed: false,
    type: "preparedness",
    urgency: "critical"
  },
  {
    id: 106,
    title: "Support a Rebel",
    description: "Help another community member with resources or knowledge",
    reward: 175,
    icon: Heart,
    completed: false,
    type: "mutual-aid",
    urgency: "high"
  }
];

// Enhanced Header with Apocalypse Features
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
              { name: 'Intel', view: 'intel', icon: Eye }
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
          {/* Crisis Points Display */}
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

          {/* Emergency Menu */}
          <motion.button
            className={`p-2 rounded-full transition-colors ${
              crisisMode 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-red-700 hover:bg-red-600'
            }`}
            onClick={() => setShowEmergencyMenu(!showEmergencyMenu)}
            whileHover={{ scale: 1.1 }}
          >
            <AlertTriangle className="w-6 h-6 text-white" />
          </motion.button>

          {/* Live Stream Indicator */}
          <motion.div 
            className="flex items-center space-x-2 bg-green-700 px-3 py-2 rounded-full"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white text-sm font-semibold">LIVE</span>
          </motion.div>

          {/* Earn Chaos Points */}
          <motion.button
            className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            onClick={() => setShowTasks(true)}
            whileHover={{ scale: 1.05 }}
          >
            Earn Chaos
          </motion.button>

          {/* Search */}
          <motion.button
            className="text-white hover:text-gray-300"
            onClick={() => setShowSearch(!showSearch)}
            whileHover={{ scale: 1.1 }}
          >
            <Search className="w-6 h-6" />
          </motion.button>

          {/* Profile */}
          <motion.button
            className="text-white hover:text-gray-300"
            whileHover={{ scale: 1.1 }}
          >
            <User className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Emergency Menu Dropdown */}
      <AnimatePresence>
        {showEmergencyMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-6 top-16 bg-red-900 border border-red-700 rounded-lg p-4 min-w-64"
          >
            <h3 className="text-white font-bold mb-3">🚨 EMERGENCY TOOLS</h3>
            <div className="space-y-2">
              <button className="w-full text-left text-white hover:bg-red-800 p-2 rounded">
                📡 Emergency Communications
              </button>
              <button className="w-full text-left text-white hover:bg-red-800 p-2 rounded">
                🗺️ Safe Zone Locator
              </button>
              <button className="w-full text-left text-white hover:bg-red-800 p-2 rounded">
                🎒 Bug-Out Checklist
              </button>
              <button className="w-full text-left text-white hover:bg-red-800 p-2 rounded">
                👥 Find Local Network
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Search */}
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

// Enhanced Hero Section for Apocalypse
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

      {/* Crisis Alert Banner */}
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Skull className="w-12 h-12 text-red-500" />
              <div className="text-red-400 font-bold text-xl">APOCALYPSE MODE</div>
            </div>
          </motion.div>

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

            <motion.button
              className="flex items-center space-x-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-6 h-6" />
              <span>Find Your Tribe</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center space-x-6 mt-8"
          >
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white">12,847 Rebels Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <Radio className="w-5 h-5 text-red-400" />
              <span className="text-white">23 Live Streams</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="text-white">Crisis Level: MODERATE</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Content Card for Apocalypse
export const ApocalypseContentCard = ({ item, userPoints, onPlay, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canAccess = userPoints >= item.cost;

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-red-400 border-red-400';
      case 'high': return 'text-orange-400 border-orange-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      default: return 'text-green-400 border-green-400';
    }
  };

  const getTypeIcon = () => {
    switch (item.type) {
      case 'survival': return <Shield className="w-4 h-4" />;
      case 'resistance': return <Zap className="w-4 h-4" />;
      case 'streaming': return <Radio className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
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
        
        {/* Urgency Badge */}
        {item.urgency && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold border ${getUrgencyColor(item.urgency)}`}>
            {item.urgency.toUpperCase()}
          </div>
        )}

        {/* Live Indicator */}
        {item.isLive && (
          <div className="absolute top-2 right-2 flex items-center space-x-1 bg-red-600 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-xs font-bold">LIVE</span>
          </div>
        )}

        {/* Cost/Lock Overlay */}
        {!canAccess && item.cost > 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold">{item.cost} CHAOS</div>
            </div>
          </div>
        )}

        {/* Free Content Badge */}
        {item.cost === 0 && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            FREE
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
            
            {/* Skills Display */}
            {item.skills && (
              <div className="flex flex-wrap gap-1 mb-3">
                {item.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Community Info */}
            {item.members && (
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">{item.members} members</span>
              </div>
            )}
            
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
                <span>{canAccess ? (item.isLive ? 'Join Live' : 'Access') : 'Locked'}</span>
              </button>

              <div className="flex items-center space-x-2">
                {item.urgency && (
                  <div className={`w-3 h-3 rounded-full ${
                    item.urgency === 'critical' ? 'bg-red-500' :
                    item.urgency === 'high' ? 'bg-orange-500' :
                    item.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Enhanced Tasks Modal for Apocalypse
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

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'border-red-500 bg-red-500 bg-opacity-10';
      case 'high': return 'border-orange-500 bg-orange-500 bg-opacity-10';
      case 'medium': return 'border-yellow-500 bg-yellow-500 bg-opacity-10';
      default: return 'border-green-500 bg-green-500 bg-opacity-10';
    }
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
                    : getUrgencyColor(task.urgency)
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full ${
                      task.completed ? 'bg-green-500' : 
                      task.urgency === 'critical' ? 'bg-red-600' :
                      task.urgency === 'high' ? 'bg-orange-600' :
                      'bg-gray-700'
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
                      <div className={`inline-block mt-2 px-2 py-1 rounded text-xs font-bold ${
                        task.urgency === 'critical' ? 'bg-red-600 text-white' :
                        task.urgency === 'high' ? 'bg-orange-600 text-white' :
                        'bg-yellow-600 text-black'
                      }`}>
                        {task.urgency?.toUpperCase()} PRIORITY
                      </div>
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

        {/* Crisis Status */}
        <div className="mt-8 p-6 bg-red-900 bg-opacity-30 border border-red-600 rounded-lg">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span>CURRENT CRISIS LEVEL</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">MODERATE</div>
              <div className="text-gray-400">System Instability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">12,847</div>
              <div className="text-gray-400">Active Rebels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">23</div>
              <div className="text-gray-400">Live Streams</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Content Row for Apocalypse
export const ApocalypseContentRow = ({ title, content, userPoints, onPlay, urgent = false }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = Math.max(0, content.length * 300 - window.innerWidth + 100);

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
          {urgent && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              URGENT
            </span>
          )}
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

// User Profile Component
export const UserProfile = ({ user, onClose }) => {
  const userTypeInfo = userTypes[user.type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gray-900 border border-red-600 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img 
            src={user.profile.avatar} 
            alt={user.profile.displayName}
            className="w-20 h-20 rounded-full border-2 border-red-600"
          />
          <div>
            <h2 className="text-3xl font-bold text-white">{user.profile.displayName}</h2>
            <div className="flex items-center space-x-3 mt-2">
              <span className={`${userTypeInfo.color} font-semibold`}>
                {userTypeInfo.icon} {userTypeInfo.name}
              </span>
              <span className="text-gray-400">Level {user.level}</span>
              {user.profile.verified && (
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">✓ VERIFIED</span>
              )}
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Bio */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-bold text-xl mb-4">About</h3>
            <p className="text-gray-300">{user.profile.bio}</p>
            <div className="mt-4 text-gray-400">
              📍 {user.profile.location}
            </div>
          </div>

          {/* Memecoin */}
          <div className="bg-gradient-to-r from-yellow-900 to-orange-900 p-6 rounded-lg border border-yellow-600">
            <h3 className="text-white font-bold text-xl mb-4 flex items-center space-x-2">
              <span>💰</span>
              <span>{user.memecoin.name} Memecoin</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-yellow-400 font-bold text-2xl">{user.memecoin.symbol}</div>
                <div className="text-gray-300 text-sm">Symbol</div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold text-2xl">{user.memecoin.value}</div>
                <div className="text-gray-300 text-sm">CHAOS per token</div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold text-2xl">{user.memecoin.supply.toLocaleString()}</div>
                <div className="text-gray-300 text-sm">Total Supply</div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold text-2xl">{user.memecoin.holders}</div>
                <div className="text-gray-300 text-sm">Holders</div>
              </div>
            </div>
            <button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-3 rounded-lg transition-colors">
              Buy {user.memecoin.symbol} Tokens
            </button>
          </div>

          {/* Skills */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-bold text-xl mb-4">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.map((skill, index) => (
                <span key={index} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Intro Video */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-bold text-xl mb-4">Introduction Video</h3>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${user.profile.introVideo}`}
                title="User Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-bold text-xl mb-4">Connect</h3>
            <div className="space-y-3">
              {Object.entries(user.profile.socialLinks).map(([platform, handle]) => (
                <div key={platform} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold capitalize">{platform}</div>
                    <div className="text-gray-400 text-sm">{handle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-bold text-xl mb-4">Marketplace Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-green-400 font-bold text-2xl">{user.profile.reputation}/5</div>
                <div className="text-gray-300 text-sm">Reputation</div>
              </div>
              <div>
                <div className="text-green-400 font-bold text-2xl">{user.profile.totalTrades}</div>
                <div className="text-gray-300 text-sm">Total Trades</div>
              </div>
              <div>
                <div className="text-green-400 font-bold text-2xl">{user.marketplace.activeListings}</div>
                <div className="text-gray-300 text-sm">Active Listings</div>
              </div>
              <div>
                <div className="text-green-400 font-bold text-2xl">{user.marketplace.revenue.toLocaleString()}</div>
                <div className="text-gray-300 text-sm">CHAOS Earned</div>
              </div>
            </div>
          </div>
        </div>
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
      // Simulate purchase success
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

        {/* Categories */}
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

        {/* Items Grid */}
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

        {/* Item Detail Modal */}
        <AnimatePresence>
          {showItemDetail && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowItemDetail(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 border border-red-600 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-white">{selectedItem.title}</h2>
                  <button
                    onClick={() => setShowItemDetail(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src={selectedItem.images[0]} 
                      alt={selectedItem.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-bold text-xl mb-2">Description</h3>
                      <p className="text-gray-300">{selectedItem.description}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Coins className="w-6 h-6 text-yellow-400" />
                        <span className="text-white font-bold text-3xl">{selectedItem.price}</span>
                        <span className="text-gray-400">CHAOS</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{selectedItem.rating}</span>
                        <span className="text-gray-400">({selectedItem.reviews} reviews)</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">Seller Info</h4>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">@{selectedItem.seller}</div>
                            <div className="text-gray-400 text-sm">{userTypes[selectedItem.sellerType]?.name}</div>
                          </div>
                        </div>
                        <div className="text-gray-300 text-sm">
                          📍 {selectedItem.location} • 🚚 {selectedItem.shipping}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePurchase(selectedItem)}
                      disabled={userPoints < selectedItem.price}
                      className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                        userPoints >= selectedItem.price
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {userPoints >= selectedItem.price 
                        ? `Purchase for ${selectedItem.price} CHAOS` 
                        : `Need ${selectedItem.price - userPoints} more CHAOS`
                      }
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Community Profiles Grid
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

        {/* User Type Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Object.entries(userTypes).map(([key, type]) => (
            <div key={key} className={`${type.bgColor} border border-gray-600 rounded-lg p-4 text-center`}>
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className={`font-bold ${type.color}`}>{type.name}</div>
              <div className="text-gray-400 text-sm mt-1">{type.description}</div>
            </div>
          ))}
        </div>

        {/* User Profiles Grid */}
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
                      <span className="text-gray-400 text-sm">Lv.{user.level}</span>
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

                <div className="bg-gradient-to-r from-yellow-900 to-orange-900 p-3 rounded-lg border border-yellow-600">
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold">{user.memecoin.symbol}</div>
                    <div className="text-gray-300 text-xs">{user.memecoin.value} CHAOS/token</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* User Profile Modal */}
        <AnimatePresence>
          {showProfile && selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowProfile(false)}
            >
              <UserProfile 
                user={selectedUser} 
                onClose={() => setShowProfile(false)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Live Stream Component
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



// Enhanced Video Player Component for Apocalypse Content
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
        {content.type === 'podcast' || content.category === 'entertainment' ? (
          <div className="text-center p-8 max-w-4xl">
            <img
              src={content.cover || content.thumbnail || content.poster}
              alt={content.title}
              className="w-64 h-64 mx-auto rounded-lg mb-6"
            />
            <h2 className="text-4xl font-bold text-white mb-4">{content.title}</h2>
            <p className="text-gray-400 mb-6 text-xl">{content.description}</p>
            <div className="bg-red-900 border border-red-600 p-8 rounded-lg">
              <div className="text-white mb-6 text-2xl">🎵 CHAOS AUDIO PLAYER</div>
              <div className="text-gray-300 mb-4">Now Playing: {content.title}</div>
              <div className="flex items-center space-x-4 justify-center">
                <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full">
                  <Play className="w-6 h-6" />
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full">
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ) : content.type === 'text' ? (
          <div className="max-w-4xl mx-auto p-8 text-white overflow-y-auto max-h-full">
            <h1 className="text-5xl font-bold mb-6 text-red-400">{content.title}</h1>
            <div className="text-gray-400 mb-8 text-lg">By {content.author} • {content.readTime}</div>
            <div className="prose prose-invert max-w-none text-lg leading-relaxed">
              <p className="mb-6">
                This is critical survival content for the #THRIVECHAOS community. In times of crisis, 
                knowledge becomes power, and power ensures survival.
              </p>
              <p className="mb-6">
                The apocalypse isn't just about physical survival - it's about maintaining your humanity, 
                building resilient communities, and creating systems that work when traditional ones fail.
              </p>
              <p className="mb-6">
                This platform serves as your guide through the chaos, providing practical skills, 
                community connections, and the entertainment needed to maintain morale during difficult times.
              </p>
              <h2 className="text-3xl font-bold text-red-400 mb-4">Key Survival Principles</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adapt quickly to changing circumstances</li>
                <li>Build and maintain community connections</li>
                <li>Develop multiple skill sets for self-sufficiency</li>
                <li>Stay informed but avoid information overload</li>
                <li>Maintain mental health through entertainment and social connection</li>
              </ul>
            </div>
          </div>
        ) : content.isLive || content.category ? (
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
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white">Broadcasting Live</span>
              </div>
              <div className="bg-black p-6 rounded-lg mb-6">
                <div className="text-green-400 font-mono text-sm">
                  > CHAOS NETWORK ESTABLISHED<br/>
                  > SECURE CONNECTION ACTIVE<br/>
                  > STREAM QUALITY: HIGH<br/>
                  > REBEL COUNT: {content.viewers}
                </div>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold">
                Join Voice Chat
              </button>
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