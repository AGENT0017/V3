import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Users, 
  Crown, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  BarChart3, 
  PieChart, 
  Target,
  Trophy,
  Star,
  Zap,
  CheckCircle,
  XCircle,
  Calendar,
  CreditCard,
  Share2,
  Eye,
  MessageSquare,
  Coins,
  X,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

// Business Features Data
const businessFeatures = {
  // Community Creation Tools
  communityTemplates: [
    {
      id: "survival_academy",
      name: "Survival Academy",
      description: "Teach essential survival skills to rebels",
      category: "Education",
      price: 0, // Free template
      features: ["Live streaming", "Course modules", "Certification system"],
      theme: "survival",
      color: "green"
    },
    {
      id: "crypto_rebels",
      name: "Crypto Rebels Hub", 
      description: "Build a community around cryptocurrency and financial freedom",
      category: "Finance",
      price: 50,
      features: ["Trading signals", "Portfolio tracking", "Private channels"],
      theme: "tech",
      color: "blue"
    },
    {
      id: "wellness_warriors",
      name: "Wellness Warriors",
      description: "Health and wellness coaching community",
      category: "Health",
      price: 30,
      features: ["Fitness tracking", "Nutrition plans", "Group challenges"],
      theme: "health",
      color: "purple"
    }
  ],

  // Subscription Plans
  subscriptionTiers: [
    {
      id: "basic",
      name: "Rebel Starter",
      price: 29,
      interval: "monthly",
      features: [
        "Create 1 community",
        "Up to 100 members",
        "Basic analytics",
        "Standard support"
      ],
      chaosBonus: 500
    },
    {
      id: "pro",
      name: "Chaos Commander",
      price: 79,
      interval: "monthly", 
      features: [
        "Create 5 communities",
        "Up to 1000 members",
        "Advanced analytics",
        "MLM tracking",
        "Priority support",
        "Custom branding"
      ],
      chaosBonus: 1500,
      popular: true
    },
    {
      id: "empire",
      name: "Revolution Leader",
      price: 199,
      interval: "monthly",
      features: [
        "Unlimited communities",
        "Unlimited members",
        "Full analytics suite",
        "Complete MLM system",
        "White-label options",
        "Dedicated support"
      ],
      chaosBonus: 5000
    }
  ],

  // MLM Structure (8 Levels)
  mlmStructure: {
    levels: [
      { level: 1, commission: 10, name: "Direct Recruit" },
      { level: 2, commission: 8, name: "Second Line" },
      { level: 3, commission: 6, name: "Third Line" },
      { level: 4, commission: 4, name: "Fourth Line" },
      { level: 5, commission: 3, name: "Fifth Line" },
      { level: 6, commission: 2, name: "Sixth Line" },
      { level: 7, commission: 1.5, name: "Seventh Line" },
      { level: 8, commission: 1, name: "Eighth Line" }
    ],
    bonuses: {
      rankAdvancement: [100, 250, 500, 1000, 2500, 5000, 10000, 25000],
      monthlyVolume: [50, 100, 200, 400, 800, 1600, 3200, 6400]
    }
  }
};

// Community Builder Component
export const CommunityBuilder = ({ userPoints, setUserPoints }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [communityData, setCommunityData] = useState({
    name: '',
    description: '',
    template: null,
    pricing: { type: 'free', amount: 0 }
  });

  const handleCreateCommunity = () => {
    if (selectedTemplate && selectedTemplate.price > 0) {
      if (userPoints >= selectedTemplate.price) {
        setUserPoints(prev => prev - selectedTemplate.price);
        alert(`Community "${communityData.name}" created successfully!`);
        setShowCreateModal(false);
      } else {
        alert(`Insufficient CHAOS points. Need ${selectedTemplate.price - userPoints} more points.`);
      }
    } else {
      alert(`Free community "${communityData.name}" created successfully!`);
      setShowCreateModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4 flex items-center space-x-3">
              <Crown className="w-12 h-12 text-yellow-400" />
              <span>COMMUNITY BUILDER</span>
            </h1>
            <p className="text-xl text-gray-400">Create and monetize your own rebel communities</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-2"
          >
            <Plus className="w-6 h-6" />
            <span>Create Community</span>
          </button>
        </div>

        {/* Template Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {businessFeatures.communityTemplates.map((template) => (
            <motion.div
              key={template.id}
              className={`bg-gray-900 border-2 rounded-xl p-6 cursor-pointer transition-all ${
                selectedTemplate?.id === template.id 
                  ? 'border-red-600 bg-red-950' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{template.name}</h3>
                <div className="flex items-center space-x-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-bold">
                    {template.price === 0 ? 'FREE' : template.price}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-400 mb-4">{template.description}</p>
              
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  template.color === 'green' ? 'bg-green-900 text-green-400' :
                  template.color === 'blue' ? 'bg-blue-900 text-blue-400' :
                  'bg-purple-900 text-purple-400'
                }`}>
                  {template.category}
                </span>
              </div>

              <div className="space-y-2">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">💰 SUCCESS STORIES</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=60" 
                  alt="Sarah"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-white font-bold">Sarah Revolution</h3>
                  <p className="text-gray-400 text-sm">Survival Academy</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Built my survival skills community to 2,847 members and now earning $8,940/month 
                teaching urban survival skills!"
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-green-400 font-bold">$8,940/mo</div>
                <div className="text-blue-400">2,847 members</div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=60" 
                  alt="Marcus"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-white font-bold">Marcus CryptoSage</h3>
                  <p className="text-gray-400 text-sm">Crypto Rebels Elite</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "My crypto trading communities generate $18,760/month with 5,623 active members 
                learning financial freedom!"
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-green-400 font-bold">$18,760/mo</div>
                <div className="text-blue-400">5,623 members</div>
              </div>
            </div>
          </div>
        </div>

        {/* Create Community Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 border border-red-600 rounded-xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-white">Create Your Community</h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Community Name</label>
                    <input
                      type="text"
                      value={communityData.name}
                      onChange={(e) => setCommunityData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Enter your community name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Description</label>
                    <textarea
                      value={communityData.description}
                      onChange={(e) => setCommunityData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 h-24"
                      placeholder="Describe your community"
                    />
                  </div>

                  {selectedTemplate && (
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-white font-bold mb-2">Selected Template: {selectedTemplate.name}</h3>
                      <p className="text-gray-400 text-sm">{selectedTemplate.description}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span className="text-white">
                          Cost: {selectedTemplate.price === 0 ? 'FREE' : `${selectedTemplate.price} CHAOS`}
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleCreateCommunity}
                    disabled={!communityData.name || !selectedTemplate}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                      communityData.name && selectedTemplate
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Create Community
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Subscription Manager Component
export const SubscriptionManager = ({ userPoints, setUserPoints }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(businessFeatures.subscriptionTiers[1]); // Pro plan

  const handleUpgrade = (plan) => {
    setShowUpgradeModal(false);
    setCurrentSubscription(plan);
    setUserPoints(prev => prev + plan.chaosBonus);
    alert(`Successfully upgraded to ${plan.name}! You received ${plan.chaosBonus} bonus CHAOS points!`);
  };

  return (
    <div className="min-h-screen bg-black pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4 flex items-center space-x-3">
          <Crown className="w-12 h-12 text-yellow-400" />
          <span>SUBSCRIPTION PLANS</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12">Scale your rebel empire with the right tools</p>

        {/* Current Subscription */}
        <div className="bg-gradient-to-r from-red-900 to-orange-900 border border-red-600 rounded-xl p-8 mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Current Plan: {currentSubscription.name}</h2>
              <p className="text-gray-300">Next billing: February 1, 2024</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">${currentSubscription.price}</div>
              <div className="text-gray-300">per month</div>
            </div>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {businessFeatures.subscriptionTiers.map((plan) => (
            <motion.div
              key={plan.id}
              className={`bg-gray-900 border-2 rounded-xl p-8 relative ${
                plan.popular 
                  ? 'border-red-600 bg-red-950' 
                  : 'border-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-5xl font-bold text-white mb-2">${plan.price}</div>
                <div className="text-gray-400">per month</div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-900 border border-yellow-600 p-4 rounded-lg mb-6">
                <div className="flex items-center space-x-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-bold">+{plan.chaosBonus} CHAOS Bonus</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowUpgradeModal(true);
                }}
                disabled={currentSubscription.id === plan.id}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                  currentSubscription.id === plan.id
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {currentSubscription.id === plan.id ? 'Current Plan' : 'Upgrade Now'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Upgrade Modal */}
        <AnimatePresence>
          {showUpgradeModal && selectedPlan && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowUpgradeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 border border-red-600 rounded-xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Confirm Upgrade</h2>
                  <p className="text-gray-400 mb-6">
                    Upgrade to {selectedPlan.name} for ${selectedPlan.price}/month
                  </p>
                  
                  <div className="bg-yellow-900 border border-yellow-600 p-4 rounded-lg mb-6">
                    <div className="text-yellow-400 font-bold text-lg">
                      Bonus: +{selectedPlan.chaosBonus} CHAOS Points
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowUpgradeModal(false)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleUpgrade(selectedPlan)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                    >
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// MLM Dashboard Component
export const MLMDashboard = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const mlmData = {
    totalDownline: 147,
    activeDownline: 89,
    monthlyCommissions: 435.55,
    totalCommissions: 3240.00,
    rank: "Chaos Commander",
    nextRank: "Revolution Leader",
    progressToNext: 67,
    levels: [
      { level: 1, count: 12, commission: 89.40, percentage: 10 },
      { level: 2, count: 24, commission: 127.20, percentage: 8 },
      { level: 3, count: 31, commission: 98.60, percentage: 6 },
      { level: 4, count: 28, commission: 56.80, percentage: 4 },
      { level: 5, count: 22, commission: 34.50, percentage: 3 },
      { level: 6, count: 18, commission: 18.90, percentage: 2 },
      { level: 7, count: 8, commission: 6.75, percentage: 1.5 },
      { level: 8, count: 4, commission: 2.40, percentage: 1 }
    ]
  };

  return (
    <div className="min-h-screen bg-black pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4 flex items-center space-x-3">
          <Trophy className="w-12 h-12 text-yellow-400" />
          <span>MLM DASHBOARD</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12">Track your network and commissions across 8 levels</p>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-r from-green-900 to-emerald-900 border border-green-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-400" />
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{mlmData.totalDownline}</div>
            <div className="text-green-400 font-semibold">Total Network</div>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-cyan-900 border border-blue-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-blue-400" />
              <Target className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{mlmData.activeDownline}</div>
            <div className="text-blue-400 font-semibold">Active Members</div>
          </div>

          <div className="bg-gradient-to-r from-yellow-900 to-orange-900 border border-yellow-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-yellow-400" />
              <Calendar className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">${mlmData.monthlyCommissions}</div>
            <div className="text-yellow-400 font-semibold">Monthly Commissions</div>
          </div>

          <div className="bg-gradient-to-r from-purple-900 to-pink-900 border border-purple-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-purple-400" />
              <Star className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">${mlmData.totalCommissions}</div>
            <div className="text-purple-400 font-semibold">Total Earned</div>
          </div>
        </div>

        {/* Rank Progress */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">🏆 RANK PROGRESSION</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-yellow-400">{mlmData.rank}</div>
              <div className="text-gray-400">Current Rank</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{mlmData.nextRank}</div>
              <div className="text-gray-400">Next Rank</div>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${mlmData.progressToNext}%` }}
            />
          </div>
          <div className="text-center text-white">{mlmData.progressToNext}% to next rank</div>
        </div>

        {/* MLM Levels Breakdown */}
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">📊 8-LEVEL BREAKDOWN</h2>
          <div className="grid gap-4">
            {mlmData.levels.map((level) => (
              <motion.div
                key={level.level}
                className="bg-gray-800 border border-gray-600 rounded-lg p-6 cursor-pointer hover:border-red-600 transition-colors"
                onClick={() => setSelectedLevel(selectedLevel === level.level ? null : level.level)}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {level.level}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Level {level.level}</div>
                      <div className="text-gray-400">
                        {businessFeatures.mlmStructure.levels[level.level - 1]?.name}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{level.count}</div>
                      <div className="text-gray-400 text-sm">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{level.percentage}%</div>
                      <div className="text-gray-400 text-sm">Commission</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">${level.commission}</div>
                      <div className="text-gray-400 text-sm">Earned</div>
                    </div>
                    <ChevronRight className={`w-6 h-6 text-gray-400 transition-transform ${
                      selectedLevel === level.level ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>

                <AnimatePresence>
                  {selectedLevel === level.level && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-gray-600"
                    >
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <div className="text-white font-semibold mb-2">Performance</div>
                          <div className="text-gray-300 text-sm">
                            Average monthly volume: ${(level.commission / level.percentage * 100).toFixed(0)}
                          </div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <div className="text-white font-semibold mb-2">Growth Rate</div>
                          <div className="text-green-400 text-sm">+{Math.floor(Math.random() * 20 + 5)}% this month</div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                          <div className="text-white font-semibold mb-2">Potential</div>
                          <div className="text-blue-400 text-sm">
                            {Math.floor(level.count * 1.5)} max capacity
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-gradient-to-r from-red-900 to-orange-900 border border-red-600 rounded-xl p-8 mt-12">
          <h3 className="text-2xl font-bold text-white mb-4">🔗 YOUR REFERRAL LINK</h3>
          <div className="bg-black p-4 rounded-lg mb-4">
            <code className="text-green-400 font-mono">
              https://thrivechaos.com/join?ref=chaos_commander_001
            </code>
          </div>
          <div className="flex space-x-4">
            <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Copy Link
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>Share on Social</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};