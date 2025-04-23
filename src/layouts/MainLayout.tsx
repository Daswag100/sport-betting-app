import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavBar from '../components/navigation/BottomNavBar';
import Header from '../components/navigation/Header';
import BetSlipFloatingButton from '../components/betslip/BetSlipFloatingButton';
import { useBetSlip } from '../contexts/BetSlipContext';

const MainLayout: React.FC = () => {
  const { bets } = useBetSlip();
  const hasBets = bets.length > 0;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>
      
      {/* Show floating bet slip button if there are bets */}
      {hasBets && <BetSlipFloatingButton />}
      
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;