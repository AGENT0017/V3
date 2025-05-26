import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import {
  Header,
  HeroSection,
  ContentRow,
  TasksModal,
  VideoPlayer
} from './components';

// Mock data imports (these would normally come from APIs)
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
  },
  {
    id: 4,
    title: "Neon Nights",
    overview: "A detective story set in a futuristic cityscape.",
    backdrop_path: "https://images.unsplash.com/photo-1717548384641-2bc48d1ad0e5?w=1200",
    poster_path: "https://images.pexels.com/photos/3820514/pexels-photo-3820514.jpeg?w=300",
    vote_average: 8.2,
    release_date: "2024-05-22",
    genre_ids: [80, 878],
    cost: 80,
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
  },
  {
    id: 102,
    title: "Digital Minds",
    overview: "AI consciousness emerges in unexpected ways.",
    backdrop_path: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=1200",
    poster_path: "https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=300",
    vote_average: 9.3,
    first_air_date: "2024-03-10",
    genre_ids: [18, 878],
    cost: 50,
    type: "tv",
    episodes: 8,
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
  },
  {
    id: 203,
    title: "Future Insights",
    description: "Exploring emerging technologies and their impact.",
    cover: "https://images.unsplash.com/photo-1642810814997-31c017df06a8?w=300",
    episodes: 67,
    cost: 30,
    type: "podcast",
    duration: "35 min avg"
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
  },
  {
    id: 302,
    title: "Space Colony",
    description: "Build and manage your own space station in this strategy experience.",
    poster: "https://images.pexels.com/photos/7533332/pexels-photo-7533332.jpeg?w=300",
    cost: 150,
    type: "interactive",
    duration: "3-6 hours",
    choices: 89
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
  },
  {
    id: 402,
    title: "The Psychology of Success",
    excerpt: "Understanding the mental frameworks that drive achievement.",
    cover: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=300",
    cost: 18,
    type: "text",
    readTime: "15 min read",
    author: "Dr. Sarah Kim"
  },
  {
    id: 403,
    title: "Chaos Theory in Business",
    excerpt: "How embracing uncertainty can lead to breakthrough innovations.",
    cover: "https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=300",
    cost: 22,
    type: "text",
    readTime: "18 min read",
    author: "Marcus Rivera"
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
      case 'movies':
        return { movies: mockMovies };
      case 'tvshows':
        return { shows: mockTVShows };
      case 'podcasts':
        return { podcasts: mockPodcasts };
      case 'interactive':
        return { interactive: mockInteractiveContent };
      case 'text':
        return { articles: mockTextContent };
      default:
        return {
          trending: [...mockMovies.slice(0, 2), ...mockTVShows.slice(0, 1)],
          movies: mockMovies,
          shows: mockTVShows,
          podcasts: mockPodcasts,
          interactive: mockInteractiveContent,
          articles: mockTextContent
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