import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Award, CheckCircle, Lock, Play, Book, Dumbbell, Brain, Heart } from 'lucide-react';

export const SurvivalAcademy = ({ user, onProgress, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('physical');
  const [completedModules, setCompletedModules] = useState([]);

  const categories = {
    physical: {
      icon: Dumbbell,
      title: "Physical Resilience",
      description: "Build strength, endurance, and survival fitness",
      color: "red"
    },
    mental: {
      icon: Brain,
      title: "Mental Resilience", 
      description: "Develop psychological strength and crisis mindset",
      color: "blue"
    },
    digital: {
      icon: Target,
      title: "Digital Security",
      description: "Protect yourself in the information age",
      color: "green"
    },
    spiritual: {
      icon: Heart,
      title: "Spiritual Strength",
      description: "Find meaning and purpose in chaos",
      color: "purple"
    }
  };

  const modules = {
    physical: [
      {
        id: 'p1',
        title: "Urban Parkour Basics",
        description: "Move efficiently through urban environments",
        duration: "45 min",
        difficulty: "Beginner",
        points: 100,
        completed: false,
        locked: false,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 'p2',
        title: "Combat Fitness Training",
        description: "Build functional strength for survival situations",
        duration: "60 min",
        difficulty: "Intermediate",
        points: 150,
        completed: false,
        locked: false,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 'p3',
        title: "Wilderness Survival Skills",
        description: "Essential outdoor survival techniques",
        duration: "90 min",
        difficulty: "Advanced",
        points: 200,
        completed: false,
        locked: true,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ],
    mental: [
      {
        id: 'm1',
        title: "Crisis Psychology",
        description: "Understand and manage crisis-induced stress",
        duration: "30 min",
        difficulty: "Beginner",
        points: 75,
        completed: false,
        locked: false,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 'm2',
        title: "Decision Making Under Pressure",
        description: "Make critical decisions in high-stress situations",
        duration: "45 min",
        difficulty: "Intermediate",
        points: 125,
        completed: false,
        locked: false,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 'm3',
        title: "Leadership in Chaos",
        description: "Lead others through crisis situations",
        duration: "60 min",
        difficulty: "Advanced",
        points: 175,
        completed: false,
        locked: true,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ],
    digital: [
      {
        id: 'd1',
        title: "Operational Security (OPSEC)",
        description: "Protect your digital footprint and communications",
        duration: "40 min",
        difficulty: "Beginner",
        points: 100,
        completed: false,
        locked: false,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 'd2',
        title: "Encrypted Communications",
        description: "Set up secure communication channels",
        duration: "50 min",
        difficulty: "Intermediate",
        points: 150,
        completed: false,
        locked: false,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 'd3',
        title: "Counter-Surveillance Techniques",
        description: "Detect and evade digital surveillance",
        duration: "75 min",
        difficulty: "Advanced",
        points: 200,
        completed: false,
        locked: true,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ],
    spiritual: [
      {
        id: 's1',
        title: "Finding Purpose in Crisis",
        description: "Discover meaning when everything falls apart",
        duration: "30 min",
        difficulty: "Beginner",
        points: 75,
        completed: false,
        locked: false,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 's2',
        title: "Community Meditation Practices",
        description: "Group mindfulness for collective resilience",
        duration: "45 min",
        difficulty: "Intermediate",
        points: 100,
        completed: false,
        locked: false,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: 's3',
        title: "Death Meditation & Acceptance",
        description: "Face mortality and find strength in acceptance",
        duration: "60 min",
        difficulty: "Advanced",
        points: 150,
        completed: false,
        locked: true,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ]
  };

  const handleModuleComplete = (moduleId, points) => {
    setCompletedModules([...completedModules, moduleId]);
    onProgress(points);
  };

  const currentModules = modules[selectedCategory];
  const categoryInfo = categories[selectedCategory];
  const CategoryIcon = categoryInfo.icon;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-black p-6 border-b border-blue-600">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Survival Academy</h1>
          <p className="text-gray-300">Master the skills needed to thrive in chaos</p>
          <div className="flex items-center space-x-6 mt-4 text-sm">
            <span>🎯 Your Level: {user.level}</span>
            <span>🏆 Completed: {completedModules.length} modules</span>
            <span>💫 Total Points: {user.points}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6">Training Categories</h2>
            <div className="space-y-4">
              {Object.entries(categories).map(([key, category]) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedCategory === key 
                        ? `border-${category.color}-500 bg-${category.color}-900/30` 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 text-${category.color}-400`} />
                      <div>
                        <div className="font-bold text-white">{category.title}</div>
                        <div className="text-sm text-gray-400">{category.description}</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Progress Summary */}
            <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h3 className="font-bold text-yellow-400 mb-3">Your Progress</h3>
              {Object.entries(categories).map(([key, category]) => {
                const completed = completedModules.filter(id => id.startsWith(key.charAt(0))).length;
                const total = modules[key].length;
                return (
                  <div key={key} className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">{category.title}</span>
                    <span className="text-sm font-bold text-white">{completed}/{total}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <CategoryIcon className={`w-8 h-8 text-${categoryInfo.color}-400`} />
                <h2 className="text-3xl font-bold text-white">{categoryInfo.title}</h2>
              </div>
              <p className="text-gray-300 text-lg">{categoryInfo.description}</p>
            </div>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {currentModules.map((module, index) => (
                <motion.div
                  key={module.id}
                  className={`p-6 rounded-lg border-2 ${
                    module.locked 
                      ? 'border-gray-700 bg-gray-900/30 opacity-60'
                      : completedModules.includes(module.id)
                      ? 'border-green-500 bg-green-900/30'
                      : `border-${categoryInfo.color}-600 bg-${categoryInfo.color}-900/20`
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {module.locked ? (
                        <Lock className="w-6 h-6 text-gray-500" />
                      ) : completedModules.includes(module.id) ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <Play className={`w-6 h-6 text-${categoryInfo.color}-400`} />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-white">{module.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>⏱️ {module.duration}</span>
                          <span>🎯 {module.difficulty}</span>
                          <span className="text-yellow-400 font-bold">+{module.points} pts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{module.description}</p>

                  {!module.locked && !completedModules.includes(module.id) && (
                    <button
                      onClick={() => handleModuleComplete(module.id, module.points)}
                      className={`w-full py-3 px-4 bg-${categoryInfo.color}-600 hover:bg-${categoryInfo.color}-700 text-white font-bold rounded-lg transition-colors`}
                    >
                      Start Training
                    </button>
                  )}

                  {completedModules.includes(module.id) && (
                    <div className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg text-center">
                      ✅ Completed
                    </div>
                  )}

                  {module.locked && (
                    <div className="w-full py-3 px-4 bg-gray-700 text-gray-400 font-bold rounded-lg text-center">
                      🔒 Complete prerequisites to unlock
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <button
                onClick={() => onNavigate('community')}
                className="p-6 bg-blue-900/30 border border-blue-600 rounded-lg hover:bg-blue-900/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-blue-400 mb-2">Join Study Groups</h3>
                <p className="text-gray-300">Learn with fellow agents</p>
              </button>
              
              <button
                onClick={() => onNavigate('marketplace')}
                className="p-6 bg-red-900/30 border border-red-600 rounded-lg hover:bg-red-900/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-red-400 mb-2">Get Survival Gear</h3>
                <p className="text-gray-300">Essential equipment for training</p>
              </button>
              
              <button
                onClick={() => onNavigate('agent17')}
                className="p-6 bg-yellow-900/30 border border-yellow-600 rounded-lg hover:bg-yellow-900/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Ask Agent17</h3>
                <p className="text-gray-300">AI-powered training guidance</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};