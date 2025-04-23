import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useAuth();

  // Get current page title
  const getPageTitle = (): string => {
    switch (location.pathname) {
      case '/app':
        return 'Home';
      case '/app/live':
        return 'Live Matches';
      case '/app/betslip':
        return 'Bet Slip';
      case '/app/mybets':
        return 'My Bets';
      case '/app/wallet':
        return 'Wallet';
      case '/app/profile':
        return 'Profile';
      default:
        if (location.pathname.includes('/app/match/')) {
          return 'Match Details';
        }
        return 'BetPro';
    }
  };

  // Check if we should show the back button
  const shouldShowBackButton = (): boolean => {
    return !['/app', '/app/live', '/app/mybets', '/app/wallet', '/app/profile'].includes(location.pathname);
  };

  return (
    <header className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {shouldShowBackButton() ? (
            <button 
              onClick={() => navigate(-1)} 
              className="mr-3 text-gray-300 hover:text-white"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="flex items-center">
              <span className="font-bold text-green-500 mr-1">Bet</span>
              <span className="font-bold text-white">Pro</span>
            </div>
          )}
          <h1 className="text-lg font-semibold ml-2">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white">
            <Bell size={20} />
          </button>
          {profile && typeof profile.balance === 'number' && (
            <div className="hidden md:flex items-center">
              <span className="text-green-400 font-semibold">NGN {profile.balance.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;