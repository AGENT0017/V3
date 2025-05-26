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
  const [userPoints, setUserPoints] = useState(125); // Starting points
  const [currentView, setCurrentView] = useState('home');
  const [showTasks, setShowTasks] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlay = (content) => {
    if (userPoints >= content.cost) {
      setUserPoints(prev => prev - content.cost);
      setSelectedContent(content);
      setShowPlayer(true);
    }
  };

  const getFilteredContent = () => {
    switch (currentView) {
      case 'survival':
        return { survival: apocalypseContent.survival };
      case 'resistance':
        return { resistance: apocalypseContent.resistance };
      case 'entertainment':
        return { entertainment: apocalypseContent.entertainment };
      case 'streams':
        return { streams: mockLiveStreams };
      default:
        return {
          survival: apocalypseContent.survival,
          resistance: apocalypseContent.resistance,
          entertainment: apocalypseContent.entertainment,
          streams: mockLiveStreams
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
      />

      {currentView === 'home' && (
        <>
          <HeroSection userPoints={userPoints} />
          <div className="pt-12 space-y-12">
            {content.trending && (
              <ContentRow 
                title="Trending Now" 
                content={content.trending} 
                userPoints={userPoints}
                onPlay={handlePlay}
              />
            )}
            {content.movies && (
              <ContentRow 
                title="Popular Movies" 
                content={content.movies} 
                userPoints={userPoints}
                onPlay={handlePlay}
              />
            )}
            {content.shows && (
              <ContentRow 
                title="TV Series" 
                content={content.shows} 
                userPoints={userPoints}
                onPlay={handlePlay}
              />
            )}
            {content.podcasts && (
              <ContentRow 
                title="Featured Podcasts" 
                content={content.podcasts} 
                userPoints={userPoints}
                onPlay={handlePlay}
              />
            )}
            {content.interactive && (
              <ContentRow 
                title="Interactive Experiences" 
                content={content.interactive} 
                userPoints={userPoints}
                onPlay={handlePlay}
              />
            )}
            {content.articles && (
              <ContentRow 
                title="Premium Articles" 
                content={content.articles} 
                userPoints={userPoints}
                onPlay={handlePlay}
              />
            )}
          </div>
        </>
      )}

      {currentView !== 'home' && (
        <div className="pt-24 space-y-12">
          {Object.entries(content).map(([key, items]) => (
            <ContentRow 
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)} 
              content={items} 
              userPoints={userPoints}
              onPlay={handlePlay}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {showTasks && (
          <TasksModal
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

      {/* Welcome Message */}
      {userPoints === 125 && (
        <div className="fixed bottom-6 right-6 bg-white text-black p-4 rounded-lg shadow-lg max-w-sm z-40">
          <h3 className="font-bold mb-2">Welcome to #THRIVECHAOS!</h3>
          <p className="text-sm">You have 125 starting points. Complete tasks to earn more and unlock premium content!</p>
        </div>
      )}
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