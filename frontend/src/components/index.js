// Export all components from a single file for easier imports
export { ApocalypseHero } from '../components';
export { Header } from '../components';

// New comprehensive platform components
export { InteractiveFilm } from './InteractiveFilm';
export { SurvivalAcademy } from './SurvivalAcademy';
export { Agent17Dashboard } from './Agent17Dashboard';
export { TinderOfDoers } from './TinderOfDoers';
export { BloodDonationTracker } from './BloodDonationTracker';

// Placeholder exports for components to be created
export const MarketplaceGear = ({ user, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <h1 className="text-4xl font-bold text-yellow-400 mb-4">Marketplace & Gear</h1>
    <p className="text-gray-300">Rugged tech, survival clothes, and community partnerships coming soon...</p>
  </div>
);

export const EventBookingSystem = ({ user, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <h1 className="text-4xl font-bold text-yellow-400 mb-4">Event Booking System</h1>
    <p className="text-gray-300">Airbnb-like booking for venues, photographers, caterers coming soon...</p>
  </div>
);

export const LiveDataFeeds = ({ globalData, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <h1 className="text-4xl font-bold text-yellow-400 mb-4">Live Data Feeds</h1>
    <p className="text-gray-300">Collapsology updates, population data, humanitarian news coming soon...</p>
  </div>
);

export const TokenDAO = ({ user, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <h1 className="text-4xl font-bold text-yellow-400 mb-4">Token & DAO Integration</h1>
    <p className="text-gray-300">Governance, rewards, donations, and access management coming soon...</p>
  </div>
);

export const CommunityHub = ({ user, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <h1 className="text-4xl font-bold text-yellow-400 mb-4">Community Hub</h1>
    <p className="text-gray-300">Advanced community building and collaboration tools coming soon...</p>
  </div>
);

export const CrisisCommand = ({ user, globalData, onNavigate }) => (
  <div className="min-h-screen bg-black text-white p-6">
    <h1 className="text-4xl font-bold text-yellow-400 mb-4">Crisis Command Center</h1>
    <p className="text-gray-300">Real-time crisis coordination and emergency response coming soon...</p>
  </div>
);