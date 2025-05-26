import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Users, MapPin, Shield, Zap, MessageSquare, Star } from 'lucide-react';

export const TinderOfDoers = ({ user, onMatch, onNavigate }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const profiles = [
    {
      id: 'agent_042',
      name: 'Sarah Chen',
      age: 28,
      location: 'San Francisco, CA',
      bloodType: 'A+',
      vaccinationStatus: 'Current',
      skills: ['Medical Training', 'Community Organizing', 'Urban Farming'],
      trustScore: 92,
      projects: ['Community First Aid Training', 'Seed Banking Initiative'],
      interests: ['Permaculture', 'Disaster Preparedness', 'Mutual Aid'],
      compatibility: 89,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=400',
      bio: 'Emergency medical technician building resilient communities. Looking for partners in creating local response networks and sustainable food systems.',
      causeFocus: 'Community Health',
      matchType: 'Project Collaboration'
    },
    {
      id: 'agent_087',
      name: 'Marcus Rivera',
      age: 34,
      location: 'Austin, TX',
      bloodType: 'O-',
      vaccinationStatus: 'Current',
      skills: ['Renewable Energy', 'Crisis Communication', 'Leadership'],
      trustScore: 95,
      projects: ['Solar Grid Independence', 'Emergency Communication Network'],
      interests: ['Clean Energy', 'Decentralization', 'Community Resilience'],
      compatibility: 94,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Building energy independence for communities. Solar engineer and crisis communication specialist seeking collaboration on resilient infrastructure.',
      causeFocus: 'Energy Independence',
      matchType: 'Romantic & Cause-based'
    },
    {
      id: 'agent_156',
      name: 'Elena Kowalski',
      age: 26,
      location: 'Berlin, Germany',
      bloodType: 'B+',
      vaccinationStatus: 'Current',
      skills: ['Digital Security', 'Activism', 'Tech Development'],
      trustScore: 88,
      projects: ['Encrypted Messenger App', 'Digital Rights Campaign'],
      interests: ['Privacy Rights', 'Open Source', 'Digital Literacy'],
      compatibility: 91,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Developer and digital rights activist. Creating secure communication tools for resistance movements. Let\'s build the encrypted future together.',
      causeFocus: 'Digital Privacy',
      matchType: 'Project Collaboration'
    },
    {
      id: 'agent_203',
      name: 'James Nakamura',
      age: 31,
      location: 'Tokyo, Japan',
      bloodType: 'AB+',
      vaccinationStatus: 'Current',
      skills: ['Disaster Response', 'Psychology', 'Community Building'],
      trustScore: 96,
      projects: ['Mental Health First Aid', 'Disaster Psychology Research'],
      interests: ['Crisis Psychology', 'Mindfulness', 'Cultural Exchange'],
      compatibility: 85,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Crisis psychologist and disaster response coordinator. Helping communities heal and prepare. Seeking partners for global mental health initiatives.',
      causeFocus: 'Mental Health',
      matchType: 'Cause-based'
    }
  ];

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    const currentProfile = profiles[currentCardIndex];
    
    if (direction === 'right') {
      setMatches(prev => [...prev, currentProfile]);
      onMatch(50); // Award points for successful match
    }
    
    setTimeout(() => {
      setCurrentCardIndex(prev => (prev + 1) % profiles.length);
      setSwipeDirection(null);
    }, 300);
  };

  const currentProfile = profiles[currentCardIndex];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 border-b border-purple-600">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Tinder of Doers</h1>
          <p className="text-gray-300">Connect with purpose-driven agents for projects, causes, and meaningful relationships</p>
          <div className="flex items-center space-x-6 mt-4 text-sm">
            <span>💝 Matches: {matches.length}</span>
            <span>🎯 Compatibility Algorithm Active</span>
            <span>🩸 Blood Type & Vaccination Filtering</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Swipe Interface */}
          <div className="lg:col-span-2">
            <div className="relative max-w-md mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCardIndex}
                  className="bg-gray-900 rounded-xl border-2 border-purple-600 overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotateY: 0,
                    x: swipeDirection === 'left' ? -300 : swipeDirection === 'right' ? 300 : 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8,
                    x: swipeDirection === 'left' ? -300 : 300
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Profile Image */}
                  <div className="relative h-96">
                    <img 
                      src={currentProfile.image} 
                      alt={currentProfile.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full">
                      <span className="text-green-400 font-bold">{currentProfile.compatibility}% Match</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                      <h2 className="text-3xl font-bold text-white">{currentProfile.name}, {currentProfile.age}</h2>
                      <div className="flex items-center text-gray-300 mt-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {currentProfile.location}
                      </div>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-400 font-bold">{currentProfile.matchType}</span>
                        <span className="text-yellow-400 font-bold">Trust Score: {currentProfile.trustScore}%</span>
                      </div>
                      <div className="text-sm text-gray-400 mb-3">
                        🩸 {currentProfile.bloodType} | 💉 {currentProfile.vaccinationStatus}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{currentProfile.bio}</p>

                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-white font-bold mb-2">Skills & Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-900/50 text-blue-300 text-sm rounded-full border border-blue-600">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Active Projects */}
                    <div className="mb-4">
                      <h4 className="text-white font-bold mb-2">Active Projects</h4>
                      <div className="space-y-2">
                        {currentProfile.projects.map((project, index) => (
                          <div key={index} className="flex items-center">
                            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                            <span className="text-gray-300 text-sm">{project}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cause Focus */}
                    <div className="mb-6">
                      <h4 className="text-white font-bold mb-2">Primary Cause</h4>
                      <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-3">
                        <span className="text-purple-300 font-semibold">{currentProfile.causeFocus}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Swipe Controls */}
              <div className="flex justify-center space-x-8 mt-8">
                <motion.button
                  onClick={() => handleSwipe('left')}
                  className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-8 h-8 text-white" />
                </motion.button>
                
                <motion.button
                  onClick={() => handleSwipe('right')}
                  className="w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filter Controls */}
            <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">🔍 Filter Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Match Type</label>
                  <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white">
                    <option value="all">All Types</option>
                    <option value="romantic">Romantic</option>
                    <option value="project">Project Collaboration</option>
                    <option value="cause">Cause-based</option>
                    <option value="friendship">Friendship</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Blood Type Preference</label>
                  <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white">
                    <option value="any">Any Blood Type</option>
                    <option value="compatible">Compatible Donors Only</option>
                    <option value="universal">Universal Donors (O-)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Vaccination Status</label>
                  <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white">
                    <option value="any">Any Status</option>
                    <option value="current">Current Only</option>
                    <option value="verified">Verified Status</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Distance</label>
                  <select className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white">
                    <option value="global">Global</option>
                    <option value="national">National</option>
                    <option value="regional">Regional</option>
                    <option value="local">Local (50km)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Recent Matches */}
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">💚 Recent Matches</h3>
              {matches.length === 0 ? (
                <p className="text-gray-400">No matches yet. Keep swiping!</p>
              ) : (
                <div className="space-y-3">
                  {matches.slice(-3).map((match, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-black/60 rounded-lg">
                      <img 
                        src={match.image} 
                        alt={match.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-white text-sm">{match.name}</div>
                        <div className="text-gray-400 text-xs">{match.causeFocus}</div>
                      </div>
                      <button className="p-2 bg-green-600 hover:bg-green-700 rounded-full">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Platform Stats */}
            <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-4">📊 Platform Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Agents</span>
                  <span className="text-white font-bold">47,382</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Successful Projects</span>
                  <span className="text-white font-bold">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Relationships Formed</span>
                  <span className="text-white font-bold">1,256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Blood Donations</span>
                  <span className="text-white font-bold">892</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <button
            onClick={() => onNavigate('community')}
            className="p-6 bg-blue-900/30 border border-blue-600 rounded-lg hover:bg-blue-900/50 transition-colors"
          >
            <Users className="w-8 h-8 text-blue-400 mb-2" />
            <h3 className="text-lg font-bold text-blue-400">Community Hub</h3>
            <p className="text-gray-400 text-sm">Join group projects</p>
          </button>
          
          <button
            onClick={() => onNavigate('blood')}
            className="p-6 bg-red-900/30 border border-red-600 rounded-lg hover:bg-red-900/50 transition-colors"
          >
            <Heart className="w-8 h-8 text-red-400 mb-2" />
            <h3 className="text-lg font-bold text-red-400">Blood Donations</h3>
            <p className="text-gray-400 text-sm">Save lives together</p>
          </button>
          
          <button
            onClick={() => onNavigate('events')}
            className="p-6 bg-purple-900/30 border border-purple-600 rounded-lg hover:bg-purple-900/50 transition-colors"
          >
            <Star className="w-8 h-8 text-purple-400 mb-2" />
            <h3 className="text-lg font-bold text-purple-400">Event Planning</h3>
            <p className="text-gray-400 text-sm">Plan meetups & weddings</p>
          </button>
          
          <button
            onClick={() => onNavigate('agent17')}
            className="p-6 bg-yellow-900/30 border border-yellow-600 rounded-lg hover:bg-yellow-900/50 transition-colors"
          >
            <Shield className="w-8 h-8 text-yellow-400 mb-2" />
            <h3 className="text-lg font-bold text-yellow-400">Agent17 Advice</h3>
            <p className="text-gray-400 text-sm">AI relationship guidance</p>
          </button>
        </div>
      </div>
    </div>
  );
};