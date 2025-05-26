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
  Check
} from 'lucide-react';

// Mock TMDB API data
const mockMovies = [
  {
    id: 1,
    title: "Quantum Nexus",
    overview: "A mind-bending sci-fi thriller about parallel universes colliding.",
    backdrop_path: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=1200",
    poster_path: "https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=300",
    vote_average: 8.5,
    release_date: "2024-03-15",
    genre_ids: [878, 53],
    cost: 75,
    type: "movie",
    youtube_id: "dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Shadow Protocol",
    overview: "Elite agents navigate a world of espionage and betrayal.",
    backdrop_path: "https://images.unsplash.com/photo-1642810814997-31c017df06a8?w=1200",
    poster_path: "https://images.pexels.com/photos/7533332/pexels-photo-7533332.jpeg?w=300",
    vote_average: 7.8,
    release_date: "2024-01-20",
    genre_ids: [28, 53],
    cost: 60,
    type: "movie",
    youtube_id: "dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Digital Dreams",
    overview: "A cyberpunk adventure in a virtual reality world.",
    backdrop_path: "https://images.unsplash.com/photo-1717548379141-3060abccd58d?w=1200",
    poster_path: "https://images.unsplash.com/photo-1717548381519-10ee59c67150?w=300",
    vote_average: 9.1,
    release_date: "2024-04-10",
    genre_ids: [878, 28],
    cost: 90,
    type: "movie",
    youtube_id: "dQw4w9WgXcQ"
  }
];

const mockTVShows = [
  {
    id: 101,
    title: "Chaos Theory",
    overview: "Scientists discover reality is more fragile than they imagined.",
    backdrop_path: "https://images.unsplash.com/photo-1717548384641-2bc48d1ad0e5?w=1200",
    poster_path: "https://images.pexels.com/photos/3820514/pexels-photo-3820514.jpeg?w=300",
    vote_average: 8.9,
    first_air_date: "2024-02-14",
    genre_ids: [18, 878],
    cost: 45,
    type: "tv",
    episodes: 12,
    youtube_id: "dQw4w9WgXcQ"
  }
];

const mockPodcasts = [
  {
    id: 201,
    title: "The Thrive Mindset",
    description: "Weekly discussions on personal growth and success strategies.",
    cover: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=300",
    episodes: 45,
    cost: 20,
    type: "podcast",
    duration: "45 min avg"
  },
  {
    id: 202,
    title: "Chaos Chronicles",
    description: "True stories of overcoming impossible odds.",
    cover: "https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=300",
    episodes: 23,
    cost: 25,
    type: "podcast",
    duration: "60 min avg"
  }
];

const mockInteractiveContent = [
  {
    id: 301,
    title: "The Heist",
    description: "Make choices that determine the outcome of this interactive thriller.",
    poster: "https://images.unsplash.com/photo-1642810814997-31c017df06a8?w=300",
    cost: 120,
    type: "interactive",
    duration: "2-4 hours",
    choices: 47
  }
];

const mockTextContent = [
  {
    id: 401,
    title: "Building Digital Empires",
    excerpt: "The ultimate guide to creating successful online businesses.",
    cover: "https://images.pexels.com/photos/7533332/pexels-photo-7533332.jpeg?w=300",
    cost: 15,
    type: "text",
    readTime: "12 min read",
    author: "Alex Chen"
  }
];

const mockTasks = [
  {
    id: 1,
    title: "Share on Social Media",
    description: "Share any content from #THRIVECHAOS on your social media",
    reward: 50,
    icon: Share2,
    completed: false,
    type: "social"
  },
  {
    id: 2,
    title: "Daily Check-in",
    description: "Visit #THRIVECHAOS platform daily",
    reward: 10,
    icon: Calendar,
    completed: true,
    type: "daily"
  },
  {
    id: 3,
    title: "Rate Content",
    description: "Rate 5 pieces of content to help others discover great material",
    reward: 25,
    icon: Star,
    completed: false,
    type: "engagement",
    progress: 2,
    target: 5
  },
  {
    id: 4,
    title: "Invite a Friend",
    description: "Invite a friend to join #THRIVECHAOS",
    reward: 200,
    icon: Gift,
    completed: false,
    type: "referral"
  },
  {
    id: 5,
    title: "Create Playlist",
    description: "Create your first personalized content playlist",
    reward: 30,
    icon: Heart,
    completed: false,
    type: "engagement"
  }
];

// Header Component
export const Header = ({ userPoints, setUserPoints, setCurrentView, setShowTasks }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 w-full bg-black bg-opacity-95 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-8">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentView('home')}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-white">#THRIVECHAOS</div>
          </motion.div>
          
          <nav className="hidden md:flex space-x-6">
            {['Home', 'Movies', 'TV Shows', 'Podcasts', 'Interactive', 'Text'].map((item) => (
              <motion.button
                key={item}
                className="text-white hover:text-gray-300 transition-colors"
                onClick={() => setCurrentView(item.toLowerCase().replace(' ', ''))}
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Points Display */}
          <motion.div 
            className="flex items-center space-x-2 bg-gray-900 px-4 py-2 rounded-full cursor-pointer"
            onClick={() => setShowTasks(true)}
            whileHover={{ scale: 1.05 }}
          >
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">{userPoints}</span>
          </motion.div>

          {/* Earn Points Button */}
          <motion.button
            className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            onClick={() => setShowTasks(true)}
            whileHover={{ scale: 1.05 }}
          >
            Earn Points
          </motion.button>

          {/* Search */}
          <motion.button
            className="text-white hover:text-gray-300"
            onClick={() => setShowSearch(!showSearch)}
            whileHover={{ scale: 1.1 }}
          >
            <Search className="w-6 h-6" />
          </motion.button>

          {/* Notifications */}
          <motion.button
            className="text-white hover:text-gray-300"
            whileHover={{ scale: 1.1 }}
          >
            <Bell className="w-6 h-6" />
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

      {/* Search Bar */}
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
              placeholder="Search movies, shows, podcasts, articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Hero Section Component
export const HeroSection = ({ userPoints }) => {
  const [currentHero, setCurrentHero] = useState(0);
  const heroContent = [...mockMovies, ...mockTVShows];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroContent.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroContent.length]);

  const current = heroContent[currentHero];
  const canWatch = userPoints >= current.cost;

  return (
    <div className="relative h-screen overflow-hidden">
      <motion.div
        key={currentHero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${current.backdrop_path})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex items-center h-full px-6 md:px-12">
        <div className="max-w-2xl">
          <motion.h1
            key={`title-${currentHero}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            {current.title}
          </motion.h1>

          <motion.p
            key={`overview-${currentHero}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-gray-200 mb-6 max-w-xl"
          >
            {current.overview}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center space-x-4"
          >
            <motion.button
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
                canWatch
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}
              whileHover={canWatch ? { scale: 1.05 } : {}}
              disabled={!canWatch}
            >
              {canWatch ? <Play className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              <span>{canWatch ? 'Play' : `${current.cost} points needed`}</span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-2 px-8 py-3 bg-gray-700 bg-opacity-80 text-white rounded-lg font-semibold hover:bg-opacity-100 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Info className="w-6 h-6" />
              <span>More Info</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center space-x-4 mt-6"
          >
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white font-semibold">{current.vote_average}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="text-white">{current.cost} points</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Content Card Component
export const ContentCard = ({ item, userPoints, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canAccess = userPoints >= item.cost;

  const getTypeIcon = () => {
    switch (item.type) {
      case 'movie': return <Play className="w-4 h-4" />;
      case 'tv': return <Play className="w-4 h-4" />;
      case 'podcast': return <Volume2 className="w-4 h-4" />;
      case 'interactive': return <Gamepad2 className="w-4 h-4" />;
      case 'text': return <BookOpen className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={item.poster_path || item.cover || item.poster}
          alt={item.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {!canAccess && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="text-white font-semibold">{item.cost} points</div>
            </div>
          </div>
        )}

        <div className="absolute top-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded-full flex items-center space-x-1">
          {getTypeIcon()}
          <Coins className="w-4 h-4 text-yellow-400" />
          <span className="text-white text-sm">{item.cost}</span>
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 p-4 rounded-b-lg"
          >
            <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {item.overview || item.description || item.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => canAccess && onPlay(item)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  canAccess
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}
                disabled={!canAccess}
              >
                {canAccess ? getTypeIcon() : <Lock className="w-4 h-4" />}
                <span>{canAccess ? 'Play' : 'Locked'}</span>
              </button>

              <div className="flex items-center space-x-2">
                {item.vote_average && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{item.vote_average}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Content Row Component
export const ContentRow = ({ title, content, userPoints, onPlay }) => {
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
        <h2 className="text-2xl font-bold text-white">{title}</h2>
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
          {content.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-72">
              <ContentCard item={item} userPoints={userPoints} onPlay={onPlay} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Tasks Modal Component
export const TasksModal = ({ isOpen, onClose, userPoints, setUserPoints }) => {
  const [tasks, setTasks] = useState(mockTasks);

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
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Earn Points</h2>
            <p className="text-gray-400 mt-2">Complete tasks to unlock premium content</p>
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

                {task.progress && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{task.progress}/{task.target}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${(task.progress / task.target) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {!task.completed && (
                  <button
                    onClick={() => completeTask(task.id)}
                    className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Complete Task
                  </button>
                )}

                {task.completed && (
                  <div className="text-center text-green-400 font-semibold">
                    ✓ Completed
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
        {content.type === 'podcast' ? (
          <div className="text-center p-8">
            <img
              src={content.cover}
              alt={content.title}
              className="w-64 h-64 mx-auto rounded-lg mb-6"
            />
            <h2 className="text-3xl font-bold text-white mb-4">{content.title}</h2>
            <p className="text-gray-400 mb-6">{content.description}</p>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="text-white mb-4">🎵 Audio Player Simulation</div>
              <div className="text-gray-400">Playing: Episode 1 - Introduction</div>
            </div>
          </div>
        ) : content.type === 'text' ? (
          <div className="max-w-4xl mx-auto p-8 text-white">
            <h1 className="text-4xl font-bold mb-6">{content.title}</h1>
            <div className="text-gray-400 mb-8">By {content.author} • {content.readTime}</div>
            <div className="prose prose-invert max-w-none">
              <p>This is a sample article content. In a real implementation, this would contain the full article text with proper formatting, images, and interactive elements.</p>
              <p>The #THRIVECHAOS platform provides premium text content that helps users grow and develop new skills through comprehensive guides and articles.</p>
            </div>
          </div>
        ) : content.type === 'interactive' ? (
          <div className="text-center p-8">
            <h2 className="text-3xl font-bold text-white mb-6">{content.title}</h2>
            <p className="text-gray-400 mb-8">{content.description}</p>
            <div className="bg-gray-800 p-8 rounded-lg">
              <div className="text-white mb-6">🎮 Interactive Experience</div>
              <div className="text-gray-400 mb-4">You wake up in a mysterious room...</div>
              <div className="space-y-4">
                <button className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors">
                  → Look around the room
                </button>
                <button className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors">
                  → Check your pockets
                </button>
                <button className="block w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors">
                  → Try the door
                </button>
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