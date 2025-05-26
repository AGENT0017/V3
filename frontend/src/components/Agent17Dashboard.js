import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Target, Globe, Users, AlertTriangle, Zap, MapPin, Clock } from 'lucide-react';

export const Agent17Dashboard = ({ user, globalData, onNavigate }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeMissions, setActiveMissions] = useState([]);
  const [aiStatus, setAiStatus] = useState('online');

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: 1,
        type: 'ai',
        message: `Welcome, Agent ${user.id}. I am Agent17, your AI coordinator. Current global stability: ${globalData.systemStability}%. How can I assist your mission today?`,
        timestamp: new Date(),
        priority: 'normal'
      }
    ]);

    // Initialize active missions
    setActiveMissions([
      {
        id: 'mission_001',
        title: 'Community Health Assessment',
        description: 'Document local medical resources and blood donation opportunities',
        priority: 'high',
        location: 'Local Area',
        reward: 250,
        timeLeft: '2 days',
        participants: 12
      },
      {
        id: 'mission_002',
        title: 'Emergency Supply Mapping',
        description: 'Identify and map emergency supply sources in your region',
        priority: 'medium',
        location: 'Regional',
        reward: 150,
        timeLeft: '5 days',
        participants: 8
      },
      {
        id: 'mission_003',
        title: 'Crisis Communication Network',
        description: 'Establish backup communication channels for your community',
        priority: 'critical',
        location: 'Global Network',
        reward: 500,
        timeLeft: '1 day',
        participants: 34
      }
    ]);
  }, [user.id, globalData.systemStability]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage('');
  };

  const generateAIResponse = (userInput) => {
    const responses = {
      'crisis': `Based on current data: ${globalData.systemStability}% stability. I recommend immediate community preparation protocols. Activating local crisis teams.`,
      'mission': `New mission available: Crisis Response Coordination. Required skills: ${user.skills.join(', ')}. Estimated completion: 4 hours. Reward: 300 AGENT17 tokens.`,
      'blood': `Blood donation network shows ${user.bloodType} is in high demand. Nearest donation center: 2.3km. Your donation could save 3 lives and earn 50 tokens.`,
      'community': `Your area has ${Math.floor(Math.random() * 50 + 20)} active agents. Community strength: 78%. Recommend connecting with Agent_045 and Agent_092 for coordinated response.`,
      'status': `Agent ${user.id} Status: Level ${user.level}, ${user.missionsCompleted} missions completed, Trust Score: ${user.trustScore}%. You're in the top 15% of global agents.`,
      'default': `Processing your request... Analyzing global crisis patterns and community resources. Standby for tactical assessment.`
    };

    const responseKey = Object.keys(responses).find(key => 
      userInput.toLowerCase().includes(key)
    ) || 'default';

    return {
      id: Date.now() + 1,
      type: 'ai',
      message: responses[responseKey],
      timestamp: new Date(),
      priority: responseKey === 'crisis' ? 'critical' : 'normal'
    };
  };

  const handleMissionAccept = (missionId) => {
    const mission = activeMissions.find(m => m.id === missionId);
    if (mission) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        message: `Mission "${mission.title}" accepted. Tactical briefing uploading... Coordinates and resources being prepared. Good luck, Agent ${user.id}.`,
        timestamp: new Date(),
        priority: mission.priority
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 border-b border-blue-600">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-yellow-400 mb-2">Agent17 AI Coordinator</h1>
              <p className="text-gray-300">Crisis response and mission coordination system</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${aiStatus === 'online' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className="text-sm text-gray-300">AI Status: {aiStatus}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-blue-600 rounded-lg h-96 mb-4">
              <div className="bg-blue-900/50 p-4 border-b border-blue-600">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Direct Communication with Agent17
                </h2>
              </div>
              
              <div className="p-4 h-72 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : message.priority === 'critical'
                        ? 'bg-red-900/60 border border-red-600 text-white'
                        : 'bg-gray-800 text-gray-200'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Agent17 for guidance, missions, or crisis updates..."
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
              >
                Send
              </button>
            </form>

            {/* Quick Commands */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { text: "Crisis Status", command: "crisis status" },
                { text: "New Mission", command: "mission request" },
                { text: "Blood Donation", command: "blood donation opportunities" },
                { text: "Community Status", command: "community overview" }
              ].map((cmd, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(cmd.command)}
                  className="p-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-sm transition-colors"
                >
                  {cmd.text}
                </button>
              ))}
            </div>
          </div>

          {/* Mission Control Panel */}
          <div className="space-y-6">
            {/* Global Status */}
            <div className="bg-red-900/30 border border-red-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">🌍 Global Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">System Stability</span>
                  <span className={`font-bold ${globalData.systemStability > 50 ? 'text-green-400' : 'text-red-400'}`}>
                    {globalData.systemStability}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Active Agents</span>
                  <span className="font-bold text-white">{globalData.rebelsActive.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Countries Active</span>
                  <span className="font-bold text-white">{globalData.countriesActive}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Active Crises</span>
                  <span className="font-bold text-orange-400">{globalData.activeCrises}</span>
                </div>
              </div>
            </div>

            {/* Active Missions */}
            <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">🎯 Available Missions</h3>
              <div className="space-y-4">
                {activeMissions.slice(0, 2).map((mission) => (
                  <div key={mission.id} className="bg-black/60 border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white text-sm">{mission.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        mission.priority === 'critical' ? 'bg-red-600' :
                        mission.priority === 'high' ? 'bg-orange-600' : 'bg-blue-600'
                      }`}>
                        {mission.priority}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mb-3">{mission.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-xs text-gray-400">
                        <div>📍 {mission.location}</div>
                        <div>⏰ {mission.timeLeft}</div>
                        <div>👥 {mission.participants} agents</div>
                      </div>
                      <div className="text-yellow-400 font-bold">+{mission.reward}</div>
                    </div>
                    <button
                      onClick={() => handleMissionAccept(mission.id)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded transition-colors"
                    >
                      Accept Mission
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent Stats */}
            <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-400 mb-4">👤 Agent Profile</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Agent ID</span>
                  <span className="font-bold">{user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Level</span>
                  <span className="font-bold">{user.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trust Score</span>
                  <span className="font-bold text-green-400">{user.trustScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Missions</span>
                  <span className="font-bold">{user.missionsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span>A17 Tokens</span>
                  <span className="font-bold text-yellow-400">{user.agent17Tokens}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <button
            onClick={() => onNavigate('crisis')}
            className="p-6 bg-red-900/30 border border-red-600 rounded-lg hover:bg-red-900/50 transition-colors"
          >
            <AlertTriangle className="w-8 h-8 text-red-400 mb-2" />
            <h3 className="text-lg font-bold text-red-400">Crisis Command</h3>
            <p className="text-gray-400 text-sm">Emergency coordination</p>
          </button>
          
          <button
            onClick={() => onNavigate('blood')}
            className="p-6 bg-green-900/30 border border-green-600 rounded-lg hover:bg-green-900/50 transition-colors"
          >
            <Target className="w-8 h-8 text-green-400 mb-2" />
            <h3 className="text-lg font-bold text-green-400">Blood Donations</h3>
            <p className="text-gray-400 text-sm">Save lives & earn tokens</p>
          </button>
          
          <button
            onClick={() => onNavigate('tinder')}
            className="p-6 bg-purple-900/30 border border-purple-600 rounded-lg hover:bg-purple-900/50 transition-colors"
          >
            <Users className="w-8 h-8 text-purple-400 mb-2" />
            <h3 className="text-lg font-bold text-purple-400">Tinder of Doers</h3>
            <p className="text-gray-400 text-sm">Connect with agents</p>
          </button>
          
          <button
            onClick={() => onNavigate('data')}
            className="p-6 bg-blue-900/30 border border-blue-600 rounded-lg hover:bg-blue-900/50 transition-colors"
          >
            <Globe className="w-8 h-8 text-blue-400 mb-2" />
            <h3 className="text-lg font-bold text-blue-400">Live Data Feeds</h3>
            <p className="text-gray-400 text-sm">Real-time intelligence</p>
          </button>
        </div>
      </div>
    </div>
  );
};