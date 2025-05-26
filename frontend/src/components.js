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

// Enhanced Mock Data for Apocalypse Survival
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