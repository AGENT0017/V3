import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronRight, Target, Award, Globe, Heart } from 'lucide-react';

export const InteractiveFilm = ({ user, onComplete, onNavigate }) => {
  const [currentScene, setCurrentScene] = useState('intro');
  const [userChoices, setUserChoices] = useState([]);
  const [points, setPoints] = useState(0);
  const [collapsologyData, setCollapsologyData] = useState({
    populationGrowth: 0.94,
    resourceDepletion: 73,
    climateRisk: 82,
    socialStability: 34
  });

  const scenes = {
    intro: {
      title: "The Awakening",
      description: "The year is 2025. Global systems are failing. You are Agent " + user.id,
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
      data: {
        fact: "Global population growth has slowed to 0.94% annually",
        impact: "Resource allocation systems approaching critical threshold"
      },
      choices: [
        { id: 'learn', text: "Analyze the crisis data", next: 'analysis', points: 50 },
        { id: 'act', text: "Take immediate action", next: 'action', points: 75 },
        { id: 'prepare', text: "Begin survival preparation", next: 'preparation', points: 100 }
      ]
    },
    analysis: {
      title: "Crisis Analysis",
      description: "Deep dive into collapsology data reveals the scope of global breakdown",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
      data: {
        fact: "73% of natural resources are beyond sustainable extraction rates",
        impact: "Supply chain collapse estimated within 18-36 months"
      },
      choices: [
        { id: 'community', text: "Build community networks", next: 'community', points: 150 },
        { id: 'tech', text: "Develop tech solutions", next: 'technology', points: 125 },
        { id: 'survival', text: "Focus on survival skills", next: 'survival', points: 100 }
      ]
    },
    action: {
      title: "Immediate Response",
      description: "Crisis situations require decisive leadership and community coordination",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
      data: {
        fact: "Social stability index at 34% - lowest in recorded history",
        impact: "Community resilience becomes critical survival factor"
      },
      choices: [
        { id: 'organize', text: "Organize local response teams", next: 'community', points: 200 },
        { id: 'resources', text: "Secure essential resources", next: 'resources', points: 175 },
        { id: 'communicate', text: "Establish communication networks", next: 'networks', points: 150 }
      ]
    },
    preparation: {
      title: "Survival Preparation",
      description: "Building resilience for the collapse requires comprehensive planning",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
      data: {
        fact: "Climate risk index at 82% - extreme weather events increasing",
        impact: "Physical and mental preparation essential for survival"
      },
      choices: [
        { id: 'physical', text: "Physical fitness training", next: 'fitness', points: 100 },
        { id: 'mental', text: "Mental resilience building", next: 'mental', points: 125 },
        { id: 'skills', text: "Essential survival skills", next: 'skills', points: 150 }
      ]
    },
    community: {
      title: "Community Building",
      description: "Strong communities are humanity's best hope for surviving collapse",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
      data: {
        fact: "Communities with 150+ active members show 90% higher survival rates",
        impact: "THRIVECHAOS platform enables global community coordination"
      },
      choices: [
        { id: 'platform', text: "Join THRIVECHAOS community", next: 'complete', points: 300 },
        { id: 'local', text: "Build local networks", next: 'complete', points: 250 },
        { id: 'global', text: "Connect global resistance", next: 'complete', points: 275 }
      ]
    },
    complete: {
      title: "Your Journey Begins",
      description: "You've completed the awakening. Now the real work begins.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1",
      data: {
        fact: "Agent " + user.id + " activated - Welcome to THRIVECHAOS",
        impact: "Your survival and community building journey starts now"
      },
      choices: [
        { id: 'academy', text: "Enter Survival Academy", action: 'academy', points: 100 },
        { id: 'community', text: "Join Community Hub", action: 'community', points: 100 },
        { id: 'marketplace', text: "Browse Survival Gear", action: 'marketplace', points: 50 }
      ]
    }
  };

  const handleChoice = (choice) => {
    setUserChoices([...userChoices, choice]);
    setPoints(points + choice.points);
    
    if (choice.action) {
      onComplete(points + choice.points);
      onNavigate(choice.action);
    } else if (choice.next) {
      setCurrentScene(choice.next);
    }
  };

  const scene = scenes[currentScene];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-black p-6 border-b border-red-600">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Interactive Film Experience</h1>
          <div className="flex items-center space-x-8 text-sm">
            <span>🎯 Current Points: {points}</span>
            <span>📊 Choices Made: {userChoices.length}</span>
            <span>🎬 Scene: {scene.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <div className="aspect-video">
                <iframe
                  src={scene.video}
                  className="w-full h-full"
                  allowFullScreen
                  title={scene.title}
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-3xl font-bold text-yellow-400 mb-4">{scene.title}</h2>
                <p className="text-gray-300 text-lg mb-6">{scene.description}</p>
                
                {/* Interactive Choices */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Choose Your Path:</h3>
                  {scene.choices.map((choice, index) => (
                    <motion.button
                      key={choice.id}
                      onClick={() => handleChoice(choice)}
                      className="w-full p-4 bg-red-900/50 hover:bg-red-800 border border-red-600 rounded-lg text-left transition-all group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{choice.text}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400 font-bold">+{choice.points} pts</span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Data Panel */}
          <div className="space-y-6">
            {/* Collapsology Data */}
            <div className="bg-red-900/30 border border-red-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">📊 Real-Time Data</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Population Growth</div>
                  <div className="text-2xl font-bold text-white">{collapsologyData.populationGrowth}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Resource Depletion</div>
                  <div className="text-2xl font-bold text-red-400">{collapsologyData.resourceDepletion}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Climate Risk</div>
                  <div className="text-2xl font-bold text-orange-400">{collapsologyData.climateRisk}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Social Stability</div>
                  <div className="text-2xl font-bold text-yellow-400">{collapsologyData.socialStability}%</div>
                </div>
              </div>
            </div>

            {/* Scene Data */}
            <div className="bg-black/60 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-3">📈 Scene Intelligence</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">Key Fact</div>
                  <div className="text-white">{scene.data.fact}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Impact Analysis</div>
                  <div className="text-white">{scene.data.impact}</div>
                </div>
              </div>
            </div>

            {/* User Progress */}
            <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-6">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">🎯 Your Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Points Earned</span>
                  <span className="font-bold">{points}</span>
                </div>
                <div className="flex justify-between">
                  <span>Decisions Made</span>
                  <span className="font-bold">{userChoices.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Agent Level</span>
                  <span className="font-bold">{user.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};