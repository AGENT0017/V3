import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Award, Users, Target, Clock, Shield } from 'lucide-react';

export const BloodDonationTracker = ({ user, onDonate, onNavigate }) => {
  const [donations, setDonations] = useState([]);
  const [nearbyDrives, setNearbyDrives] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 12,
    livesImpacted: 36,
    tokensEarned: 600,
    nextEligible: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
  });

  useEffect(() => {
    // Initialize donation history
    setDonations([
      {
        id: 'don_001',
        date: new Date('2024-11-15'),
        location: 'Red Cross Center Downtown',
        type: 'Whole Blood',
        volume: '450ml',
        tokensEarned: 50,
        verified: true,
        recipient: 'Emergency Surgery Patient',
        impact: '3 lives saved'
      },
      {
        id: 'don_002',
        date: new Date('2024-09-20'),
        location: 'Community Blood Drive',
        type: 'Platelets',
        volume: '200ml',
        tokensEarned: 75,
        verified: true,
        recipient: 'Cancer Treatment Center',
        impact: '5 treatments enabled'
      }
    ]);

    // Initialize nearby blood drives
    setNearbyDrives([
      {
        id: 'drive_001',
        name: 'Emergency Blood Drive - Hospital Crisis',
        location: 'St. Mary\'s Hospital',
        address: '123 Medical Center Dr',
        distance: '2.3 km',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        urgency: 'critical',
        needed: [user.bloodType, 'O-', 'O+'],
        tokensOffered: 100,
        slotsAvailable: 15,
        organizer: 'Hospital Blood Bank',
        description: 'Critical shortage due to emergency surgeries. All blood types needed urgently.'
      },
      {
        id: 'drive_002',
        name: 'Community Health Fair Blood Drive',
        location: 'Central Community Center',
        address: '456 Community St',
        distance: '4.7 km',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        urgency: 'medium',
        needed: ['A+', 'B+', 'AB+'],
        tokensOffered: 50,
        slotsAvailable: 30,
        organizer: 'THRIVECHAOS Community',
        description: 'Monthly community blood drive with health screenings and wellness activities.'
      },
      {
        id: 'drive_003',
        name: 'Agent17 Coordinated Global Drive',
        location: 'Multiple Locations',
        address: 'Worldwide Network',
        distance: 'Global',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        urgency: 'high',
        needed: ['All Types'],
        tokensOffered: 150,
        slotsAvailable: 500,
        organizer: 'Agent17 Network',
        description: 'AI-coordinated global blood donation initiative. Maximum impact guaranteed.'
      }
    ]);
  }, [user.bloodType]);

  const handleDonationSignup = (driveId) => {
    const drive = nearbyDrives.find(d => d.id === driveId);
    if (drive) {
      onDonate(drive.tokensOffered);
      
      // Add to donation history
      const newDonation = {
        id: `don_${Date.now()}`,
        date: drive.date,
        location: drive.name,
        type: 'Scheduled',
        volume: 'TBD',
        tokensEarned: drive.tokensOffered,
        verified: false,
        recipient: 'Pending',
        impact: 'Estimated: 3+ lives'
      };
      
      setDonations(prev => [newDonation, ...prev]);
    }
  };

  const getBloodTypeCompatibility = () => {
    const compatibility = {
      'O-': { canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-'] },
      'O+': { canDonateTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O-', 'O+'] },
      'A-': { canDonateTo: ['A-', 'A+', 'AB-', 'AB+'], canReceiveFrom: ['O-', 'A-'] },
      'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['O-', 'O+', 'A-', 'A+'] },
      'B-': { canDonateTo: ['B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-', 'B-'] },
      'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['O-', 'O+', 'B-', 'B+'] },
      'AB-': { canDonateTo: ['AB-', 'AB+'], canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'] },
      'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] }
    };
    return compatibility[user.bloodType] || { canDonateTo: [], canReceiveFrom: [] };
  };

  const compatibility = getBloodTypeCompatibility();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-pink-900 p-6 border-b border-red-600">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Blood Donation Tracker</h1>
          <p className="text-gray-300">Save lives, earn Agent17 tokens, and build community resilience</p>
          <div className="flex items-center space-x-6 mt-4 text-sm">
            <span>🩸 Your Type: {user.bloodType}</span>
            <span>🏆 Total Donations: {stats.totalDonations}</span>
            <span>❤️ Lives Impacted: {stats.livesImpacted}</span>
            <span>🪙 Tokens Earned: {stats.tokensEarned}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            {/* Eligibility Status */}
            <div className="bg-red-900/30 border border-red-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-red-400" />
                Donation Eligibility Status
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-lg font-bold text-green-400 mb-2">✅ Currently Eligible</div>
                  <p className="text-gray-300 mb-4">You can donate today! Your last donation was over 8 weeks ago.</p>
                  <div className="text-sm text-gray-400">
                    <div>Last Donation: {donations[0]?.date.toLocaleDateString()}</div>
                    <div>Blood Type: {user.bloodType} (High Demand)</div>
                    <div>Vaccination Status: {user.vaccinationStatus}</div>
                  </div>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">{stats.totalDonations}</div>
                    <div className="text-gray-400">Total Donations</div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.livesImpacted}</div>
                    <div className="text-gray-400">Lives Saved</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Blood Drives */}
            <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-400" />
                Nearby Blood Drives
              </h2>
              <div className="space-y-4">
                {nearbyDrives.map((drive) => (
                  <motion.div
                    key={drive.id}
                    className={`p-6 rounded-lg border-2 ${
                      drive.urgency === 'critical' ? 'border-red-600 bg-red-900/20' :
                      drive.urgency === 'high' ? 'border-orange-600 bg-orange-900/20' :
                      'border-blue-600 bg-blue-900/20'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{drive.name}</h3>
                        <div className="flex items-center text-gray-300 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {drive.location} • {drive.distance}
                        </div>
                        <div className="flex items-center text-gray-300 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {drive.date.toLocaleDateString()} at {drive.date.toLocaleTimeString()}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        drive.urgency === 'critical' ? 'bg-red-600' :
                        drive.urgency === 'high' ? 'bg-orange-600' : 'bg-blue-600'
                      }`}>
                        {drive.urgency.toUpperCase()}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{drive.description}</p>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400">Blood Types Needed</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {drive.needed.map((type, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs rounded ${
                                type === user.bloodType ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
                              }`}
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Reward</div>
                        <div className="text-yellow-400 font-bold">+{drive.tokensOffered} Agent17 Tokens</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Available Slots</div>
                        <div className="text-green-400 font-bold">{drive.slotsAvailable} remaining</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDonationSignup(drive.id)}
                      className={`w-full py-3 px-4 font-bold rounded-lg transition-colors ${
                        drive.urgency === 'critical' ? 'bg-red-600 hover:bg-red-700' :
                        drive.urgency === 'high' ? 'bg-orange-600 hover:bg-orange-700' :
                        'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      Sign Up to Donate
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Blood Type Compatibility */}
            <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-4">🩸 Blood Type Info</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Your Blood Type</div>
                  <div className="text-3xl font-bold text-white">{user.bloodType}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-2">Can Donate To</div>
                  <div className="flex flex-wrap gap-1">
                    {compatibility.canDonateTo.map((type, index) => (
                      <span key={index} className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded border border-green-600">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-2">Can Receive From</div>
                  <div className="flex flex-wrap gap-1">
                    {compatibility.canReceiveFrom.map((type, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded border border-blue-600">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Donation History */}
            <div className="bg-gray-900 border border-gray-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">📋 Recent Donations</h3>
              <div className="space-y-3">
                {donations.slice(0, 3).map((donation) => (
                  <div key={donation.id} className="bg-black/60 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold text-white text-sm">{donation.location}</div>
                        <div className="text-gray-400 text-xs">{donation.date.toLocaleDateString()}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${donation.verified ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                    </div>
                    <div className="text-gray-300 text-xs mb-2">{donation.type} • {donation.volume}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 font-bold text-xs">+{donation.tokensEarned}</span>
                      <span className="text-green-400 text-xs">{donation.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">🌟 Your Impact</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">{stats.livesImpacted}</div>
                  <div className="text-gray-400 text-sm">Lives Directly Impacted</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">{stats.tokensEarned}</div>
                    <div className="text-gray-400 text-xs">Tokens Earned</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{Math.floor(stats.totalDonations * 450)}</div>
                    <div className="text-gray-400 text-xs">ML Donated</div>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Community Rank</div>
                  <div className="text-lg font-bold text-purple-400">Top 8%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <button
            onClick={() => onNavigate('tinder')}
            className="p-6 bg-pink-900/30 border border-pink-600 rounded-lg hover:bg-pink-900/50 transition-colors"
          >
            <Heart className="w-8 h-8 text-pink-400 mb-2" />
            <h3 className="text-lg font-bold text-pink-400">Find Donation Partners</h3>
            <p className="text-gray-400 text-sm">Connect with compatible donors</p>
          </button>
          
          <button
            onClick={() => onNavigate('community')}
            className="p-6 bg-blue-900/30 border border-blue-600 rounded-lg hover:bg-blue-900/50 transition-colors"
          >
            <Users className="w-8 h-8 text-blue-400 mb-2" />
            <h3 className="text-lg font-bold text-blue-400">Donation Groups</h3>
            <p className="text-gray-400 text-sm">Join community drives</p>
          </button>
          
          <button
            onClick={() => onNavigate('agent17')}
            className="p-6 bg-purple-900/30 border border-purple-600 rounded-lg hover:bg-purple-900/50 transition-colors"
          >
            <Target className="w-8 h-8 text-purple-400 mb-2" />
            <h3 className="text-lg font-bold text-purple-400">AI Coordination</h3>
            <p className="text-gray-400 text-sm">Optimize donation impact</p>
          </button>
          
          <button
            onClick={() => onNavigate('token')}
            className="p-6 bg-yellow-900/30 border border-yellow-600 rounded-lg hover:bg-yellow-900/50 transition-colors"
          >
            <Award className="w-8 h-8 text-yellow-400 mb-2" />
            <h3 className="text-lg font-bold text-yellow-400">Token Rewards</h3>
            <p className="text-gray-400 text-sm">Manage your earnings</p>
          </button>
        </div>
      </div>
    </div>
  );
};