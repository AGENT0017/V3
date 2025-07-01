import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { db, subscriptions } from './lib/supabase';
import AuthModal from './components/AuthModal';
import { 
  ApocalypseHero, 
  Header, 
  MarketplaceGear,
  EventBookingSystem,
  LiveDataFeeds,
  TokenDAO,
  CommunityHub,
  CrisisCommand
} from './components';
import { InteractiveFilm } from './components/InteractiveFilm';
import { SurvivalAcademy } from './components/SurvivalAcademy';
import { Agent17Dashboard } from './components/Agent17Dashboard';
import { TinderOfDoers } from './components/TinderOfDoers';
import { BloodDonationTracker } from './components/BloodDonationTracker';
import { 
  MLMDashboard, 
  WellnessHub, 
  UserProfile, 
  SubscriptionTiers,
  ContentCreationStudio,
  Analytics
} from './business-components';

function AppContent() {
  const { userProfile, isAuthenticated, addTokens } = useAuth();
  const [currentView, setCurrentView] = useState('hero');
  const [crisisMode, setCrisisMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [globalData, setGlobalData] = useState({
    activeCrises: 47,
    rebelsActive: 12847,
    countriesActive: 89,
    systemStability: 67,
    lastUpdate: new Date()
  });

  // Load crisis data from Supabase
  useEffect(() => {
    const loadCrisisData = async () => {
      try {
        const { data, error } = await db.getCrisisData();
        if (error) throw error;

        if (data && data.length > 0) {
          const crisisMetrics = {};
          data.forEach(metric => {
            crisisMetrics[metric.metric_name] = metric.metric_value;
          });

          setGlobalData(prev => ({
            ...prev,
            activeCrises: crisisMetrics.active_crises || prev.activeCrises,
            rebelsActive: crisisMetrics.rebels_active || prev.rebelsActive,
            countriesActive: crisisMetrics.countries_active || prev.countriesActive,
            systemStability: crisisMetrics.system_stability || prev.systemStability,
            lastUpdate: new Date()
          }));
        }
      } catch (error) {
        console.error('Error loading crisis data:', error);
      }
    };

    loadCrisisData();

    // Subscribe to real-time crisis data updates
    const subscription = subscriptions.subscribeToCrisisData((payload) => {
      console.log('Crisis data updated:', payload);
      loadCrisisData(); // Reload data when changes occur
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

  const handleAuthRequired = (mode = 'signin') => {
    setAuthModalMode(mode);
    setShowAuthModal(true);
  };

  const updateUserPoints = async (points, source = 'activity') => {
    if (!isAuthenticated || !userProfile) {
      handleAuthRequired('signup');
      return;
    }

    try {
      await addTokens(points, 'chaos_points', source, `Earned ${points} CHAOS points from ${source}`);
      
      // Also award Agent17 tokens (1 token per 10 points)
      const agent17Tokens = Math.floor(points / 10);
      if (agent17Tokens > 0) {
        await addTokens(agent17Tokens, 'agent17_tokens', source, `Earned ${agent17Tokens} Agent17 tokens from ${source}`);
      }
    } catch (error) {
      console.error('Error updating user points:', error);
    }
  };

  const renderCurrentView = () => {
    const commonProps = {
      user: userProfile || {
        id: "guest",
        name: "Guest User",
        points: 0,
        agent17Tokens: 0,
        bloodType: "Unknown",
        vaccinationStatus: "Unknown",
        skills: [],
        location: "Unknown",
        trustScore: 0,
        missionsCompleted: 0,
        level: "Guest"
      },
      globalData,
      onNavigate: handleViewChange,
      onAuthRequired: handleAuthRequired
    };

    switch(currentView) {
      case 'hero':
        return <ApocalypseHero 
          userPoints={userProfile?.chaos_points || 0} 
          crisisMode={crisisMode} 
          onNavigate={handleViewChange}
          onAuthRequired={handleAuthRequired}
          isAuthenticated={isAuthenticated}
        />;
      
      case 'film':
        return <InteractiveFilm 
          {...commonProps}
          onComplete={(points) => updateUserPoints(points, 'interactive_film')} 
        />;
      
      case 'academy':
        return <SurvivalAcademy 
          {...commonProps}
          onProgress={(points) => updateUserPoints(points, 'survival_academy')} 
        />;
      
      case 'agent17':
        return <Agent17Dashboard {...commonProps} />;
      
      case 'tinder':
        return <TinderOfDoers 
          {...commonProps}
          onMatch={(points) => updateUserPoints(points, 'tinder_match')} 
        />;
      
      case 'blood':
        return <BloodDonationTracker 
          {...commonProps}
          onDonate={(tokens) => updateUserPoints(tokens * 10, 'blood_donation')} 
        />;
      
      case 'marketplace':
        return <MarketplaceGear {...commonProps} />;
      
      case 'events':
        return <EventBookingSystem {...commonProps} />;
      
      case 'data':
        return <LiveDataFeeds {...commonProps} />;
      
      case 'token':
        return <TokenDAO 
          {...commonProps}
          onVote={(tokens) => updateUserPoints(tokens, 'dao_voting')} 
        />;
      
      case 'community':
        return <CommunityHub 
          {...commonProps}
          onConnect={(points) => updateUserPoints(points, 'community_activity')} 
        />;
      
      case 'crisis':
        return <CrisisCommand 
          {...commonProps}
          onMission={(points) => updateUserPoints(points, 'crisis_mission')} 
        />;
      
      case 'wellness':
        return <WellnessHub 
          {...commonProps}
          onComplete={(points) => updateUserPoints(points, 'wellness_activity')} 
        />;
      
      case 'profile':
        return <UserProfile {...commonProps} />;
      
      default:
        return <ApocalypseHero 
          userPoints={userProfile?.chaos_points || 0} 
          crisisMode={crisisMode} 
          onNavigate={handleViewChange}
          onAuthRequired={handleAuthRequired}
          isAuthenticated={isAuthenticated}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Global Crisis Alert */}
      {crisisMode && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-2 animate-pulse">
          <div className="font-bold">🚨 GLOBAL CRISIS ACTIVATED - ALL AGENTS MOBILIZE 🚨</div>
        </div>
      )}

      {/* Main Header */}
      <Header 
        user={userProfile}
        globalData={globalData}
        currentView={currentView}
        onNavigate={handleViewChange}
        onAuthRequired={handleAuthRequired}
        crisisMode={crisisMode}
        isAuthenticated={isAuthenticated}
      />

      {/* Main Content */}
      <main className="relative">
        <Routes>
          <Route path="/" element={renderCurrentView()} />
          <Route path="/film" element={<InteractiveFilm {...{user: userProfile, globalData, onNavigate: handleViewChange}} onComplete={updateUserPoints} />} />
          <Route path="/academy" element={<SurvivalAcademy {...{user: userProfile, globalData, onNavigate: handleViewChange}} onProgress={updateUserPoints} />} />
          <Route path="/agent17" element={<Agent17Dashboard user={userProfile} globalData={globalData} onNavigate={handleViewChange} />} />
          <Route path="/tinder" element={<TinderOfDoers {...{user: userProfile, globalData, onNavigate: handleViewChange}} onMatch={updateUserPoints} />} />
          <Route path="/blood" element={<BloodDonationTracker {...{user: userProfile, globalData, onNavigate: handleViewChange}} onDonate={updateUserPoints} />} />
          <Route path="/marketplace" element={<MarketplaceGear user={userProfile} onNavigate={handleViewChange} />} />
          <Route path="/events" element={<EventBookingSystem user={userProfile} onNavigate={handleViewChange} />} />
          <Route path="/data" element={<LiveDataFeeds globalData={globalData} onNavigate={handleViewChange} />} />
          <Route path="/token" element={<TokenDAO {...{user: userProfile, globalData, onNavigate: handleViewChange}} onVote={updateUserPoints} />} />
          <Route path="/community" element={<CommunityHub {...{user: userProfile, globalData, onNavigate: handleViewChange}} onConnect={updateUserPoints} />} />
          <Route path="/crisis" element={<CrisisCommand user={userProfile} globalData={globalData} onMission={updateUserPoints} onNavigate={handleViewChange} />} />
        </Routes>
      </main>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authModalMode}
      />

      {/* Global Status Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-red-600/50 p-2 text-xs">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <span>🔥 {globalData.rebelsActive.toLocaleString()} ACTIVE</span>
          <span>📊 STABILITY: {globalData.systemStability}%</span>
          <span>🌍 {globalData.countriesActive} COUNTRIES</span>
          <span>⚡ {userProfile?.agent17_tokens || 0} A17 TOKENS</span>
          {isAuthenticated && (
            <span>🎯 {userProfile?.chaos_points || 0} CHAOS</span>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;