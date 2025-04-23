import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Activity, List, Wallet, User } from 'lucide-react';
import { useBetSlip } from '../../contexts/BetSlipContext';

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const { bets } = useBetSlip();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-1 z-10">
      <div className="flex justify-between items-center">
        <NavItem 
          to="/app" 
          icon={<Home size={20} />}
          label="Home"
          isActive={location.pathname === '/app'}
        />
        <NavItem 
          to="/app/live" 
          icon={<Activity size={20} />}
          label="Live"
          isActive={location.pathname === '/app/live'}
        />
        <NavItem 
          to="/app/mybets" 
          icon={<List size={20} />}
          label="My Bets"
          isActive={location.pathname === '/app/mybets'}
        />
        <NavItem 
          to="/app/wallet" 
          icon={<Wallet size={20} />}
          label="Wallet"
          isActive={location.pathname === '/app/wallet'}
        />
        <NavItem 
          to="/app/profile" 
          icon={<User size={20} />}
          label="Profile"
          isActive={location.pathname === '/app/profile'}
        />
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive, badge }) => {
  return (
    <NavLink 
      to={to} 
      className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors duration-200 relative ${
        isActive ? 'text-green-400' : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
      
      {badge && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default BottomNavBar;