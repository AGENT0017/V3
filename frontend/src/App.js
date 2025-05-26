import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import {
  Header,
  ApocalypseHero,
  ApocalypseContentRow,
  ApocalypseTasksModal,
  VideoPlayer,
  LiveStreamGrid
} from './components';

// Enhanced Mock Data for Apocalypse Survival Platform
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
    },
    {
      id: 1004,
      title: "Communication in Crisis",
      description: "Stay connected when traditional networks fail.",
      poster: "https://images.pexels.com/photos/7533332/pexels-photo-7533332.jpeg?w=300",
      cost: 30,
      type: "survival",
      urgency: "high",
      youtube_id: "dQw4w9WgXcQ",
      skills: ["HAM radio", "Mesh networks", "Signal fires"]
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
    },
    {
      id: 2003,
      title: "Community Organization",
      description: "Build resilient networks that survive system collapse.",
      poster: "https://images.unsplash.com/photo-1717548379141-3060abccd58d?w=300",
      cost: 35,
      type: "resistance",
      urgency: "high",
      youtube_id: "dQw4w9WgXcQ",
      skills: ["Leadership", "Consensus building", "Resource management"]
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
    },
    {
      id: 3003,
      title: "Resistance Music Sessions",
      description: "Songs that fuel the rebellion spirit.",
      poster: "https://images.pexels.com/photos/3820514/pexels-photo-3820514.jpeg?w=300",
      cost: 10,
      type: "podcast",
      genre: "music",
      isLive: false,
      mood: "motivation"
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
  },
  {
    id: 502,
    title: "Survival Skills Workshop",
    description: "Learn essential skills with live Q&A",
    thumbnail: "https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=300",
    streamer: "SurvivalMaster",
    viewers: 1203,
    category: "education",
    isLive: true
  },
  {
    id: 503,
    title: "Underground Music Night",
    description: "Resistance anthems and community vibes",
    thumbnail: "https://images.unsplash.com/photo-1642810814997-31c017df06a8?w=300",
    streamer: "ChaosBeats",
    viewers: 3421,
    category: "entertainment",
    isLive: true
  }
];

const Home = () => {
  const [userPoints, setUserPoints] = useState(200); // Increased starting points for apocalypse mode
  const [currentView, setCurrentView] = useState('home');
  const [showTasks, setShowTasks] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [crisisMode, setCrisisMode] = useState(true); // Always in crisis mode

  const handlePlay = (content) => {
    if (userPoints >= content.cost) {
      setUserPoints(prev => prev - content.cost);
      setSelectedContent(content);
      setShowPlayer(true);
    }
  };

  const handleJoinStream = (stream) => {
    setSelectedContent(stream);
    setShowPlayer(true);
  };

  const getFilteredContent = () => {
    switch (currentView) {
      case 'survival':
        return { survival: apocalypseContent.survival };
      case 'resistance':
        return { resistance: apocalypseContent.resistance };
      case 'streaming':
        return { streams: mockLiveStreams };
      case 'community':
        return { community: apocalypseContent.survival }; // Using survival as community placeholder
      case 'intel':
        return { intel: apocalypseContent.resistance }; // Using resistance as intel placeholder
      default:
        return {
          survival: apocalypseContent.survival,
          resistance: apocalypseContent.resistance,
          entertainment: apocalypseContent.entertainment,
          streams: mockLiveStreams.slice(0, 3)
        };
    }
  };

  const content = getFilteredContent();

  return (
    <div className="min-h-screen bg-black">
      <Header 
        userPoints={userPoints}
        setUserPoints={setUserPoints}
        setCurrentView={setCurrentView}
        setShowTasks={setShowTasks}
        crisisMode={crisisMode}
      />

      {currentView === 'home' && (
        <>
          <ApocalypseHero userPoints={userPoints} crisisMode={crisisMode} />
          <div className="pt-12 space-y-12">
            {content.survival && (
              <ApocalypseContentRow 
                title="🛡️ CRITICAL SURVIVAL SKILLS" 
                content={content.survival} 
                userPoints={userPoints}
                onPlay={handlePlay}
                urgent={true}
              />
            )}
            {content.resistance && (
              <ApocalypseContentRow 
                title="⚡ RESISTANCE TRAINING" 
                content={content.resistance} 
                userPoints={userPoints}
                onPlay={handlePlay}
                urgent={false}
              />
            )}
            {content.entertainment && (
              <ApocalypseContentRow 
                title="🎭 CHAOS ENTERTAINMENT" 
                content={content.entertainment} 
                userPoints={userPoints}
                onPlay={handlePlay}
                urgent={false}
              />
            )}
            {content.streams && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 px-6 flex items-center space-x-3">
                  <span>📡 LIVE RESISTANCE STREAMS</span>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    LIVE NOW
                  </span>
                </h2>
                <LiveStreamGrid 
                  streams={content.streams} 
                  userPoints={userPoints}
                  onJoinStream={handleJoinStream}
                />
              </div>
            )}
          </div>
        </>
      )}

      {currentView === 'streaming' && (
        <div className="pt-24">
          <div className="text-center mb-12 px-6">
            <h1 className="text-5xl font-bold text-white mb-4">📡 LIVE STREAMS</h1>
            <p className="text-xl text-gray-400">Real-time intelligence, survival training, and community support</p>
          </div>
          <LiveStreamGrid 
            streams={mockLiveStreams} 
            userPoints={userPoints}
            onJoinStream={handleJoinStream}
          />
        </div>
      )}

      {currentView !== 'home' && currentView !== 'streaming' && (
        <div className="pt-24 space-y-12">
          {Object.entries(content).map(([key, items]) => (
            <ApocalypseContentRow 
              key={key}
              title={`${key.charAt(0).toUpperCase() + key.slice(1)} Content`} 
              content={items} 
              userPoints={userPoints}
              onPlay={handlePlay}
              urgent={key === 'survival'}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {showTasks && (
          <ApocalypseTasksModal
            isOpen={showTasks}
            onClose={() => setShowTasks(false)}
            userPoints={userPoints}
            setUserPoints={setUserPoints}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPlayer && (
          <VideoPlayer
            content={selectedContent}
            isOpen={showPlayer}
            onClose={() => setShowPlayer(false)}
          />
        )}
      </AnimatePresence>

      {/* Apocalypse Welcome Message */}
      {userPoints === 200 && (
        <div className="fixed bottom-6 right-6 bg-red-900 border border-red-600 text-white p-4 rounded-lg shadow-lg max-w-sm z-40">
          <h3 className="font-bold mb-2 flex items-center space-x-2">
            <span>🔥</span>
            <span>Welcome to the Chaos!</span>
          </h3>
          <p className="text-sm">You have 200 CHAOS points. Complete missions to earn more and access survival content!</p>
        </div>
      )}

      {/* Crisis Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-900 bg-opacity-90 text-white p-2 text-center text-sm font-semibold">
        🚨 CRISIS LEVEL: MODERATE | 12,847 REBELS ONLINE | SYSTEM STABILITY: 67%
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;