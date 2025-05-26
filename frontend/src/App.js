import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ApocalypseHero, 
  Header, 
  InteractiveFilm, 
  SurvivalAcademy,
  Agent17Dashboard,
  TinderOfDoers,
  BloodDonationTracker,
  MarketplaceGear,
  EventBookingSystem,
  LiveDataFeeds,
  TokenDAO,
  CommunityHub,
  CrisisCommand
} from './components';
import { 
  MLMDashboard, 
  WellnessHub, 
  UserProfile, 
  SubscriptionTiers,
  ContentCreationStudio,
  Analytics
} from './business-components';

function App() {
  const [user, setUser] = useState({
    id: "agent_001",
    name: "Rebel Leader",
    points: 15847,
    agent17Tokens: 250,
    bloodType: "O+",
    vaccinationStatus: "Current",
    skills: ["Crisis Management", "Survival Training", "Community Building"],
    location: "Global Network",
    trustScore: 95,
    missionsCompleted: 23,
    level: "Elite Agent"
  });

  const [currentView, setCurrentView] = useState('hero');
  const [crisisMode, setCrisisMode] = useState(false);
  const [globalData, setGlobalData] = useState({
    activeCrises: 47,
    rebelsActive: 12847,
    countriesActive: 89,
    systemStability: 67,
    lastUpdate: new Date()
  });

  // Real-time crisis monitoring
  useEffect(() => {
    const monitorCrises = setInterval(() => {
      // Simulate real-time data updates
      setGlobalData(prev => ({
        ...prev,
        rebelsActive: prev.rebelsActive + Math.floor(Math.random() * 10 - 5),
        systemStability: Math.max(20, Math.min(100, prev.systemStability + Math.floor(Math.random() * 6 - 3))),
        lastUpdate: new Date()
      }));
      
      // Crisis mode activation logic
      if (globalData.systemStability < 30) {
        setCrisisMode(true);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(monitorCrises);
  }, [globalData.systemStability]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const updateUserPoints = (points) => {
    setUser(prev => ({
      ...prev,
      points: prev.points + points,
      agent17Tokens: prev.agent17Tokens + Math.floor(points / 10)
    }));
  };

  const renderCurrentView = () => {
    switch(currentView) {
      case 'hero':
        return <ApocalypseHero userPoints={user.points} crisisMode={crisisMode} onNavigate={handleViewChange} />;
      
      case 'film':
        return <InteractiveFilm user={user} onComplete={(points) => updateUserPoints(points)} onNavigate={handleViewChange} />;
      
      case 'academy':
        return <SurvivalAcademy user={user} onProgress={(points) => updateUserPoints(points)} onNavigate={handleViewChange} />;
      
      case 'agent17':
        return <Agent17Dashboard user={user} globalData={globalData} onNavigate={handleViewChange} />;
      
      case 'tinder':
        return <TinderOfDoers user={user} onMatch={(points) => updateUserPoints(points)} onNavigate={handleViewChange} />;
      
      case 'blood':
        return <BloodDonationTracker user={user} onDonate={(tokens) => updateUserPoints(tokens * 10)} onNavigate={handleViewChange} />;
      
      case 'marketplace':
        return <MarketplaceGear user={user} onPurchase={() => {}} onNavigate={handleViewChange} />;
      
      case 'events':
        return <EventBookingSystem user={user} onBook={() => {}} onNavigate={handleViewChange} />;
      
      case 'data':
        return <LiveDataFeeds globalData={globalData} onNavigate={handleViewChange} />;
      
      case 'token':
        return <TokenDAO user={user} onVote={(tokens) => updateUserPoints(tokens)} onNavigate={handleViewChange} />;
      
      case 'community':
        return <CommunityHub user={user} onConnect={(points) => updateUserPoints(points)} onNavigate={handleViewChange} />;
      
      case 'crisis':
        return <CrisisCommand user={user} globalData={globalData} onMission={(points) => updateUserPoints(points)} onNavigate={handleViewChange} />;
      
      case 'wellness':
        return <WellnessHub user={user} onComplete={(points) => updateUserPoints(points)} onNavigate={handleViewChange} />;
      
      case 'profile':
        return <UserProfile user={user} setUser={setUser} onNavigate={handleViewChange} />;
      
      default:
        return <ApocalypseHero userPoints={user.points} crisisMode={crisisMode} onNavigate={handleViewChange} />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        {/* Global Crisis Alert */}
        {crisisMode && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-2 animate-pulse">
            <div className="font-bold">🚨 GLOBAL CRISIS ACTIVATED - ALL AGENTS MOBILIZE 🚨</div>
          </div>
        )}

        {/* Main Header */}
        <Header 
          user={user}
          globalData={globalData}
          currentView={currentView}
          onNavigate={handleViewChange}
          crisisMode={crisisMode}
        />

        {/* Main Content */}
        <main className="relative">
          <Routes>
            <Route path="/" element={renderCurrentView()} />
            <Route path="/film" element={<InteractiveFilm user={user} onComplete={updateUserPoints} onNavigate={handleViewChange} />} />
            <Route path="/academy" element={<SurvivalAcademy user={user} onProgress={updateUserPoints} onNavigate={handleViewChange} />} />
            <Route path="/agent17" element={<Agent17Dashboard user={user} globalData={globalData} onNavigate={handleViewChange} />} />
            <Route path="/tinder" element={<TinderOfDoers user={user} onMatch={updateUserPoints} onNavigate={handleViewChange} />} />
            <Route path="/blood" element={<BloodDonationTracker user={user} onDonate={updateUserPoints} onNavigate={handleViewChange} />} />
            <Route path="/marketplace" element={<MarketplaceGear user={user} onNavigate={handleViewChange} />} />
            <Route path="/events" element={<EventBookingSystem user={user} onNavigate={handleViewChange} />} />
            <Route path="/data" element={<LiveDataFeeds globalData={globalData} onNavigate={handleViewChange} />} />
            <Route path="/token" element={<TokenDAO user={user} onVote={updateUserPoints} onNavigate={handleViewChange} />} />
            <Route path="/community" element={<CommunityHub user={user} onConnect={updateUserPoints} onNavigate={handleViewChange} />} />
            <Route path="/crisis" element={<CrisisCommand user={user} globalData={globalData} onMission={updateUserPoints} onNavigate={handleViewChange} />} />
          </Routes>
        </main>

        {/* Global Status Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-red-600/50 p-2 text-xs">
          <div className="flex justify-between items-center max-w-screen-xl mx-auto">
            <span>🔥 {globalData.rebelsActive.toLocaleString()} ACTIVE</span>
            <span>📊 STABILITY: {globalData.systemStability}%</span>
            <span>🌍 {globalData.countriesActive} COUNTRIES</span>
            <span>⚡ {user.agent17Tokens} A17 TOKENS</span>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;